// ============================================================
// DIYA CAR CARE — Business Configuration
// Edit this file to update all business information site-wide
// ============================================================

export const BUSINESS = {
  name: "Diya Car Care",
  tagline: "Professional care for every journey.",
  headline: "Your Car Deserves\nProfessional Care.",
  subheadline:
    "Reliable automotive care, servicing and maintenance for your vehicle — delivered with precision and professionalism.",
  rating: 4.8,
  reviewCount: "100+",
  established: "2020", // EDIT: actual founding year

  contact: {
    phone: "098220 77344",
    phonePlain: "09822077344",
    whatsapp: "919822077344",
    email: "", // EDIT: add email if available
  },

  address: {
    line1: "Sr. No. 28, Mumbai–Bangalore Highway",
    line2: "Near Rangla Punjab Hotel, Opp. Wada Hotel",
    area: "Sutarwadi, Pashan",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411021",
    country: "India",
    full: "Sr. No. 28, Mumbai–Bangalore Highway, Near Rangla Punjab Hotel, Opp. Wada Hotel, Sutarwadi, Pashan, Pune, Maharashtra 411021",
  },

  maps: {
    // Google Maps embed URL for the business location
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5!2d73.7946!3d18.5362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMyJzEwLjMiTiA3M8KwNDcnNDAuNiJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Sr.+No.+28+Mumbai+Bangalore+Highway+Sutarwadi+Pashan+Pune+Maharashtra+411021",
    placeUrl:
      "https://maps.app.goo.gl/diyacarcare", // EDIT: actual Google Maps short link
  },

  social: {
    facebook: "", // EDIT: add Facebook page URL
    instagram: "", // EDIT: add Instagram handle URL
    youtube: "", // EDIT: add YouTube channel URL
  },

  // EDIT: Update with actual working hours
  hours: [
    { day: "Monday", hours: "9:00 AM – 7:00 PM" },
    { day: "Tuesday", hours: "9:00 AM – 7:00 PM" },
    { day: "Wednesday", hours: "9:00 AM – 7:00 PM" },
    { day: "Thursday", hours: "9:00 AM – 7:00 PM" },
    { day: "Friday", hours: "9:00 AM – 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 4:00 PM" },
  ],
} as const;

// ============================================================
// SERVICES CATALOG
// Add, remove, or edit services here
// ============================================================

