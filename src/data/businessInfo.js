/**
 * Business Information & Configuration
 * Business Name: Jose Computers (Education, Insurance, E-Sevai, CSC, Aadhar Centre)
 * Travel Division: Jose Tours & Travels (Passport, Visa, Stamping, Attestation, Emigration, Medical, Tickets)
 * Location: Rajiv Junction, Karungal - 629157
 */

export const BUSINESS_INFO = {
  // Brand & Identity
  name: "Jose Computers and Internet Centre",
  travelDivisionName: "Jose Tours & Travels",
  proprietor: "Tipton Jose D",
  shortName: "Jose Computers",
  logo: `${import.meta.env?.BASE_URL || '/'}logo.png`,
  tagline: "Education, Insurance, E-Sevai, CSC, Aadhar Centre & Jose Tours & Travels",
  experienceYears: "10+",
  establishedYear: "2014",

  // About Summary
  shortBio:
    "Your trusted centre at Rajiv Junction, Karungal for Government Documentation (Aadhaar, E-Sevai, CSC, PAN), Jose Tours & Travels (Passport, Visa, Stamping, Attestation, Emigration, Medical, Air & Train Tickets), Education & Admission Services, and High-Speed Laser Printing.",
  
  // Contact Phones (from Client Visiting Cards)
  phoneDisplay: "+91 94423 58907",
  phoneRaw: "919442358907",

  phoneSecondary: "+91 93857 68907",
  phoneSecondaryRaw: "919385768907",

  phoneLandline: "04651 - 290907",
  phoneLandlineRaw: "04651290907",
  
  whatsappDisplay: "+91 94423 58907",
  whatsappRaw: "919442358907",

  email: "josetravelskgl@gmail.com",
  
  // Physical Location from Visiting Card
  address: {
    line1: "Rajiv Junction",
    landmark: "Rajiv Junction",
    city: "Karungal",
    district: "Kanyakumari",
    state: "Tamil Nadu",
    pincode: "629157",
    fullDisplay: "Rajiv Junction, Karungal - 629157, Kanyakumari District, Tamil Nadu"
  },

  // Operating Hours
  hours: {
    weekdays: "Monday – Saturday: 9:00 AM – 9:00 PM",
    sunday: "Sunday: 9:00 AM – 2:00 PM",
    lunchBreak: "Open through lunch hours"
  },

  // Practical Visit Details
  paymentMethods: "Cash, UPI (Google Pay, PhonePe, Paytm, QR scan)",
  parking: "Convenient vehicle and two-wheeler parking available at Rajiv Junction, Karungal",
  advancePrintingHint: "Send documents via WhatsApp or Email before visiting to collect printed copies immediately upon arrival.",

  // Google Maps Location Embed
  mapEmbedUrl: "https://maps.google.com/maps?q=Rajiv+Junction+Karungal+Tamil+Nadu+629157&t=&z=15&ie=UTF8&iwloc=&output=embed",

  // Disclaimer statement
  complianceNotice:
    "Official Notice & Regulatory Compliance: Jose Computers and Internet Centre is an independent digital facilitation, education guidance, and travel service centre at Rajiv Junction, Karungal. We provide lawful document preparation, application filing, ticket booking, and internet facilitation services where permitted by law. We are NOT an official government office and do not guarantee government approvals. All government services are subject to official verification and respective department rules."
};
