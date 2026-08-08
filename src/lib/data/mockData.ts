import {
  User,
  ProfessionalProfile,
  CompanyProfile,
  ServiceListing,
  Job,
  JobCategory,
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

export const MOCK_CATEGORIES: JobCategory[] = [
  { id: 'cat-1', name: 'Technology & IT', slug: 'technology-it', description: 'Software engineering, cloud, AI, and IT infrastructure', iconName: 'Laptop', imageUrl: '/images/category-technology-it.png', featured: true },
  { id: 'cat-2', name: 'Healthcare & Medical', slug: 'healthcare-medical', description: 'Clinical nursing, medicine, and healthcare administration', iconName: 'Stethoscope', imageUrl: '/images/category-healthcare-medical.png', featured: true },
  { id: 'cat-3', name: 'Finance & Accounting', slug: 'finance-accounting', description: 'Financial auditing, accounting, banking, and tax', iconName: 'Coins', imageUrl: '/images/category-finance-accounting.png', featured: true },
  { id: 'cat-4', name: 'Engineering & Construction', slug: 'engineering-construction', description: 'MEP, civil, structural, and site management', iconName: 'Wrench', imageUrl: '/images/category-engineering-construction.png', featured: true },
  { id: 'cat-5', name: 'Sales & Marketing', slug: 'sales-marketing', description: 'B2B sales, corporate business development, and marketing', iconName: 'Briefcase', imageUrl: '/images/category-sales-marketing.png', featured: true },
  { id: 'cat-6', name: 'Logistics & Supply Chain', slug: 'logistics-supply-chain', description: 'Fleet operations, dispatch, CDL drivers, and warehousing', iconName: 'Truck', imageUrl: '/images/category-logistics-supply-chain.png', featured: true },
];

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
    headline: 'Global Talent Acquisition & HR Director',
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
    name: 'Dr. Robert Vance',
    email: 'robert.vance@nfs-staff.com',
    role: 'professional',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    headline: 'Senior Cloud Solutions Architect & Tech Lead',
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
    name: 'Apex Global Enterprises',
    email: 'contact@apexglobal.com',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    headline: 'Multi-Industry Corporate Recruitment Partner',
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
    name: 'Dr. Robert Vance',
    headline: 'Senior Cloud Solutions Architect & Full-Stack Lead',
    category: 'Technology & IT',
    experienceYears: 12,
    availability: 'available',
    openToWork: true,
    bio: '12+ years driving cloud architecture, microservices, and web platforms across GCC and European enterprise environments.',
    skills: ['Node.js', 'React / Next.js', 'AWS Cloud', 'System Architecture', 'PostgreSQL'],
    licenses: [
      {
        id: 'lic-1',
        type: 'AWS Certified Solutions Architect Professional',
        number: 'AWS-PROF-99482',
        issuingAuthority: 'Amazon Web Services',
        expiryDate: '2028-12-31',
        verified: true
      }
    ],
    certificates: [],
    experiences: [],
    preferredLocations: ['UAE', 'Saudi Arabia', 'UK', 'Remote'],
    languages: ['English', 'Arabic'],
    connectionsCount: 1850,
    followersCount: 4200,
    profileCompletionScore: 98,
    privacy: { showEmail: true, showPhone: true, showCV: true }
  }
];

export const MOCK_COMPANIES: CompanyProfile[] = [
  {
    id: 'comp-1',
    userId: 'u-2',
    name: 'Apex Global Enterprises',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    tagline: 'Multi-Industry Corporate Recruitment & Workforce Solutions',
    description: 'Enterprise staffing and global talent partner operating across Technology, Healthcare, Construction, Finance, and Supply Chain.',
    industry: 'Global Recruitment & Executive Staffing',
    companySize: '500+ employees',
    headquarters: 'Dubai, UAE',
    country: 'United Arab Emirates',
    city: 'Dubai',
    website: 'https://novusfuturesolutions.com',
    email: 'contact@novusfuturesolutions.com',
    phone: '+49 152 16405341 / +356 79379950',
    registrationNumber: 'NFS-REG-88941',
    verified: true,
    followersCount: 18400,
    employeesCount: 650,
    activeJobsCount: 24,
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
    content: 'Novus Future Solutions (NFS) is expanding its multi-industry talent network across Dubai, London, and Riyadh, connecting employers with verified professionals in Technology, Healthcare, Engineering, Finance, and Logistics.',
    hashtags: ['NFS', 'Careers', 'Hiring', 'Recruitment', 'GlobalJobs'],
    reactions: { like: 88, support: 24, celebrate: 45, insightful: 32 },
    userReaction: 'like',
    comments: [
      {
        id: 'c-1',
        authorId: 'u-2',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        authorRole: 'company',
        content: 'Exceptional recruitment platform! We placed 15 software engineers and healthcare specialists last month.',
        createdAt: '2 hours ago'
      }
    ],
    sharesCount: 28,
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
    content: 'Hello Marcus, we would like to confirm the shortlist for our engineering & tech recruitment drive next week.',
    read: true,
    createdAt: '2026-07-28T09:30:00Z'
  }
];

