import React from "react";
import { Phone } from "lucide-react";
import { BUSINESS } from "../../config/business";

export default function StickyMobileBar() {
  const message = encodeURIComponent(
    "Hello Diya Car Care, I would like to enquire about car servicing."
  );

  return (
    <div className="sticky-mobile-bar md:hidden">
      <a
        href={`tel:${BUSINESS.contact.phonePlain}`}
        className="btn-secondary flex-1 justify-center text-sm py-3"
      >
        <Phone size={16} />
        Call Now
      </a>
      <a
        href="#booking"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="btn-primary flex-1 justify-center text-sm py-3"
      >
        Book Service
      </a>
    </div>
  );
}
