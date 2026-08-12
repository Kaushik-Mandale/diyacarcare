import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// Gallery items using picsum placeholder images (real, high quality photos)
const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Workshop Interior",
    category: "Workshop",
    url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
    tall: true,
  },
  {
    id: 2,
    title: "Car Detailing",
    category: "Detailing",
    url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80",
    tall: false,
  },
  {
    id: 3,
    title: "Engine Service",
    category: "Mechanical",
    url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
    tall: false,
  },
  {
    id: 4,
    title: "Car Wash",
    category: "Cleaning",
    url: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&q=80",
    tall: true,
  },
  {
    id: 5,
    title: "Brake Service",
    category: "Mechanical",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tall: false,
  },
  {
    id: 6,
    title: "Interior Detailing",
    category: "Detailing",
    url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80",
    tall: false,
  },
  {
    id: 7,
    title: "Premium Car Care",
    category: "Workshop",
    url: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80",
    tall: false,
  },
  {
    id: 8,
    title: "Tyre Service",
    category: "Mechanical",
    url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
    tall: true,
  },
  {
    id: 9,
    title: "AC Service",
    category: "Workshop",
    url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    tall: false,
  },
];

const CATEGORIES = ["All", "Workshop", "Detailing", "Mechanical", "Cleaning"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container">
        <div ref={ref} className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              GALLERY
            </span>
          </motion.div>
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>
              Our Work in Action
            </h2>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? "var(--accent)" : "var(--bg-secondary)",
                    color: activeCategory === cat ? "#fff" : "var(--text-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              className="masonry-item group cursor-pointer rounded-2xl overflow-hidden relative"
              style={{ boxShadow: "var(--shadow-sm)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightboxItem(item)}
            >
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ height: item.tall ? "320px" : "220px" }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                }}
              >
                <div className="text-white font-semibold text-sm">{item.title}</div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {item.category}
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn size={14} color="white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white z-10"
              onClick={() => setLightboxItem(null)}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] mx-4"
            >
              <img
                src={lightboxItem.url.replace("w=600", "w=1200")}
                alt={lightboxItem.title}
                className="max-w-full max-h-[80vh] rounded-2xl object-contain"
                style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }}
              />
              <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-xl">
                <div className="text-white font-semibold text-sm">{lightboxItem.title}</div>
                <div className="text-white/70 text-xs">{lightboxItem.category}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
