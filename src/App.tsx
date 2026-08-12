import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";

import LoadingScreen from "./components/ui/LoadingScreen";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppFAB from "./components/ui/WhatsAppFAB";
import StickyMobileBar from "./components/ui/StickyMobileBar";

import HomePage from "./pages/HomePage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminServices from "./pages/admin/AdminServices";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminSettings from "./pages/admin/AdminSettings";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFAB />
      <StickyMobileBar />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dismiss loading screen after 2.5s
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <LoadingScreen isVisible={isLoading} />

          <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
            <Routes>
              {/* Public routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <HomePage />
                  </PublicLayout>
                }
              />
              <Route
                path="/services/:id"
                element={
                  <PublicLayout>
                    <ServiceDetailPage />
                  </PublicLayout>
                }
              />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="reviews" element={<AdminReviews />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* 404 */}
              <Route
                path="*"
                element={
                  <PublicLayout>
                    <NotFoundPage />
                  </PublicLayout>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
