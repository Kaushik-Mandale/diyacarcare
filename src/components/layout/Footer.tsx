import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle } from "lucide-react";

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
import { BUSINESS } from "../../config/business";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#why-diya" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="border-t"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
    >
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
                style={{ background: "var(--accent)" }}
              >
                D
              </div>
              <div className="leading-none">
                <div className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  DIYA
                </div>
                <div className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                  CAR CARE
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "var(--text-secondary)" }}>
              {BUSINESS.tagline}
            </p>
            {/* Contact quick links */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${BUSINESS.contact.phonePlain}`}
                className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-secondary)" }}
              >
                <Phone size={14} style={{ color: "var(--accent)" }} />
                {BUSINESS.contact.phone}
              </a>
              <a
                href={BUSINESS.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-secondary)" }}
              >
                <MapPin size={14} style={{ color: "var(--accent)" }} />
                Sutarwadi, Pashan, Pune 411021
              </a>
              <a
                href={`https://wa.me/${BUSINESS.contact.whatsapp}?text=Hello Diya Car Care, I would like to enquire about car servicing.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-secondary)" }}
              >
                <MessageCircle size={14} style={{ color: "#25D366" }} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm hover:opacity-80 transition-opacity text-left"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-bold mb-5 uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              Working Hours
            </h4>
            <div className="flex flex-col gap-2">
              {BUSINESS.hours.slice(0, 4).map((h) => (
                <div key={h.day} className="flex justify-between text-sm gap-4">
                  <span style={{ color: "var(--text-muted)" }}>{h.day}</span>
                  <span style={{ color: "var(--text-secondary)" }}>{h.hours}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm gap-4">
                <span style={{ color: "var(--text-muted)" }}>Fri – Sat</span>
                <span style={{ color: "var(--text-secondary)" }}>9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between text-sm gap-4">
                <span style={{ color: "var(--text-muted)" }}>Sunday</span>
                <span style={{ color: "var(--text-secondary)" }}>10:00 AM – 4:00 PM</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {BUSINESS.social.facebook && (
                <a
                  href={BUSINESS.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <FacebookIcon />
                </a>
              )}
              {BUSINESS.social.instagram && (
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <InstagramIcon />
                </a>
              )}
              {BUSINESS.social.youtube && (
                <a
                  href={BUSINESS.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <YoutubeIcon />
                </a>
              )}
              {/* Show placeholder icons if no social links provided */}
              {!BUSINESS.social.facebook && !BUSINESS.social.instagram && !BUSINESS.social.youtube && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Social links coming soon
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {currentYear} Diya Car Care. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-muted)" }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-muted)" }}
            >
              Terms & Conditions
            </Link>
            <Link
              to="/admin"
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: "var(--text-muted)" }}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
