
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
    };
  };
}