export const SERVICES = [
  {
    id: "periodic-service",
    name: "Periodic Car Service",
    shortDesc: "Routine maintenance to keep your vehicle performing reliably.",
    description:
      "Regular periodic servicing is essential for long vehicle life and optimal performance. Our comprehensive service covers all routine maintenance requirements as per manufacturer recommendations.",
    icon: "wrench",
    category: "Maintenance",
    benefits: [
      "Extended vehicle lifespan",
      "Improved fuel efficiency",
      "Reliable performance",
      "Early fault detection",
    ],
    included: [
      "Engine oil & filter change",
      "Air filter inspection",
      "Fluid level checks",
      "Tyre pressure check",
      "Basic vehicle inspection",
      "Brake inspection",
    ],
    recommendedFor: "All vehicles — as per manufacturer service schedule",
    faqs: [
      {
        q: "How often should I service my car?",
        a: "Most manufacturers recommend servicing every 5,000–10,000 km or every 6 months, whichever comes first.",
      },
      {
        q: "How long does a periodic service take?",
        a: "Typically 2–4 hours depending on the vehicle and service required.",
      },
    ],
  },
  {
    id: "engine-mechanical",
    name: "Engine & Mechanical",
    shortDesc: "Professional inspection and mechanical maintenance.",
    description:
      "Comprehensive engine inspection and mechanical servicing by our experienced team. We diagnose and resolve engine performance issues to restore your vehicle's power and efficiency.",
    icon: "settings",
    category: "Mechanical",
    benefits: [
      "Restored engine performance",
      "Reduced emissions",
      "Better fuel economy",
      "Longer engine life",
    ],
    included: [
      "Engine diagnostic scan",
      "Spark plug inspection",
      "Belt & hose inspection",
      "Coolant system check",
      "Oil leak inspection",
      "Engine performance assessment",
    ],
    recommendedFor: "Vehicles experiencing performance issues, high mileage vehicles",
    faqs: [
      {
        q: "What are signs my engine needs attention?",
        a: "Warning lights, unusual sounds, reduced power, excessive fuel consumption, or visible smoke are common signs.",
      },
    ],
  },
  {
    id: "ac-service",
    name: "AC Service",
    shortDesc: "Vehicle air-conditioning inspection, servicing and maintenance.",
    description:
      "Keep your car cool and comfortable. Our AC service covers complete inspection, gas refilling, and component maintenance to ensure your air conditioning works optimally.",
    icon: "wind",
    category: "Comfort",
    benefits: [
      "Optimal cooling performance",
      "Improved air quality",
      "Reduced fuel impact",
      "Comfortable driving",
    ],
    included: [
      "AC gas level check",
      "Compressor inspection",
      "Filter cleaning/replacement",
      "Cooling efficiency test",
      "Leak detection",
      "Vent cleaning",
    ],
    recommendedFor: "Vehicles with reduced AC performance, annual maintenance",
    faqs: [
      {
        q: "How often should AC be serviced?",
        a: "We recommend an AC check every 12 months or before summer.",
      },
    ],
  },
  {
    id: "brake-service",
    name: "Brake Service",
    shortDesc: "Brake inspection, maintenance and replacement where required.",
    description:
      "Your safety depends on your brakes. Our brake service ensures your braking system is in excellent condition with thorough inspection and professional maintenance.",
    icon: "shield",
    category: "Safety",
    benefits: [
      "Improved stopping distance",
      "Enhanced safety",
      "Reduced brake wear",
      "Confident driving",
    ],
    included: [
      "Brake pad inspection",
      "Disc/drum inspection",
      "Brake fluid check",
      "Handbrake adjustment",
      "Brake line inspection",
      "Test drive assessment",
    ],
    recommendedFor: "Vehicles with squeaking brakes, reduced brake response, or vibration when braking",
    faqs: [
      {
        q: "How do I know my brakes need servicing?",
        a: "Squealing sounds, vibration when braking, longer stopping distances, or the brake warning light are key signs.",
      },
    ],
  },
  {
    id: "battery-electrical",
    name: "Battery & Electrical",
    shortDesc: "Battery, electrical and vehicle electrical-system checks.",
    description:
      "Electrical issues can leave you stranded. Our battery and electrical service covers complete diagnosis and maintenance of your vehicle's electrical systems.",
    icon: "battery-charging",
    category: "Electrical",
    benefits: [
      "Reliable starting",
      "Proper electrical function",
      "Prevention of breakdowns",
      "Extended battery life",
    ],
    included: [
      "Battery health test",
      "Charging system check",
      "Alternator inspection",
      "Electrical fault diagnosis",
      "Fuse inspection",
      "Terminal cleaning",
    ],
    recommendedFor: "Vehicles with slow starting, warning lights, or electrical faults",
    faqs: [
      {
        q: "How long does a car battery last?",
        a: "Most car batteries last 3–5 years. Regular checks help avoid unexpected failures.",
      },
    ],
  },
  {
    id: "car-detailing",
    name: "Car Detailing",
    shortDesc: "Interior and exterior cleaning and detailing.",
    description:
      "Restore your car's showroom shine. Our professional detailing service thoroughly cleans, polishes, and protects both interior and exterior surfaces.",
    icon: "sparkles",
    category: "Detailing",
    benefits: [
      "Restored paint clarity",
      "Protected surfaces",
      "Fresh interior",
      "Improved resale value",
    ],
    included: [
      "Exterior wash & dry",
      "Paint decontamination",
      "Interior vacuum",
      "Dashboard & trim cleaning",
      "Glass cleaning",
      "Tyre dressing",
    ],
    recommendedFor: "Vehicles needing deep clean, pre-sale preparation, or periodic protection",
    faqs: [
      {
        q: "How long does detailing take?",
        a: "Basic detailing takes 2–3 hours. Full detail packages may take 4–6 hours.",
      },
    ],
  },
  {
    id: "car-washing",
    name: "Car Washing",
    shortDesc: "Professional exterior cleaning and vehicle care.",
    description:
      "A thorough, professional exterior wash that removes dirt, dust, and grime while protecting your paint. Quick, efficient, and affordable.",
    icon: "droplets",
    category: "Cleaning",
    benefits: [
      "Clean exterior",
      "Protected paintwork",
      "Quick turnaround",
      "Regular maintenance",
    ],
    included: [
      "Exterior hand wash",
      "Rinse & dry",
      "Wheel cleaning",
      "Window wipe",
      "Basic interior vacuum",
      "Door jamb cleaning",
    ],
    recommendedFor: "Regular vehicle maintenance, all vehicle types",
    faqs: [
      {
        q: "How often should I wash my car?",
        a: "We recommend washing every 2 weeks for best paint protection.",
      },
    ],
  },
  {
    id: "diagnostic-inspection",
    name: "Diagnostic Inspection",
    shortDesc: "Vehicle inspection and diagnostic assessment.",
    description:
      "Using modern diagnostic tools, we perform a comprehensive vehicle health check to identify any existing or potential issues before they become major problems.",
    icon: "scan-line",
    category: "Inspection",
    benefits: [
      "Early fault detection",
      "Cost prevention",
      "Peace of mind",
      "Comprehensive report",
    ],
    included: [
      "OBD diagnostic scan",
      "Engine health check",
      "Suspension inspection",
      "Brake assessment",
      "Fluid level check",
      "Visual vehicle inspection",
    ],
    recommendedFor: "Pre-purchase inspection, warning light diagnosis, annual health check",
    faqs: [
      {
        q: "What does a diagnostic scan involve?",
        a: "We connect a diagnostic tool to your vehicle's OBD port to read fault codes and assess system health.",
      },
    ],
  },
];

