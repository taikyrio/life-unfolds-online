
import { PersonalityTraits, ZodiacSign, Asset, CriminalRecord, JobPerformance } from './core';
import { FamilyMember } from './relationships';
import { EducationRecord, CurrentEducation } from './education';
import { LegalStatus } from './legal';
import { HealthInsurance } from './health';
import { SocialMediaAccount, RealEstateProperty } from './social';
import { FinancialRecord } from './finance';

export interface MusicArtist {
  id: string;
  name: string;
  genre: string;
  members: number;
  fans: number;
  records: MusicRecord[];
  tours: MusicTour[];
  disbanded: boolean;
}

export interface MusicRecord {
  id: string;
  name: string;
  tracks: number;
  productionTime: number;
  releaseDate: Date;
  sales: number;
  certified: boolean;
  inProduction: boolean;
  earnings: number;
}

export interface MusicTour {
  id: string;
  name: string;
  venues: number;
  earnings: number;
  fanGain: number;
  year: number;
}

export interface MusicCareer {
  level: number;
  fans: number;
  albums: number;
  singles: number;
  reputation: number;
  currentProject: string | null;
  lastRelease: string | null;
  earnings: number;
  artists: MusicArtist[];
  studioSlots: number;
  hasMoreStudioTime: boolean;
}

export interface Character {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  health: number;
  happiness: number;
  smarts: number;
  looks: number;
  wealth: number;
  relationships: number;
  job?: string;
  salary?: number;
  jobLevel?: number;
  jobPerformance?: JobPerformance;
  financialRecord?: FinancialRecord;
  moneyState?: import('../utils/money/types').MoneyState;
  achievements: string[];
  assets: Asset[];
  criminalRecord?: CriminalRecord;
  reputation?: number;
  isPregnant?: boolean;
  pregnancyMonths?: number;
  flags?: string[];
  birthplace?: string;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  zodiacSign?: ZodiacSign;
  children: string[];
  customStats?: Record<string, any>;
  fame: number;
  // Phase 2 additions
  legalStatus?: LegalStatus;
  healthInsurance?: HealthInsurance;
  socialMediaAccounts?: SocialMediaAccount[];
  realEstate?: RealEstateProperty[];
  // Phase 3 additions
  currentCountry?: string;
  citizenship?: string[];
  personalityType?: string;
  mentalHealthConditions?: string[];
  politicalAffiliation?: string;
  environmentalAwareness?: number;
  politicalInfluence?: number;
  personalityTraits?: PersonalityTraits;
  // Additional properties needed by the system
  educationLevel?: string;
  delayedEvents?: any[];
  majorDecisions?: any[];
  disasterHistory?: any[];
  workExperience?: number;
  // Music career properties
  musicCareer?: MusicCareer;
  musicArtists?: MusicArtist[];
  money?: number; // For compatibility with money system
  
  // Missing properties causing TypeScript errors
  education?: EducationRecord;
  currentEducation?: CurrentEducation;
  familyMembers: FamilyMember[];
  relationshipStatus?: string;
  partnerName?: string;
  lifeEvents: string[];
}
