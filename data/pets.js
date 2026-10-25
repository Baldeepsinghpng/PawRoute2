/**
 * PAWROUTE - Adoptable Pets Dataset
 * =====================================================================
 * HOW TO ADD OR UPDATE PETS:
 * 1. To add a new pet, copy one of the blocks below and update the fields.
 * 2. To mark a pet as adopted or fostered, change the "status" field.
 * 3. Images use high-resolution, royalty-free photography with optimized CDN parameters.
 * =====================================================================
 */

const PAWROUTE_PETS = [
  {
    id: "pet-luna-golden",
    name: "Luna",
    species: "dog",
    breed: "Golden Retriever Mix",
    age: "2 years",
    ageGroup: "young",
    gender: "Female",
    size: "Large (24 kg)",
    sizeGroup: "large",
    status: "Available for Adoption",
    badge: "Staff Pick",
    featured: true,
    location: "Tallinn Shelter, Estonia",
    adoptionFee: 65,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Gentle soul with a heart of gold. Loves seaside walks in Pirita, belly rubs, and playing fetch.",
    story: "Luna was rescued by our partner shelter in Harju County after her previous owner relocated abroad. She is remarkably patient, gentle with children, and quickly bonds with anyone offering a kind word. She walks calmly on a leash and knows basic commands including sit, stay, and paw.",
    tags: ["Gentle", "Kid-Friendly", "Leash Trained", "Cuddle Bug"],
    compatibility: {
      kids: "Excellent — very patient with children",
      dogs: "Friendly and playful with other dogs",
      cats: "Curious but respectful with indoor cats",
      energy: "Moderate (loves 2 brisk daily walks)",
      homeType: "Apartment or house with garden"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Thoroughly checked in Oct 2026. Excellent dental and coat health."
    }
  },
  {
    id: "pet-milo-tabby",
    name: "Milo",
    species: "cat",
    breed: "European Shorthair Tabby",
    age: "1.5 years",
    ageGroup: "young",
    gender: "Male",
    size: "Medium (4.2 kg)",
    sizeGroup: "medium",
    status: "Available for Adoption",
    badge: "Playful Explorer",
    featured: false,
    location: "Tallinn Cat Haven, Estonia",
    adoptionFee: 45,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Charming purr machine who loves sunny window sills, chasing feather wands, and evening snuggles.",
    story: "Milo was found as a friendly stray near Kadriorg park. He immediately showed how deeply affectionate he is, purring the moment he is held. Milo is 100% litter-trained and thrives in a warm, indoor environment with plenty of scratching posts and sunbeams.",
    tags: ["Affectionate", "Litter Trained", "Playful", "Indoor Star"],
    compatibility: {
      kids: "Great with gentle children",
      dogs: "Calm around dog-savvy pups",
      cats: "Enjoys feline companionship",
      energy: "Moderate (playful bursts followed by deep naps)",
      homeType: "Comfortable apartment"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "FIV/FeLV negative, vaccinated, treated against parasites."
    }
  },
  {
    id: "pet-jasper-collie",
    name: "Jasper",
    species: "dog",
    breed: "Border Collie Mix",
    age: "3 years",
    ageGroup: "adult",
    gender: "Male",
    size: "Medium (18 kg)",
    sizeGroup: "medium",
    status: "Available for Adoption",
    badge: "Agile & Smart",
    featured: false,
    location: "Tallinn Foster Network, Estonia",
    adoptionFee: 65,
    image: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Bright, alert, and deeply loyal companion. Ideal for an active owner who loves hiking and agility training.",
    story: "Jasper came to PawRoute via a rural rescue. He possesses supreme intelligence and loves puzzle toys, fetch, and forest hikes in Kõrvemaa. He responds eagerly to clicker training and positive reinforcement.",
    tags: ["High Intelligence", "Active Lifestyle", "Quick Learner", "Loyal"],
    compatibility: {
      kids: "Best with teens or active families",
      dogs: "Very social with other dogs",
      cats: "High prey drive — best without cats",
      energy: "High (needs daily mental & physical exercises)",
      homeType: "Active household, ideally with fenced yard"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Athletic build, full health screening completed in Sept 2026."
    }
  },
  {
    id: "pet-cleo-british",
    name: "Cleo",
    species: "cat",
    breed: "British Shorthair Mix",
    age: "4 years",
    ageGroup: "adult",
    gender: "Female",
    size: "Small (3.8 kg)",
    sizeGroup: "small",
    status: "Available for Adoption",
    badge: "Calm Royalty",
    featured: false,
    location: "Tallinn Shelter, Estonia",
    adoptionFee: 50,
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Independent, plush-coated lady who appreciates serene atmospheres, chin scratches, and warm blankets.",
    story: "Cleo is a dignified cat who spent her early years in a quiet home. She loves sitting next to you while you read or work remotely. She is quiet, well-mannered, and has pristine litter box habits.",
    tags: ["Quiet Companion", "Low Maintenance", "Gentle", "Litter Trained"],
    compatibility: {
      kids: "Prefers calm, older children",
      dogs: "Prefers quiet homes without energetic dogs",
      cats: "Peaceful co-existence with calm cats",
      energy: "Low to moderate (content napping)",
      homeType: "Quiet apartment or house"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "In pristine health, clean ears and teeth."
    }
  },
  {
    id: "pet-barnaby-frenchie",
    name: "Barnaby",
    species: "dog",
    breed: "French Bulldog Mix",
    age: "5 years",
    ageGroup: "adult",
    gender: "Male",
    size: "Small (12 kg)",
    sizeGroup: "small",
    status: "Available for Adoption",
    badge: "Snuggle Champion",
    featured: false,
    location: "Tallinn Central Shelter, Estonia",
    adoptionFee: 70,
    image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Comedic, gentle, and utterly devoted to his humans. Loves short strolls and long couch naps.",
    story: "Barnaby is a joyful little fellow with bat ears and a big heart. He gets along with everyone he meets on the street and is a favorite among our grooming staff for his relaxed demeanor in the bath.",
    tags: ["Apartment Friendly", "Low Barking", "Affectionate", "Couch Potato"],
    compatibility: {
      kids: "Wonderful with kids of all ages",
      dogs: "Enjoys dog friends of similar calm temperament",
      cats: "Completely ignores cats",
      energy: "Low (happy with two 20-min daily walks)",
      homeType: "Perfect for city apartments with elevator"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Airway checked, clear breathing, allergy-free coat."
    }
  },
  {
    id: "pet-freya-husky",
    name: "Freya",
    species: "dog",
    breed: "Siberian Husky & Shepherd Mix",
    age: "2.5 years",
    ageGroup: "young",
    gender: "Female",
    size: "Large (22 kg)",
    sizeGroup: "large",
    status: "Available for Adoption",
    badge: "Nordic Adventurer",
    featured: false,
    location: "Harju County Shelter, Estonia",
    adoptionFee: 65,
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Striking blue eyes with an adventurous spirit. Loves snowy trails and outdoor adventures.",
    story: "Freya is built for Estonia's brisk winters and loves outdoor activities like hiking and canicross. She is vocal, expressive, and forms deep lifelong bonds with her human pack.",
    tags: ["Trail Ready", "Vocal & Fun", "Social", "Snow Lover"],
    compatibility: {
      kids: "Great with active families",
      dogs: "Pack-oriented, loves canine buddies",
      cats: "Not recommended for homes with small pets",
      energy: "High (needs daily cardio / runs)",
      homeType: "House with secure fenced yard preferred"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Dense, healthy double coat, joints in top condition."
    }
  },
  {
    id: "pet-oliver-kitten",
    name: "Oliver",
    species: "cat",
    breed: "Ginger Tabby",
    age: "6 months",
    ageGroup: "puppy-kitten",
    gender: "Male",
    size: "Small (2.6 kg)",
    sizeGroup: "small",
    status: "Available for Adoption",
    badge: "Young & Playful",
    featured: false,
    location: "Tallinn Foster Home, Estonia",
    adoptionFee: 45,
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Curious, bouncing orange kitten who turns everything into a game. Super friendly and confident.",
    story: "Oliver was born in a foster home and has been handled with love since day one. He will climb right into your lap, start purring like a motor, and fall asleep tucked under your chin.",
    tags: ["Kitten", "Super Friendly", "Curious", "Social Butterfly"],
    compatibility: {
      kids: "Very gentle and playful with children",
      dogs: "Grew up around foster dogs, very comfortable",
      cats: "Would love a young feline playmate",
      energy: "Playful kitten energy with sweet cuddle breaks",
      homeType: "Any loving home with interactive toys"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Full juvenile vaccination course completed."
    }
  },
  {
    id: "pet-bella-pip-rabbits",
    name: "Bella & Pip",
    species: "other",
    breed: "Bonded Holland Lop Pair",
    age: "1.5 years",
    ageGroup: "young",
    gender: "Female & Male",
    size: "Small (1.8 kg each)",
    sizeGroup: "small",
    status: "Available for Adoption",
    badge: "Bonded Pair",
    featured: false,
    location: "Tallinn Small Animal Rescue, Estonia",
    adoptionFee: 50,
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Inseparable fluffy duo seeking a free-roam indoor home together. They groom each other constantly.",
    story: "Bella (grey) and Pip (fawn) must be adopted together as a bonded pair. They are litter-trained, love fresh Timothy hay, and do adorable 'binkies' (happy bunny leaps) across rugs.",
    tags: ["Bonded Pair", "Litter Box Trained", "Quiet", "Gentle"],
    compatibility: {
      kids: "Calm children who understand gentle handling",
      dogs: "Safe with calm, supervised pets",
      cats: "Safe with gentle, uninterested cats",
      energy: "Low (crepuscular morning & evening hops)",
      homeType: "Indoor free-roam or large pen setup"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "Veterinary health cards included",
      vetNotes: "Both neutered, vaccinated against Myxomatosis and RHD."
    }
  },
  {
    id: "pet-bruno-shepherd",
    name: "Bruno",
    species: "dog",
    breed: "German Shepherd Mix",
    age: "7 years",
    ageGroup: "senior",
    gender: "Male",
    size: "Large (28 kg)",
    sizeGroup: "large",
    status: "Available for Adoption",
    badge: "Senior Special",
    featured: false,
    location: "Tallinn Shelter, Estonia",
    adoptionFee: 40,
    image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Wise, calm gentleman with impeccable manners. Perfect companion for quiet strolls and quiet evenings.",
    story: "Bruno is looking for a tranquil retirement home. He never jumps, rarely barks, and simply wants a comfortable bed near his human. Senior pets have so much love to give, and Bruno is proof.",
    tags: ["Senior Gem", "House Trained", "Gentle Giant", "Mellow"],
    compatibility: {
      kids: "Wonderful with older, gentle children",
      dogs: "Tolerant and calm around other older dogs",
      cats: "Indifferent and polite",
      energy: "Low (prefers relaxed, gentle walks)",
      homeType: "Ground floor or home with minimal stairs"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Senior joint supplement regimen started, very good vitality."
    }
  },
  {
    id: "pet-nala-calico",
    name: "Nala",
    species: "cat",
    breed: "Calico Domestic Shorthair",
    age: "2 years",
    ageGroup: "young",
    gender: "Female",
    size: "Medium (3.9 kg)",
    sizeGroup: "medium",
    status: "Available for Adoption",
    badge: "Sweet & Chirpy",
    featured: false,
    location: "Pärnu / Tallinn Partner Shelter",
    adoptionFee: 45,
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Gorgeous calico with a sweet chirp greeting. Loves greeting you at the door after work.",
    story: "Nala is an expressive, social kitty who 'talks' with delicate chirps when breakfast is served. She loves sleeping at the foot of the bed and sitting next to you during movie nights.",
    tags: ["Talkative", "Social", "Lap Cat", "Litter Trained"],
    compatibility: {
      kids: "Friendly with kids",
      dogs: "Accepting of calm dogs with gentle introductions",
      cats: "Enjoys other friendly cats",
      energy: "Moderate",
      homeType: "Cozy apartment or house"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Spayed, up to date on all immunizations."
    }
  },
  {
    id: "pet-teddy-poodle",
    name: "Teddy",
    species: "dog",
    breed: "Miniature Poodle & Terrier Mix",
    age: "8 months",
    ageGroup: "puppy-kitten",
    gender: "Male",
    size: "Small (6.5 kg)",
    sizeGroup: "small",
    status: "Available for Adoption",
    badge: "Hypoallergenic Coat",
    featured: false,
    location: "Tallinn Foster Home, Estonia",
    adoptionFee: 70,
    image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Curled-coat darling with low shedding. Enthusiastic learner who loves agility games and cuddles.",
    story: "Teddy is an energetic youngster who learns tricks in minutes. Because of his low-shedding coat, he is an excellent candidate for allergy-conscious owners, though he requires regular gentle grooming visits.",
    tags: ["Low Shedding", "Smart", "Puppy Energy", "Eager Learner"],
    compatibility: {
      kids: "Loves playing with respectful kids",
      dogs: "Loves playing tag with other small dogs",
      cats: "Can be trained to live happily with cats",
      energy: "Medium to high",
      homeType: "Apartment or house with active guardians"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Young, healthy, complete puppy vaccination series."
    }
  },
  {
    id: "pet-maya-black-cat",
    name: "Maya",
    species: "cat",
    breed: "Bombay / European Shorthair",
    age: "3 years",
    ageGroup: "adult",
    gender: "Female",
    size: "Medium (3.6 kg)",
    sizeGroup: "medium",
    status: "Available for Adoption",
    badge: "Mini Panther",
    featured: false,
    location: "Tallinn Shelter, Estonia",
    adoptionFee: 45,
    image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=900&q=80"
    ],
    summary: "Sleek, emerald-eyed mini panther who brings boundless warmth, elegance, and purrs to your home.",
    story: "Black cats often wait the longest in shelters, but Maya is pure joy. She has a silky coat, loves head scratches between her ears, and makes the softest purr when you talk to her.",
    tags: ["Silk Coat", "Quiet Love", "Affectionate", "Indoor Cat"],
    compatibility: {
      kids: "Great with all family members",
      dogs: "Neutral with quiet dogs",
      cats: "Peaceful with other felines",
      energy: "Low to moderate",
      homeType: "Comfortable apartment"
    },
    health: {
      vaccinated: true,
      spayedNeutered: true,
      microchipped: true,
      passport: "EU Pet Passport included",
      vetNotes: "Vaccinated, microchipped, blood panel normal."
    }
  }
];

// Attach to window and PAWROUTE_CONFIG
if (typeof window !== "undefined") {
  window.PAWROUTE_PETS = PAWROUTE_PETS;
}
if (typeof PAWROUTE_CONFIG !== "undefined") {
  PAWROUTE_CONFIG.pets = PAWROUTE_PETS;
} else if (typeof window !== "undefined" && window.PAWROUTE_CONFIG) {
  window.PAWROUTE_CONFIG.pets = PAWROUTE_PETS;
}

// Export for Node/testing if applicable
if (typeof module !== "undefined" && module.exports) {
  module.exports = PAWROUTE_PETS;
}