// ============================================================
// VEHICLE TYPES for Service Explorer
// ============================================================

export const VEHICLE_TYPES = [
  { id: "hatchback", label: "Hatchback", icon: "🚗" },
  { id: "sedan", label: "Sedan", icon: "🚙" },
  { id: "suv", label: "SUV / MUV", icon: "🛻" },
  { id: "luxury", label: "Luxury / Premium", icon: "🏎️" },
];

// ============================================================
// WHY CHOOSE DIYA sections
// ============================================================

export const WHY_DIYA = [
  {
    icon: "user-check",
    title: "Professional Approach",
    description:
      "Our team brings a methodical, professional approach to every vehicle. Each service is performed with care, attention to detail, and a commitment to quality.",
  },
  {
    icon: "message-circle",
    title: "Transparent Communication",
    description:
      "We keep you informed throughout the service process. No surprises — we explain what needs attention and why before any work begins.",
  },
  {
    icon: "award",
    title: "Quality-Focused Service",
    description:
      "We use quality parts and proper service procedures. Your vehicle's long-term reliability is our priority, not just a quick fix.",
  },
  {
    icon: "map-pin",
    title: "Customer Convenience",
    description:
      "Conveniently located on the Mumbai–Bangalore Highway in Pashan, Pune, with Pickup & Drop service available for your added convenience.",
  },
];

// ============================================================
// SERVICE PROCESS STEPS
// ============================================================

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Book",
    description: "Choose your service and preferred appointment time online or by phone.",
    icon: "calendar",
  },
  {
    number: "02",
    title: "Inspect",
    description: "Your vehicle is carefully inspected to fully understand the service requirement.",
    icon: "search",
  },
  {
    number: "03",
    title: "Service",
    description: "Required maintenance and service is performed with quality parts and professional care.",
    icon: "wrench",
  },
  {
    number: "04",
    title: "Drive",
    description: "You receive your vehicle after completion, along with a service summary.",
    icon: "car",
  },
];

// ============================================================
// INSPECTION POINTS (Vehicle Inspection interactive section)
// ============================================================

export const INSPECTION_POINTS = [
  {
    id: "engine",
    label: "Engine",
    description:
      "Engine inspection identifies performance issues, oil leaks, and maintenance requirements to keep your engine running optimally.",
    position: { x: 35, y: 40 },
  },
  {
    id: "brakes",
    label: "Brakes",
    description:
      "Brake inspection checks pad wear, disc condition, and fluid levels — essential for your safety on the road.",
    position: { x: 20, y: 65 },
  },
  {
    id: "battery",
    label: "Battery",
    description:
      "Battery health assessment ensures reliable starting and proper electrical system function.",
    position: { x: 28, y: 35 },
  },
  {
    id: "tyres",
    label: "Tyres",
    description:
      "Tyre inspection covers tread depth, pressure, and wear patterns to ensure safe handling and fuel efficiency.",
    position: { x: 75, y: 72 },
  },
  {
    id: "ac",
    label: "AC System",
    description:
      "AC inspection checks refrigerant levels, compressor operation, and filter condition for optimal cooling.",
    position: { x: 50, y: 30 },
  },
  {
    id: "lights",
    label: "Lights",
    description:
      "Lighting inspection ensures all headlights, indicators, brake lights, and interior lights are functioning correctly.",
    position: { x: 82, y: 42 },
  },
];
