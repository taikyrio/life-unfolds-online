
export interface CareerLevel {
  id: string;
  level: number;
  title: string;
  salary: number;
  description: string;
  requirements: {
    yearsExperience?: number;
    performance?: number;
    minStats?: {
      smarts?: number;
      relationships?: number;
      looks?: number;
      health?: number;
    };
  };
  responsibilities: string[];
  benefits: string[];
  promotionChance: number;
  promotionRequirements?: {
    yearsExperience: number;
    performance: number;
    minStats?: {
      smarts?: number;
      relationships?: number;
      looks?: number;
      health?: number;
    };
  };
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: string;
  levels: CareerLevel[];
  requirements: {
    education?: string[];
    minAge?: number;
    minStats?: {
      smarts?: number;
      looks?: number;
      relationships?: number;
      health?: number;
    };
  };
}

// Legacy Career interface for backwards compatibility
export interface Career {
  id: string;
  name: string;
  description: string;
  salary: number;
  category?: string;
  requirements?: {
    education?: string;
    minAge?: number;
    minStats?: {
      smarts?: number;
      looks?: number;
      relationships?: number;
      health?: number;
    };
  };
}
