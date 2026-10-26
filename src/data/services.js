/**
 * Comprehensive Services & Business Catalog
 * Theme: Crisp White & #20A7DB Cyan Blue
 * Brand: Jose Computers (Education, Insurance, E-Sevai, CSC, Aadhar Centre)
 * Travel Division: Jose Tours & Travels
 * Location: Rajiv Junction, Karungal - 629157
 */

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', icon: 'grid' },
  { id: 'govt', label: 'Government & CSC', icon: 'file-text' },
  { id: 'travel', label: 'Travel Services', icon: 'compass' },
  { id: 'education', label: 'Education Services', icon: 'graduation-cap' },
  { id: 'printing', label: 'Printing & Computer', icon: 'printer' }
];

// Featured Categories for Visual Showcase Cards
export const FEATURED_CATEGORIES = [
  {
    id: 'govt',
    title: 'Government & E-Sevai Documentation',
    tag: 'Aadhaar • PAN • CSC • E-District • Insurance',
    description: 'Expert, error-free guidance for government portal applications, renewals, CSC schemes, and certified downloads.',
    imageKey: 'govt',
    count: '11 Services'
  },
  {
    id: 'travel',
    title: 'Jose Tours & Travel Services',
    tag: 'Passport • Visa • Stamping • Attestation • Flight & Train',
    description: 'Comprehensive international & domestic travel: Passport, Visa, Stamping, Attestation, Emigration, Medical, Flights & IRCTC train tickets.',
    imageKey: 'travel',
    count: '10 Services'
  },
  {
    id: 'education',
    title: 'Education & Admission Services',
    tag: 'College Counseling • Job Exams • Scholarships',
    description: 'Professional online counseling applications, competitive exam registrations, school/college scholarships, and university portal facilitation.',
    imageKey: 'education',
    count: '7 Services'
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
    requirement: 'Aadhaar card & passport photos',
    description: 'Fresh individual PAN, signature/photo updates, and instant e-PAN generation.'
  },
  {
    id: 'passport-travel-service',
    title: 'Passport Application & Slot Booking',
    category: 'Travel Services',
    turnaround: 'Instant Slot Slip',
    icon: 'globe',
    requirement: '10th certificate, Aadhaar, PAN & address proof',
    description: 'Fresh passport online filing, normal and Tatkaal appointment booking at PSK / POPSK.'
  },
  {
    id: 'visa-attestation-service',
    title: 'Visa & Certificate Attestation',
    category: 'Travel Services',
    turnaround: 'End-to-End Tracking',
    icon: 'award',
    requirement: 'Original degrees/certificates & passport copy',
    description: 'Tourist & visit visa filing, HRD, MEA Apostille, and Embassy attestation.'
  },
  {
    id: 'college-admissions-service',
    title: 'College Counseling & Admission Forms',
    category: 'Education Services',
    turnaround: 'Verified Submission',
    icon: 'graduation-cap',
    requirement: 'Marksheets, TC, community certificate & photo',
    description: 'Online applications for Engineering (TNEA), Arts & Science, Polytechnic, and ITI counseling.'
  },
  {
    id: 'irctc-tickets',
    title: 'Train Ticket & Tatkaal Booking',
    category: 'Travel Services',
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
    category: 'Education & Jobs',
    turnaround: 'Careful Verification',
    icon: 'clipboard-list',
    requirement: 'Marksheets, photo & signature',
    description: 'Error-free application submissions for TNPSC, SSC, Banking, Police & Central portals.'
  }
];