export const MOCK_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'ver-1',
    userId: 'u-3',
    userName: 'Dr. Robert Vance',
    userEmail: 'robert.vance@nfs-staff.com',
    role: 'professional',
    documentType: 'government_id',
    documentNumber: 'AWS-PROF-99482',
    documentUrl: '/sample-cert.pdf',
    status: 'verified',
    submittedAt: '2026-07-10T12:00:00Z',
    notes: 'AWS Certified Solutions Architect & Technical Credential Verified'
  }
];

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
  }
];

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
  }
];

export const MOCK_RECRUITMENT_PLACEMENTS: RecruitmentPlacement[] = [
  {
    id: 'rec-301',
    candidateName: 'Dr. Robert Vance',
    role: 'Senior Cloud Solutions Architect & Tech Lead',
    pillar: 'recruitment',
    category: 'Heavy Fleet Driver',
    experienceYears: 12,
    licenseType: 'AWS Solutions Architect Professional & PMP Certified',
    expectedSalary: '$8,500 / month',
    location: 'Dubai, UAE (Open to Remote / Relocation)',
    availability: 'Immediate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    skills: ['Cloud Architecture', 'Node.js / React', 'System Design', 'Enterprise Security'],
    verified: true
  },
  {
    id: 'rec-302',
    candidateName: 'Elena Rostova',
    role: 'Registered Clinical Nurse Specialist',
    pillar: 'recruitment',
    category: 'Logistics Dispatcher',
    experienceYears: 8,
    licenseType: 'DHA Licensed Clinical Specialist Nurse',
    expectedSalary: '$5,800 / month',
    location: 'Dubai, UAE',
    availability: '2 Weeks Notice',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    skills: ['Critical Care', 'Patient Assessment', 'Clinical Procedures', 'Healthcare Compliance'],
    verified: true
  },
  {
    id: 'rec-303',
    candidateName: 'Siddharth Nair',
    role: 'Senior Financial Controller & Audit Director',
    pillar: 'recruitment',
    category: 'Fleet Engineer',
    experienceYears: 11,
    licenseType: 'Chartered Certified Accountant (ACCA / CPA)',
    expectedSalary: '$9,200 / month',
    location: 'London, UK / Dubai',
    availability: 'Immediate',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    skills: ['Financial Audit', 'Corporate Risk', 'Taxation & IFRS', 'M&A Due Diligence'],
    verified: true
  }
];

export const MOCK_GROWTH_SOLUTIONS: GrowthStrategyItem[] = [
  {
    id: 'gro-401',
    title: 'Enterprise Multi-Industry Staffing & Recruitment Scaling',
    focusArea: 'Workforce Scaling',
    description: 'Rapidly recruit pre-screened talent across Technology, Healthcare, Engineering, Finance, and Operations with full credential verification.',
    metricImpact: '150+ Candidates Deployed in 30 Days',
    caseStudyClient: 'Apex Global GCC',
    durationMonths: 6,
    image: '/images/nfs-growth.png',
    features: ['Credential Verification', 'Technical Assessment', 'Visa & Relocation Support', 'Replacement Guarantee']
  }
];

