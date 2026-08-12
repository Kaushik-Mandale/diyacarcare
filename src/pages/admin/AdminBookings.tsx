import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { getAllBookings, updateBookingStatus, Booking } from "../../lib/bookingStore";
import { SERVICES } from "../../config/business";

const STATUSES = ["all", "pending", "confirmed", "in-service", "completed", "cancelled"] as const;
type StatusFilter = typeof STATUSES[number];

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#22c55e",
  "in-service": "#3b82f6",
  completed: "#8b5cf6",
  cancelled: "#ef4444",
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [dateFilter, setDateFilter] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const data = await getAllBookings();
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleBrand.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleModel.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchDate = !dateFilter || b.preferredDate === dateFilter;
    return matchSearch && matchStatus && matchDate;
  });

  const handleStatusUpdate = async (id: string, status: Booking["status"]) => {
    await updateBookingStatus(id, status);
    await load();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Bookings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage all service bookings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            className="form-input pl-9"
            placeholder="Search by name, phone, reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <select
          className="form-input w-auto min-w-36"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}</option>
          ))}
        </select>

        {/* Date filter */}
        <input
          type="date"
          className="form-input w-auto"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        {(search || statusFilter !== "all" || dateFilter) && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); setDateFilter(""); }}
            className="btn-secondary px-4 py-2 text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      <div className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
        {filtered.length} booking{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        {loading ? (
          <div className="p-12 text-center" style={{ color: "var(--text-muted)" }}>Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center" style={{ color: "var(--text-muted)" }}>No bookings found.</div>
        ) : (
          <div className="flex flex-col divide-y" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
            {filtered.map((booking) => (
              <div key={booking.id}>
                {/* Row */}
                <div
                  className="flex flex-wrap items-center gap-4 px-6 py-4 cursor-pointer hover:bg-opacity-50 transition-colors"
                  style={{ background: expanded === booking.id ? "var(--bg-secondary)" : "transparent" }}
                  onClick={() => setExpanded(expanded === booking.id ? null : booking.id!)}
                >
                  <div className="flex-shrink-0 w-28">
                    <span className="text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
                      {booking.referenceNumber}
                    </span>
                  </div>
                  <div className="flex-1 min-w-32">
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{booking.customerName}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{booking.phone}</div>
                  </div>
                  <div className="flex-1 min-w-32 hidden sm:block">
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{booking.service}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{booking.vehicleBrand} {booking.vehicleModel}</div>
                  </div>
                  <div className="text-sm hidden md:block" style={{ color: "var(--text-secondary)" }}>
                    {booking.preferredDate}<br /><span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>{booking.preferredTime}</span>
                  </div>
                  <div>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                      style={{ background: STATUS_COLORS[booking.status] + "20", color: STATUS_COLORS[booking.status] }}
                    >
                      {booking.status.replace("-", " ")}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      color: "var(--text-muted)",
                      transform: expanded === booking.id ? "rotate(180deg)" : "",
                      transition: "transform 0.2s",
                    }}
                  />
                </div>

                {/* Expanded detail */}
                {expanded === booking.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-6 pb-6"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {/* Details */}
                      <div className="flex flex-col gap-2 text-sm">
                        {[
                          ["Email", booking.email || "—"],
                          ["Registration", booking.registrationNumber],
                          ["Pickup Required", booking.pickupRequired ? "Yes" : "No"],
                          ["Notes", booking.notes || "—"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex gap-3">
                            <span className="font-semibold w-32 flex-shrink-0" style={{ color: "var(--text-muted)" }}>{k}</span>
                            <span style={{ color: "var(--text-secondary)" }}>{v}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                          Update Status
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(["pending", "confirmed", "in-service", "completed", "cancelled"] as Booking["status"][]).map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusUpdate(booking.id!, s)}
                              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 capitalize"
                              style={{
                                background: booking.status === s ? STATUS_COLORS[s] : STATUS_COLORS[s] + "20",
                                color: booking.status === s ? "white" : STATUS_COLORS[s],
                              }}
                            >
                              {s.replace("-", " ")}
                            </button>
                          ))}
                        </div>

                        <div className="flex gap-3 mt-2">
                          <a
                            href={`tel:${booking.phone}`}
                            className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                          >
                            <Phone size={14} />
                            Call
                          </a>
                          <a
                            href={`https://wa.me/91${booking.phone.replace(/\D/g, "")}?text=Hello ${booking.customerName}, this is Diya Car Care regarding your booking reference ${booking.referenceNumber}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary text-sm px-4 py-2 flex items-center gap-2"
                            style={{ color: "#25D366", borderColor: "#25D366" }}
                          >
                            <MessageCircle size={14} />
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
