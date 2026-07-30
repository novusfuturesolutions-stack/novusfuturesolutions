import {
  User,
  ProfessionalProfile,
  CompanyProfile,
  ServiceListing,
  Job,
  Post,
  BlogPost,
  Notification,
  Message,
  VerificationRequest,
  CarRentalItem,
  LogisticsShipment,
  RecruitmentPlacement,
  GrowthStrategyItem
} from '../types';

export const CURRENT_USER: User = {
  id: 'u-1',
  name: 'Marcus Vance',
  email: 'marcus.vance@novusfuturesolutions.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
  headline: 'VP of Global Operations | Novus Future Solutions (NFS)',
  location: 'Dubai, UAE',
  country: 'United Arab Emirates',
  city: 'Dubai',
  phone: '+971 50 123 4567',
  verified: true,
  verificationStatus: 'verified',
  createdAt: '2024-01-15'
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'u-2',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@nfs-partner.com',
    role: 'company',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    headline: 'Fleet Procurement Director',
    location: 'London, UK',
    country: 'United Kingdom',
    city: 'London',
    phone: '+44 20 7946 0912',
    verified: true,
    verificationStatus: 'verified',
    createdAt: '2024-02-10'
  },
  {
    id: 'u-3',
    name: 'Captain Robert Vance',
    email: 'robert.vance@nfs-staff.com',
    role: 'professional',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    headline: 'Senior Heavy Commercial Driver',
    location: 'Dubai, UAE',
    country: 'United Arab Emirates',
    city: 'Dubai',
    phone: '+971 50 987 6543',
    verified: true,
    verificationStatus: 'verified',
    createdAt: '2024-03-01'
  },
  {
    id: 'u-4',
    name: 'Apex Fleet Logistics',
    email: 'contact@apexfleet.com',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    headline: 'Certified Carrier & Rental Fleet Partner',
    location: 'Riyadh, KSA',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    phone: '+966 11 234 5678',
    verified: true,
    verificationStatus: 'verified',
    createdAt: '2024-01-20'
  }
];

export const MOCK_PROFESSIONAL_PROFILES: ProfessionalProfile[] = [
  {
    userId: 'u-3',
    name: 'Captain Robert Vance',
    headline: 'Senior Heavy Commercial CDL Master Driver',
    category: 'Heavy Fleet Driver',
    experienceYears: 14,
    availability: 'available',
    openToWork: true,
    bio: '14+ years operating heavy articulated multi-axle trucks across GCC border routes with flawless safety records.',
    skills: ['Heavy Truck Driving', 'Customs Clearance', 'Telematics Log', 'Route Optimization'],
    licenses: [
      {
        id: 'lic-1',
        type: 'CDL Class A Heavy Trailer',
        number: 'UAE-CDL-99482',
        issuingAuthority: 'RTA Dubai',
        expiryDate: '2028-12-31',
        verified: true
      }
    ],
    certificates: [],
    experiences: [],
    preferredLocations: ['UAE', 'Saudi Arabia', 'UK'],
    languages: ['English', 'Arabic'],
    connectionsCount: 1420,
    followersCount: 3800,
    profileCompletionScore: 95,
    privacy: { showEmail: true, showPhone: true, showCV: true }
  }
];

export const MOCK_COMPANIES: CompanyProfile[] = [
  {
    id: 'comp-1',
    userId: 'u-2',
    name: 'Apex Global Mobility & Logistics',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Enterprise Fleet & Freight Operations',
    description: 'Strategic partner of Novus Future Solutions operating over 500+ commercial vehicles.',
    industry: 'Logistics Recruitment & Freight Transport',
    companySize: '250-500 employees',
    headquarters: 'Dubai, UAE',
    country: 'United Arab Emirates',
    city: 'Dubai',
    website: 'https://novusfuturesolutions.com',
    email: 'contact@novusfuturesolutions.com',
    phone: '+971 4 800 6688',
    registrationNumber: 'NFS-REG-88941',
    verified: true,
    followersCount: 12400,
    employeesCount: 350,
    activeJobsCount: 12,
    featured: true
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'u-1',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    authorHeadline: 'VP of Global Operations | Novus Future Solutions (NFS)',
    authorRole: 'admin',
    authorVerified: true,
    postType: 'text',
    content: 'Novus Future Solutions (NFS) is expanding its verified logistics talent network across Dubai and London, connecting transport employers with qualified drivers and operations professionals.',
    hashtags: ['NFS', 'LogisticsJobs', 'Drivers', 'Recruitment', 'Growth'],
    reactions: { like: 48, support: 12, celebrate: 25, insightful: 19 },
    userReaction: 'like',
    comments: [
      {
        id: 'c-1',
        authorId: 'u-2',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        authorRole: 'company',
        content: 'Exceptional service! Our corporate fleet lease was delivered flawlessly.',
        createdAt: '2 hours ago'
      }
    ],
    sharesCount: 14,
    createdAt: '2026-07-27T10:00:00Z'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'u-2',
    senderName: 'Sarah Jenkins',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    receiverId: 'u-1',
    content: 'Hello Marcus, we would like to confirm the shortlist for our ten-driver recruitment campaign next week.',
    read: true,
    createdAt: '2026-07-28T09:30:00Z'
  }
];

