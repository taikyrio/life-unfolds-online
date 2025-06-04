
export interface PersonalityTraits {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  neuroticism: number;
  openness: number;
}

export interface ZodiacSign {
  sign: string;
  element: string;
  traits: string[];
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  category: 'vehicle' | 'property' | 'investment' | 'luxury' | 'other';
  condition?: number;
  purchaseDate?: string;
}

export interface CriminalRecord {
  arrests: number;
  convictions: number;
  crimes: string[];
  totalSentence: number;
  currentlyIncarcerated: boolean;
  notoriety: number;
}

export interface JobPerformance {
  rating: number;
  reviews: string[];
  promotions: number;
  warnings: number;
  yearsAtCompany: number;
}
