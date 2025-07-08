
// TreeHub - Tree Care Industry Platform Types
// Comprehensive TypeScript definitions based on Prisma schema

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  userType: 'PROFESSIONAL' | 'COMPANY' | 'HOMEOWNER';
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  professional?: TreeProfessional;
  company?: TreeCompany;
}

export interface TreeProfessional {
  id: string;
  userId: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  rating: number;
  totalJobs: number;
  verified: boolean;
  insured: boolean;
  availability: 'AVAILABLE' | 'BUSY' | 'STORM_ONLY' | 'SEASONAL' | 'UNAVAILABLE';
  locationCity?: string;
  locationState?: string;
  locationZipCode?: string;
  latitude?: number;
  longitude?: number;
  skills?: ProfessionalSkill[];
  certifications?: Certification[];
  equipment?: Equipment[];
  portfolio?: PortfolioItem[];
  user: User;
}

export interface TreeCompany {
  id: string;
  userId: string;
  name: string;
  logo?: string;
  description?: string;
  size: 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE';
  employees?: number;
  founded?: number;
  website?: string;
  verified: boolean;
  rating: number;
  totalJobs: number;
  locationCity?: string;
  locationState?: string;
  locationZipCode?: string;
  user: User;
  jobs?: TreeJob[];
}

export interface ProfessionalSkill {
  id: string;
  professionalId: string;
  skillType: TreeSkillType;
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT' | 'MASTER';
  verified: boolean;
  yearsExperience: number;
  createdAt: Date;
}

export type TreeSkillType = 
  | 'CLIMBER'
  | 'GROUNDWORK' 
  | 'CRANE_OPERATOR'
  | 'PHC_TECH'
  | 'STORM_RESPONSE'
  | 'ARBORIST'
  | 'BUCKET_TRUCK'
  | 'STUMP_GRINDING'
  | 'TREE_REMOVAL'
  | 'PRUNING'
  | 'CABLING'
  | 'DIAGNOSIS'
  | 'EMERGENCY_RESPONSE';

export interface TreeJob {
  id: string;
  title: string;
  description: string;
  companyId: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'STORM_EMERGENCY' | 'SEASONAL' | 'WEEKEND' | 'ON_CALL';
  urgency: 'LOW' | 'NORMAL' | 'URGENT' | 'EMERGENCY';
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';
  skillsRequired: TreeSkillType[];
  payType: 'HOURLY' | 'DAILY' | 'PROJECT' | 'PER_TREE';
  payAmount: number;
  overtimeRate?: number;
  hazardPay?: number;
  equipmentProvided: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  startDate: Date;
  endDate?: Date;
  postedAt: Date;
  company: TreeCompany;
  applications?: JobApplication[];
}

export interface Equipment {
  id: string;
  name: string;
  category: 'CLIMBING_GEAR' | 'CHAINSAWS' | 'CHIPPERS' | 'STUMP_GRINDERS' | 'BUCKET_TRUCKS' | 'CRANES' | 'TRUCKS' | 'TRAILERS' | 'SAFETY_EQUIPMENT' | 'DIAGNOSTIC_TOOLS' | 'ROPES_RIGGING';
  brand: string;
  model: string;
  year: number;
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'NEEDS_REPAIR';
  images: string[];
  price?: number;
  dailyRentalRate?: number;
  forSale: boolean;
  forRent: boolean;
  location: string;
  description?: string;
  available: boolean;
  professional?: TreeProfessional;
  company?: TreeCompany;
}

export interface JobApplication {
  id: string;
  jobId: string;
  professionalId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'HIRED';
  proposedRate?: number;
  coverLetter?: string;
  appliedAt: Date;
  job: TreeJob;
  professional: TreeProfessional;
}

export interface Certification {
  id: string;
  professionalId: string;
  name: string;
  issuer: string;
  number: string;
  issueDate: Date;
  expirationDate: Date;
  verified: boolean;
  documentUrl?: string;
}

export interface PortfolioItem {
  id: string;
  professionalId: string;
  title: string;
  description: string;
  images: string[];
  beforeImages: string[];
  afterImages: string[];
  jobType: TreeSkillType;
  location: string;
  completedAt: Date;
  client?: string;
  featured: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  qualityRating: number;
  communicationRating: number;
  timelinessRating: number;
  safetyRating: number;
  professionalismRating: number;
  verified: boolean;
  createdAt: Date;
}

export interface StormAlert {
  id: string;
  title: string;
  description: string;
  severity: 'WATCH' | 'WARNING' | 'EMERGENCY';
  affectedAreas: string[];
  startTime: Date;
  endTime?: Date;
  urgentNeeds: TreeSkillType[];
  payMultiplier: number;
  active: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Search and Filter Types
export interface JobSearchParams {
  location?: string;
  skills?: TreeSkillType[];
  jobType?: string[];
  urgency?: string[];
  payRange?: {
    min: number;
    max: number;
  };
  query?: string;
}

export interface ProfessionalSearchParams {
  location?: string;
  skills?: TreeSkillType[];
  experience?: number;
  rating?: number;
  verified?: boolean;
  query?: string;
}

// Form Types
export interface CreateJobForm {
  title: string;
  description: string;
  jobType: string;
  urgency: string;
  skillsRequired: TreeSkillType[];
  payType: string;
  payAmount: number;
  equipmentProvided: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  startDate: string;
  endDate?: string;
}

export interface ProfessionalProfileForm {
  phone?: string;
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  locationCity?: string;
  locationState?: string;
  locationZipCode?: string;
  skills: {
    skillType: TreeSkillType;
    level: string;
    yearsExperience: number;
  }[];
}

export interface CompanyProfileForm {
  name: string;
  description?: string;
  size: string;
  employees?: number;
  founded?: number;
  website?: string;
  locationCity?: string;
  locationState?: string;
  locationZipCode?: string;
}
