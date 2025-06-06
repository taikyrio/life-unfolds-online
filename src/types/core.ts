
export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
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
  minAge?: number;
  maxAge?: number;
  choices?: EventChoice[];
  effects?: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
  };
}

export interface EventChoice {
  id: string;
  text: string;
  effects?: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
  };
  consequences?: string[];
}
