import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { SERVICES } from "../config/business";
import { Helmet } from "react-helmet-async";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "var(--bg-primary)" }}>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Service not found</h1>
        <button onClick={() => navigate("/")} className="btn-primary">Go Home</button>
      </div>
    );
  }

  const relatedServices = SERVICES.filter((s) => s.id !== id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{service.name} | Diya Car Care Pune</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
        {/* Hero */}
        <div
          className="relative pt-24 pb-16"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="section-container">
            <motion.button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-semibold mb-8 hover:opacity-70 transition-opacity"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ArrowLeft size={16} />
              Back
            </motion.button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-label">{service.category}</span>
                <h1 className="text-3xl md:text-5xl font-bold mt-4 mb-6" style={{ color: "var(--text-primary)" }}>
                  {service.name}
                </h1>
                <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      navigate("/");
                      setTimeout(() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }), 100);
                    }}
                    className="btn-primary text-base px-7 py-3.5"
                  >
                    Book This Service
                    <ArrowRight size={18} />
                  </button>
                  <a href="tel:09822077344" className="btn-secondary text-base px-7 py-3.5">
                    Call Now
                  </a>
                </div>
              </motion.div>

              {/* Icon card */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div
                  className="w-48 h-48 rounded-4xl flex items-center justify-center"
                  style={{ background: "var(--accent-bg)", border: "2px solid var(--accent)" }}
                >
                  <span className="text-6xl" style={{ color: "var(--accent)" }}>🔧</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Benefits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 p-4 rounded-2xl"
                      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: "var(--accent-bg)" }}
                      >
                        <Check size={12} style={{ color: "var(--accent)" }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>What's Included</h2>
                <div className="flex flex-col gap-3">
                  {service.included.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 py-3 border-b"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-4">
                  {service.faqs.map((faq) => (
                    <div
                      key={faq.q}
                      className="rounded-2xl p-6"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
                    >
                      <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Recommended For */}
              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-md)" }}
              >
                <h3 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>Recommended For</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {service.recommendedFor}
                </p>
              </div>

              {/* CTA card */}
              <div
                className="rounded-3xl p-6"
                style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)" }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--accent)" }}>
                  Ready to book?
                </h3>
                <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
                  Schedule your {service.name} appointment today.
                </p>
                <button
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" }), 100);
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Book This Service
                </button>
                <a href="tel:09822077344" className="btn-secondary w-full justify-center mt-3">
                  Call 098220 77344
                </a>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(`/services/${s.id}`)}
                  className="premium-card p-6 text-left flex flex-col gap-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
                    {s.category}
                  </span>
                  <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>{s.name}</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.shortDesc}</p>
                  <span className="text-sm font-semibold flex items-center gap-1 mt-auto" style={{ color: "var(--accent)" }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
