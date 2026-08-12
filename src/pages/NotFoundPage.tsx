import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Diya Car Care</title>
      </Helmet>
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: "var(--bg-primary)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Large 404 */}
          <div
            className="text-8xl md:text-9xl font-black"
            style={{
              background: "linear-gradient(135deg, var(--accent) 0%, var(--border-subtle) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.06em",
            }}
          >
            404
          </div>

          {/* Road icon */}
          <div className="text-5xl">🛣️</div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Looks like this road doesn't exist.
            </h1>
            <p className="text-base max-w-md" style={{ color: "var(--text-secondary)" }}>
              The page you're looking for has taken a detour. Let us navigate you back.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary text-base px-8 py-3.5">
              <Home size={18} />
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary text-base px-8 py-3.5"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
