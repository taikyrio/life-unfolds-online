
export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  age: number;
  emoji?: string;
  choices?: EventChoice[];
  effects?: EventEffect[];
  probability?: number;
  conditions?: EventCondition[];
  type?: 'positive' | 'negative' | 'neutral';
  minAge?: number;
  maxAge?: number;
  category?: string;
  requirements?: {
    education?: string;
    minEducation?: string;
    minSmarts?: number;
    minWealth?: number;
    minHealth?: number;
    hasPartner?: boolean;
    hasChildren?: boolean;
  };
}

export interface EventChoice {
  id: string;
  text: string;
  emoji?: string;
  effects?: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
  };
  consequences?: string[];
  probability?: number;
  requirements?: {
    minSmarts?: number;
    minWealth?: number;
    minHealth?: number;
  };
}

export interface EventEffect {
  type: 'stat' | 'money' | 'relationship' | 'career' | 'education' | 'health' | 'legal' | 'achievement';
  target?: string;
  value?: number;
  text?: string;
}

export interface EventCondition {
  type: 'age' | 'stat' | 'money' | 'relationship' | 'career' | 'education';
  operator: 'equals' | 'greater' | 'less' | 'greaterEqual' | 'lessEqual';
  value: number | string;
  target?: string;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'real_estate' | 'crypto' | 'mutual_fund';
  amount: number;
  value: number;
  currentValue: number;
  purchasePrice: number;
  purchaseDate: string;
  dividendYield?: number;
  riskLevel: 'low' | 'medium' | 'high';
  annualReturn: number;
  yearPurchased?: number;
}

export interface Loan {
  id: string;
  type: 'mortgage' | 'student' | 'personal' | 'auto' | 'credit_card';
  principal: number;
  amount: number;
  remaining: number;
  remainingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  termMonths: number;
  remainingMonths: number;
  startDate: string;
  originalAmount?: number;
}

export interface CriminalRecord {
  arrests: number;
  convictions: number;
  prisonTime: number;
  crimes: string[];
  notoriety: number;
  totalSentence: number;
  currentlyIncarcerated: boolean;
  charges: string[];
  timeServed: number;
  isIncarcerated: boolean;
}

export interface LegalCase {
  id: string;
  type: 'criminal' | 'civil' | 'family' | 'bankruptcy';
  status: 'pending' | 'resolved' | 'appealed';
  severity: 'minor' | 'moderate' | 'severe';
  description: string;
  fines?: number;
  outcome?: string;
  dateStarted: string;
  dateResolved?: string;
}

export interface CrimeOperation {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  minNotoriety: number;
  maxPayout: number;
  minPayout: number;
  skillRequired: number;
  timeRequired: number;
  category: string;
  failureChance: number;
  arrestChance: number;
}

export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface ZodiacSignData {
  name: string;
  emoji: string;
  element: string;
  dates: string;
  traits: string[];
  compatibility: string[];
  luckyNumbers: number[];
  luckyColors: string[];
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  currentValue: number;
  purchasePrice: number;
  purchaseDate?: string;
  appreciationRate?: number;
}

export interface PersonalityTraits {
  kindness: number;
  loyalty: number;
  intelligence: number;
  humor: number;
  ambition: number;
  stability: number;
  generosity: number;
  openness: number;
}

export interface JobPerformance {
  rating: number;
  lastReview: string;
  promotions: number;
  warnings: number;
}
