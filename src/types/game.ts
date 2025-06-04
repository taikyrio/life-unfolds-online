// Re-export all types from the focused type files
export * from './core';
export * from './character';
export * from './relationships';
export * from './education';
export * from './legal';
export * from './health';
export * from './social';
export * from './gameState';
export * from './finance';
export * from './career';

// Legacy exports for backward compatibility
export type { Character } from './character';
export type { FamilyMember, RelationshipType, RelationshipStats } from './relationships';
export type { EducationRecord, CurrentEducation } from './education';
export type { LegalStatus, LegalCase } from './legal';
export type { HealthInsurance } from './health';
export type { SocialMediaAccount, RealEstateProperty } from './social';
export type { LifeEvent, Choice, StatEffects, EventTracker, GameState } from './gameState';
export type { PersonalityTraits, ZodiacSign, Asset, CriminalRecord, JobPerformance } from './core';
export type { FinancialRecord } from './finance';
export type { CareerLevel, CareerPath } from './career';
export type { Character } from './character';

export interface Character {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  money: number;
  health: number;
  happiness: number;
  intelligence: number;
  looks: number;
  musicalAttribute?: number;
  grit: number;
  relationship: number;
  jobSatisfaction: number;
  performance: number;
  stress: number;
  height: number;
  weight: number;
  isAlive: boolean;
  gender: 'Male' | 'Female';
  sexuality: 'Heterosexual' | 'Homosexual' | 'Bisexual';
  personality: PersonalityTraits;
  zodiacSign: ZodiacSign;
  currentJob: {
    title: string;
    employer: string;
    salary: number;
    type: string;
  } | null;
  educationRecords: EducationRecord[];
  currentEducation: CurrentEducation | null;
  assets: Asset[];
  properties: RealEstateProperty[];
  socialMediaAccounts: SocialMediaAccount[];
  relationships: {
    [key: string]: RelationshipStats;
  };
  family: FamilyMember[];
  legalStatus: LegalStatus;
  criminalRecord: CriminalRecord | null;
  healthInsurance: HealthInsurance | null;

  // DLC Career paths
  criminalCareer?: {
    organization: string;
    rank: number;
    reputation: number;
    operations: number;
    heat: number;
  };
  musicCareer?: {
    level: number;
    fans: number;
    albums: number;
    singles: number;
    reputation: number;
    currentProject: string | null;
    lastRelease: Date | null;
    earnings: number;
    artists: any[];
    studioSlots: number;
    hasMoreStudioTime: boolean;
  };
}