export const MOCK_SERVICES: ServiceListing[] = [
  {
    id: 'srv-1',
    providerId: 'nfs-official',
    providerName: 'Novus Future Solutions (NFS)',
    providerAvatar: '/images/nfs-logo.png',
    providerRole: 'company',
    title: 'Multi-Industry Candidate Background Verification & Placement',
    category: 'recruitment',
    description: 'Identity, degree, credential, license, and reference checks for software engineers, medical professionals, accountants, engineers, and executives.',
    startingPrice: 350,
    currency: 'USD',
    priceUnit: 'per verified candidate',
    serviceArea: 'Global Talent Network',
    rating: 4.98,
    reviewsCount: 340,
    deliveryTime: '2 - 4 Business Days',
    verified: true,
    features: ['Identity & Background Check', 'Degree & License Verification', 'Reference Screening', 'Employer-Ready Report'],
    image: '/images/recruitment-real-v2.png'
  },
  {
    id: 'srv-2',
    providerId: 'nfs-official',
    providerName: 'Novus Future Solutions (NFS)',
    providerAvatar: '/images/nfs-logo.png',
    providerRole: 'company',
    title: 'Executive Headhunting & Global Talent Sourcing',
    category: 'recruitment',
    description: 'Specialized recruitment drive for senior leadership, tech leads, healthcare directors, financial controllers, and engineering managers.',
    startingPrice: 1500,
    currency: 'USD',
    priceUnit: 'per successful candidate',
    serviceArea: 'Global Talent Sourcing',
    rating: 4.99,
    reviewsCount: 280,
    deliveryTime: '7 - 14 Days Placement',
    verified: true,
    features: ['Custom Role Headhunting', 'Technical Screening', 'Visa & Relocation Escort', '90-Day Placement Guarantee'],
    image: '/images/nfs-recruitment.png'
  }
];

