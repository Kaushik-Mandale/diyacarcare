import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Navigation, MessageCircle } from "lucide-react";
import { BUSINESS } from "../../config/business";

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const waMessage = encodeURIComponent("Hello Diya Car Care, I would like to get directions to your service centre.");

  return (
    <section
      id="location"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container">
        <div ref={ref} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
              LOCATION
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mt-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Visit Diya Car Care
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: "var(--shadow-lg)", height: 420 }}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              title="Diya Car Care Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5234!2d73.7880!3d18.5193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bfc00f58a57d%3A0x4fc60c5f069eb7c7!2sPashan%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1722475200000!5m2!1sen!2sin"
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                {BUSINESS.name}
              </h3>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-3">
                  <MapPin size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                      Address
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {BUSINESS.address.line1}<br />
                      {BUSINESS.address.line2}<br />
                      {BUSINESS.address.area},<br />
                      {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.pincode}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                      Phone
                    </div>
                    <a
                      href={`tel:${BUSINESS.contact.phonePlain}`}
                      className="text-sm font-medium hover:opacity-80 transition-opacity"
                      style={{ color: "var(--accent)" }}
                    >
                      {BUSINESS.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Hours summary */}
                <div className="flex gap-3">
                  <div className="w-4.5 flex-shrink-0 mt-0.5">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: "var(--accent-bg)" }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                      Working Hours
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Mon – Sat: 9:00 AM – 7:00 PM<br />
                      Sunday: 10:00 AM – 4:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={BUSINESS.maps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center text-sm py-3"
                >
                  <Navigation size={15} />
                  Get Directions
                </a>
                <a
                  href={`tel:${BUSINESS.contact.phonePlain}`}
                  className="btn-secondary justify-center text-sm py-3"
                >
                  <Phone size={15} />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${BUSINESS.contact.whatsapp}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary justify-center text-sm py-3 col-span-1"
                  style={{ color: "#25D366", borderColor: "#25D366" }}
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <button
                  onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-secondary justify-center text-sm py-3 col-span-1"
                >
                  Book Service
                </button>
              </div>
            </div>

            {/* Landmark note */}
            <div
              className="rounded-2xl px-5 py-4 flex items-start gap-3"
              style={{ background: "var(--accent-bg)", border: "1px solid var(--border-subtle)" }}
            >
              <MapPin size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm" style={{ color: "var(--accent)" }}>
                <strong>Landmark:</strong> Near Rangla Punjab Hotel, Opp. Wada Hotel on the Mumbai–Bangalore Highway, Sutarwadi, Pashan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
