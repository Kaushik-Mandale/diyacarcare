import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Wrench, Settings, Wind, Shield, BatteryCharging, Sparkles, Droplets, ScanLine, ArrowRight
} from "lucide-react";
import { SERVICES } from "../../config/business";

const iconMap: Record<string, React.ReactNode> = {
  "wrench": <Wrench size={28} />,
  "settings": <Settings size={28} />,
  "wind": <Wind size={28} />,
  "shield": <Shield size={28} />,
  "battery-charging": <BatteryCharging size={28} />,
  "sparkles": <Sparkles size={28} />,
  "droplets": <Droplets size={28} />,
  "scan-line": <ScanLine size={28} />,
};

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    el.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="premium-card p-6 flex flex-col gap-4 cursor-pointer group"
      style={{ transition: "transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          background: "var(--accent-bg)",
          color: "var(--accent)",
        }}
      >
        {iconMap[service.icon]}
      </div>

      {/* Category badge */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
          {service.category}
        </span>
      </div>

      {/* Name & desc */}
      <div>
        <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          {service.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {service.shortDesc}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-3 pt-2">
        <button
          onClick={() => navigate(`/services/${service.id}`)}
          className="text-sm font-semibold flex items-center gap-1 transition-all duration-200 hover:gap-2"
          style={{ color: "var(--accent)" }}
        >
          Learn More
          <ArrowRight size={14} />
        </button>
        <button
          onClick={() => {
            document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="ml-auto text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200"
          style={{
            background: "var(--accent-bg)",
            color: "var(--accent)",
          }}
        >
          Book Service
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-container">
        {/* Header */}
        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              OUR SERVICES
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
              Everything Your Car Needs
            </h2>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              From routine maintenance to specialised care — all under one roof.
            </p>
          </motion.div>
        </div>

        {/* Cards grid — desktop */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Cards — mobile horizontal scroll */}
        <div className="md:hidden snap-x-scroll">
          {SERVICES.map((service, i) => (
            <div key={service.id} style={{ width: "280px" }}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
