/**
 * Comprehensive Services & Business Catalog
 * Theme: Crisp White & #20A7DB Cyan Blue
 */

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', icon: 'grid' },
  { id: 'govt', label: 'Government Documentation', icon: 'file-text' },
  { id: 'travel', label: 'Travel & Ticketing', icon: 'compass' },
  { id: 'printing', label: 'Printing & Computer', icon: 'printer' }
];

// Featured Categories for Visual Showcase Cards
export const FEATURED_CATEGORIES = [
  {
    id: 'govt',
    title: 'Government Documentation',
    tag: 'Aadhaar • PAN • Passport • Certificates',
    description: 'Expert, error-free guidance for government portal applications, renewals, and certified downloads.',
    imageKey: 'govt',
    count: '10 Services'
  },
  {
    id: 'travel',
    title: 'Travel & Ticket Booking',
    tag: 'Bus • Train • Domestic & International Flights',
    description: 'Fast seat reservations, Tatkaal advisory, cancellation support, and instant boarding pass printouts.',
    imageKey: 'travel',
    count: '4 Services'
  },
  {
    id: 'printing',
    title: 'Printing & Computer Services',
    tag: 'Color Laser • High-Speed Xerox • Lamination',
    description: 'High-resolution document printing, multi-page scanning, online form submissions, and photo prints.',
    imageKey: 'printing',
    count: '8 Services'
  }
];

// Popular Walk-in Services for Home Page Quick Finder
export const POPULAR_HOME_SERVICES = [
  {
    id: 'aadhaar-updates',
    title: 'Aadhaar Demographic Updates',
    category: 'Government Documentation',
    turnaround: '15 – 20 Mins',
    icon: 'shield-check',
    requirement: 'Original Aadhaar & OTP mobile phone',
    description: 'Address corrections, mobile linking queries, and official PVC card ordering.'
  },
  {
    id: 'pan-application',
    title: 'New PAN Card & Corrections',
    category: 'Government Documentation',
    turnaround: 'Same-Day Filing',
    icon: 'credit-card',
    requirement: 'Aadhaar card & 2 passport photos',
    description: 'Fresh individual PAN, signature/photo updates, and instant e-PAN generation.'
  },
  {
    id: 'irctc-tickets',
    title: 'Train Ticket & Tatkaal Booking',
    category: 'Travel & Ticketing',
    turnaround: 'Instant Ticket Print',
    icon: 'train',
    requirement: 'Passenger names, age & ID details',
    description: 'Confirmed seat booking across all IRCTC train classes with live PNR tracking.'
  },
  {
    id: 'urgent-laser-print',
    title: 'High-Speed Laser Printing & Xerox',
    category: 'Printing Services',
    turnaround: 'Ready in Minutes',
    icon: 'printer',
    requirement: 'PDF via Pendrive, WhatsApp or Email',
    description: 'Crisp black & white and color laser printouts on 75/80 GSM bright paper.'
  },
  {
    id: 'online-job-forms',
    title: 'Govt Job & Exam Form Filing',
    category: 'Computer Services',
    turnaround: 'Careful Verification',
    icon: 'clipboard-list',
    requirement: 'Marksheets, photo & signature',
    description: 'Error-free application submissions for SSC, Banking, Police & State portals.'
  },
  {
    id: 'revenue-certificates',
    title: 'Community, Income & Nativity',
    category: 'Government Documentation',
    turnaround: 'Official E-District Filing',
    icon: 'file-check',
    requirement: 'Ration card, Aadhaar & address proof',
    description: 'Online application for Tehsildar & revenue department legal certificates.'
  }
];

