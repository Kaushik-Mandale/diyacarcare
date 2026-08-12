import React from "react";
import { Star } from "lucide-react";

export default function AdminReviews() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Reviews</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Manage customer reviews. Connect Firestore to enable review approval.
        </p>
      </div>

      <div
        className="rounded-2xl p-5 mb-6 flex items-start gap-3"
        style={{ background: "var(--accent-bg)", border: "1px solid var(--accent)" }}
      >
        <Star size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
        <p className="text-sm" style={{ color: "var(--accent)" }}>
          <strong>Review Management:</strong> Once Firestore is configured, submitted reviews will
          appear here. You can approve or hide them before they appear on the public site.
          Currently showing placeholder reviews on the website — replace these with real customer testimonials.
        </p>
      </div>

      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        <Star size={40} className="mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
        <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>No Reviews Yet</h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Customer reviews will appear here once they are submitted. Connect your Firestore reviews collection to enable moderation.
        </p>
      </div>
    </div>
  );
}
