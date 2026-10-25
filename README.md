# PawRoute — Pet Discovery, Adoption & Gentle Grooming Portal (Version 2.1)

**PawRoute** is a modern, responsive, and accessible multi-page pet discovery, ethical adoption matching, and gentle wellness grooming platform tailored for Estonia with transparent pricing in Euros (€).

---

## 📁 Multi-Page Project Structure

The project has been organized into clear, dedicated pages:

```text
PAWROUTE/
├── index.html         # 🏠 Home Page: Hero showcase, featured spotlight & wellness overview
├── adopt.html         # 🐾 Pet Discovery Catalog: Full 12-pet search, species tabs, age/size filters & adoption modal
├── favourites.html    # ❤️ Saved Favourites: Persistent shortlist stored across browser sessions
├── services.html      # 🧼 Grooming & Wellness Spa: Package menu with transparent pricing in Euros (€)
├── booking.html       # 📅 Grooming Appointment Demo: Interactive booking simulator with instant receipt preview
├── about.html         # ℹ️ About & FAQ: Rehoming philosophy, 4-step adoption guide, trust pillars & accordion FAQ
├── contact.html       # 📍 Location & Contact: Salon address, opening hours, directions & demo message form
├── styles.css         # Modern Nordic-inspired CSS, responsive layout & prefers-reduced-motion
├── app.js             # Central client-side logic: filtering, search debounce, favourites, modals & toasts
├── data/
│   ├── pets.js        # Central catalog of adoptable pets (photos, breeds, rescue stories, medical checklist)
│   └── services.js    # Salon details, grooming packages, pricing in EUR & FAQ answers
└── README.md          # Comprehensive documentation & update guide
```

---

## 🌟 Key Highlights & Features

1. **Structured Multi-Page Navigation:** Distinct, purpose-built pages with breadcrumbs and active page indicators (`.active`).
2. **Pet Discovery & Live Filtering (`adopt.html`):**
   * Instant search by name, breed, location, or personality trait.
   * Real-time category tabs: `🐾 All Animals (12)`, `🐕 Dogs (6)`, `🐈 Cats (5)`, `🐰 Small Pets (1)`, and `❤️ Saved Favourites`.
   * Secondary filter dropdowns for age and pet size.
   * Sort by *Recommended*, *Youngest First*, *Name A-Z*, or *Adoption Fee*.
3. **Persistent Favourites (`favourites.html`):**
   * Save any companion by clicking the heart button (`❤️`).
   * Stored in `localStorage` across page refreshes and visits.
   * Header counter badge updates dynamically with a smooth animation.
4. **Rich Pet Profile Modals & Demo Adoption Application:**
   * High-resolution photo gallery with thumbnail switcher.
   * Compatibility breakdown (children, other dogs, cats, energy level).
   * Verified medical checklist (vaccinations, microchip ISO status, EU Pet Passport).
   * Interactive **Demo Adoption Application** generating a simulated reference number (`ADOPT-EST-2026-XXXX`).
5. **Salon & Grooming Packages (`services.html` & `booking.html`):**
   * Complete menu of fear-free grooming packages with transparent pricing in Euros (€).
   * "Select for Demo" buttons seamlessly pass the selected service into the booking form via URL query parameters (`booking.html?service=dog-full-groom`).
   * Generates a simulated appointment receipt preview (`DEMO-EST-XXXX`).

---

## 💡 How to Update Data (No Coding Required)

### 1. Adding or Editing Adoptable Pets
Open [`data/pets.js`](file:///d:/AGENTIC%20WORKFLOW/PAWROUTE/data/pets.js) to edit any animal or add a new rescue:

```javascript
{
  id: "pet-luna-golden",
  name: "Luna",
  species: "dog",                     // "dog", "cat", or "other"
  breed: "Golden Retriever Mix",
  age: "2 years",
  ageGroup: "young",                  // "puppy-kitten", "young", "adult", or "senior"
  gender: "Female",
  size: "Large (24 kg)",
  sizeGroup: "large",                 // "small", "medium", or "large"
  status: "Available for Adoption",
  badge: "Staff Pick",
  featured: true,                     // Featured on Home Page Hero
  location: "Tallinn Shelter, Estonia",
  adoptionFee: 65,                    // EUR
  image: "https://images.unsplash.com/...",
  gallery: [ "https://...", "https://..." ],
  summary: "Gentle soul with a heart of gold...",
  story: "Luna was rescued by our partner shelter...",
  tags: ["Gentle", "Kid-Friendly", "Leash Trained"],
  compatibility: {
    kids: "Excellent — very patient with children",
    dogs: "Friendly and playful with other dogs",
    cats: "Curious but respectful",
    energy: "Moderate (loves 2 brisk daily walks)"
  },
  health: {
    vaccinated: true,
    spayedNeutered: true,
    microchipped: true,
    passport: "EU Pet Passport included"
  }
}
```

### 2. Updating Grooming Packages & Salon Info
Open [`data/services.js`](file:///d:/AGENTIC%20WORKFLOW/PAWROUTE/data/services.js) to change grooming prices, salon opening hours, phone numbers, or FAQ entries in plain English.

---

## 🛡️ Demo Mode Notice

This project is configured in **Interactive Demo Mode** for portfolio review:
* No personal data is stored or transmitted to external servers.
* No real financial charges or adoption contracts are processed.
* Submissions produce instant mock receipts for visual evaluation.

---

## 🚀 Transitioning to Live Production

To transition this frontend portfolio into a live commercial platform:
1. **Backend Database:** Connect PostgreSQL, Supabase, or Firebase for applicant management and pet records.
2. **Estonian Pet Registry (LLR):** Electronic microchip transfer verification.
3. **Notification Service:** Twilio (SMS) and Resend (email) for booking reminders and adoption status alerts.
4. **Payment Gateway:** Integrate Montonio, Maksekeskus, or Stripe for deposits and adoption contributions.

---

## 🧪 Verification & Checks

Run Node.js to check syntax and link integrity:

```bash
node --check app.js
node --check data/pets.js
node --check data/services.js
```
