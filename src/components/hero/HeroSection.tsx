import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin } from "lucide-react";
import { BUSINESS } from "../../config/business";

// Lazy load the 3D canvas for performance
const CarCanvas = lazy(() => import("./CarCanvas"));

const floatingCards = [
  { label: "Complete Car Care", delay: 0 },
  { label: "Service Booking", delay: 0.4 },
  { label: "Premium Detailing", delay: 0.8 },
  { label: "Pickup & Drop", delay: 1.2 },
];

export default function HeroSection() {
  const handleBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: "var(--bg-primary)" }}
      aria-label="Hero section"
    >
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,122,63,0.15) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(26,122,63,0.1) 0%, transparent 70%)" }}
      />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-12">
          {/* ─── Left: Content ──────────────────────────────── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
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
              className="text-lg leading-relaxed mb-8 max-w-md"
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
                className="glass-card flex items-center gap-3 px-5 py-3"
                style={{ borderRadius: "16px" }}
              >
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map((s) => (
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
                className="glass-card flex items-center gap-3 px-5 py-3"
                style={{ borderRadius: "16px" }}
              >
                <div
                  className="text-2xl font-bold"
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
                className="glass-card flex items-center gap-3 px-5 py-3"
                style={{ borderRadius: "16px" }}
              >
                <MapPin size={18} style={{ color: "var(--accent)" }} />
                <div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    Pune
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Sutarwadi, Pashan
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Right: 3D Car ──────────────────────────────── */}
          <div className="relative order-1 lg:order-2 h-[340px] md:h-[480px] lg:h-[600px]">
            {/* Floating info card */}
            <motion.div
              className="glass-card absolute top-4 right-4 z-10 px-4 py-3 hidden md:block"
              style={{ minWidth: 160 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--accent)" }}>
                CAR CARE
              </div>
              <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Professional Service
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                Trusted by Local Customers
              </div>
            </motion.div>

            {/* Floating service tags */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.label}
                className="glass-card absolute px-3 py-1.5 text-xs font-semibold hidden lg:block"
                style={{
                  color: "var(--text-secondary)",
                  top: `${18 + i * 14}%`,
                  left: i % 2 === 0 ? "-5%" : "auto",
                  right: i % 2 !== 0 ? "-5%" : "auto",
                  borderRadius: "12px",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + card.delay * 0.3 }}
              >
                {card.label}
              </motion.div>
            ))}

            {/* Platform glow */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 h-8 rounded-full blur-2xl opacity-30 pointer-events-none"
              style={{ background: "var(--accent)" }}
            />

            {/* 3D Car Canvas */}
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }}
                  />
                </div>
              }
            >
              <CarCanvas className="w-full h-full" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Scroll to explore</div>
        <motion.div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
