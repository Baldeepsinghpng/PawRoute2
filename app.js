/**
 * PAWROUTE - Main Application Logic
 * Handles dynamic service rendering, filtering, demo booking flow, and UI interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if configuration exists
  if (typeof PAWROUTE_CONFIG === "undefined") {
    console.error("PawRoute configuration not found. Please ensure data/services.js is loaded.");
    return;
  }

  const { salon, services, faqs } = PAWROUTE_CONFIG;

  // Initialize UI components
  initSalonDetails(salon);
  initServices(services, salon.currency);
  initBookingForm(services, salon.currency);
  initFaqAccordion(faqs);
  initMobileNavigation();
});

/**
 * Injects salon configuration (phone, address, currency) into designated placeholder elements
 */
function initSalonDetails(salon) {
  // Update header location badge
  const locationBadge = document.querySelector(".header-location-text");
  if (locationBadge) locationBadge.textContent = salon.city;

  // Update contact elements
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

/**
 * Renders services grid and handles category filtering
 */
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
      container.innerHTML = `<p class="no-services-msg">No services found in this category.</p>`;
      return;
    }

    filtered.forEach(service => {
      const card = document.createElement("div");
      card.className = "service-card";
      if (service.badge === "Most Popular") {
        card.classList.add("highlighted");
      }

      const includesHtml = service.included
        .map(item => `<li>${escapeHtml(item)}</li>`)
        .join("");

      card.innerHTML = `
        ${service.badge ? `<span class="service-badge">${escapeHtml(service.badge)}</span>` : ""}
        <div class="service-card-top">
          <span class="service-category-tag">${service.category.toUpperCase()}</span>
          <h3 class="service-title">${escapeHtml(service.name)}</h3>
          <div class="service-duration">
            <span>⏱️ ${escapeHtml(service.duration)}</span>
          </div>
          <p class="service-description">${escapeHtml(service.shortDescription)}</p>
          <ul class="service-includes">
            ${includesHtml}
          </ul>
        </div>
        <div class="service-card-bottom">
          <div class="service-price">
            ${currency}${service.price}
            <small>/ session</small>
          </div>
          <button type="button" class="service-select-btn" data-service-id="${service.id}">
            Select for Demo
          </button>
        </div>
      `;

      // Quick-select button handler
      const selectBtn = card.querySelector(".service-select-btn");
      selectBtn.addEventListener("click", () => {
        selectServiceAndScrollToBooking(service.id);
      });

      container.appendChild(card);
    });
  }

  // Set up filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      render(category);
    });
  });

  // Initial render
  render("all");
}

/**
 * Handles selecting a service from a card and scrolling down to the booking form
 */
function selectServiceAndScrollToBooking(serviceId) {
  const serviceSelect = document.getElementById("booking-service");
  const bookingSection = document.getElementById("booking");

  if (serviceSelect) {
    serviceSelect.value = serviceId;
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
    const petNameInput = document.getElementById("pet-name");
    if (petNameInput) {
      setTimeout(() => petNameInput.focus(), 600);
    }
  }
}

/**
 * Populates the booking service dropdown and handles interactive demo submission
 */
function initBookingForm(services, currency) {
  const serviceSelect = document.getElementById("booking-service");
  const bookingForm = document.getElementById("demo-booking-form");
  const modalOverlay = document.getElementById("demo-modal");
  const closeModalBtn = document.getElementById("btn-close-modal");
  const dateInput = document.getElementById("booking-date");

  // Prevent selecting past dates
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  // Populate service options
  if (serviceSelect) {
    serviceSelect.innerHTML = `<option value="">-- Choose a Grooming Service --</option>`;
    services.forEach(s => {
      const option = document.createElement("option");
      option.value = s.id;
      option.textContent = `${s.name} (${currency}${s.price} - ${s.duration})`;
      serviceSelect.appendChild(option);
    });
  }

  // Handle Form Submission (Demo Only)
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Collect form values
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
      const notes = document.getElementById("booking-notes")?.value || "None";

      // Generate a mock demo confirmation reference
      const demoRefNumber = "DEMO-EST-" + Math.floor(1000 + Math.random() * 9000);

      // Populate Receipt in Modal
      document.getElementById("receipt-ref").textContent = demoRefNumber;
      document.getElementById("receipt-pet").textContent = `${petName} (${petSpecies}, ${petBreed})`;
      document.getElementById("receipt-service").textContent = selectedService ? selectedService.name : "Custom Consultation";
      document.getElementById("receipt-datetime").textContent = `${preferredDate} (${preferredTime})`;
      document.getElementById("receipt-owner").textContent = `${ownerName} (${ownerPhone})`;
      document.getElementById("receipt-total").textContent = selectedService ? `${currency}${selectedService.price}` : "Free Estimate";

      // Show Modal
      if (modalOverlay) {
        modalOverlay.classList.add("active");
        modalOverlay.focus();
      }

      // Reset form fields
      bookingForm.reset();
    });
  }

  // Close Modal Handler
  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("active");
    });

    // Close on overlay click
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
      }
    });

    // Close on Esc key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        modalOverlay.classList.remove("active");
      }
    });
  }
}

/**
 * Initializes FAQ accordion
 */
function initFaqAccordion(faqs) {
  const faqContainer = document.getElementById("faq-accordion");
  if (!faqContainer || !faqs) return;

  faqContainer.innerHTML = "";
  faqs.forEach((item, index) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";
    if (index === 0) faqItem.classList.add("active"); // open first by default

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
      // Optionally close other items
      document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("active"));
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });

    faqContainer.appendChild(faqItem);
  });
}

/**
 * Mobile navigation menu toggle
 */
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

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggleBtn.textContent = "☰";
    });
  });
}

/**
 * Simple HTML escaping helper to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
