
export interface LifeEvent {
  id: string;
  title: string;
  description: string;
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
    minSmarts?: number;
    minWealth?: number;
    minHealth?: number;
  };
}

export interface EventChoice {
  id: string;
  text: string;
  emoji?: string;
  effects?: EventEffect[];
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
  purchasePrice: number;
  purchaseDate: string;
  dividendYield?: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Loan {
  id: string;
  type: 'mortgage' | 'student' | 'personal' | 'auto' | 'credit_card';
  principal: number;
  remainingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  termMonths: number;
  remainingMonths: number;
  startDate: string;
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

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  dates: string;
}

export interface ZodiacSignData extends ZodiacSign {
  traits: string[];
  compatibility: string[];
  luckyNumbers: number[];
  luckyColors: string[];
}
