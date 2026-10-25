/**
 * PAWROUTE - Multi-Page Application Logic
 * Supports Home, Adopt, Favourites, Grooming Services, Booking, About & Contact pages.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Validate configurations
  const config = (typeof window !== "undefined" && window.PAWROUTE_CONFIG)
    ? window.PAWROUTE_CONFIG
    : (typeof PAWROUTE_CONFIG !== "undefined" ? PAWROUTE_CONFIG : null);

  const pets = (typeof window !== "undefined" && window.PAWROUTE_PETS)
    ? window.PAWROUTE_PETS
    : (typeof PAWROUTE_PETS !== "undefined" 
        ? PAWROUTE_PETS 
        : (config && config.pets ? config.pets : []));

  if (!config) {
    console.error("PawRoute configuration not found. Please ensure data/services.js is loaded.");
    return;
  }

  const { salon, services, faqs } = config;
  const currency = salon.currency || "€";

  // 1. Shared Global Components
  initMobileNavigation();
  initActiveNavLink();
  initFavouritesGlobal();
  initSalonDetails(salon);

  // 2. Page-Specific Initializers
  // A. Home Page Hero & Spotlights
  if (document.getElementById("featured-hero-card")) {
    initHeroShowcase(pets);
  }
  if (document.getElementById("home-spotlight-grid")) {
    initHomeSpotlight(pets, currency);
  }
  if (document.getElementById("home-services-grid")) {
    initHomeServices(services, currency);
  }

  // B. Adopt Catalog Page (adopt.html)
  if (document.getElementById("pets-grid")) {
    initPets(pets, currency);
  }

  // C. Favourites Page (favourites.html)
  if (document.getElementById("favourites-grid")) {
    initFavouritesPage(pets, currency);
  }

  // D. Services Page (services.html)
  if (document.getElementById("services-grid")) {
    initServices(services, currency);
  }

  // E. Booking Page (booking.html)
  if (document.getElementById("demo-booking-form")) {
    initBookingForm(services, currency);
  }

  // F. About & FAQ Page (about.html)
  if (document.getElementById("faq-accordion")) {
    initFaqAccordion(faqs);
  }

  // G. Contact Page (contact.html)
  if (document.getElementById("demo-contact-form")) {
    initContactForm();
  }

  // 3. Modals (loaded on pages that display pets)
  if (document.getElementById("pet-detail-modal")) {
    initPetDetailModal(pets, currency);
  }
  if (document.getElementById("adoption-modal")) {
    initAdoptionApplicationModal(pets, currency);
  }
});

/* =====================================================================
   Active Nav Link Detection
   ===================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const targetFile = href.split("#")[0].split("?")[0] || "index.html";

    if (
      (currentPath === "" && (targetFile === "index.html" || targetFile === "")) ||
      currentPath === targetFile
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* =====================================================================
   Toast Notification System
   ===================================================================== */
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hiding");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 2800);
}

/* =====================================================================
   Favourites Management System (localStorage)
   ===================================================================== */
const FAV_STORAGE_KEY = "pawroute_favourites_v1";

function getFavourites() {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not access localStorage for favourites:", err);
    return [];
  }
}

function saveFavourites(favList) {
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favList));
  } catch (err) {
    console.warn("Could not write to localStorage:", err);
  }
  updateFavouritesUI();
}

function isFavourite(petId) {
  const favs = getFavourites();
  return favs.includes(petId);
}

function toggleFavourite(petId, petName = "Pet") {
  const favs = getFavourites();
  const index = favs.indexOf(petId);
  let nowFav = false;

  if (index > -1) {
    favs.splice(index, 1);
    nowFav = false;
    showToast(`Removed <strong>${escapeHtml(petName)}</strong> from favourites`, "info");
  } else {
    favs.push(petId);
    nowFav = true;
    showToast(`❤️ Saved <strong>${escapeHtml(petName)}</strong> to favourites!`, "success");
  }

  saveFavourites(favs);
  return nowFav;
}

function updateFavouritesUI() {
  const favs = getFavourites();
  const count = favs.length;

  // Header Nav Count Badge
  const navBadge = document.getElementById("nav-fav-count");
  if (navBadge) {
    navBadge.textContent = count;
    navBadge.classList.add("bounce");
    setTimeout(() => navBadge.classList.remove("bounce"), 300);
  }

  // Filter Tab Count (on adopt.html)
  const tabCount = document.getElementById("count-fav");
  if (tabCount) tabCount.textContent = count;

  // Update heart buttons across cards
  document.querySelectorAll(".card-fav-btn, .hero-fav-btn, .modal-fav-btn").forEach(btn => {
    const petId = btn.getAttribute("data-pet-id");
    if (!petId) return;

    const active = favs.includes(petId);
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    const icon = btn.querySelector(".heart-icon");
    if (icon) {
      icon.textContent = active ? "❤️" : "🤍";
    }
  });

  // Re-render if on dedicated favourites page or active favourites tab
  if (window._renderFavouritesPage) window._renderFavouritesPage();
  const activeTab = document.querySelector(".species-tab.active");
  if (activeTab && activeTab.getAttribute("data-species") === "favourites") {
    if (window._renderPetsList) window._renderPetsList();
  }
}

