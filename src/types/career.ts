
export interface Career {
  id: string;
  name: string;
  category: 'business' | 'healthcare' | 'education' | 'technology' | 'creative' | 'service' | 'legal' | 'government';
  description: string;
  requirements: {
    education?: string;
    experience?: number;
    minStats?: {
      smarts?: number;
      looks?: number;
      health?: number;
    };
  };
  levels: CareerLevel[];
  benefits: string[];
}

export interface CareerLevel {
  level: number;
  title: string;
  salary: number;
  description: string;
  promotionRequirements?: {
    yearsExperience?: number;
    performance?: number;
    minStats?: {
      smarts?: number;
      relationships?: number;
    };
  };
}

export interface JobPerformance {
  currentLevel: number;
  yearsAtLevel: number;
  totalExperience: number;
  performanceRating: number; // 0-100
  promotionEligible: boolean;
}
export interface Career {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: CareerCategory;
  requirements: CareerRequirements;
  progression: CareerLevel[];
  benefits: CareerBenefits;
  risks: CareerRisk[];
  ageRange: { min: number; max: number };
  workHours: number;
  stressLevel: number;
  prestigeLevel: number;
}

export interface CareerLevel {
  id: string;
  title: string;
  salary: number;
  requirements: {
    experience?: number;
    education?: string[];
    skills?: Record<string, number>;
    age?: number;
  };
  responsibilities: string[];
  benefits: string[];
  promotionChance: number;
}

export interface CareerRequirements {
  education?: string[];
  skills?: Record<string, number>;
  experience?: number;
  age?: { min?: number; max?: number };
  physicalRequirements?: string[];
  backgroundCheck?: boolean;
  certification?: string[];
}

export interface CareerBenefits {
  healthInsurance?: boolean;
  retirementPlan?: boolean;
  vacationDays?: number;
  sickDays?: number;
  bonuses?: number;
  stockOptions?: boolean;
  companyVehicle?: boolean;
  travelOpportunities?: boolean;
}

export interface CareerRisk {
  type: 'injury' | 'lawsuit' | 'scandal' | 'layoff' | 'stress' | 'burnout';
  probability: number;
  severity: number;
  description: string;
}

export type CareerCategory = 
  | 'healthcare' | 'technology' | 'education' | 'finance' 
  | 'entertainment' | 'sports' | 'politics' | 'military'
  | 'criminal' | 'business' | 'arts' | 'science'
  | 'hospitality' | 'retail' | 'construction' | 'agriculture';

export interface JobApplication {
  careerId: string;
  levelId: string;
  applicationDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'interview';
  interviewDate?: string;
  rejectionReason?: string;
}

export interface WorkEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: 'promotion' | 'demotion' | 'raise' | 'bonus' | 'project' | 'conflict' | 'achievement';
  effects: {
    salary?: number;
    jobLevel?: number;
    performance?: number;
    stress?: number;
    reputation?: number;
    skills?: Record<string, number>;
  };
  choices?: {
    id: string;
    text: string;
    effects: any;
  }[];
}
