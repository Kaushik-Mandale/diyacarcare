import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { VEHICLE_TYPES, SERVICES } from "../../config/business";

export default function ServiceExplorer() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleEstimate = () => {
    if (selectedService) {
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="service-explorer"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container">
        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              SERVICE EXPLORER
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4 mb-3"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Choose Your Car Care
          </motion.h2>
          <motion.p
            className="text-base mb-12 max-w-lg"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Select your vehicle type and the service you need. We'll help you get the right care.
          </motion.p>
        </div>

        <div
          className="rounded-3xl p-8 md:p-12"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-lg)" }}
        >
          {/* Step 1: Vehicle Type */}
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "var(--text-muted)" }}>
              Step 1 — Select your vehicle type
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VEHICLE_TYPES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { setSelectedVehicle(v.id); setSelectedService(""); }}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 font-semibold text-sm"
                  style={{
                    borderColor: selectedVehicle === v.id ? "var(--accent)" : "var(--border-subtle)",
                    background: selectedVehicle === v.id ? "var(--accent-bg)" : "var(--bg-secondary)",
                    color: selectedVehicle === v.id ? "var(--accent)" : "var(--text-secondary)",
                    transform: selectedVehicle === v.id ? "translateY(-2px)" : "",
                    boxShadow: selectedVehicle === v.id ? "var(--shadow-accent)" : "",
                  }}
                >
                  <span className="text-3xl">{v.icon}</span>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Service */}
          {selectedVehicle && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: "var(--text-muted)" }}>
                Step 2 — What service do you need?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className="text-left p-4 rounded-xl border-2 transition-all duration-200 text-sm"
                    style={{
                      borderColor: selectedService === s.id ? "var(--accent)" : "var(--border-subtle)",
                      background: selectedService === s.id ? "var(--accent-bg)" : "var(--bg-secondary)",
                      color: selectedService === s.id ? "var(--accent)" : "var(--text-secondary)",
                    }}
                  >
                    <span className="font-semibold block">{s.name}</span>
                    <span className="text-xs mt-0.5 block opacity-70">{s.category}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: CTA */}
          {selectedVehicle && selectedService && (
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                  Selected
                </p>
                <p className="font-bold" style={{ color: "var(--text-primary)" }}>
                  {VEHICLE_TYPES.find(v => v.id === selectedVehicle)?.label} &nbsp;·&nbsp;{" "}
                  {SERVICES.find(s => s.id === selectedService)?.name}
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--accent)" }}>
                  Contact us for a personalised service estimate
                </p>
              </div>
              <button
                onClick={handleEstimate}
                className="btn-primary ml-auto whitespace-nowrap"
              >
                Get Service Estimate
                <ArrowRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
