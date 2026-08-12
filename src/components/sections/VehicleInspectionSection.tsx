import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { INSPECTION_POINTS } from "../../config/business";

export default function VehicleInspectionSection() {
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const active = INSPECTION_POINTS.find((p) => p.id === activePoint);

  return (
    <section
      id="inspection"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="section-container">
        <div ref={ref} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              VEHICLE INSPECTION
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Know Your Car Better
          </motion.h2>
          <motion.p
            className="text-base mt-3 max-w-md mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Click on any inspection point to learn more about that system.
          </motion.p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Car SVG diagram */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-3xl p-8 md:p-12 relative"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {/* Car top-view SVG */}
              <svg
                viewBox="0 0 600 280"
                className="w-full"
                style={{ maxHeight: 300 }}
                aria-label="Car top view diagram"
              >
                {/* Body */}
                <rect x="100" y="80" width="400" height="120" rx="50" fill="var(--bg-secondary)" stroke="var(--border-subtle)" strokeWidth="1.5"/>
                {/* Hood */}
                <path d="M100 140 Q80 100 120 90 L180 85 Q100 90 100 140Z" fill="var(--bg-secondary)" stroke="var(--border-subtle)" strokeWidth="1.5"/>
                <rect x="88" y="92" width="80" height="96" rx="30" fill="var(--bg-secondary)" stroke="var(--border-subtle)" strokeWidth="1.5"/>
                {/* Trunk */}
                <rect x="432" y="92" width="80" height="96" rx="30" fill="var(--bg-secondary)" stroke="var(--border-subtle)" strokeWidth="1.5"/>
                {/* Windshield */}
                <ellipse cx="175" cy="140" rx="28" ry="48" fill="var(--accent-bg)" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6"/>
                {/* Rear window */}
                <ellipse cx="425" cy="140" rx="28" ry="48" fill="var(--accent-bg)" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6"/>
                {/* Roof */}
                <ellipse cx="300" cy="140" rx="120" ry="55" fill="var(--border-subtle)" opacity="0.5"/>
                {/* Wheels */}
                <ellipse cx="140" cy="88" rx="22" ry="14" fill="#1a1a1a" opacity="0.7"/>
                <ellipse cx="140" cy="192" rx="22" ry="14" fill="#1a1a1a" opacity="0.7"/>
                <ellipse cx="460" cy="88" rx="22" ry="14" fill="#1a1a1a" opacity="0.7"/>
                <ellipse cx="460" cy="192" rx="22" ry="14" fill="#1a1a1a" opacity="0.7"/>
                {/* Door lines */}
                <line x1="260" y1="82" x2="260" y2="198" stroke="var(--border-subtle)" strokeWidth="1.5"/>
                <line x1="340" y1="82" x2="340" y2="198" stroke="var(--border-subtle)" strokeWidth="1.5"/>
                {/* Labels */}
                <text x="300" y="148" textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="sans-serif" fontWeight="500">
                  DIYA CAR CARE
                </text>
              </svg>

              {/* Inspection Points */}
              {INSPECTION_POINTS.map((point) => (
                <button
                  key={point.id}
                  className="inspection-point"
                  style={{
                    left: `${point.position.x}%`,
                    top: `${point.position.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                  onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                  aria-label={`Inspect ${point.label}`}
                >
                  <span className="text-white text-xs font-black leading-none">+</span>
                </button>
              ))}

              {/* Labels for points */}
              {INSPECTION_POINTS.map((point) => (
                <div
                  key={`label-${point.id}`}
                  className="absolute text-xs font-bold pointer-events-none"
                  style={{
                    left: `calc(${point.position.x}% + 22px)`,
                    top: `calc(${point.position.y}% - 6px)`,
                    color: "var(--text-muted)",
                  }}
                >
                  {point.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info Panel */}
          <AnimatePresence>
            {active && (
              <motion.div
                className="glass-card absolute -right-4 top-8 w-64 p-5 z-20"
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider mb-0.5" style={{ color: "var(--accent)" }}>
                      {active.label}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                      Inspection Point
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePoint(null)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  {active.description}
                </p>
                <button
                  onClick={() => {
                    setActivePoint(null);
                    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-primary w-full justify-center text-xs py-2"
                >
                  Request Inspection
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