export const SERVICES = [
  // ==================== GOVERNMENT SERVICES ====================
  {
    id: 'aadhaar-services',
    category: 'govt',
    title: 'Aadhaar Portal Assistance',
    tag: 'UIDAI Assistance',
    description: 'Address corrections, demographic updates, digital e-Aadhaar download, and official PVC card ordering.',
    requirements: 'Original Aadhaar number & registered mobile for OTP verification',
    turnaround: 'Immediate receipt',
    icon: 'shield-check'
  },
  {
    id: 'pan-card',
    category: 'govt',
    title: 'PAN Card Application & Correction',
    tag: 'NSDL / UTI Portal',
    description: 'Fresh individual PAN card applications, name/DOB corrections, minor PAN, and instant e-PAN generation.',
    requirements: 'Aadhaar card copy, 2 passport size photographs & signature',
    turnaround: 'E-PAN in 48-72 hrs',
    icon: 'credit-card'
  },
  {
    id: 'passport-services',
    category: 'govt',
    title: 'Passport Application & Renewal',
    tag: 'Passport Seva',
    description: 'Appointment slot booking at PSK/POPSK, document checklist verification, and Tatkaal application filing.',
    requirements: '10th marksheet, Aadhaar card, PAN card & address proof',
    turnaround: 'Slot booked instantly',
    icon: 'globe'
  },
  {
    id: 'voter-id',
    category: 'govt',
    title: 'Voter ID Services',
    tag: 'ECI / NVSP',
    description: 'New voter registration (Form 6), address change, constituency transfer, and digital e-EPIC download.',
    requirements: 'Age proof, address proof & recent passport photograph',
    turnaround: 'Acknowledgement copy provided',
    icon: 'vote'
  },
  {
    id: 'ration-card',
    category: 'govt',
    title: 'Ration Card Assistance',
    tag: 'PDS Portal',
    description: 'Smart ration card applications, family member addition/deletion, and address update assistance.',
    requirements: 'Aadhaar cards of all members, gas connection slip & electricity bill',
    turnaround: 'Official portal receipt',
    icon: 'users'
  },
  {
    id: 'driving-licence',
    category: 'govt',
    title: 'Driving Licence Assistance',
    tag: 'Parivahan Sarathi',
    description: 'Learner licence (LLR) test slot booking, permanent DL appointment, renewal, and duplicate licence requests.',
    requirements: 'Aadhaar card, blood group report, educational certificate & photo',
    turnaround: 'Slot confirmation printout',
    icon: 'car'
  },
  {
    id: 'birth-death-cert',
    category: 'govt',
    title: 'Birth & Death Certificates',
    tag: 'Civil Registration',
    description: 'Municipal portal search, certified record copy application, and delayed registration guidance.',
    requirements: 'Hospital discharge slip / intimation report & parent IDs',
    turnaround: 'Portal search & filing',
    icon: 'award'
  },
  {
    id: 'revenue-certificates',
    category: 'govt',
    title: 'Community, Income & Nativity',
    tag: 'E-District Portal',
    description: 'Online filing for Caste, Income, Nativity, First Graduate, and Legal Heir revenue certificates.',
    requirements: 'Ration card, Aadhaar, salary slip/income proof & property documents',
    turnaround: 'CAN number & receipt',
    icon: 'file-check'
  },
  {
    id: 'govt-schemes',
    category: 'govt',
    title: 'Government Scheme Applications',
    tag: 'Welfare Schemes',
    description: 'Filing for central/state welfare pensions, PM-Kisan farmer registration, and student scholarship portals.',
    requirements: 'Aadhaar, bank passbook with IFSC & land/category documents',
    turnaround: 'Submission acknowledgement',
    icon: 'heart-handshake'
  },
  {
    id: 'other-govt-docs',
    category: 'govt',
    title: 'Other Documentation Services',
    tag: 'Legal & Police Forms',
    description: 'Gazette notifications for name change, police verification forms, and legal affidavit typing.',
    requirements: 'Supporting certificates & drafted affidavit notes',
    turnaround: 'Same day typing',
    icon: 'folder-check'
  },

  // ==================== TRAVEL & TICKETING ====================
  {
    id: 'bus-booking',
    category: 'travel',
    title: 'Bus Ticket Booking',
    tag: 'RTC & Private Operators',
    description: 'Seat reservations for government RTCs and private AC sleeper/semi-sleeper buses with instant SMS confirmation.',
    requirements: 'Passenger full names, contact mobile & preferred boarding point',
    turnaround: 'Instant ticket printout',
    icon: 'bus'
  },
  {
    id: 'train-booking',
    category: 'travel',
    title: 'Train Ticket Booking',
    tag: 'IRCTC Assistance',
    description: 'Train reservations across all classes (1A, 2A, 3A, SL), Tatkaal booking guidance, PNR inquiry, and refund processing.',
    requirements: 'Passenger names, age, berth preference & government ID details',
    turnaround: 'Instant reservation slip',
    icon: 'train'
  },
  {
    id: 'flight-booking',
    category: 'travel',
    title: 'Flight Ticket Booking',
    tag: 'Domestic & International',
    description: 'Affordable domestic and international air ticketing, baggage addition, seat selection, and web check-in printouts.',
    requirements: 'Full legal name as per government ID/passport & travel dates',
    turnaround: 'Instant e-ticket & invoice',
    icon: 'plane'
  },
  {
    id: 'other-travel',
    category: 'travel',
    title: 'Travel Packages & Cab Bookings',
    tag: 'Hotels & Outstation Cabs',
    description: 'Family hotel reservations, pilgrimage darshan bookings, and verified outstation cab coordination.',
    requirements: 'Destination details, passenger count & travel dates',
    turnaround: 'Same-day confirmation',
    icon: 'map-pin'
  },

  // ==================== PRINTING & COMPUTER SERVICES ====================
  {
    id: 'xerox-photocopying',
    category: 'printing',
    title: 'Xerox & Bulk Photocopying',
    tag: 'High-Speed Commercial Copy',
    description: 'Crisp black-and-white and color photocopying on 75/80 GSM premium paper with bulk volume discounts.',
    requirements: 'Original physical hardcopy or single book/file',
    turnaround: 'Ready while you wait',
    icon: 'copy'
  },
  {
    id: 'bw-color-printing',
    category: 'printing',
    title: 'B&W & High-Res Color Laser Printing',
    tag: 'Laser Jet Precision',
    description: 'Laser-sharp project reports, resumes, legal court papers, and color presentations on premium sheets.',
    requirements: 'PDF, DOCX, or PPT via Pendrive, WhatsApp or Email',
    turnaround: 'Instant output',
    icon: 'printer'
  },
  {
    id: 'scanning-digitization',
    category: 'printing',
    title: 'Scanning & Document Digitization',
    tag: 'Up to 600 DPI Scan',
    description: 'Multi-page 600 DPI scanning to searchable single PDF files sent directly to your email or WhatsApp.',
    requirements: 'Physical certificates, agreements or documents',
    turnaround: 'Immediate digital dispatch',
    icon: 'scan'
  },
  {
    id: 'doc-upload-download',
    category: 'printing',
    title: 'Document Upload & Admit Card Downloads',
    tag: 'Exam & Recruitment Portals',
    description: 'Instant download of exam admit cards, hall tickets, scorecards, and mandatory portal document resizing & uploads.',
    requirements: 'Registration number / Roll number & Date of Birth',
    turnaround: 'Instant download & print',
    icon: 'download-cloud'
  },
  {
    id: 'typing-preparation',
    category: 'printing',
    title: 'Typing & Document Drafting',
    tag: 'Agreements, Resumes & Letters',
    description: 'Fast typing for rental agreements, affidavits, formal petitions, and professional resume formatting.',
    requirements: 'Rough notes, previous biodata or text points',
    turnaround: '15 – 30 minutes',
    icon: 'edit-3'
  },
  {
    id: 'online-form-filling',
    category: 'printing',
    title: 'Online Form Filling Assistance',
    tag: 'UPSC, SSC, Banking, College',
    description: 'Error-free submissions for competitive exams, university admissions, and fee payments with preview checks.',
    requirements: 'Original certificates, scanned photo & active mobile',
    turnaround: 'Complete verification before submit',
    icon: 'clipboard-list'
  },
  {
    id: 'photo-printing',
    category: 'printing',
    title: 'Passport Photo Printing',
    tag: 'Studio Quality Instant',
    description: 'Instant passport and visa-compliant photos, plus image compression and dimension formatting for online portals.',
    requirements: 'Walk-in for instant capture or send digital portrait',
    turnaround: '5 minutes ready',
    icon: 'camera'
  },
  {
    id: 'lamination-services',
    category: 'printing',
    title: 'Lamination & Spiral Binding',
    tag: 'Protective Document Care',
    description: 'Heavy thermal hot pouch lamination for marksheets and certificates, plus transparent front spiral binding.',
    requirements: 'Physical document or printed sheets',
    turnaround: '5 minutes per item',
    icon: 'layers'
  }
];

