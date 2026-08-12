import React from "react";
import { useEffect, useState } from "react";
import { getAllBookings, Booking } from "../../lib/bookingStore";
import { Users } from "lucide-react";

export default function AdminCustomers() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookings().then((b) => { setBookings(b); setLoading(false); });
  }, []);

  // Deduplicate customers by phone
  const customers = Object.values(
    bookings.reduce((acc, b) => {
      if (!acc[b.phone]) {
        acc[b.phone] = {
          name: b.customerName,
          phone: b.phone,
          email: b.email,
          vehicles: new Set<string>(),
          bookingCount: 0,
          lastBooking: b.preferredDate,
        };
      }
      acc[b.phone].bookingCount++;
      acc[b.phone].vehicles.add(`${b.vehicleBrand} ${b.vehicleModel}`);
      return acc;
    }, {} as Record<string, { name: string; phone: string; email: string; vehicles: Set<string>; bookingCount: number; lastBooking: string }>)
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Customers</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Unique customers derived from booking records — {customers.length} total
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        {loading ? (
          <div className="p-12 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <Users size={32} style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>No customers yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Customer", "Phone", "Vehicles", "Bookings", "Last Booking"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr
                    key={c.phone}
                    style={{ borderBottom: i < customers.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{c.name}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{c.email || "—"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`tel:${c.phone}`} className="text-sm" style={{ color: "var(--accent)" }}>{c.phone}</a>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {[...c.vehicles].join(", ")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                      >
                        {c.bookingCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                      {c.lastBooking}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
