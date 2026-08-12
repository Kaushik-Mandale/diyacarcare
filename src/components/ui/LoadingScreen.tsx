import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Logo Mark */}
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--accent)" }}
                animate={{ rotate: [0, 0, 180, 180, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <span className="text-white font-bold text-2xl tracking-tight">D</span>
              </motion.div>
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: "0 0 0 0 rgba(26,122,63,0.5)" }}
                animate={{ boxShadow: ["0 0 0 0 rgba(26,122,63,0.5)", "0 0 0 20px rgba(26,122,63,0)"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>

            {/* Brand name */}
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                DIYA
              </div>
              <div
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                CAR CARE
              </div>
            </div>

            {/* Car line animation */}
            <motion.div className="relative w-48 h-12 overflow-hidden">
              {/* Road line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "var(--border-subtle)" }}
              />
              {/* Moving car icon (SVG) */}
              <motion.div
                className="absolute bottom-1"
                initial={{ x: -60 }}
                animate={{ x: 200 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 0.3 }}
              >
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                  <rect x="4" y="8" width="32" height="9" rx="3" fill="var(--text-primary)" opacity="0.7" />
                  <rect x="10" y="4" width="18" height="7" rx="2" fill="var(--text-primary)" opacity="0.5" />
                  <circle cx="10" cy="18" r="3" fill="var(--text-primary)" opacity="0.7" />
                  <circle cx="30" cy="18" r="3" fill="var(--text-primary)" opacity="0.7" />
                  {/* Headlight glow */}
                  <circle cx="37" cy="12" r="2" fill="var(--accent)" opacity="0.9" />
                </svg>
              </motion.div>

              {/* Loading line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px"
                style={{ background: "var(--accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing your journey...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
