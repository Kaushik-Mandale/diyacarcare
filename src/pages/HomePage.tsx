import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import HeroSection from "../components/hero/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import ServiceExplorer from "../components/sections/ServiceExplorer";
import WhyDiyaSection from "../components/sections/WhyDiyaSection";
import ProcessSection from "../components/sections/ProcessSection";
import VehicleInspectionSection from "../components/sections/VehicleInspectionSection";
import GallerySection from "../components/sections/GallerySection";
import ReviewsSection from "../components/sections/ReviewsSection";
import BookingSection from "../components/sections/BookingSection";
import LocationSection from "../components/sections/LocationSection";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Diya Car Care | Professional Car Service & Care in Pune</title>
        <meta
          name="description"
          content="Diya Car Care provides professional car servicing, maintenance and automotive care in Sutarwadi, Pashan, Pune. Book your service today."
        />
      </Helmet>

      <main id="main-content">
        <HeroSection />
        <ServicesSection />
        <ServiceExplorer />
        <WhyDiyaSection />
        <ProcessSection />
        <VehicleInspectionSection />
        <GallerySection />
        <ReviewsSection />
        <BookingSection />
        <LocationSection />
      </main>
    </>
  );
}
