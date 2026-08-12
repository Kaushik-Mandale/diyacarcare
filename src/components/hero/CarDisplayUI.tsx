import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Calendar, Clock, CreditCard, Send, Sparkles, Shield, Wrench, ChevronLeft, ChevronRight, CheckCircle2
} from "lucide-react";

export default function CarDisplayUI() {
  const [activeTab, setActiveTab] = useState<"Service" | "Detailing" | "Inspection" | "Pickup">("Service");
  const [selectedView, setSelectedView] = useState<"L" | "R" | "F" | "B">("L");
  const [assistantInput, setAssistantInput] = useState<string>("Book periodic car servicing for tomorrow");
  const [aiSubmitted, setAiSubmitted] = useState<boolean>(false);

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    setAiSubmitted(true);
    setTimeout(() => {
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
      setAiSubmitted(false);
    }, 800);
  };

  const handleQuickAction = (actionText: string) => {
    setAssistantInput(actionText);
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
      {/* Laptop / Screen Mockup Container */}
      <div
        className="w-full max-w-4xl rounded-3xl overflow-hidden relative border transition-all duration-300"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-subtle)",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Top Header Bar inside Mockup */}
        <div
          className="px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 text-xs"
          style={{ borderColor: "var(--border-subtle)", background: "var(--bg-secondary)" }}
        >
          {/* Logo / Brand Pill */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-white text-xs"
              style={{ background: "var(--accent)" }}
            >
              D
            </div>
            <span className="font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Diya Car Care Dashboard
            </span>
          </div>

          {/* Center Tabs: Service / Detailing / Inspection / Pickup */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--bg-primary)" }}>
            {(["Service", "Detailing", "Inspection", "Pickup"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1 rounded-lg font-semibold transition-all duration-200"
                style={{
                  background: activeTab === tab ? "var(--bg-card)" : "transparent",
                  color: activeTab === tab ? "var(--accent)" : "var(--text-muted)",
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Location Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium"
            style={{ background: "var(--bg-card)", color: "var(--text-secondary)" }}
          >
            <MapPin size={13} style={{ color: "var(--accent)" }} />
            <span>Pashan, Pune</span>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="p-5 md:p-7 relative grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[460px]">
          {/* Left Column: Car Showcase Visual & Specs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between relative z-10">
            {/* Model Title & View Selector */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Diya Car Care Pro
                </h2>
                {/* Perspective View Pills: L R F B */}
                <div className="flex items-center gap-1">
                  {(["L", "R", "F", "B"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedView(v)}
                      className="w-7 h-7 rounded-full text-xs font-bold transition-all duration-200"
                      style={{
                        background: selectedView === v ? "var(--accent)" : "var(--bg-secondary)",
                        color: selectedView === v ? "white" : "var(--text-muted)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Fully equipped multibrand service center · Sutarwadi, Pune
              </p>
            </div>

            {/* Main Car Visual Image with Smooth Angle Transition */}
            <div className="relative my-4 flex items-center justify-center py-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedView + activeTab}
                  src="/images/hero-car.jpg"
                  alt="Diya Car Care Luxury Vehicle"
                  className="w-full max-h-[220px] md:max-h-[260px] object-contain drop-shadow-2xl rounded-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              {/* Subtle Floor Glow Shadow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full blur-xl opacity-40 pointer-events-none"
                style={{ background: "var(--accent)" }}
              />
            </div>

            {/* Bottom Row inside Left Column: Location Card & Schedule Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
              {/* Location Card */}
              <div
                className="p-3.5 rounded-2xl border flex items-center gap-3 transition-all duration-200"
                style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                >
                  <MapPin size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Service Location
                  </div>
                  <div className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>
                    Highway Workshop, Pashan
                  </div>
                </div>
              </div>

              {/* Schedule Card with Date Stepper */}
              <div
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-2"
                style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar size={16} style={{ color: "var(--accent)" }} />
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
                      Slot Available
                    </div>
                    <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      Today · 10:25 AM
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--text-muted)" }}>
                    <ChevronLeft size={14} />
                  </button>
                  <button className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--text-muted)" }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant Panel & Payment Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
            {/* AI Assistant Card (Matching the Reference Image Panel) */}
            <div
              className="p-4 rounded-2xl border flex flex-col justify-between flex-1 gap-3 relative"
              style={{
                background: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-2.5" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    AI Service Assistant
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "var(--accent-bg)", color: "var(--accent)" }}>
                  Online
                </span>
              </div>

              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                How can we assist your car today? Select a service option below:
              </p>

              {/* 2x2 Quick Action Grid Buttons */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleQuickAction("Book a periodic service")}
                  className="p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all duration-200 hover:border-emerald-500"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--text-primary)" }}>
                    <Wrench size={13} style={{ color: "var(--accent)" }} /> Book Service
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Instant confirmation</span>
                </button>

                <button
                  onClick={() => handleQuickAction("Diagnostic computer scan")}
                  className="p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all duration-200 hover:border-emerald-500"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--text-primary)" }}>
                    <Sparkles size={13} style={{ color: "var(--accent)" }} /> Diagnostics
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>OBD II Scanning</span>
                </button>

                <button
                  onClick={() => handleQuickAction("Check warranty & maintenance plans")}
                  className="p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all duration-200 hover:border-emerald-500"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--text-primary)" }}>
                    <Shield size={13} style={{ color: "var(--accent)" }} /> Warranty
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Service packages</span>
                </button>

                <button
                  onClick={() => handleQuickAction("Calculate service cost estimate")}
                  className="p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all duration-200 hover:border-emerald-500"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--text-primary)" }}>
                    <CreditCard size={13} style={{ color: "var(--accent)" }} /> Price Quote
                  </div>
                  <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Free estimate</span>
                </button>
              </div>

              {/* Interactive Prompt Input Box & Green Send Button */}
              <form onSubmit={handleQuickSend} className="relative mt-1">
                <input
                  type="text"
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  className="w-full pl-3 pr-24 py-2.5 rounded-xl text-xs border outline-none font-medium transition-all"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                  placeholder="Ask or schedule service..."
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-lg text-xs font-bold flex items-center gap-1 text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "var(--accent)" }}
                >
                  {aiSubmitted ? (
                    <>
                      <CheckCircle2 size={13} /> Saved
                    </>
                  ) : (
                    <>
                      Send <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Payment & Transparent Pricing Card */}
            <div
              className="p-3.5 rounded-2xl border flex items-center justify-between gap-3"
              style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-bg)", color: "var(--accent)" }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Payment Options
                  </div>
                  <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                    UPI / Card / Cash · 0% Markup
                  </div>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: "var(--accent)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
