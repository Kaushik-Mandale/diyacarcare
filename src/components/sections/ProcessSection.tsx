import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Search, Wrench, Car } from "lucide-react";
import { PROCESS_STEPS } from "../../config/business";

const iconMap: Record<string, React.ReactNode> = {
  "calendar": <Calendar size={24} />,
  "search": <Search size={24} />,
  "wrench": <Wrench size={24} />,
  "car": <Car size={24} />,
};

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              HOW IT WORKS
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Your Service Journey
          </motion.h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:grid grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg, var(--accent) 0%, var(--border-subtle) 100%)" }}
          />

          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col items-center text-center px-6 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Step number ring */}
              <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center mb-6 z-10"
                style={{
                  background: "var(--bg-card)",
                  border: "2px solid var(--accent)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                >
                  {iconMap[step.icon]}
                </div>
                {/* Step number badge */}
                <div
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                  style={{ background: "var(--accent)" }}
                >
                  {i + 1}
                </div>
              </div>

              <div
                className="step-number mb-2"
                style={{ fontSize: "1.5rem" }}
              >
                {step.number}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden flex flex-col gap-0 relative">
          {/* Vertical connector */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px"
            style={{ background: "linear-gradient(180deg, var(--accent) 0%, var(--border-subtle) 100%)" }}
          />

          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex gap-6 pl-2 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 relative"
                style={{
                  background: "var(--bg-card)",
                  border: "2px solid var(--accent)",
                  color: "var(--accent)",
                }}
              >
                {iconMap[step.icon]}
              </div>
              {/* Content */}
              <div className="pt-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="step-number" style={{ fontSize: "1.1rem" }}>
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
