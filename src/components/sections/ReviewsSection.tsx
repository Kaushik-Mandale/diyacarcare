import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { BUSINESS } from "../../config/business";

// ⚠️ PLACEHOLDER REVIEWS — Replace with real customer reviews
const PLACEHOLDER_REVIEWS = [
  {
    id: 1,
    name: "Rahul M.",
    rating: 5,
    text: "Excellent service! The team was very professional and thorough. My car's periodic service was done efficiently and they explained everything clearly. Highly recommended.",
    date: "July 2026",
    isPlaceholder: true,
  },
  {
    id: 2,
    name: "Priya S.",
    rating: 5,
    text: "Very reliable and transparent. I brought my car in for an AC service and they did a great job. The pickup and drop facility is very convenient. Will definitely come back.",
    date: "June 2026",
    isPlaceholder: true,
  },
  {
    id: 3,
    name: "Amit K.",
    rating: 5,
    text: "Good location, easy to find on the highway. The staff is knowledgeable and honest about what work needs to be done. Pricing seems fair and the quality is good.",
    date: "May 2026",
    isPlaceholder: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= rating ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="reviews"
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
              CUSTOMER REVIEWS
            </span>
          </motion.div>

          {/* Rating display */}
          <motion.div
            className="flex flex-col items-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div
              className="text-6xl font-black"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.04em" }}
            >
              {BUSINESS.rating}
            </div>
            <StarRating rating={5} />
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
              {BUSINESS.reviewCount} reviews on Google
            </div>
          </motion.div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PLACEHOLDER_REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              className="premium-card p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Placeholder notice */}
              {review.isPlaceholder && (
                <div
                  className="text-xs font-semibold px-2 py-1 rounded-lg mb-4 inline-block"
                  style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                >
                  ✏️ Placeholder — Replace with real review
                </div>
              )}
              <StarRating rating={review.rating} />
              <p className="text-sm leading-relaxed my-4" style={{ color: "var(--text-secondary)" }}>
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    {review.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {review.date}
                  </div>
                </div>
                {/* Google G icon */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "#4285f4" }}
                >
                  G
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a
            href={BUSINESS.maps.placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex"
          >
            <ExternalLink size={16} />
            View All Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
