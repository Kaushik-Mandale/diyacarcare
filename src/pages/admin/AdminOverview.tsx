import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { getAllBookings, Booking } from "../../lib/bookingStore";

function StatCard({ label, value, icon, color }: { label: string; value: number | string; icon: React.ReactNode; color: string }) {
  return (
    <motion.div
      className="rounded-2xl p-6 flex items-start gap-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "20", color }}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>{value}</div>
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</div>
      </div>
    </motion.div>
  );
}

export default function AdminOverview() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookings().then((b) => { setBookings(b); setLoading(false); });
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.preferredDate === today).length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  const recentBookings = bookings.slice(0, 5);

  const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    confirmed: "#22c55e",
    "in-service": "#3b82f6",
    completed: "#22c55e",
    cancelled: "#ef4444",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Overview</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label="Today's Bookings" value={loading ? "—" : todayBookings} icon={<Calendar size={22} />} color="#3b82f6" />
        <StatCard label="Pending" value={loading ? "—" : pending} icon={<Clock size={22} />} color="#f59e0b" />
        <StatCard label="Confirmed" value={loading ? "—" : confirmed} icon={<TrendingUp size={22} />} color="#22c55e" />
        <StatCard label="Completed" value={loading ? "—" : completed} icon={<CheckCircle size={22} />} color="#8b5cf6" />
      </div>

      {/* Recent bookings */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>Recent Bookings</h2>
          <a href="/admin/bookings" className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
            View All
          </a>
        </div>

        {loading ? (
          <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>Loading...</div>
        ) : recentBookings.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <Calendar size={32} style={{ color: "var(--text-muted)" }} />
            <p style={{ color: "var(--text-muted)" }}>No bookings yet. They'll appear here when customers book.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  {["Reference", "Customer", "Service", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, i) => (
                  <tr
                    key={booking.id}
                    style={{ borderBottom: i < recentBookings.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                  >
                    <td className="px-6 py-4 text-xs font-mono font-bold" style={{ color: "var(--accent)" }}>
                      {booking.referenceNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{booking.customerName}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{booking.service}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{booking.preferredDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{
                          background: statusColors[booking.status] + "20",
                          color: statusColors[booking.status],
                        }}
                      >
                        {booking.status.replace("-", " ")}
                      </span>
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
