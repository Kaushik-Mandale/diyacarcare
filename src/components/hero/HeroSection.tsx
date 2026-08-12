import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { BUSINESS } from "../../config/business";
import CarDisplayUI from "./CarDisplayUI";

export default function HeroSection() {
  const handleBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12"
      style={{ background: "var(--bg-primary)" }}
      aria-label="Hero section"
    >
      {/* Background gradient ambient glows */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,122,63,0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,122,63,0.12) 0%, transparent 70%)" }}
      />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[82vh] py-6">
          {/* ─── Left: Headline & Content (5 cols) ───────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            {/* Brand label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: "var(--accent)" }}
                />
                DIYA CAR CARE
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your Car Deserves
              <br />
              <span className="gradient-text">Professional Care.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {BUSINESS.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button onClick={handleBooking} className="btn-primary text-base px-7 py-3.5">
                Book a Service
                <ArrowRight size={18} />
              </button>
              <button onClick={handleServices} className="btn-secondary text-base px-7 py-3.5">
                Explore Services
              </button>
            </motion.div>

            {/* Stat cards row */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Rating */}
              <div
                className="glass-card flex items-center gap-3 px-4 py-2.5"
                style={{ borderRadius: "16px" }}
              >
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        fill={s <= 4 ? "#f59e0b" : "none"}
                        stroke={s <= 5 ? "#f59e0b" : "currentColor"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                    {BUSINESS.rating} Google Rating
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div
                className="glass-card flex items-center gap-3 px-4 py-2.5"
                style={{ borderRadius: "16px" }}
              >
                <div
                  className="text-xl font-bold"
                  style={{ color: "var(--accent)", lineHeight: 1 }}
                >
                  {BUSINESS.reviewCount}
                </div>
                <div className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                  Customer<br />Reviews
                </div>
              </div>

              {/* Location */}
              <div
                className="glass-card flex items-center gap-3 px-4 py-2.5"
                style={{ borderRadius: "16px" }}
              >
                <MapPin size={16} style={{ color: "var(--accent)" }} />
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    Pune
                  </div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    Sutarwadi, Pashan
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Right: Automotive Dashboard UI Mockup (7 cols) ──── */}
          <div className="lg:col-span-7 order-1 lg:order-2 w-full flex items-center justify-center">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <CarDisplayUI />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