/* Multi-Industry Jobs for Careers & Recruitment Portal */
export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Senior Full-Stack Software Engineer (React / Node / AWS)',
    category: 'Technology & IT',
    location: 'Dubai & Remote',
    country: 'United Arab Emirates',
    city: 'Dubai',
    salaryMin: 7500,
    salaryMax: 10500,
    currency: 'USD',
    salaryPeriod: 'month',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: '5+ Years',
    vacancies: 8,
    deadline: '2026-08-30',
    description: 'NFS is recruiting experienced Full-Stack Engineers to build scalable cloud applications, candidate management platforms, and web APIs.',
    responsibilities: [
      'Architect resilient microservices using Node.js, Next.js, and TypeScript',
      'Build responsive UI interfaces adhering to high aesthetic & performance standards',
      'Manage CI/CD pipelines, Docker containers, and AWS cloud infrastructure'
    ],
    requirements: [
      'Bachelor degree in Computer Science or Software Engineering',
      'Minimum 5 years building production web applications in React / Node.js',
      'Strong knowledge of PostgreSQL, GraphQL, and RESTful APIs'
    ],
    requiredSkills: ['TypeScript', 'React / Next.js', 'Node.js', 'AWS Cloud', 'PostgreSQL'],
    requiredLicenses: ['AWS Certified Solutions Architect (Preferred)'],
    benefits: ['Remote Work Flexibility', 'Health & Dental Insurance', 'Annual Learning Allowance', 'Performance Bonuses'],
    visaSponsorship: true,
    accommodationProvided: false,
    foodAllowance: false,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-25',
    applicantsCount: 64,
    status: 'active'
  },
  {
    id: 'job-2',
    companyId: 'comp-nfs',
    companyName: 'Middle East Healthcare Alliance',
    companyLogo: '/images/nfs-logo.png',
    title: 'Registered Clinical Specialist Nurse',
    category: 'Healthcare & Medical',
    location: 'Dubai Healthcare City',
    country: 'United Arab Emirates',
    city: 'Dubai',
    salaryMin: 5200,
    salaryMax: 7000,
    currency: 'USD',
    salaryPeriod: 'month',
    jobType: 'Full-time',
    workMode: 'On-site',
    experienceLevel: '4+ Years',
    vacancies: 12,
    deadline: '2026-09-15',
    description: 'Join a leading multi-specialty hospital system in Dubai. Seeking licensed nurses for specialized clinical care and patient management.',
    responsibilities: [
      'Deliver high-quality clinical care, administer medications, and monitor patient vitals',
      'Collaborate with attending physicians and medical staff on treatment plans',
      'Ensure strict compliance with hospital infection control and safety standards'
    ],
    requirements: [
      'Bachelor of Science in Nursing (BSN) or equivalent diploma',
      'Active DHA / MOH Nurse License or eligibility to transfer',
      'Minimum 4 years clinical experience in acute care or hospital environment'
    ],
    requiredSkills: ['Critical Care', 'Patient Monitoring', 'Clinical Administration', 'Triage'],
    requiredLicenses: ['DHA Nurse License', 'BLS / ACLS Certification'],
    benefits: ['Accommodation Provided', 'Health Insurance', 'Annual Flight Ticket', 'Overtime Pay'],
    visaSponsorship: true,
    accommodationProvided: true,
    foodAllowance: true,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-20',
    applicantsCount: 48,
    status: 'active'
  },
  {
    id: 'job-3',
    companyId: 'comp-nfs',
    companyName: 'Apex Financial Partners',
    companyLogo: '/images/nfs-logo.png',
    title: 'Senior Financial Controller & Internal Auditor',
    category: 'Finance & Accounting',
    location: 'DIFC Financial District',
    country: 'United Arab Emirates',
    city: 'Dubai',
    salaryMin: 8500,
    salaryMax: 12000,
    currency: 'USD',
    salaryPeriod: 'month',
    jobType: 'Full-time',
    workMode: 'On-site',
    experienceLevel: '6+ Years',
    vacancies: 3,
    deadline: '2026-09-30',
    description: 'Manage corporate financial operations, financial statement consolidation, internal auditing, and tax compliance for regional business units.',
    responsibilities: [
      'Oversee monthly financial closing, balance sheet reconciliation, and IFRS reporting',
      'Conduct internal audit reviews and enforce internal financial controls',
      'Prepare annual budgets, variance analysis, and executive board presentations'
    ],
    requirements: [
      'Active ACCA, CPA, or CA professional qualification',
      'Minimum 6 years in corporate financial management or Big 4 auditing',
      'Proficiency in SAP, Oracle Financials, and advanced financial modeling'
    ],
    requiredSkills: ['Financial Auditing', 'IFRS Compliance', 'Budgeting & Forecasting', 'SAP Financials'],
    requiredLicenses: ['CPA / ACCA Certification'],
    benefits: ['Performance Bonus Scheme', 'Family Health Coverage', 'Professional Membership Dues'],
    visaSponsorship: true,
    accommodationProvided: false,
    foodAllowance: false,
    urgentHiring: false,
    verifiedCompany: true,
    postedAt: '2026-07-22',
    applicantsCount: 31,
    status: 'active'
  },
  {
    id: 'job-4',
    companyId: 'comp-nfs',
    companyName: 'Horizon Engineering & Construction',
    companyLogo: '/images/nfs-logo.png',
    title: 'MEP Senior Project Manager & Director',
    category: 'Engineering & Construction',
    location: 'Riyadh Mega Project Site',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    salaryMin: 9000,
    salaryMax: 13000,
    currency: 'USD',
    salaryPeriod: 'month',
    jobType: 'Full-time',
    workMode: 'On-site',
    experienceLevel: '8+ Years',
    vacancies: 5,
    deadline: '2026-09-25',
    description: 'Lead mechanical, electrical, and plumbing (MEP) installation and commissioning for commercial high-rise towers in Riyadh.',
    responsibilities: [
      'Direct MEP engineering teams, sub-contractors, and site engineers',
      'Ensure project milestones adhere to structural codes and safety standards',
      'Review engineering drawings, bill of quantities (BOQ), and material approvals'
    ],
    requirements: [
      'Bachelor degree in Mechanical or Electrical Engineering',
      'Minimum 8 years managing commercial MEP engineering projects',
      'PMP Certification or equivalent project management credentials'
    ],
    requiredSkills: ['MEP Engineering', 'Project Management', 'AutoCAD / BIM', 'Site Supervision'],
    requiredLicenses: ['PMP Certification', 'Professional Engineer (PE) License'],
    benefits: ['Furnished Executive Housing', 'Company Car', 'Annual Leave Flight Tickets', 'Project Completion Bonus'],
    visaSponsorship: true,
    accommodationProvided: true,
    foodAllowance: true,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-28',
    applicantsCount: 39,
    status: 'active'
  },
  {
    id: 'job-5',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Regional Business Development & Corporate Sales Director',
    category: 'Sales & Marketing',
    location: 'London & Dubai (Hybrid)',
    country: 'United Kingdom',
    city: 'London',
    salaryMin: 85000,
    salaryMax: 120000,
    currency: 'GBP',
    salaryPeriod: 'year',
    jobType: 'Full-time',
    workMode: 'Hybrid',
    experienceLevel: '6+ Years',
    vacancies: 4,
    deadline: '2026-10-10',
    description: 'Drive corporate staffing and recruitment solution contracts with enterprise clients across UK, Europe, and Middle East.',
    responsibilities: [
      'Prospect and close corporate recruitment contracts with enterprise employers',
      'Lead client pitch presentations, service agreements, and SLA reviews',
      'Build long-term partnerships with C-suite executives and HR directors'
    ],
    requirements: [
      'Proven record in enterprise B2B sales or executive recruitment consulting',
      'Strong network of corporate HR and talent acquisition decision-makers',
      'Outstanding negotiation and contract presentation skills'
    ],
    requiredSkills: ['B2B Sales', 'Key Account Management', 'Contract Negotiation', 'CRM Mastery'],
    requiredLicenses: [],
    benefits: ['Uncapped Commission Scheme', 'Corporate Car Allowance', 'Private Medical Insurance'],
    visaSponsorship: false,
    accommodationProvided: false,
    foodAllowance: false,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-29',
    applicantsCount: 22,
    status: 'active'
  },
  {
    id: 'job-6',
    companyId: 'comp-nfs',
    companyName: 'Novus Future Solutions (NFS)',
    companyLogo: '/images/nfs-logo.png',
    title: 'Senior Cross-Border CDL Class A Heavy Truck Driver',
    category: 'Logistics & Supply Chain',
    location: 'Dubai to Riyadh Route',
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
    description: 'Recruiting experienced CDL Class A drivers for heavy multi-axle trailers operating along Dubai - Dammam - Riyadh logistics corridors.',
    responsibilities: [
      'Operate heavy articulated trucks safely across GCC borders',
      'Perform daily pre-trip vehicle safety inspection and log electronic telematics',
      'Ensure proper cargo tie-down, container locks, and customs seal integrity'
    ],
    requirements: [
      'Valid GCC Heavy Commercial License (CDL Class A or Heavy Trailer)',
      'Clean driving record with minimum 5 years cross-border experience'
    ],
    requiredSkills: ['Heavy Truck Driving', 'Border Customs', 'Route Planning', 'Telematics Log'],
    requiredLicenses: ['CDL Class A Heavy Vehicle', 'Hazmat Permit'],
    benefits: ['Free Shared Accommodation', 'Health Insurance', 'Annual Flight Ticket'],
    visaSponsorship: true,
    accommodationProvided: true,
    foodAllowance: true,
    urgentHiring: true,
    verifiedCompany: true,
    postedAt: '2026-07-25',
    applicantsCount: 42,
    status: 'active'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'future-of-global-recruitment-2026',
    title: 'The Future of Global Recruitment & Hiring in 2026',
    summary: 'How verified skills, direct applications, and fast credential screening are changing multi-industry hiring.',
    content: 'Employers in technology, healthcare, finance, engineering, and supply chain need qualified professionals faster than ever. NFS brings verified profiles, direct applications, and industry-focused recruitment tools into one connected platform...',
    category: 'Industry Insights',
    authorName: 'Marcus Vance',
    authorTitle: 'VP of Global Operations, NFS',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    readTime: '5 min read',
    image: '/images/nfs-growth.png',
    publishedAt: '2026-07-15',
    tags: ['Recruitment', 'Hiring', 'Jobs', 'Growth']
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    userId: 'u-1',
    type: 'system',
    title: 'Welcome to Novus Future Solutions (NFS)',
    message: 'Explore verified vacancies across all industries, employer hiring tools, and executive recruitment support.',
    read: false,
    createdAt: '10 minutes ago'
  },
  {
    id: 'notif-2',
    userId: 'u-1',
    type: 'job_alert',
    title: 'New Employer Recruitment Drive Received',
    message: 'A verified corporate employer has requested support for a multi-role recruitment campaign.',
    read: false,
    createdAt: '1 hour ago'
  }
];
