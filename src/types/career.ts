
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
