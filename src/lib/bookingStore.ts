import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ───────────────────────────────────────────────────
export interface Booking {
  id?: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleBrand: string;
  vehicleModel: string;
  registrationNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  pickupRequired: boolean;
  notes: string;
  status: "pending" | "confirmed" | "in-service" | "completed" | "cancelled";
  referenceNumber: string;
  createdAt: Timestamp | Date;
}

export interface Review {
  id?: string;
  customerName: string;
  rating: number;
  review: string;
  date: string;
  approved: boolean;
}

// ─── Generate Reference Number ────────────────────────────────
export function generateReference(): string {
  const prefix = "DCC";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// ─── Bookings ─────────────────────────────────────────────────
export async function createBooking(
  data: Omit<Booking, "id" | "status" | "referenceNumber" | "createdAt">
): Promise<{ id: string; referenceNumber: string }> {
  const referenceNumber = generateReference();
  const booking: Omit<Booking, "id"> = {
    ...data,
    status: "pending",
    referenceNumber,
    createdAt: Timestamp.now(),
  };

  try {
    const docRef = await addDoc(collection(db, "bookings"), booking);
    return { id: docRef.id, referenceNumber };
  } catch {
    // Fallback to localStorage
    const bookings = getLocalBookings();
    const id = `local-${Date.now()}`;
    bookings.push({ ...booking, id });
    localStorage.setItem("dcc_bookings", JSON.stringify(bookings));
    return { id, referenceNumber };
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const q = query(
      collection(db, "bookings"),
      orderBy("createdAt", "desc")
    );
    const snap: QuerySnapshot<DocumentData> = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking));
  } catch {
    return getLocalBookings();
  }
}

export async function updateBookingStatus(
  id: string,
  status: Booking["status"]
): Promise<void> {
  try {
    await updateDoc(doc(db, "bookings", id), { status });
  } catch {
    const bookings = getLocalBookings();
    const idx = bookings.findIndex((b) => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      localStorage.setItem("dcc_bookings", JSON.stringify(bookings));
    }
  }
}

// ─── LocalStorage Fallback ────────────────────────────────────
function getLocalBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem("dcc_bookings") || "[]");
  } catch {
    return [];
  }
}

// ─── Reviews ─────────────────────────────────────────────────
export async function getApprovedReviews(): Promise<Review[]> {
  try {
    const q = query(
      collection(db, "reviews"),
      where("approved", "==", true),
      orderBy("date", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
  } catch {
    return [];
  }
}