export const SERVICES = [
  // ==================== GOVERNMENT & CSC SERVICES ====================
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
    requirements: 'Aadhaar card copy, passport size photographs & signature',
    turnaround: 'E-PAN in 48-72 hrs',
    icon: 'credit-card'
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
    id: 'insurance-services',
    category: 'govt',
    title: 'General & Vehicle Insurance Assistance',
    tag: 'CSC & Insurance Facilitation',
    description: 'Two-wheeler, car, and commercial vehicle insurance renewal, third-party and comprehensive policy issuance with instant printouts.',
    requirements: 'Previous RC book copy & expired policy details',
    turnaround: 'Instant policy certificate',
    icon: 'shield-plus'
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

  // ==================== TRAVEL SERVICES (JOSE TOURS & TRAVELS) ====================
  {
    id: 'passport-travel',
    category: 'travel',
    title: 'Passport Application, Renewal & Tatkaal',
    tag: 'Passport Seva • PSK / POPSK',
    description: 'Fresh passport online filing, appointment booking at PSK / POPSK, passport renewal, lost/damaged reissue, and police clearance certificate (PCC).',
    requirements: '10th certificate, Aadhaar card, PAN card, active mobile & address proof',
    turnaround: 'Slot booked immediately',
    icon: 'globe'
  },
  {
    id: 'visa-services',
    category: 'travel',
    title: 'Visa Application & Assistance',
    tag: 'Tourist, Visit & Work Visas',
    description: 'Complete documentation and online visa application assistance for UAE, Saudi Arabia, Qatar, Oman, Kuwait, Singapore, Malaysia, UK, US, and Europe.',
    requirements: 'Valid passport (6+ months), recent photograph (white background), flight itinerary & sponsor/travel details',
    turnaround: 'Filing in 24-48 hrs',
    icon: 'plane'
  },
  {
    id: 'visa-stamping',
    category: 'travel',
    title: 'Visa Stamping & Endorsement',
    tag: 'Embassy & Consulate Stamping',
    description: 'Guidance and processing for embassy/consulate visa stamping, work visa endorsement, and family residence stamping through authorized channels.',
    requirements: 'Original passport, visa approval copy, medical fitness report & authorized photos',
    turnaround: 'Submission receipt & tracking',
    icon: 'stamp'
  },
  {
    id: 'attestation-services',
    category: 'travel',
    title: 'Certificate & Document Attestation',
    tag: 'HRD, MEA Apostille & Embassy',
    description: 'State HRD, Ministry of External Affairs (MEA) Apostille, and Embassy attestation for educational degrees, marriage certificates, birth certificates, and commercial documents.',
    requirements: 'Original certificates, passport copy & authorization letter',
    turnaround: 'End-to-end tracking receipt',
    icon: 'award'
  },
  {
    id: 'emigration-services',
    category: 'travel',
    title: 'Emigration Clearance (ECR / ECNR)',
    tag: 'eMigrate & POE Facilitation',
    description: 'Online assistance for Protector of Emigrants (POE) clearance, eMigrate portal registration, insurance verification, and overseas worker clearance.',
    requirements: 'Passport (ECR category), employment contract/visa, Pravasi insurance & photo',
    turnaround: 'Official portal submission',
    icon: 'folder-check'
  },
  {
    id: 'travel-medical',
    category: 'travel',
    title: 'Travel Medical Examination (GAMCA)',
    tag: 'GAMCA / Authorized Clinic Appointments',
    description: 'GAMCA medical slip generation, GCC approved medical test appointment scheduling, clinic coordination, and digital medical fit certificate assistance.',
    requirements: 'Original passport, visa copy & recent passport photos',
    turnaround: 'Immediate appointment slip',
    icon: 'stethoscope'
  },
  {
    id: 'flight-booking',
    category: 'travel',
    title: 'Air Ticket Booking (Domestic & International)',
    tag: 'Worldwide Flights & Web Check-In',
    description: 'Competitive flight fares for Gulf, Southeast Asia, domestic and global routes, extra baggage addition, seat selection, and boarding pass printout.',
    requirements: 'Full name as per passport/ID, preferred travel dates & contact number',
    turnaround: 'Instant e-ticket & tax invoice',
    icon: 'plane'
  },
  {
    id: 'train-booking',
    category: 'travel',
    title: 'Train Ticket & Tatkaal Booking',
    tag: 'IRCTC Authorized Assistance',
    description: 'Confirmed train reservations across 1A, 2A, 3A, CC, SL classes, Tatkaal advisory, cancellation processing, and instant PNR status updates.',
    requirements: 'Passenger names, ages, berth preference & government ID details',
    turnaround: 'Instant printed ticket',
    icon: 'train'
  },
  {
    id: 'bus-booking',
    category: 'travel',
    title: 'Bus Ticket Booking',
    tag: 'RTC & Private Operators',
    description: 'Seat reservations for government RTCs and private AC sleeper/semi-sleeper buses across Tamil Nadu, Kerala, Bangalore, and Chennai.',
    requirements: 'Passenger full names, contact mobile & preferred boarding point',
    turnaround: 'Instant ticket printout',
    icon: 'bus'
  },
  {
    id: 'other-travel',
    category: 'travel',
    title: 'Travel Packages & Cab Bookings',
    tag: 'Hotels & Outstation Cabs',
    description: 'Family hotel reservations, pilgrimage darshan bookings, airport pickup/drop cabs, and verified outstation cab coordination.',
    requirements: 'Destination details, passenger count & travel dates',
    turnaround: 'Same-day confirmation',
    icon: 'map-pin'
  },

  // ==================== EDUCATION SERVICES ====================
  {
    id: 'college-admissions',
    category: 'education',
    title: 'School & College Online Admissions',
    tag: 'TNEA Engineering, Arts & Medical Counseling',
    description: 'Complete online application filing for Engineering (TNEA), Arts & Science colleges, Medical (NEET counseling registration), Polytechnic, ITI, and B.Ed admissions.',
    requirements: '10th & 12th marksheets, Transfer Certificate (TC), Community Certificate & Aadhaar',
    turnaround: 'Verified submission & printout',
    icon: 'graduation-cap'
  },
  {
    id: 'competitive-exams',
    category: 'education',
    title: 'Competitive Exam & Govt Job Form Filing',
    tag: 'UPSC, TNPSC, SSC, Banking, Police',
    description: 'Error-free online application submissions for TNPSC (Group 1, 2, 4), UPSC, SSC (CGL, CHSL), Banking (IBPS, SBI), Railways (RRB), TRB, TET, and Police recruitment.',
    requirements: 'Educational certificates, scanned passport photo, signature & Aadhaar',
    turnaround: 'Complete verification before submit',
    icon: 'clipboard-list'
  },
  {
    id: 'scholarship-services',
    category: 'education',
    title: 'Student Scholarship Online Applications',
    tag: 'NSP, Post-Matric & State Scholarships',
    description: 'Filing for National Scholarship Portal (NSP), Post-Matric & Pre-Matric scholarships, First Graduate fee concession, Minority scholarships, and welfare board grants.',
    requirements: 'Income certificate, community certificate, bank passbook (Aadhaar-linked), marksheet & fee receipt',
    turnaround: 'Official portal receipt',
    icon: 'heart-handshake'
  },
  {
    id: 'distance-education',
    category: 'education',
    title: 'Distance Education & University Services',
    tag: 'MSU, Annamalai, IGNOU, MKU',
    description: 'Enrollment assistance, distance degree admission forms, semester exam applications, fee payments, and study material coordination for regional and open universities.',
    requirements: 'Previous educational certificates, TC, ID proof & recent photos',
    turnaround: 'Same-day filing & acknowledgement',
    icon: 'book-open'
  },
  {
    id: 'hall-tickets',
    category: 'education',
    title: 'Admit Card & Exam Result Downloads',
    tag: 'Instant Hall Tickets & Scorecards',
    description: 'Fast retrieval and crisp laser printing of exam admit cards, hall tickets, rank cards, entrance exam results, and college allotment orders.',
    requirements: 'Registration number / Roll number & Date of Birth / password',
    turnaround: 'Instant print in 2 minutes',
    icon: 'download-cloud'
  },
  {
    id: 'educational-certificates',
    category: 'education',
    title: 'Student Certificate Documentation',
    tag: 'First Graduate, Nativity, Bonafide',
    description: 'Online applications for First Graduate Certificate, Community, Nativity & Income certificates required for school/college counseling and fee waivers.',
    requirements: 'Ration card, parents’ educational proofs, Aadhaar cards & school certificates',
    turnaround: 'CAN number & revenue acknowledgement',
    icon: 'file-check'
  },
  {
    id: 'computer-literacy',
    category: 'education',
    title: 'Computer Literacy & Digital Training Guidance',
    tag: 'MS Office, Typing & Digital Skills',
    description: 'Guidance and practice assistance for basic computer fundamentals, MS Office (Word, Excel, PowerPoint), Tamil & English keyboard typing, and internet awareness.',
    requirements: 'Open to students, job seekers, and beginners',
    turnaround: 'Personal orientation available',
    icon: 'layers'
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
    category: 'Government & E-Sevai Documentation',
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
        service: 'Vehicle & General Insurance Renewal',
        documents: ['Vehicle Registration Certificate (RC copy)', 'Previous expired/active insurance policy copy', 'Owner Aadhaar/PAN details']
      },
      {
        service: 'E-District Revenue Certificates',
        documents: ['Ration Card / Family card copy', 'Aadhaar Cards of applicant & head of household', 'Salary certificate or Village Administrative Officer slip']
      }
    ]
  },
  {
    category: 'Jose Tours & Travel Services',
    icon: 'compass',
    items: [
      {
        service: 'Passport Application & Renewal',
        documents: ['10th Standard Marks Card (for Non-ECR status)', 'Original Aadhaar Card & PAN Card', 'Bank Passbook / Rent Agreement for address proof']
      },
      {
        service: 'Visa & Visa Stamping Assistance',
        documents: ['Valid passport with minimum 6 months validity', 'Recent color photographs with white background (specific size)', 'Job offer / invitation letter / flight booking itinerary']
      },
      {
        service: 'Certificate Attestation & Emigration',
        documents: ['Original Degree, Diploma or Marriage/Birth certificate', 'Passport copy of applicant', 'Employment visa & Pravasi insurance for ECR clearance']
      },
      {
        service: 'Air & IRCTC Train Tickets',
        documents: ['Full passenger names as per government ID', 'Exact travel dates, preferred times & destination city', 'Berth or seat preferences & active contact mobile']
      }
    ]
  },
  {
    category: 'Education & Admission Services',
    icon: 'graduation-cap',
    items: [
      {
        service: 'College & University Counseling (TNEA, Arts, Medical)',
        documents: ['10th and 12th standard original marksheets', 'Transfer Certificate (TC) & Conduct Certificate', 'Community Certificate & First Graduate Certificate (if applicable)', 'Recent passport size photos']
      },
      {
        service: 'Competitive Exam & Govt Job Form Filing',
        documents: ['Degree / educational marksheets from 10th to graduation', 'Community/Caste certificate for quota claim', 'Scanned passport photo & signature meeting size requirements']
      },
      {
        service: 'Student Scholarships (NSP, Post-Matric)',
        documents: ['Current year fee receipt & college ID card', 'Income certificate of parent / guardian', 'Aadhaar-linked bank passbook showing IFSC code', 'Previous year marksheets']
      },
      {
        service: 'Distance Education Admissions',
        documents: ['Original or provisional marksheets of qualifying exam', 'ID proof (Aadhaar/Voter ID)', 'Passport size photographs']
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
        service: 'Document Scanning & Digitization',
        documents: ['Original certificates without creases', 'Mention required file size (e.g. under 200KB for portal uploads)', 'Choose single PDF or individual JPEG files']
      },
      {
        service: 'Passport Photos & Lamination',
        documents: ['Walk in directly for instant studio portrait capture', 'Or bring soft copy photograph on phone/USB for photo sheet prints', 'Original marksheets for thermal heat lamination']
      }
    ]
  }
];

// Center Milestones & Values for About Page
export const ABOUT_MILESTONES = [
  { value: '10+', label: 'Years in Service', hint: 'Serving our community at Rajiv Junction since 2014' },
  { value: '30,000+', label: 'Applications Handled', hint: 'Error-free submissions across government, travel & education portals' },
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
    description: 'Government, travel, and university portals can be confusing. We sit with you to verify every spelling, date of birth, and requirement before clicking final submission.',
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

