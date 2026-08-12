import React from "react";
import { BUSINESS } from "../../config/business";
import { Settings, Phone, MapPin, Clock } from "lucide-react";

export default function AdminSettings() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Business information and website configuration
        </p>
      </div>

      <div
        className="rounded-2xl p-5 mb-6 flex items-start gap-3"
        style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)" }}
      >
        <Settings size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          <strong>To update business settings:</strong> Edit the <code>src/config/business.ts</code> file.
          All changes automatically update across the entire website without needing to touch other files.
        </p>
      </div>

      {/* Current config display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Phone size={16} style={{ color: "var(--accent)" }} />
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Contact</h3>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Phone</span>
              <span style={{ color: "var(--text-secondary)" }}>{BUSINESS.contact.phone}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>WhatsApp</span>
              <span style={{ color: "var(--text-secondary)" }}>+{BUSINESS.contact.whatsapp}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Email</span>
              <span style={{ color: "var(--text-secondary)" }}>{BUSINESS.contact.email || "Not set"}</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <MapPin size={16} style={{ color: "var(--accent)" }} />
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Address</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {BUSINESS.address.full}
          </p>
        </div>

        {/* Hours */}
        <div
          className="rounded-2xl p-6 md:col-span-2"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Clock size={16} style={{ color: "var(--accent)" }} />
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Working Hours</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BUSINESS.hours.map((h) => (
              <div
                key={h.day}
                className="flex justify-between text-sm px-4 py-2 rounded-xl"
                style={{ background: "var(--bg-secondary)" }}
              >
                <span style={{ color: "var(--text-muted)" }}>{h.day}</span>
                <span style={{ color: "var(--text-secondary)" }}>{h.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