// Document Checklist Reference Guide for Services Page
export const SERVICE_CHECKLISTS = [
  {
    category: 'Government Documentation',
    icon: 'file-text',
    items: [
      {
        service: 'Aadhaar Demographic Updates',
        documents: ['Original Aadhaar Card', 'Mobile phone linked with Aadhaar (active for OTP)', 'Proof of Address (electricity bill, bank passbook, or voter ID)']
      },
      {
        service: 'New PAN Card Application',
        documents: ['Aadhaar Card (name and DOB must match)', '2 identical color passport photos (recent)', 'Mobile number for e-sign verification']
      },
      {
        service: 'Passport Seva Booking',
        documents: ['10th Standard Marks Card (for Non-ECR)', 'Aadhaar Card & PAN Card', 'Bank Passbook / Rent Agreement for current address']
      },
      {
        service: 'E-District Revenue Certificates',
        documents: ['Ration Card / Family card copy', 'Aadhaar Cards of applicant & head of household', 'Salary certificate or Village Administrative Officer slip']
      }
    ]
  },
  {
    category: 'Travel & Ticket Booking',
    icon: 'compass',
    items: [
      {
        service: 'Train Ticket / Tatkaal Booking',
        documents: ['Passenger full names and exact ages', 'Berth preferences (Lower, Middle, Upper, Side)', 'Aadhaar / Driving Licence numbers for verification']
      },
      {
        service: 'Bus Ticket Reservation',
        documents: ['Travel date & destination city', 'Preferred boarding point and operator preference', 'Active mobile number for immediate SMS ticket link']
      },
      {
        service: 'Domestic / International Flights',
        documents: ['Government ID matching passenger names exactly', 'Valid Passport with 6+ months validity for international flights', 'Cabin/Check-in baggage requirement preference']
      }
    ]
  },
  {
    category: 'Printing & Computer Services',
    icon: 'printer',
    items: [
      {
        service: 'Laser Printing & Document Xerox',
        documents: ['Digital file in PDF, DOCX, or JPEG', 'Bring via USB pendrive, or email to our center address', 'Or send directly to our official WhatsApp helpline']
      },
      {
        service: 'Online Exam & Job Applications',
        documents: ['Educational marksheets from 10th to degree', 'Community/Caste certificate if claiming reservation', 'Recent passport photo & signature on clean white paper']
      },
      {
        service: 'Document Scanning & Digitization',
        documents: ['Original certificates without creases', 'Mention required file size (e.g. under 200KB for portal uploads)', 'Choose single PDF or individual JPEG files']
      }
    ]
  }
];