function initFavouritesGlobal() {
  updateFavouritesUI();

  // If on a page other than favourites.html, clicking nav-fav-btn navigates to favourites.html
  const navFavBtn = document.getElementById("nav-fav-btn");
  if (navFavBtn && !window.location.pathname.endsWith("favourites.html")) {
    navFavBtn.addEventListener("click", () => {
      window.location.href = "favourites.html";
    });
  }
}

/* =====================================================================
   Home Page Spotlights & Hero
   ===================================================================== */
function initHeroShowcase(pets) {
  if (!pets || pets.length === 0) return;
  const featured = pets.find(p => p.featured) || pets[0];
  if (!featured) return;

  const heroImg = document.getElementById("hero-pet-img");
  const heroStatus = document.getElementById("hero-pet-status");
  const heroFavBtn = document.getElementById("hero-pet-fav-btn");
  const heroName = document.getElementById("hero-pet-name");
  const heroSub = document.getElementById("hero-pet-sub");
  const heroSnippet = document.getElementById("hero-pet-snippet");
  const heroTags = document.getElementById("hero-pet-tags");
  const heroMeetBtn = document.getElementById("hero-meet-btn");

  if (heroImg) {
    heroImg.src = featured.image;
    heroImg.alt = `${featured.name} - ${featured.breed}`;
  }
  if (heroStatus) heroStatus.textContent = `🟢 ${featured.status}`;
  if (heroName) heroName.textContent = featured.name;
  if (heroSub) heroSub.textContent = `${featured.breed} • ${featured.age} • ${featured.gender}`;
  if (heroSnippet) heroSnippet.textContent = `"${featured.summary}"`;

  if (heroTags) {
    heroTags.innerHTML = featured.tags
      .slice(0, 3)
      .map(t => `<span class="pill-tag">${escapeHtml(t)}</span>`)
      .join("");
  }

  if (heroFavBtn) {
    heroFavBtn.setAttribute("data-pet-id", featured.id);
    const isFav = isFavourite(featured.id);
    heroFavBtn.classList.toggle("active", isFav);
    const icon = heroFavBtn.querySelector(".heart-icon");
    if (icon) icon.textContent = isFav ? "❤️" : "🤍";

    heroFavBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavourite(featured.id, featured.name);
    });
  }

  if (heroMeetBtn) {
    heroMeetBtn.setAttribute("data-pet-id", featured.id);
    heroMeetBtn.textContent = `Meet ${featured.name} →`;
    heroMeetBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.openPetDetailModal) openPetDetailModal(featured.id);
    });
  }

  const heroCard = document.getElementById("featured-hero-card");
  if (heroCard) {
    heroCard.style.cursor = "pointer";
    heroCard.addEventListener("click", (e) => {
      if (e.target.closest("#hero-pet-fav-btn")) return;
      if (window.openPetDetailModal) openPetDetailModal(featured.id);
    });
  }
}

function initHomeSpotlight(pets, currency) {
  const container = document.getElementById("home-spotlight-grid");
  if (!container || !pets) return;

  container.innerHTML = "";
  const spotlightPets = pets.slice(0, 3);
  const favs = getFavourites();

  spotlightPets.forEach(pet => {
    const isFav = favs.includes(pet.id);
    const card = createPetCardElement(pet, isFav, currency);
    container.appendChild(card);
  });
}

