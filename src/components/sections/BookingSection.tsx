import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Truck } from "lucide-react";
import { createBooking } from "../../lib/bookingStore";
import { SERVICES } from "../../config/business";

// ─── Zod Schema ──────────────────────────────────────────────
const schema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  vehicleBrand: z.string().min(2, "Enter your vehicle brand"),
  vehicleModel: z.string().min(1, "Enter your vehicle model"),
  registrationNumber: z.string().min(4, "Enter vehicle registration number"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Select a preferred date"),
  preferredTime: z.string().min(1, "Select a preferred time"),
  pickupRequired: z.boolean(),
  notes: z.string(),
});

type BookingFormData = z.infer<typeof schema>;

// ─── Time slots ───────────────────────────────────────────────
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

// Steps
const STEPS = ["Your Info", "Vehicle", "Service & Time", "Confirm"];

export default function BookingSection() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; ref: string } | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
    defaultValues: { pickupRequired: false, notes: "", email: "" },
  });

  const watchedData = watch();

  // Validate current step fields before proceeding
  const stepFields: (keyof BookingFormData)[][] = [
    ["customerName", "phone", "email"],
    ["vehicleBrand", "vehicleModel", "registrationNumber"],
    ["service", "preferredDate", "preferredTime"],
    [],
  ];

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createBooking({ ...data, email: data.email || "" });
      setConfirmation({ id: result.id, ref: result.referenceNumber });
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong. Please call us directly at 098220 77344.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Confirmation screen ────────────────────────────────────
  if (confirmation) {
    return (
      <section id="booking" className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container max-w-2xl mx-auto">
          <motion.div
            className="rounded-3xl p-10 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-xl)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, delay: 0.2 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "var(--accent-bg)" }}
            >
              <CheckCircle size={40} style={{ color: "var(--accent)" }} />
            </motion.div>

            <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Service Request Received!
            </h2>
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
              Thank you. Our team will contact you to confirm your appointment.
            </p>

            <div
              className="rounded-2xl px-6 py-4 mb-8 inline-block"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                Booking Reference
              </div>
              <div className="text-xl font-black font-mono tracking-wider" style={{ color: "var(--accent)" }}>
                {confirmation.ref}
              </div>
            </div>

            <p className="text-sm mb-8" style={{ color: "var(--text-secondary)" }}>
              Please save your reference number. We'll call you on{" "}
              <strong>{watchedData.phone}</strong> to confirm.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/919822077344?text=Hello Diya Car Care! I just booked a service. My reference number is ${confirmation.ref}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center"
                style={{ background: "#25D366" }}
              >
                Confirm on WhatsApp
              </a>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary justify-center"
              >
                Book Another Service
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="section-container max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--accent)" }} />
            BOOK A SERVICE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4" style={{ color: "var(--text-primary)" }}>
            Schedule Your Appointment
          </h2>
          <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
            Fill in the form and we'll confirm your booking promptly.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div
                className="flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                style={{
                  color: i <= step ? "var(--accent)" : "var(--text-muted)",
                  opacity: i === step ? 1 : 0.6,
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300"
                  style={{
                    background: i < step ? "var(--accent)" : i === step ? "var(--accent-bg)" : "var(--bg-secondary)",
                    color: i < step ? "white" : "var(--accent)",
                    border: `2px solid ${i <= step ? "var(--accent)" : "var(--border-subtle)"}`,
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="hidden md:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 h-px transition-all duration-300"
                  style={{ background: i < step ? "var(--accent)" : "var(--border-subtle)", maxWidth: 40 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-lg)" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* ─── Step 0: Customer Info ─── */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="flex flex-col gap-5"
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    Your Information
                  </h3>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input {...register("customerName")} className="form-input" placeholder="e.g. Rahul Sharma" />
                    {errors.customerName && <p className="form-error">{errors.customerName.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Mobile Number *</label>
                    <input {...register("phone")} className="form-input" placeholder="10-digit number" type="tel" maxLength={10} />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Email Address (optional)</label>
                    <input {...register("email")} className="form-input" placeholder="you@example.com" type="email" />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                </motion.div>
              )}

              {/* ─── Step 1: Vehicle Info ─── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="flex flex-col gap-5"
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    Vehicle Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Vehicle Brand *</label>
                      <input {...register("vehicleBrand")} className="form-input" placeholder="e.g. Maruti, Honda" />
                      {errors.vehicleBrand && <p className="form-error">{errors.vehicleBrand.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Vehicle Model *</label>
                      <input {...register("vehicleModel")} className="form-input" placeholder="e.g. Swift, City" />
                      {errors.vehicleModel && <p className="form-error">{errors.vehicleModel.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Registration Number *</label>
                    <input {...register("registrationNumber")} className="form-input" placeholder="e.g. MH12AB1234" style={{ textTransform: "uppercase" }} />
                    {errors.registrationNumber && <p className="form-error">{errors.registrationNumber.message}</p>}
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                    <Truck size={18} style={{ color: "var(--accent)" }} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Pickup & Drop Required?</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>We can arrange vehicle pickup and delivery</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" {...register("pickupRequired")} className="sr-only peer" />
                      <div
                        className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
                        style={{
                          background: watchedData.pickupRequired ? "var(--accent)" : "var(--bg-secondary)",
                          border: "1px solid var(--border-subtle)",
                          position: "relative",
                        }}
                      />
                    </label>
                  </div>
                </motion.div>
              )}

              {/* ─── Step 2: Service & Date ─── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="flex flex-col gap-5"
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    Service & Schedule
                  </h3>
                  <div>
                    <label className="form-label">Service Required *</label>
                    <select {...register("service")} className="form-input">
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Other">Other / Not sure</option>
                    </select>
                    {errors.service && <p className="form-error">{errors.service.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Preferred Date *</label>
                      <input
                        {...register("preferredDate")}
                        type="date"
                        className="form-input"
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.preferredDate && <p className="form-error">{errors.preferredDate.message}</p>}
                    </div>
                    <div>
                      <label className="form-label">Preferred Time *</label>
                      <select {...register("preferredTime")} className="form-input">
                        <option value="">Select time...</option>
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.preferredTime && <p className="form-error">{errors.preferredTime.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Additional Notes</label>
                    <textarea {...register("notes")} className="form-input" rows={3} placeholder="Any specific issues or requirements..." style={{ resize: "vertical" }} />
                  </div>
                </motion.div>
              )}

              {/* ─── Step 3: Confirmation ─── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    Confirm Your Booking
                  </h3>
                  <div
                    className="rounded-2xl p-6 flex flex-col gap-3"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
                  >
                    {[
                      ["Name", watchedData.customerName],
                      ["Phone", watchedData.phone],
                      ["Email", watchedData.email || "—"],
                      ["Vehicle", `${watchedData.vehicleBrand} ${watchedData.vehicleModel}`],
                      ["Reg. No.", watchedData.registrationNumber],
                      ["Service", watchedData.service],
                      ["Date", watchedData.preferredDate],
                      ["Time", watchedData.preferredTime],
                      ["Pickup & Drop", watchedData.pickupRequired ? "Yes" : "No"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between text-sm gap-4">
                        <span style={{ color: "var(--text-muted)" }}>{label}</span>
                        <span className="font-semibold text-right" style={{ color: "var(--text-primary)" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    By submitting, you agree to be contacted by Diya Car Care to confirm your appointment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8 pt-6" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="btn-secondary px-6 py-3"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary ml-auto px-8 py-3"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary ml-auto px-8 py-3"
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? "Submitting..." : "Confirm Booking"}
                  {!isSubmitting && <ArrowRight size={16} />}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
