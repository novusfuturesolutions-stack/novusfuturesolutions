export type UserRole = 'professional' | 'company' | 'provider' | 'customer' | 'admin';

export type AvailabilityStatus = 'available' | 'open_to_work' | 'hired' | 'busy';

export type VerificationStatus = 'not_submitted' | 'pending' | 'verified' | 'rejected';

export type NFSPillar = 'car_rentals' | 'logistics' | 'recruitment' | 'growth';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  coverImage?: string;
  headline?: string;
  location?: string;
  country?: string;
  city?: string;
  phone?: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: string;
  unreadNotificationsCount?: number;
  unreadMessagesCount?: number;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
}

export interface License {
  id: string;
  type: string;
  number: string;
  issuingAuthority: string;
  expiryDate: string;
  verified: boolean;
}

export interface ProfessionalProfile {
  userId: string;
  name: string;
  headline: string;
  category: string;
  experienceYears: number;
  availability: AvailabilityStatus;
  openToWork: boolean;
  bio: string;
  skills: string[];
  licenses: License[];
  certificates: Certificate[];
  experiences: WorkExperience[];
  cvUrl?: string;
  cvFileName?: string;
  expectedSalary?: string;
  hourlyRate?: string;
  preferredLocations: string[];
  languages: string[];
  connectionsCount: number;
  followersCount: number;
  profileCompletionScore: number;
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showCV: boolean;
  };
}

export interface CompanyProfile {
  id: string;
  userId: string;
  name: string;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  industry: string;
  companySize: string;
  headquarters: string;
  country: string;
  city: string;
  website: string;
  email: string;
  phone: string;
  registrationNumber: string;
  verified: boolean;
  followersCount: number;
  employeesCount: number;
  activeJobsCount: number;
  featured: boolean;
}

/* NFS Pillar 1: Car Rentals */
export interface CarRentalItem {
  id: string;
  make: string;
  model: string;
  year: number;
  category: 'Luxury Sedan' | 'SUV & 4x4' | 'Executive Van' | 'Commercial Cargo' | 'Sports / Electric';
  dailyRate: number;
  monthlyRate: number;
  currency: string;
  transmission: 'Automatic' | 'Manual';
  passengers: number;
  fuelType: 'Electric' | 'Hybrid' | 'Petrol' | 'Diesel';
  unlimitedKm: boolean;
  features: string[];
  image: string;
  available: boolean;
  location: string;
  rating: number;
  reviewsCount: number;
}

/* NFS Pillar 2: Logistics & Freight */
export interface LogisticsShipment {
  id: string;
  trackingCode: string;
  title: string;
  serviceType: 'Heavy Trucking' | 'Air Cargo' | 'Sea Freight' | 'Cold Chain Express' | 'Warehouse Storage';
  origin: string;
  destination: string;
  cargoWeightTon: number;
  estimatedDays: number;
  ratePerTonKm: number;
  currency: string;
  status: 'In Transit' | 'Scheduled' | 'Delivered' | 'Quoted';
  image: string;
  features: string[];
}

/* NFS Pillar 3: Recruitment & Staffing */
export interface RecruitmentPlacement {
  id: string;
  candidateName: string;
  role: string;
  pillar: NFSPillar;
  category: 'Heavy Fleet Driver' | 'Logistics Dispatcher' | 'Fleet Engineer' | 'Executive Manager' | 'Warehouse Supervisor';
  experienceYears: number;
  licenseType: string;
  expectedSalary: string;
  location: string;
  availability: 'Immediate' | '2 Weeks Notice' | '1 Month Notice';
  avatar: string;
  skills: string[];
  verified: boolean;
}

/* NFS Pillar 4: Business Growth & Consulting */
export interface GrowthStrategyItem {
  id: string;
  title: string;
  focusArea: 'Fleet Optimization' | 'Logistics Network Expansion' | 'Workforce Scaling' | 'Enterprise Digital Transformation';
  description: string;
  metricImpact: string;
  caseStudyClient: string;
  durationMonths: number;
  image: string;
  features: string[];
}

export interface ServiceListing {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRole: 'provider' | 'company';
  title: string;
  category: 'car_rentals' | 'logistics' | 'recruitment' | 'growth' | 'customs' | 'freight' | 'warehousing' | 'fleet';
  description: string;
  startingPrice: number;
  currency: string;
  priceUnit: string;
  serviceArea: string;
  rating: number;
  reviewsCount: number;
  deliveryTime: string;
  verified: boolean;
  features: string[];
  image: string;
}

export interface ServiceRequest {
  id: string;
  serviceId?: string;
  serviceTitle?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceCategory: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoDetails: string;
  requiredDate: string;
  budget?: string;
  currency?: string;
  description: string;
  status: 'pending' | 'quoted' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
}

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Shift' | 'Temporary';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid' | 'Travel-based';

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyWebsite?: string;
  imageUrl?: string;
  title: string;
  category: string;
  location: string;
  country: string;
  city: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  salaryPeriod: 'month' | 'year' | 'hour' | 'trip';
  jobType: JobType;
  workMode: WorkMode;
  experienceLevel: string;
  vacancies: number;
  deadline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  requiredSkills: string[];
  requiredLicenses: string[];
  benefits: string[];
  visaSponsorship: boolean;
  accommodationProvided: boolean;
  foodAllowance: boolean;
  urgentHiring: boolean;
  verifiedCompany: boolean;
  postedAt: string;
  applicantsCount: number;
  status: 'active' | 'paused' | 'closed';
  screeningQuestions?: string[];
}

export type ApplicationStatus = 'submitted' | 'viewed' | 'under_review' | 'shortlisted' | 'interview_scheduled' | 'selected' | 'rejected' | 'withdrawn';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantHeadline: string;
  applicantEmail: string;
  applicantPhone: string;
  cvUrl?: string;
  coverLetter?: string;
  screeningAnswers?: Record<string, string>;
  status: ApplicationStatus;
  appliedAt: string;
  interviewDate?: string;
  interviewNotes?: string;
}

export type ReactionType = 'like' | 'support' | 'celebrate' | 'insightful';

export interface PostComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorHeadline: string;
  authorRole: UserRole;
  authorVerified: boolean;
  postType: 'text' | 'image' | 'job_announcement' | 'poll';
  content: string;
  mediaUrl?: string;
  jobReferenceId?: string;
  hashtags: string[];
  reactions: {
    like: number;
    support: number;
    celebrate: number;
    insightful: number;
  };
  userReaction?: ReactionType;
  comments: PostComment[];
  sharesCount: number;
  createdAt: string;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted';
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'connection_request' | 'connection_accepted' | 'message' | 'application_update' | 'interview_invite' | 'job_alert' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: UserRole;
  documentType: 'government_id' | 'cdl_license' | 'company_registration' | 'tax_id';
  documentNumber: string;
  documentUrl: string;
  status: VerificationStatus;
  submittedAt: string;
  notes?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  readTime: string;
  image: string;
  publishedAt: string;
  tags: string[];
}

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
  jobsCount?: number;
  featured?: boolean;
}
