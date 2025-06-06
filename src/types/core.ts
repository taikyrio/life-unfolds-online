
export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  kindness: number;
  loyalty: number;
  intelligence: number;
  humor: number;
  ambition: number;
  stability: number;
  generosity: number;
}

export type ZodiacSign = 
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' 
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' 
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface Asset {
  id: string;
  name: string;
  type: 'house' | 'car' | 'investment' | 'other';
  value: number;
  purchaseDate: number;
  description?: string;
  purchasePrice: number;
  currentValue: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  yearPurchased: number;
  rentalIncome?: number;
  maintenanceCost: number;
  isInsured: boolean;
  insuranceCost?: number;
  emoji: string;
  requirements?: {
    minAge?: number;
    minWealth?: number;
    minIncome?: number;
  };
}

export interface CriminalRecord {
  arrests: number;
  convictions: number;
  charges: string[];
  timeServed: number;
  currentSentence?: number;
  isIncarcerated: boolean;
}

export interface JobPerformance {
  rating: number;
  yearsAtJob: number;
  promotions: number;
  disciplinaryActions: number;
  achievements: string[];
}

export type EventCategory = 
  | 'social' | 'family' | 'health' | 'education' | 'career' 
  | 'relationship' | 'random' | 'crime' | 'childhood' 
  | 'teenage' | 'lifestyle' | 'relationships';

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  emoji?: string;
  minAge?: number;
  maxAge?: number;
  choices?: EventChoice[];
  effects?: StatEffects;
  ageRequirement?: { min?: number; max?: number };
  requirements?: {
    education?: string;
    job?: string;
    relationshipStatus?: string;
    wealth?: number;
    familyMember?: string;
    zodiacSign?: string;
    socialCircle?: string;
  };
  flags?: string[];
}

export interface EventChoice {
  id: string;
  text: string;
  emoji?: string;
  effects?: StatEffects;
  consequences?: string[];
  flags?: string[];
}

export interface StatEffects {
  health?: number;
  happiness?: number;
  smarts?: number;
  looks?: number;
  wealth?: number;
  relationships?: number;
  fame?: number;
  notoriety?: number;
  salary?: number;
  jobLevel?: number;
}

export interface Choice {
  id: string;
  text: string;
  emoji?: string;
  effects?: StatEffects;
}
