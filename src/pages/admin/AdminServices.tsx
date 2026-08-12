import React from "react";
import { SERVICES } from "../../config/business";
import { Wrench } from "lucide-react";

export default function AdminServices() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Services</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Manage your service catalog. Edit <code>src/config/business.ts</code> to update services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl p-6 flex items-start gap-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
            >
              <Wrench size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{service.name}</h3>
                  <span className="text-xs" style={{ color: "var(--accent)" }}>{service.category}</span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0"
                  style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                >
                  Active
                </span>
              </div>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {service.shortDesc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-2xl p-5 flex items-start gap-3"
        style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)" }}
      >
        <Wrench size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          <strong>To add, edit, or remove services:</strong> Open{" "}
          <code>src/config/business.ts</code> and modify the <code>SERVICES</code> array.
          Changes will appear automatically across the website.
        </p>
      </div>
    </div>
  );
}