function initHomeServices(services, currency) {
  const container = document.getElementById("home-services-grid");
  if (!container || !services) return;

  container.innerHTML = "";
  const topServices = services.slice(0, 3);

  topServices.forEach(service => {
    const card = document.createElement("div");
    card.className = "service-card";
    if (service.badge === "Most Popular") card.classList.add("highlighted");

    const includesHtml = service.included.slice(0, 3)
      .map(item => `<li>${escapeHtml(item)}</li>`)
      .join("");

    card.innerHTML = `
      ${service.badge ? `<span class="service-badge">${escapeHtml(service.badge)}</span>` : ""}
      <div class="service-card-top">
        <span class="service-category-tag">${service.category.toUpperCase()}</span>
        <h3 class="service-title">${escapeHtml(service.name)}</h3>
        <div class="service-duration"><span>⏱️ ${escapeHtml(service.duration)}</span></div>
        <p class="service-description">${escapeHtml(service.shortDescription)}</p>
        <ul class="service-includes">${includesHtml}</ul>
      </div>
      <div class="service-card-bottom">
        <div class="service-price">
          ${currency}${service.price}
          <small>/ session</small>
        </div>
        <a href="booking.html?service=${service.id}" class="service-select-btn">
          Book Demo →
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}

/* =====================================================================
   Pet Card DOM Builder (Shared)
   ===================================================================== */
function createPetCardElement(pet, isFav, currency, onRemove = null) {
  const card = document.createElement("article");
  card.className = "pet-card";
  card.setAttribute("data-pet-id", pet.id);

  const tagsHtml = pet.tags.slice(0, 3)
    .map(t => `<span class="pet-tag-chip">${escapeHtml(t)}</span>`)
    .join("");

  card.innerHTML = `
    <div class="pet-card-image-wrap">
      <img 
        src="${escapeHtml(pet.image)}" 
        alt="${escapeHtml(pet.name)} - ${escapeHtml(pet.breed)}" 
        class="pet-card-img" 
        loading="lazy"
        onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80';"
      >
      <span class="pet-badge-overlay">${escapeHtml(pet.badge || (pet.species === "dog" ? "Dog" : pet.species === "cat" ? "Cat" : "Pet"))}</span>
      <button 
        type="button" 
        class="card-fav-btn ${isFav ? "active" : ""}" 
        data-pet-id="${pet.id}" 
        aria-label="${isFav ? "Remove" : "Save"} ${escapeHtml(pet.name)} ${isFav ? "from" : "to"} favourites"
        aria-pressed="${isFav ? "true" : "false"}"
      >
        <span class="heart-icon">${isFav ? "❤️" : "🤍"}</span>
      </button>
    </div>

    <div class="pet-card-body">
      <div class="pet-card-header">
        <h3 class="pet-title">${escapeHtml(pet.name)}</h3>
        <span class="pet-age-pill">${escapeHtml(pet.age)}</span>
      </div>

      <p class="pet-breed">${escapeHtml(pet.breed)}</p>
      <div class="pet-location-line">📍 ${escapeHtml(pet.location)}</div>

      <div class="pet-tags-container">
        ${tagsHtml}
      </div>

      <div class="pet-stats-row">
        <span class="pet-stat-item">
          ${pet.gender.includes("Female") ? "♀" : "♂"} ${escapeHtml(pet.gender)}
        </span>
        <span class="pet-stat-item">
          ⚖️ ${escapeHtml(pet.size)}
        </span>
        <span class="pet-stat-item">
          💉 ${pet.health.vaccinated ? "Vaccinated" : "Vet Checked"}
        </span>
      </div>

      <div class="pet-card-footer">
        <div class="pet-fee-wrap">
          <span class="pet-fee-amount">${currency}${pet.adoptionFee}</span>
          <small>Adoption fee</small>
        </div>
        <button type="button" class="btn-card-action" data-pet-id="${pet.id}">
          Meet ${escapeHtml(pet.name)} →
        </button>
      </div>
    </div>
  `;

  // Favorite button handler
  const favBtn = card.querySelector(".card-fav-btn");
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavourite(pet.id, pet.name);
    if (onRemove) onRemove();
  });

  // Card click handler -> Opens Detail Modal
  card.addEventListener("click", (e) => {
    if (e.target.closest(".card-fav-btn")) return;
    if (window.openPetDetailModal) openPetDetailModal(pet.id);
  });

  const actionBtn = card.querySelector(".btn-card-action");
  actionBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (window.openPetDetailModal) openPetDetailModal(pet.id);
  });

  return card;
}

/* =====================================================================
   Adopt Catalog Page (adopt.html)
   ===================================================================== */
function initPets(pets, currency) {
  const container = document.getElementById("pets-grid");
  const searchInput = document.getElementById("pet-search-input");
  const searchClearBtn = document.getElementById("pet-search-clear");
  const sortSelect = document.getElementById("pet-sort-select");
  const speciesTabs = document.querySelectorAll(".species-tab");
  const ageSelect = document.getElementById("filter-age");
  const sizeSelect = document.getElementById("filter-size");
  const resetBtn = document.getElementById("btn-reset-filters");
  const resultsCounter = document.getElementById("live-results-count");

  if (!container) return;

  const state = {
    search: "",
    species: "all",
    age: "all",
    size: "all",
    sort: "recommended"
  };

  function updateTabCounts() {
    const countAll = document.getElementById("count-all");
    const countDog = document.getElementById("count-dog");
    const countCat = document.getElementById("count-cat");
    const countOther = document.getElementById("count-other");

    if (countAll) countAll.textContent = pets.length;
    if (countDog) countDog.textContent = pets.filter(p => p.species === "dog").length;
    if (countCat) countCat.textContent = pets.filter(p => p.species === "cat").length;
    if (countOther) countOther.textContent = pets.filter(p => p.species === "other").length;
  }
  updateTabCounts();

  function renderPets() {
    container.innerHTML = "";
    const favs = getFavourites();

    let filtered = pets.filter(pet => {
      if (state.species === "favourites") {
        if (!favs.includes(pet.id)) return false;
      } else if (state.species !== "all") {
        if (pet.species !== state.species) return false;
      }

      if (state.age !== "all" && pet.ageGroup !== state.age) return false;
      if (state.size !== "all" && pet.sizeGroup !== state.size) return false;

      if (state.search.trim() !== "") {
        const query = state.search.toLowerCase().trim();
        const matchesName = pet.name.toLowerCase().includes(query);
        const matchesBreed = pet.breed.toLowerCase().includes(query);
        const matchesLocation = pet.location.toLowerCase().includes(query);
        const matchesSummary = pet.summary.toLowerCase().includes(query);
        const matchesTags = pet.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBreed && !matchesLocation && !matchesSummary && !matchesTags) {
          return false;
        }
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name);
      if (state.sort === "youngest") {
        const getAgeOrder = (pet) => {
          if (pet.ageGroup === "puppy-kitten") return 1;
          if (pet.ageGroup === "young") return 2;
          if (pet.ageGroup === "adult") return 3;
          return 4;
        };
        return getAgeOrder(a) - getAgeOrder(b);
      }
      if (state.sort === "fee") return a.adoptionFee - b.adoptionFee;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    if (resultsCounter) {
      resultsCounter.innerHTML = `Showing <strong>${filtered.length}</strong> companion${filtered.length === 1 ? "" : "s"} available`;
    }

    const hasActiveFilters = state.search !== "" || state.species !== "all" || state.age !== "all" || state.size !== "all";
    if (resetBtn) resetBtn.style.display = hasActiveFilters ? "inline-block" : "none";

    if (filtered.length === 0) {
      const isFavView = state.species === "favourites";
      container.innerHTML = `
        <div class="no-pets-found">
          <span class="no-pets-icon">${isFavView ? "💔" : "🔍"}</span>
          <h3 class="no-pets-title">${isFavView ? "No Saved Favourites Yet" : "No Pets Found"}</h3>
          <p class="no-pets-desc">
            ${isFavView 
              ? "You haven't saved any pets to your favourites yet. Click the heart icon (❤️) on any pet card to save them here!" 
              : "We couldn't find any adoptable companions matching your search filters. Try widening your criteria or clearing filters."}
          </p>
          <button type="button" class="btn-clear-filters" id="btn-empty-clear">
            ${isFavView ? "Browse All Pets" : "Clear All Filters"}
          </button>
        </div>
      `;
      const emptyClearBtn = document.getElementById("btn-empty-clear");
      if (emptyClearBtn) emptyClearBtn.addEventListener("click", resetAllFilters);
      return;
    }

    filtered.forEach(pet => {
      const isFav = favs.includes(pet.id);
      const card = createPetCardElement(pet, isFav, currency);
      container.appendChild(card);
    });
  }

  window._renderPetsList = renderPets;

  let searchTimeout = null;
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimeout);
      state.search = searchInput.value;
      if (searchClearBtn) searchClearBtn.style.display = state.search ? "block" : "none";
      searchTimeout = setTimeout(renderPets, 200);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.search = "";
      searchClearBtn.style.display = "none";
      searchInput.focus();
      renderPets();
    });
  }

  speciesTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      speciesTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      state.species = tab.getAttribute("data-species");
      renderPets();
    });
  });

  if (ageSelect) ageSelect.addEventListener("change", () => { state.age = ageSelect.value; renderPets(); });
  if (sizeSelect) sizeSelect.addEventListener("change", () => { state.size = sizeSelect.value; renderPets(); });
  if (sortSelect) sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; renderPets(); });

  function resetAllFilters() {
    state.search = "";
    state.species = "all";
    state.age = "all";
    state.size = "all";
    state.sort = "recommended";

    if (searchInput) {
      searchInput.value = "";
      if (searchClearBtn) searchClearBtn.style.display = "none";
    }
    if (ageSelect) ageSelect.value = "all";
    if (sizeSelect) sizeSelect.value = "all";
    if (sortSelect) sortSelect.value = "recommended";

    speciesTabs.forEach(tab => {
      const isAll = tab.getAttribute("data-species") === "all";
      tab.classList.toggle("active", isAll);
      tab.setAttribute("aria-selected", isAll ? "true" : "false");
    });
    renderPets();
  }

  if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);

  renderPets();
}

/* =====================================================================
   Dedicated Favourites Page (favourites.html)
   ===================================================================== */
function initFavouritesPage(pets, currency) {
  const container = document.getElementById("favourites-grid");
  const countMsg = document.getElementById("fav-summary-count");
  const clearBtn = document.getElementById("btn-clear-all-favs");

  if (!container) return;

  function renderFavourites() {
    const favs = getFavourites();
    const favPets = pets.filter(p => favs.includes(p.id));

    if (countMsg) {
      countMsg.innerHTML = `You have <strong>${favPets.length}</strong> saved companion${favPets.length === 1 ? "" : "s"}`;
    }

    if (clearBtn) {
      clearBtn.style.display = favPets.length > 0 ? "inline-block" : "none";
    }

    container.innerHTML = "";

    if (favPets.length === 0) {
      container.innerHTML = `
        <div class="no-pets-found">
          <span class="no-pets-icon">❤️</span>
          <h3 class="no-pets-title">Your Favourites List is Empty</h3>
          <p class="no-pets-desc">
            You haven't saved any pets yet. Browse our adoptable animals and tap the heart icon to save your top choices here for easy side-by-side review!
          </p>
          <a href="adopt.html" class="btn-primary" style="display: inline-flex; margin-top: 10px;">
            <span>🐾 Browse Adoptable Pets</span>
          </a>
        </div>
      `;
      return;
    }

    favPets.forEach(pet => {
      const card = createPetCardElement(pet, true, currency, () => {
        renderFavourites();
      });
      container.appendChild(card);
    });
  }

  window._renderFavouritesPage = renderFavourites;

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all your saved favourites?")) {
        saveFavourites([]);
        renderFavourites();
        showToast("Cleared all saved favourites", "info");
      }
    });
  }

  renderFavourites();
}

/* =====================================================================
   Grooming Services Page (services.html)
   ===================================================================== */
function initServices(services, currency) {
  const container = document.getElementById("services-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!container) return;

  function render(category = "all") {
    container.innerHTML = "";

    const filtered = category === "all"
      ? services
      : services.filter(s => s.category === category);

    if (filtered.length === 0) {
      container.innerHTML = `<p class="no-services-msg">No grooming services found in this category.</p>`;
      return;
    }

    filtered.forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";
      if (service.badge === "Most Popular") card.classList.add("highlighted");

      const includesHtml = service.included
        .map(item => `<li>${escapeHtml(item)}</li>`)
        .join("");

      card.innerHTML = `
        ${service.badge ? `<span class="service-badge">${escapeHtml(service.badge)}</span>` : ""}
        <div class="service-card-top">
          <span class="service-category-tag">${service.category.toUpperCase()}</span>
          <h3 class="service-title">${escapeHtml(service.name)}</h3>
          <div class="service-duration"><span>⏱️ ${escapeHtml(service.duration)}</span></div>
          <p class="service-description">${escapeHtml(service.shortDescription)}</p>
          <ul class="service-includes">${includesHtml}</ul>
        </div>
        <div class="service-card-bottom">
          <div class="service-price">
            ${currency}${service.price}
            <small>/ session</small>
          </div>
          <a href="booking.html?service=${service.id}" class="service-select-btn">
            Select for Demo
          </a>
        </div>
      `;
      container.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      render(category);
    });
  });

  render("all");
}

/* =====================================================================
   Booking Form Page (booking.html)
   ===================================================================== */
function initBookingForm(services, currency) {
  const serviceSelect = document.getElementById("booking-service");
  const bookingForm = document.getElementById("demo-booking-form");
  const modalOverlay = document.getElementById("demo-modal");
  const closeModalBtn = document.getElementById("btn-close-modal");
  const dateInput = document.getElementById("booking-date");

  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // Populate services dropdown
  if (serviceSelect) {
    serviceSelect.innerHTML = `<option value="">-- Choose a Grooming Service --</option>`;
    services.forEach(s => {
      const option = document.createElement("option");
      option.value = s.id;
      option.textContent = `${s.name} (${currency}${s.price} - ${s.duration})`;
      serviceSelect.appendChild(option);
    });

    // Check if URL has ?service= parameter
    const urlParams = new URLSearchParams(window.location.search);
    const preselected = urlParams.get("service");
    if (preselected && services.some(s => s.id === preselected)) {
      serviceSelect.value = preselected;
    }
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const petName = document.getElementById("pet-name")?.value || "N/A";
      const petSpeciesEl = document.querySelector('input[name="pet-species"]:checked');
      const petSpecies = petSpeciesEl ? petSpeciesEl.value : "Dog";
      const petBreed = document.getElementById("pet-breed")?.value || "Standard";
      const selectedServiceId = serviceSelect?.value;
      const selectedService = services.find(s => s.id === selectedServiceId);
      const preferredDate = dateInput?.value || "Unspecified";
      const preferredTime = document.getElementById("booking-time")?.value || "Any time";
      const ownerName = document.getElementById("owner-name")?.value || "Guest";
      const ownerPhone = document.getElementById("owner-phone")?.value || "N/A";

      const demoRefNumber = "DEMO-EST-" + Math.floor(1000 + Math.random() * 9000);

      document.getElementById("receipt-ref").textContent = demoRefNumber;
      document.getElementById("receipt-pet").textContent = `${petName} (${petSpecies}, ${petBreed})`;
      document.getElementById("receipt-service").textContent = selectedService ? selectedService.name : "Custom Consultation";
      document.getElementById("receipt-datetime").textContent = `${preferredDate} (${preferredTime})`;
      document.getElementById("receipt-owner").textContent = `${ownerName} (${ownerPhone})`;
      document.getElementById("receipt-total").textContent = selectedService ? `${currency}${selectedService.price}` : "Free Estimate";

      if (modalOverlay) modalOverlay.classList.add("active");
      showToast("🚀 Demo booking preview generated!", "success");
      bookingForm.reset();
    });
  }

  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener("click", () => modalOverlay.classList.remove("active"));
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove("active");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        modalOverlay.classList.remove("active");
      }
    });
  }
}

/* =====================================================================
   Contact Page Form (contact.html)
   ===================================================================== */
function initContactForm() {
  const form = document.getElementById("demo-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name")?.value || "Friend";
    showToast(`✉️ Thank you, ${escapeHtml(name)}! Demo message received.`, "success");
    form.reset();
  });
}

/* =====================================================================
   FAQ Accordion (about.html)
   ===================================================================== */
function initFaqAccordion(faqs) {
  const faqContainer = document.getElementById("faq-accordion");
  if (!faqContainer || !faqs) return;

  faqContainer.innerHTML = "";
  faqs.forEach((item, index) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";
    if (index === 0) faqItem.classList.add("active");

    faqItem.innerHTML = `
      <button type="button" class="faq-question" aria-expanded="${index === 0}">
        <span>${escapeHtml(item.question)}</span>
        <span class="faq-toggle-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${escapeHtml(item.answer)}</p>
      </div>
    `;

    const btn = faqItem.querySelector(".faq-question");
    btn.addEventListener("click", () => {
      const isActive = faqItem.classList.contains("active");
      document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("active"));
      if (!isActive) faqItem.classList.add("active");
    });

    faqContainer.appendChild(faqItem);
  });
}

/* =====================================================================
   Pet Detail Modal View
   ===================================================================== */
function initPetDetailModal(pets, currency) {
  const modalOverlay = document.getElementById("pet-detail-modal");
  const closeBtn = document.getElementById("btn-close-pet-modal");

  if (!modalOverlay) return;

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
  });

  window.openPetDetailModal = function(petId) {
    const pet = pets.find(p => p.id === petId);
    if (!pet) return;

    const contentBox = document.getElementById("pet-modal-content");
    if (!contentBox) return;

    const isFav = isFavourite(pet.id);
    const galleryImages = pet.gallery && pet.gallery.length > 0 ? pet.gallery : [pet.image];

    const thumbsHtml = galleryImages.map((imgUrl, i) => `
      <button type="button" class="modal-thumb-btn ${i === 0 ? "active" : ""}" data-img-src="${escapeHtml(imgUrl)}" aria-label="View photo ${i + 1}">
        <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(pet.name)} thumbnail ${i + 1}">
      </button>
    `).join("");

    contentBox.innerHTML = `
      <div class="pet-modal-grid">
        <div class="modal-left-col">
          <div class="modal-gallery-hero">
            <img src="${escapeHtml(pet.image)}" alt="${escapeHtml(pet.name)}" class="modal-hero-img" id="modal-active-img">
            <span class="modal-badge-status">${escapeHtml(pet.status)}</span>
          </div>

          ${galleryImages.length > 1 ? `<div class="modal-gallery-thumbs">${thumbsHtml}</div>` : ""}

          <div class="modal-quick-facts">
            <h4>Quick Facts</h4>
            <ul class="facts-list">
              <li class="fact-item">
                <span>Species / Breed</span>
                <strong>${escapeHtml(pet.breed)}</strong>
              </li>
              <li class="fact-item">
                <span>Age</span>
                <strong>${escapeHtml(pet.age)}</strong>
              </li>
              <li class="fact-item">
                <span>Gender</span>
                <strong>${escapeHtml(pet.gender)}</strong>
              </li>
              <li class="fact-item">
                <span>Size / Weight</span>
                <strong>${escapeHtml(pet.size)}</strong>
              </li>
              <li class="fact-item">
                <span>Vaccinated</span>
                <strong>${pet.health.vaccinated ? "Yes (Full)" : "In Progress"}</strong>
              </li>
              <li class="fact-item">
                <span>Neutered / Spayed</span>
                <strong>${pet.health.spayedNeutered ? "Yes" : "Scheduled"}</strong>
              </li>
              <li class="fact-item">
                <span>Microchip</span>
                <strong>${pet.health.microchipped ? "Yes (ISO 11784)" : "Pending"}</strong>
              </li>
              <li class="fact-item">
                <span>EU Passport</span>
                <strong>Ready for Travel</strong>
              </li>
            </ul>
          </div>
        </div>

        <div class="modal-right-col">
          <div class="modal-pet-head">
            <div>
              <h2 class="modal-pet-name" id="pet-modal-title">${escapeHtml(pet.name)}</h2>
              <p class="modal-pet-subtitle">${escapeHtml(pet.breed)} • ${escapeHtml(pet.age)}</p>
            </div>

            <div class="modal-head-actions">
              <button 
                type="button" 
                class="modal-fav-btn ${isFav ? "active" : ""}" 
                data-pet-id="${pet.id}" 
                aria-label="${isFav ? "Remove" : "Save"} ${escapeHtml(pet.name)} ${isFav ? "from" : "to"} favourites"
                title="Toggle favourite"
              >
                <span class="heart-icon">${isFav ? "❤️" : "🤍"}</span>
              </button>
              <button 
                type="button" 
                class="modal-share-btn" 
                id="btn-share-pet" 
                aria-label="Share ${escapeHtml(pet.name)}'s profile"
                title="Copy share link"
              >
                🔗
              </button>
            </div>
          </div>

          <div class="modal-location-tag">
            📍 Location: <strong>${escapeHtml(pet.location)}</strong>
          </div>

          <div class="modal-story-box">
            <h4>About ${escapeHtml(pet.name)}</h4>
            <p>${escapeHtml(pet.story)}</p>
          </div>

          <div class="modal-compatibility-box">
            <h4>Compatibility & Lifestyle</h4>
            <div class="compat-grid">
              <div class="compat-item">
                👶 Kids: <strong>${escapeHtml(pet.compatibility.kids)}</strong>
              </div>
              <div class="compat-item">
                🐕 Dogs: <strong>${escapeHtml(pet.compatibility.dogs)}</strong>
              </div>
              <div class="compat-item">
                🐈 Cats: <strong>${escapeHtml(pet.compatibility.cats)}</strong>
              </div>
              <div class="compat-item">
                ⚡ Energy: <strong>${escapeHtml(pet.compatibility.energy)}</strong>
              </div>
            </div>
          </div>

          <div class="modal-fee-bar">
            <div class="fee-left">
              <strong>${currency}${pet.adoptionFee}</strong>
              <small>Adoption contribution covers passport, chips, & vet care</small>
            </div>
          </div>

          <div class="modal-actions-row">
            <button type="button" class="btn-adopt-modal" id="btn-trigger-adopt-app" data-pet-id="${pet.id}">
              🐾 Apply to Adopt ${escapeHtml(pet.name)} (Demo)
            </button>
          </div>
        </div>
      </div>
    `;

    contentBox.querySelectorAll(".modal-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        contentBox.querySelectorAll(".modal-thumb-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const newSrc = btn.getAttribute("data-img-src");
        const activeImg = document.getElementById("modal-active-img");
        if (activeImg && newSrc) activeImg.src = newSrc;
      });
    });

    const modalFavBtn = contentBox.querySelector(".modal-fav-btn");
    if (modalFavBtn) {
      modalFavBtn.addEventListener("click", () => {
        toggleFavourite(pet.id, pet.name);
      });
    }

    const shareBtn = contentBox.querySelector("#btn-share-pet");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        const url = window.location.origin + window.location.pathname;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast("📋 Adoption link copied to clipboard!", "success");
          }).catch(() => {
            showToast("📋 PawRoute.ee link ready to share!", "info");
          });
        } else {
          showToast("📋 PawRoute.ee link ready to share!", "info");
        }
      });
    }

    const adoptTriggerBtn = contentBox.querySelector("#btn-trigger-adopt-app");
    if (adoptTriggerBtn) {
      adoptTriggerBtn.addEventListener("click", () => {
        closeModal();
        if (window.openAdoptionForm) openAdoptionForm(pet.id);
      });
    }

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };
}

/* =====================================================================
   Demo Adoption Application Modal & Receipt
   ===================================================================== */
function initAdoptionApplicationModal(pets, currency) {
  const modalOverlay = document.getElementById("adoption-modal");
  const closeBtn = document.getElementById("btn-close-adoption-modal");
  const closeReceiptBtn = document.getElementById("btn-close-adoption-receipt");
  const formWrap = document.getElementById("adoption-form-wrap");
  const receiptWrap = document.getElementById("adoption-receipt-wrap");
  const adoptionForm = document.getElementById("demo-adoption-form");

  if (!modalOverlay || !adoptionForm) return;

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (formWrap) formWrap.style.display = "block";
      if (receiptWrap) receiptWrap.style.display = "none";
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeReceiptBtn) closeReceiptBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeModal();
  });

  window.openAdoptionForm = function(petId) {
    const pet = pets.find(p => p.id === petId) || pets[0];
    if (!pet) return;

    formWrap.style.display = "block";
    receiptWrap.style.display = "none";

    const petIdInput = document.getElementById("adopt-pet-id");
    const nameSpan = document.getElementById("adopt-modal-pet-name");
    const stripImg = document.getElementById("adopt-strip-img");
    const stripName = document.getElementById("adopt-strip-name");
    const stripDetails = document.getElementById("adopt-strip-details");
    const stripFee = document.getElementById("adopt-strip-fee");

    if (petIdInput) petIdInput.value = pet.id;
    if (nameSpan) nameSpan.textContent = pet.name;
    if (stripImg) stripImg.src = pet.image;
    if (stripName) stripName.textContent = pet.name;
    if (stripDetails) stripDetails.textContent = `${pet.breed} • ${pet.age} • ${pet.location}`;
    if (stripFee) stripFee.textContent = `Adoption Fee: ${currency}${pet.adoptionFee}`;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  adoptionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const petId = document.getElementById("adopt-pet-id")?.value;
    const pet = pets.find(p => p.id === petId);
    const applicantName = document.getElementById("adopt-applicant-name")?.value || "Applicant";
    const housingType = document.getElementById("adopt-home-type")?.value || "Standard Residence";

    const refNumber = "ADOPT-EST-2026-" + Math.floor(1000 + Math.random() * 9000);

    const receiptRef = document.getElementById("adopt-receipt-ref");
    const receiptPet = document.getElementById("adopt-receipt-pet");
    const receiptApplicant = document.getElementById("adopt-receipt-applicant");
    const receiptHousing = document.getElementById("adopt-receipt-housing");
    const receiptFee = document.getElementById("adopt-receipt-fee");

    if (receiptRef) receiptRef.textContent = refNumber;
    if (receiptPet) receiptPet.textContent = pet ? `${pet.name} (${pet.breed})` : "Companion";
    if (receiptApplicant) receiptApplicant.textContent = applicantName;
    if (receiptHousing) receiptHousing.textContent = housingType;
    if (receiptFee) receiptFee.textContent = pet ? `${currency}${pet.adoptionFee} (includes EU passport & chip)` : "Standard Fee";

    formWrap.style.display = "none";
    receiptWrap.style.display = "block";

    showToast("🎉 Demo adoption inquiry submitted!", "success");
    adoptionForm.reset();
  });
}

/* =====================================================================
   Preserved Salon Configuration Details Injection
   ===================================================================== */
function initSalonDetails(salon) {
  const addressEls = document.querySelectorAll(".js-salon-address");
  addressEls.forEach(el => el.textContent = salon.address);

  const phoneEls = document.querySelectorAll(".js-salon-phone");
  phoneEls.forEach(el => {
    el.textContent = salon.phone;
    if (el.tagName === "A") el.href = `tel:${salon.phone.replace(/[^0-9+]/g, '')}`;
  });

  const emailEls = document.querySelectorAll(".js-salon-email");
  emailEls.forEach(el => {
    el.textContent = salon.email;
    if (el.tagName === "A") el.href = `mailto:${salon.email.replace(/[\[\]]/g, '')}`;
  });

  const hoursEls = document.querySelectorAll(".js-salon-hours");
  hoursEls.forEach(el => el.textContent = salon.openingHours);

  const regEls = document.querySelectorAll(".js-salon-reg");
  regEls.forEach(el => el.textContent = salon.registrationNumber);
}

/* =====================================================================
   Mobile Navigation Toggle
   ===================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    toggleBtn.setAttribute("aria-expanded", isOpen);
    toggleBtn.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggleBtn.textContent = "☰";
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* =====================================================================
   HTML Escaping Helper
   ===================================================================== */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
