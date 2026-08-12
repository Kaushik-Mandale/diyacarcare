# Diya Car Care — Premium Automotive Website

<div align="center">
  <img src="public/favicon.svg" width="64" alt="Diya Car Care Logo" />
  <h3>Diya Car Care</h3>
  <p>Premium automotive service website for Diya Car Care, Pune</p>

  ![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
  ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
  ![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase&logoColor=black)
  ![Three.js](https://img.shields.io/badge/Three.js-3D-000000?logo=three.js&logoColor=white)
</div>

---

## ✨ Features

- **Premium 3D Hero** — Interactive Three.js car with mouse parallax + scroll rotation
- **Glassmorphism UI** — Frosted glass panels, soft shadows, spatial depth
- **Dark / Light Mode** — Persisted theme toggle
- **8 Service Pages** — Full detail pages with benefits, inclusions, FAQs
- **Interactive Service Explorer** — Vehicle type + service selection flow
- **Vehicle Inspection** — Clickable SVG inspection diagram
- **4-Step Booking Form** — React Hook Form + Zod validation + Firebase storage
- **Admin Dashboard** — `/admin` — bookings management, status updates, customer view
- **WhatsApp Integration** — Floating button with pre-filled messages
- **Full SEO** — Open Graph, Twitter cards, LocalBusiness JSON-LD, sitemap
- **Mobile First** — Responsive at 320px–1920px, sticky mobile CTAs

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS v3 + Custom CSS Variables |
| 3D | Three.js (procedural car geometry) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Backend | Firebase Firestore |
| Auth | Firebase Auth (Admin) |
| Icons | Lucide React |
| Routing | React Router v6 |
| Build | Vite 8 |
| Deploy | Vercel |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Kaushik-Mandale/diyacarcare.git
cd diyacarcare
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your Firebase config values in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_WHATSAPP_NUMBER=919822077344
```

### 4. Run locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🔧 Configuration

All business information is stored in a single config file:

```
src/config/business.ts
```

Edit this file to update:
- Business name, address, phone
- Working hours
- Service catalog
- Social media links
- Google Maps URLs

---

## 📁 Project Structure

```
src/
├── config/
│   └── business.ts          ← 🔑 Edit all business info here
├── lib/
│   ├── firebase.ts          ← Firebase client
│   └── bookingStore.ts      ← Firestore + localStorage fallback
├── context/
│   └── ThemeContext.tsx
├── components/
│   ├── hero/                ← 3D car hero
│   ├── layout/              ← Navbar, Footer
│   ├── sections/            ← All home page sections
│   └── ui/                  ← Shared UI components
└── pages/
    ├── admin/               ← Admin dashboard
    ├── HomePage.tsx
    ├── ServiceDetailPage.tsx
    └── NotFoundPage.tsx
```

---

## 🔒 Firebase Security Rules

Set these in **Firebase Console → Firestore → Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /reviews/{reviewId} {
      allow read: if resource.data.approved == true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables (same as `.env`)
4. Deploy — routing handled by `vercel.json`

---

## 📄 License

Private project — © 2026 Diya Car Care, Pune. All rights reserved.
