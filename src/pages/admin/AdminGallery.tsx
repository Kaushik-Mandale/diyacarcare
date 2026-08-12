import React from "react";
import { Image } from "lucide-react";

const GALLERY_ITEMS = [
  { title: "Workshop Interior", category: "Workshop", url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&q=60" },
  { title: "Car Detailing", category: "Detailing", url: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=200&q=60" },
  { title: "Engine Service", category: "Mechanical", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&q=60" },
  { title: "Car Wash", category: "Cleaning", url: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=200&q=60" },
  { title: "Brake Service", category: "Mechanical", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60" },
  { title: "Interior Detailing", category: "Detailing", url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=200&q=60" },
];

export default function AdminGallery() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Gallery</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Manage your gallery images. Connect Firebase Storage for real uploads.
        </p>
      </div>

      <div
        className="rounded-2xl p-5 mb-6 flex items-start gap-3"
        style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)" }}
      >
        <Image size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          <strong>Image Management:</strong> To add real images, upload them to Firebase Storage and
          update the <code>GALLERY_ITEMS</code> array in <code>GallerySection.tsx</code>.
          Full Firebase Storage integration can be added to enable drag-and-drop uploads here.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden group relative"
            style={{ border: "1px solid var(--border-subtle)" }}
          >
            <img src={item.url} alt={item.title} className="w-full h-36 object-cover" />
            <div className="p-3">
              <div className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{item.title}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{item.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
