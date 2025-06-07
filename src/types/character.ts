
import { PersonalityTraits, ZodiacSign, Asset, CriminalRecord, JobPerformance } from './core';
import { FamilyMember } from './relationships';
import { EducationRecord, CurrentEducation } from './education';
import { LegalStatus } from './legal';
import { HealthInsurance } from './health';
import { SocialMediaAccount, RealEstateProperty } from './social';
import { FinancialRecord } from './finance';
import { MusicCareer, Artist, Record, Album } from './music';

export interface MusicTour {
  id: string;
  name: string;
  venues: number;
  earnings: number;
  fanGain: number;
  year: number;
}

export interface CharacterEventTracker {
  triggeredEvents: Set<string>;
  lastEventAge: number;
  eventCooldowns: Map<string, number>;
  choiceHistory: any[];
}

// Re-export music types with new names to avoid conflicts
export type MusicArtist = Artist;
export type MusicRecord = Record;
export type MusicAlbum = Album;
export type { MusicCareer };

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
  jobId?: string;
  salary?: number;
  jobLevel?: number;
  jobPerformance?: JobPerformance;
  financialRecord?: FinancialRecord;
  moneyState?: import('../utils/money/types').MoneyState;
  achievements: string[];
  assets: Asset[];
  criminalRecord?: CriminalRecord;
  reputation?: number;
  notoriety?: number;
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
  legalStatus?: LegalStatus;
  healthInsurance?: HealthInsurance;
  socialMediaAccounts?: SocialMediaAccount[];
  realEstate?: RealEstateProperty[];
  currentCountry?: string;
  citizenship?: string[];
  personalityType?: string;
  mentalHealthConditions?: string[];
  politicalAffiliation?: string;
  environmentalAwareness?: number;
  politicalInfluence?: number;
  personalityTraits?: PersonalityTraits;
  educationLevel?: string;
  delayedEvents?: any[];
  majorDecisions?: any[];
  disasterHistory?: any[];
  workExperience?: number;
  musicCareer?: MusicCareer;
  musicArtists?: Artist[];
  money?: number;
  businesses?: any[];
  properties?: any[];
  debts?: number;
  inheritedWealth?: number;
  familyLegacy?: any;
  education?: EducationRecord;
  currentEducation?: CurrentEducation;
  familyMembers: FamilyMember[];
  relationshipStatus?: string;
  partnerName?: string;
  lifeEvents: string[];
}

export type { CharacterEventTracker as EventTracker };
