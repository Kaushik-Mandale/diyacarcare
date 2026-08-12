import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserCheck, MessageCircle, Award, MapPin } from "lucide-react";
import { WHY_DIYA } from "../../config/business";

const iconMap: Record<string, React.ReactNode> = {
  "user-check": <UserCheck size={26} />,
  "message-circle": <MessageCircle size={26} />,
  "award": <Award size={26} />,
  "map-pin": <MapPin size={26} />,
};

export default function WhyDiyaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-diya"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="section-container">
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              WHY CHOOSE US
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Why Customers Choose Diya
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_DIYA.map((item, i) => (
            <motion.div
              key={item.title}
              className="premium-card p-7 text-center flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center"
                style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
              >
                {iconMap[item.icon]}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
