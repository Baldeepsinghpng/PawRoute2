/**
 * PAWROUTE - Configuration & Services Data
 * =====================================================================
 * HOW TO UPDATE SERVICES & PRICES:
 * 1. To change a price, simply update the "price" number below (e.g. 55 -> 60).
 * 2. To change a name or description, edit the text inside the quotes "".
 * 3. To add a new service, copy one of the existing blocks and paste it inside the list.
 * 4. The website will automatically update its display and booking options!
 * =====================================================================
 */

const PAWROUTE_CONFIG = {
  // Business & Salon Details (Placeholders for Estonia)
  salon: {
    name: "PawRoute Pet Grooming",
    tagline: "Gentle, stress-free grooming for dogs and cats in Estonia",
    city: "Tallinn, Estonia",
    serviceArea: "Tallinn & Harju County [Service Area Placeholder]",
    address: "[Tornimäe 5, Kesklinn, Tallinn 10145, Estonia]",
    phone: "[+372 5123 4567]",
    email: "[tere@pawroute.ee]",
    registrationNumber: "[Reg: 12345678 - Placeholder]",
    currency: "€",
    currencyCode: "EUR",
    openingHours: "Mon – Sat: 09:00 – 18:00 (Sun: Closed)",
    emergencyContact: "[+372 5999 8888]"
  },

  // Services & Pricing List
  // Categories: "dogs", "cats", "addons"
  services: [
    {
      id: "dog-full-groom",
      name: "Complete Dog Grooming",
      category: "dogs",
      badge: "Most Popular",
      price: 55,
      duration: "approx. 90-120 min",
      shortDescription: "A full head-to-tail pampering session tailored to your dog's breed and coat type.",
      included: [
        "Warm organic hydrobath & double shampoo",
        "Gentle blow-dry & full coat brush-out",
        "Breed-standard or custom hand-scissor haircut",
        "Nail clipping & paw-pad balm",
        "Ear cleaning & refreshing coat mist"
      ]
    },
    {
      id: "dog-bath-brush",
      name: "Bath, De-Shed & Tidy",
      category: "dogs",
      badge: "Essential Care",
      price: 35,
      duration: "approx. 60 min",
      shortDescription: "Ideal for short-haired breeds or in-between full grooming visits to remove loose hair.",
      included: [
        "Deep-cleansing hypoallergenic bath",
        "De-shedding coat treatment",
        "High-velocity blow dry",
        "Face & sanitary hygiene trim",
        "Nail trim & ear check"
      ]
    },
    {
      id: "puppy-intro",
      name: "Puppy First-Groom Experience",
      category: "dogs",
      badge: "Gentle Intro",
      price: 28,
      duration: "approx. 45 min",
      shortDescription: "A slow, fear-free introduction to grooming sounds, water, and tools for puppies up to 6 months.",
      included: [
        "Lukewarm soothing bath & gentle dry",
        "Face, paw, and sanitary trim",
        "Nail tip rounding",
        "Positive reinforcement & play breaks",
        "First groom milestone certificate"
      ]
    },
    {
      id: "cat-groom",
      name: "Gentle Cat Grooming",
      category: "cats",
      badge: "Low-Stress",
      price: 50,
      duration: "approx. 60-75 min",
      shortDescription: "Quiet, patience-first grooming specialized for feline temperaments without harsh restraints.",
      included: [
        "Waterless foam cleanse or warm cat-safe bath",
        "De-matting and comb-out",
        "Sanitary & belly trim (if needed)",
        "Nail cap inspection & trimming",
        "Gentle eye and ear hygiene wipe"
      ]
    },
    {
      id: "deshed-deluxe",
      name: "Seasonal De-Shedding Deluxe",
      category: "dogs",
      badge: "Coat Revival",
      price: 45,
      duration: "approx. 75 min",
      shortDescription: "Specialized undercoat removal treatment for heavy shedding breeds (Husky, Shepherd, Golden).",
      included: [
        "Enzymatic de-shedding shampoo & conditioner",
        "Blow-out of dense dead undercoat",
        "Precision slicker and undercoat rake brushing",
        "Nail trim & paw moisturiser"
      ]
    },
    {
      id: "addon-teeth",
      name: "Ultrasonic Teeth Cleaning",
      category: "addons",
      badge: "Add-On",
      price: 20,
      duration: "approx. 20 min",
      shortDescription: "Non-invasive, silent ultrasonic dental hygiene without anesthesia to reduce tartar and freshen breath.",
      included: [
        "Silent ultrasonic plaque removal",
        "Antimicrobial oral rinse",
        "Breath freshening gel application"
      ]
    },
    {
      id: "addon-nails-ears",
      name: "Express Nails & Ear Care",
      category: "addons",
      badge: "Quick Walk-In",
      price: 15,
      duration: "approx. 15 min",
      shortDescription: "A fast touch-up for dogs or cats needing only nail trimming, grinding, and ear sanitation.",
      included: [
        "Precision nail clip & smooth grind",
        "Organic soothing paw-pad butter",
        "Gentle ear canal clean"
      ]
    },
    {
      id: "addon-spa-bath",
      name: "Organic Herbal Spa Soak",
      category: "addons",
      badge: "Luxury Add-On",
      price: 18,
      duration: "approx. 20 min",
      shortDescription: "Chamomile and oatmeal infused soak for sensitive, itchy, or allergic skin.",
      included: [
        "Warm restorative oatmeal skin soak",
        "Moisturizing skin-barrier massage",
        "Hypoallergenic fragrance-free rinse"
      ]
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: "Where in Estonia is PawRoute located?",
      answer: "We are located centrally in Tallinn at [Tornimäe 5, Kesklinn, Tallinn 10145], with convenient parking and access to public transit."
    },
    {
      question: "Are your grooming products safe for sensitive skin?",
      answer: "Yes, we exclusively use natural, certified hypoallergenic, cruelty-free shampoos and balms suited to Nordic seasonal weather."
    },
    {
      question: "How long does a typical grooming session take?",
      answer: "A standard dog grooming session takes between 60 and 120 minutes depending on pet size, coat condition, and chosen service."
    },
    {
      question: "Is this booking form confirmed immediately?",
      answer: "Currently, this online portal is running in Demo Mode. Submissions are for demonstration purposes and do not store customer records or charge payments."
    },
    {
      question: "How do I update services and prices?",
      answer: "Services and prices are configured in one central file: 'data/services.js'. Anyone can open this file and change prices or service names in plain text!"
    }
  ]
};

// Export for modern module environments or make available globally in browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = PAWROUTE_CONFIG;
}