export const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'ver-1',
    userId: 'u-3',
    userName: 'Captain Robert Vance',
    userEmail: 'robert.vance@nfs-staff.com',
    role: 'professional',
    documentType: 'cdl_license',
    documentNumber: 'UAE-CDL-99482',
    documentUrl: '/sample-cdl.pdf',
    status: 'verified',
    submittedAt: '2026-07-10T12:00:00Z',
    notes: 'CDL Class A and Heavy Articulated Trailer Clearance Verified by RTA'
  }
];

/* NFS Pillar 1: Car Rentals Fleet */
export const MOCK_CAR_RENTALS: CarRentalItem[] = [
  {
    id: 'car-101',
    make: 'Mercedes-Benz',
    model: 'S-Class S580 Luxury',
    year: 2025,
    category: 'Luxury Sedan',
    dailyRate: 350,
    monthlyRate: 7500,
    currency: 'USD',
    transmission: 'Automatic',
    passengers: 5,
    fuelType: 'Hybrid',
    unlimitedKm: true,
    features: ['Chauffeur Available', 'Massage Seats', 'Panoramic Sunroof', 'Burmester Surround', 'GPS Navigation'],
    image: '/images/nfs-car-rentals.png',
    available: true,
    location: 'Dubai Airport Terminal 3 / Downtown Hub',
    rating: 4.95,
    reviewsCount: 142
  },
  {
    id: 'car-102',
    make: 'Range Rover',
    model: 'Autobiography P530 V8',
    year: 2025,
    category: 'SUV & 4x4',
    dailyRate: 420,
    monthlyRate: 9200,
    currency: 'USD',
    transmission: 'Automatic',
    passengers: 7,
    fuelType: 'Petrol',
    unlimitedKm: true,
    features: ['All-Terrain AWD', 'Executive Rear Seating', 'Cool Box', 'Head-up Display', 'Air Suspension'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    available: true,
    location: 'Abu Dhabi / Dubai Marina Hub',
    rating: 4.98,
    reviewsCount: 98
  },
  {
    id: 'car-103',
    make: 'Tesla',
    model: 'Model X Plaid Dual-Motor',
    year: 2025,
    category: 'Sports / Electric',
    dailyRate: 290,
    monthlyRate: 6400,
    currency: 'USD',
    transmission: 'Automatic',
    passengers: 6,
    fuelType: 'Electric',
    unlimitedKm: true,
    features: ['Falcon Wing Doors', 'Autopilot Full Self-Drive', 'Supercharging Included', '0-60 in 2.5s'],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    available: true,
    location: 'Riyadh Financial District / Dubai Hub',
    rating: 4.88,
    reviewsCount: 116
  },
  {
    id: 'car-104',
    make: 'Mercedes-Benz',
    model: 'V-Class V300d Extra Long Executive',
    year: 2024,
    category: 'Executive Van',
    dailyRate: 310,
    monthlyRate: 6800,
    currency: 'USD',
    transmission: 'Automatic',
    passengers: 8,
    fuelType: 'Diesel',
    unlimitedKm: true,
    features: ['Conference Seating', 'WiFi Onboard', 'Luggage Capacity 10+ Bags', 'Privacy Glass'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    available: true,
    location: 'London Heathrow / Dubai Media City',
    rating: 4.92,
    reviewsCount: 84
  },
  {
    id: 'car-105',
    make: 'Ford',
    model: 'Transit Heavy Cargo Van 350',
    year: 2024,
    category: 'Commercial Cargo',
    dailyRate: 150,
    monthlyRate: 3200,
    currency: 'USD',
    transmission: 'Automatic',
    passengers: 3,
    fuelType: 'Diesel',
    unlimitedKm: false,
    features: ['High Roof Cargo', 'Hydraulic Lift', 'Tie-Down Anchor System', 'GPS Fleet Tracker'],
    image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&q=80&w=800',
    available: true,
    location: 'Mumbai Port / Dubai Industrial City',
    rating: 4.81,
    reviewsCount: 65
  }
];

/* NFS Pillar 2: Freight & Logistics Active Routes */
export const MOCK_LOGISTICS_ROUTES: LogisticsShipment[] = [
  {
    id: 'log-201',
    trackingCode: 'NFS-LOG-8849-DXB',
    title: 'Cross-Border Heavy Freight Transport',
    serviceType: 'Heavy Trucking',
    origin: 'Dubai Jebel Ali Port, UAE',
    destination: 'Riyadh Dry Port, KSA',
    cargoWeightTon: 28,
    estimatedDays: 2,
    ratePerTonKm: 0.85,
    currency: 'USD',
    status: 'In Transit',
    image: '/images/nfs-logistics.png',
    features: ['GPS Real-Time Tracking', 'Customs Clearance Escort', 'Hazmat Certified Trailer', '24/7 Driver Telematics']
  },
  {
    id: 'log-202',
    trackingCode: 'NFS-LOG-9102-MUM',
    title: 'Cold Chain Express Pharmaceutical Corridor',
    serviceType: 'Cold Chain Express',
    origin: 'Mumbai Jawaharlal Nehru Port, IN',
    destination: 'Delhi NCR Logistics Hub, IN',
    cargoWeightTon: 18,
    estimatedDays: 1,
    ratePerTonKm: 1.15,
    currency: 'USD',
    status: 'Scheduled',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    features: ['Temperature Controlled (-20C to +4C)', 'IoT Thermal Sensors', 'Biomedical Cargo Seal']
  },
  {
    id: 'log-203',
    trackingCode: 'NFS-LOG-4412-LON',
    title: 'Intermodal Container Cargo Shipping',
    serviceType: 'Sea Freight',
    origin: 'Rotterdam Port, NL',
    destination: 'London Gateway Port, UK',
    cargoWeightTon: 45,
    estimatedDays: 3,
    ratePerTonKm: 0.65,
    currency: 'USD',
    status: 'In Transit',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
    features: ['40ft High Cube Container', 'Port Handling Escort', 'Full Insurance Coverage Included']
  }
];

/* NFS Pillar 3: Recruitment & Staffing Candidates */
export const MOCK_RECRUITMENT_PLACEMENTS: RecruitmentPlacement[] = [
  {
    id: 'rec-301',
    candidateName: 'Captain Robert Vance',
    role: 'Senior Heavy Transport Master Driver',
    pillar: 'recruitment',
    category: 'Heavy Fleet Driver',
    experienceYears: 14,
    licenseType: 'CDL Class A + ADR Hazmat & Heavy Oversize Clearance',
    expectedSalary: '$5,200 / month',
    location: 'Dubai, UAE (Open to Relocation across GCC)',
    availability: 'Immediate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    skills: ['Heavy Articulated Trucking', 'Cross-Border Customs', 'Route Optimization', 'Telematics Safety'],
    verified: true
  },
  {
    id: 'rec-302',
    candidateName: 'Elena Rostova',
    role: 'International Freight Dispatcher & Fleet Controller',
    pillar: 'recruitment',
    category: 'Logistics Dispatcher',
    experienceYears: 8,
    licenseType: 'IATA & FMC Logistics Specialist Certification',
    expectedSalary: '$4,800 / month',
    location: 'London, UK (Hybrid / Remote)',
    availability: '2 Weeks Notice',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    skills: ['TMS Software Mastery', 'Multi-Carrier Dispatch', 'Freight Cost Negotiation', 'Automated Driver Scheduling'],
    verified: true
  },
  {
    id: 'rec-303',
    candidateName: 'Siddharth Nair',
    role: 'Head Fleet Mechanical & Systems Engineer',
    pillar: 'recruitment',
    category: 'Fleet Engineer',
    experienceYears: 11,
    licenseType: 'ASE Master Heavy Duty Mechanical Engineer',
    expectedSalary: '$6,000 / month',
    location: 'Mumbai, India',
    availability: 'Immediate',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    skills: ['Heavy Engine Overhaul', 'Preventative Diagnostics', 'EV Fleet Conversion', 'Safety Compliance Audit'],
    verified: true
  }
];

/* NFS Pillar 4: Business Growth & Consulting */
export const MOCK_GROWTH_SOLUTIONS: GrowthStrategyItem[] = [
  {
    id: 'gro-401',
    title: 'Enterprise Fleet Efficiency & Fuel Reduction Program',
    focusArea: 'Fleet Optimization',
    description: 'Transform fleet performance, reduce fuel expenditure by up to 24%, and automate maintenance schedules using telemetry and AI route dispatch.',
    metricImpact: '24% Cost Reduction | 99.8% On-Time Delivery',
    caseStudyClient: 'Apex Global Logistics GCC',
    durationMonths: 6,
    image: '/images/nfs-growth.png',
    features: ['AI Telematics Integration', 'Driver Performance Analytics', 'Predictive Maintenance Modules', 'CO2 Footprint Minimization']
  },
  {
    id: 'gro-402',
    title: 'Cross-Border Supply Chain Expansion Strategy',
    focusArea: 'Logistics Network Expansion',
    description: 'Custom advisory for logistics firms entering GCC, European, and South Asian transport corridors with pre-vetted custom clearing partners.',
    metricImpact: '3.4x Network Reach | 45% Faster Clearance',
    caseStudyClient: 'TransEuro Freight Systems',
    durationMonths: 12,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    features: ['Market Access Authorization', 'Partner Network Pairing', 'Regulatory & Tax Optimization']
  },
  {
    id: 'gro-403',
    title: 'Rapid Workforce Scaling & Manpower Placement',
    focusArea: 'Workforce Scaling',
    description: 'Dedicated recruitment drive providing 100+ CDL licensed drivers, dispatchers, and warehouse personnel within 30 days.',
    metricImpact: '100+ Staff Deployed in 30 Days',
    caseStudyClient: 'Middle East Distribution Hub',
    durationMonths: 3,
    image: '/images/nfs-recruitment.png',
    features: ['Pre-Screened Skill Verification', 'Visa & Relocation Escort', 'Onboarding & Driver Orientation']
  }
];

/* Service Listings for Services Catalog */
export const MOCK_SERVICES: ServiceListing[] = [
  {
    id: 'srv-1',
    providerId: 'nfs-official',
    providerName: 'Novus Future Solutions (NFS)',
    providerAvatar: '/images/nfs-logo.png',
    providerRole: 'company',
    title: 'Logistics Candidate Verification & Placement Support',
    category: 'recruitment',
    description: 'Identity, licence, experience, and role-readiness checks for drivers, dispatchers, warehouse teams, and fleet professionals.',
    startingPrice: 350,
    currency: 'USD',
    priceUnit: 'per verified candidate',
    serviceArea: 'Global Talent Network',
    rating: 4.96,
    reviewsCount: 230,
    deliveryTime: '2 - 5 Business Days',
    verified: true,
    features: ['Identity Verification', 'Licence Review', 'Experience Screening', 'Employer-Ready Profile'],
    image: '/images/recruitment-real-v2.png'
  },
  {
    id: 'srv-2',
    providerId: 'nfs-official',
    providerName: 'Novus Future Solutions (NFS)',
    providerAvatar: '/images/nfs-logo.png',
    providerRole: 'company',
    title: 'Global Heavy Cargo & Cross-Border Freight Logistics',
    category: 'logistics',
    description: 'End-to-end heavy truck freight transport, customs clearance, and container shipping across international corridors.',
    startingPrice: 850,
    currency: 'USD',
    priceUnit: 'per shipment',
    serviceArea: 'Worldwide Routes',
    rating: 4.94,
    reviewsCount: 310,
    deliveryTime: '1 - 3 Days Express Freight',
    verified: true,
    features: ['GPS Live Telematics', 'Customs Port Escort', 'Hazmat & Cold Storage Options', 'Cargo Cargo Loss Guarantee'],
    image: '/images/nfs-logistics.png'
  },
  {
    id: 'srv-3',
    providerId: 'nfs-official',
    providerName: 'Novus Future Solutions (NFS)',
    providerAvatar: '/images/nfs-logo.png',
    providerRole: 'company',
    title: 'CDL Heavy Driver & Corporate Manpower Recruitment',
    category: 'recruitment',
    description: 'Pre-vetted, licensed heavy commercial drivers, dispatchers, warehouse managers, and technical staff placement for corporate transport companies.',
    startingPrice: 1200,
    currency: 'USD',
    priceUnit: 'per successful candidate',
    serviceArea: 'Global Talent Sourcing',
    rating: 4.98,
    reviewsCount: 180,
    deliveryTime: '7 - 14 Days Placement',
    verified: true,
    features: ['Background & Medical Clearance', 'License Verification', 'Replacement Guarantee', 'Visa & Work Permit Logistics'],
    image: '/images/nfs-recruitment.png'
  },
  {
    id: 'srv-4',
    providerId: 'nfs-official',
    providerName: 'Novus Future Solutions (NFS)',
    providerAvatar: '/images/nfs-logo.png',
    providerRole: 'company',
    title: 'Enterprise Growth Consulting & Fleet Scalability Advisory',
    category: 'growth',
    description: 'Data-driven business growth strategies, TMS software implementation, fleet fuel optimization, and international market expansion consulting.',
    startingPrice: 2500,
    currency: 'USD',
    priceUnit: 'per advisory retainer',
    serviceArea: 'Global Corporate Advisory',
    rating: 4.99,
    reviewsCount: 95,
    deliveryTime: 'Custom Program',
    verified: true,
    features: ['Dedicated Growth Strategist', 'ROI & Cost Analysis', 'Custom Telematics Integration', 'Executive Board Reports'],
    image: '/images/nfs-growth.png'
  }
];

/* Jobs Data for Careers & Recruitment Portal */
export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Senior Cross-Border CDL Class A Heavy Truck Driver',
    category: 'Heavy Transport & Logistics',
    location: 'Dubai to Riyadh Transport Route',
    country: 'United Arab Emirates',
    city: 'Dubai',
    salaryMin: 4500,
    salaryMax: 6200,
    currency: 'USD',
    salaryPeriod: 'month',
    jobType: 'Full-time',
    workMode: 'Travel-based',
    experienceLevel: '5+ Years',
    vacancies: 15,
    deadline: '2026-08-30',
    description: 'NFS is recruiting experienced CDL Class A drivers for heavy multi-axle trailers operating along the Dubai - Dammam - Riyadh logistics corridors.',
    responsibilities: [
      'Operate modern Volvo & Mercedes heavy articulated trucks safely across GCC borders',
      'Perform daily pre-trip vehicle safety inspection and log electronic telematics',
      'Ensure proper cargo tie-down, container locks, and customs seal integrity'
    ],
    requirements: [
      'Valid GCC Heavy Commercial License (CDL Class A or Heavy Trailer)',
      'Clean driving record with minimum 5 years cross-border experience',
      'Basic English communication skill'
    ],
    requiredSkills: ['Heavy Truck Driving', 'Border Customs', 'Route Planning', 'Telematics Log'],
    requiredLicenses: ['CDL Class A Heavy Vehicle', 'Hazmat Permit'],
    benefits: ['Free Shared Accommodation', 'Health Insurance', 'Annual Flight Ticket', 'Trip Performance Bonuses'],
    visaSponsorship: true,
    accommodationProvided: true,
    foodAllowance: true,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-25',
    applicantsCount: 42,
    status: 'active'
  },
  {
    id: 'job-2',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Fleet Operations & Transport Dispatch Coordinator',
    category: 'Fleet Operations & Logistics',
    location: 'London Headquarters',
    country: 'United Kingdom',
    city: 'London',
    salaryMin: 38000,
    salaryMax: 48000,
    currency: 'GBP',
    salaryPeriod: 'year',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: '3+ Years',
    vacancies: 4,
    deadline: '2026-09-15',
    description: 'Coordinate commercial fleet movements, driver schedules, delivery windows, and transport operations across London and UK logistics hubs.',
    responsibilities: [
      'Coordinate commercial vehicle dispatch and driver schedules',
      'Monitor delivery windows, route changes, and maintenance requirements',
      'Communicate with drivers, customers, and depot teams'
    ],
    requirements: [
      'Degree or diploma in Logistics, Transport, or Hospitality Management',
      'Minimum 3 years in fleet management, dispatch, or transport operations',
      'Proficiency in TMS and Fleet Booking Software'
    ],
    requiredSkills: ['Fleet Dispatch', 'Customer Relations', 'Booking Management', 'UK Traffic Regulations'],
    requiredLicenses: ['UK Driver License'],
    benefits: ['Company Vehicle Allowance', 'Private Medical Insurance', 'Performance Bonus'],
    visaSponsorship: false,
    accommodationProvided: false,
    foodAllowance: false,
    urgentHiring: false,
    verifiedCompany: true,
    postedAt: '2026-07-20',
    applicantsCount: 28,
    status: 'active'
  },
  {
    id: 'job-3',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Enterprise Growth & Business Development Consultant',
    category: 'Growth Consulting',
    location: 'Dubai & Remote',
    country: 'United Arab Emirates',
    city: 'Dubai',
    salaryMin: 80000,
    salaryMax: 110000,
    currency: 'USD',
    salaryPeriod: 'year',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: '6+ Years',
    vacancies: 2,
    deadline: '2026-09-30',
    description: 'Drive B2B growth for NFS recruitment, logistics, and workforce solutions for transport employers and multinational operators.',
    responsibilities: [
      'Identify enterprise corporate clients needing fleet, transport, or staffing solutions',
      'Structure multi-year service contracts and growth consulting packages',
      'Collaborate with operations leaders to ensure 100% SLA compliance'
    ],
    requirements: [
      'Proven track record in corporate B2B sales or supply chain consulting',
      'Strong network in transport, manufacturing, or corporate real estate',
      'Excellent negotiation and presentation skills'
    ],
    requiredSkills: ['B2B Sales', 'Key Account Management', 'Growth Strategy', 'Contract Negotiation'],
    requiredLicenses: [],
    benefits: ['Generous Uncapped Commission', 'Global Travel Allowance', 'Stock Options'],
    visaSponsorship: true,
    accommodationProvided: false,
    foodAllowance: false,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-22',
    applicantsCount: 19,
    status: 'active'
  },
  {
    id: 'job-4',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Customs Clearance & FASAH Brokerage Specialist',
    category: 'Customs & Port Freight',
    location: 'Dubai Jebel Ali Port Freezone',
    country: 'United Arab Emirates',
    city: 'Dubai',
    salaryMin: 4200,
    salaryMax: 5500,
    currency: 'USD',
    salaryPeriod: 'month',
    jobType: 'Full-time',
    workMode: 'On-site',
    experienceLevel: '4+ Years',
    vacancies: 8,
    deadline: '2026-09-25',
    description: 'Manage sea & air customs clearance, FASAH portal documentation, and port authority inspections for commercial cargo.',
    responsibilities: [
      'Submit customs declarations via FASAH and Dubai Trade portals',
      'Inspect bills of lading, commercial invoices, and certificates of origin',
      'Coordinate with port authority customs inspectors for immediate clearance'
    ],
    requirements: [
      'Certified Customs Broker License or FASAH Clearance accreditation',
      'Minimum 4 years experience in sea/air cargo customs brokerage',
      'Fluent in English and Arabic'
    ],
    requiredSkills: ['Customs Clearance', 'FASAH Portal', 'Sea Freight Docs', 'Import/Export Tariff'],
    requiredLicenses: ['Customs Broker Accreditation'],
    benefits: ['Health & Life Insurance', 'Overtime Allowance', 'Annual Paid Leave'],
    visaSponsorship: true,
    accommodationProvided: false,
    foodAllowance: true,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-28',
    applicantsCount: 34,
    status: 'active'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'future-of-fleet-management-and-logistics-2026',
    title: 'The Future of Logistics Recruitment in 2026',
    summary: 'How verified skills, faster hiring workflows, and workforce data are changing logistics recruitment.',
    content: 'Logistics employers need qualified people faster, while candidates need clearer and more trustworthy opportunities. NFS brings verified profiles, direct applications, and industry-focused recruitment tools into one connected platform...',
    category: 'Industry Insights',
    authorName: 'Marcus Vance',
    authorTitle: 'VP of Global Operations, NFS',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    readTime: '5 min read',
    image: '/images/nfs-growth.png',
    publishedAt: '2026-07-15',
    tags: ['Logistics', 'Recruitment', 'Drivers', 'Growth']
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'u-1',
    type: 'system',
    title: 'Welcome to Novus Future Solutions (NFS)',
    message: 'Explore verified logistics vacancies, employer hiring tools, industry services, and growth support.',
    read: false,
    createdAt: '10 minutes ago'
  },
  {
    id: 'notif-2',
    userId: 'u-1',
    type: 'job_alert',
    title: 'New Employer Inquiry Received',
    message: 'A verified transport employer has requested support for a multi-role logistics recruitment campaign.',
    read: false,
    createdAt: '1 hour ago'
  }
];