// Center Milestones & Values for About Page
export const ABOUT_MILESTONES = [
  { value: '10+', label: 'Years in Service', hint: 'Serving our community continuously since 2014' },
  { value: '25,000+', label: 'Applications Handled', hint: 'Error-free submissions across state and central portals' },
  { value: '100%', label: 'Data Confidentiality', hint: 'Zero retention policy for personal files and IDs' },
  { value: '6 Days', label: 'Open Weekly', hint: 'Monday to Saturday with extended evening hours' }
];

export const ABOUT_VALUES = [
  {
    id: 'privacy',
    title: 'Strict Data Privacy & Security',
    description: 'We treat your personal records, identity cards, and phone numbers with utmost responsibility. Downloaded files and customer uploads are removed from our systems after work completion.',
    icon: 'shield-check'
  },
  {
    id: 'patience',
    title: 'Patient 1-on-1 Guidance',
    description: 'Government portals and online tests can be confusing. We sit with you to verify every spelling, date of birth, and requirement before clicking final submission.',
    icon: 'user-check'
  },
  {
    id: 'hardware',
    title: 'Commercial Hardware & Backups',
    description: 'Equipped with heavy-duty laser printers, optical sheet scanners, and uninterrupted power backup (UPS) so power cuts never interrupt your urgent work.',
    icon: 'zap'
  },
  {
    id: 'transparency',
    title: 'Upfront & Fair Pricing',
    description: 'Standard portal statutory fees are paid directly with official receipts provided. Our modest facilitation charges are clearly stated before we begin.',
    icon: 'check-circle'
  }
];

export const ABOUT_EQUIPMENT = [
  { name: 'Heavy-Duty Laser Printers', detail: 'High-speed 40+ PPM laser printing with sharp 1200 DPI resolution on 75/80 GSM paper.' },
  { name: 'Commercial Sheet & Flatbed Scanners', detail: 'Optical scanning up to 600 DPI for crisp, legally accepted PDF document submissions.' },
  { name: 'Thermal Pouch Laminators', detail: 'Heavy-gauge heat lamination providing lasting protection for marksheets and certificates.' },
  { name: 'Instant Studio Photo Printer', detail: 'Sublimation photo printing compliant with passport, visa, and exam portal standards.' },
  { name: 'Dual-Monitor Staff Stations', detail: 'Side-by-side screens allowing customers to review their entered details in real time before submission.' },
  { name: 'Inverter & Battery Backup', detail: 'Reliable uninterrupted power ensuring work continues seamlessly during sudden power outages.' }
];
