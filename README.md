# PawRoute2 — Pet Grooming Website (Version 1.0)

PawRoute is a clean, modern, and mobile-friendly online pet grooming website tailored for Estonia with pricing displayed in Euros (€).

---

## 📁 Project Structure

```text
PAWROUTE/
├── index.html         # Main website structure & semantic layout
├── styles.css         # Modern responsive styling, colors & mobile layouts
├── app.js             # Interactive behavior, filtering & demo booking logic
├── data/
│   └── services.js    # ⭐️ Central file to update all services, prices & salon info
└── README.md          # Plain-English documentation & instructions
```

---

## 💡 How to Update Services, Prices, and Business Details

You don't need any programming experience to update PawRoute! Everything you need to change lives in one central file: [`data/services.js`](file:///d:/AGENTIC%20WORKFLOW/PAWROUTE/data/services.js).

### 1. Changing a Service Price or Name
Open [`data/services.js`](file:///d:/AGENTIC%20WORKFLOW/PAWROUTE/data/services.js) and locate the service you want to edit:
```javascript
{
  id: "dog-full-groom",
  name: "Complete Dog Grooming",
  price: 55,                        // <-- Change 55 to your new price
  duration: "approx. 90-120 min",  // <-- Change duration if needed
  shortDescription: "..."
}
```
Save the file, and the website will automatically reflect your new prices and names on the page and in the booking dropdown!

### 2. Updating Salon Address, Phone, or Email
At the top of [`data/services.js`](file:///d:/AGENTIC%20WORKFLOW/PAWROUTE/data/services.js), edit the `salon` object:
```javascript
salon: {
  name: "PawRoute Pet Grooming",
  city: "Tallinn, Estonia",
  address: "[Your Real Address in Tallinn]",
  phone: "[+372 5XXX XXXX]",
  email: "[tere@yourdomain.ee]",
  openingHours: "Mon – Sat: 09:00 – 18:00 (Sun: Closed)"
}
```

---

## 🛡️ Demo Booking Mode Notice

The booking form on this site is currently running in **Demo Mode**:
* **No customer data is stored or transmitted** to any server.
* **No payments or card details** are taken.
* **Submissions generate an instant demo receipt preview** with a mock reference number for visual evaluation.
* The form explicitly reminds users that it is a demonstration preview.

---

## 🚀 What is Needed for Real Production Bookings

To transition this prototype into a full, live production booking platform, the following components would be added:

1. **Backend Database & API (e.g., Node.js / Python / Supabase / Firebase):**
   * Securely store booking requests, customer phone numbers, pet records, and grooming notes.
2. **Real-time Calendar Sync (e.g., Google Calendar / Cal.com API):**
   * Prevent double-booking by only showing time slots where a groomer is actually free.
3. **Automated Customer Notifications (Email & SMS):**
   * Send instant booking confirmations and 24-hour reminder SMS messages (crucial for pet salons) via Twilio or Resend/SendGrid.
4. **Online Deposit or Payment Gateway (Optional):**
   * Integrate Estonian Bank Links (via Montonio / Maksekeskus) or Stripe if taking upfront booking deposits or prepayment.
5. **Custom Domain & SSL Hosting:**
   * Deploy to Vercel, Netlify, or GitHub Pages with a custom domain (e.g., `pawroute.ee`).
