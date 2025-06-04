
import { PersonalityTraits, ZodiacSign, Asset, CriminalRecord, JobPerformance } from './core';
import { FamilyMember } from './relationships';
import { EducationRecord, CurrentEducation } from './education';
import { LegalStatus } from './legal';
import { HealthInsurance } from './health';
import { SocialMediaAccount, RealEstateProperty } from './social';
import { FinancialRecord } from './finance';

export interface Character {
  id: string;
  name: string;
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
  education: EducationRecord;
  currentEducation?: CurrentEducation;
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  familyMembers: FamilyMember[];
  lifeEvents: string[];
  achievements: string[];
  assets: Asset[];
  criminalRecord?: CriminalRecord;
  reputation?: number;
  isPregnant?: boolean;
  pregnancyMonths?: number;
  flags?: string[];
  birthplace?: string;
  birthMonth?: number;
  birthDay?: number;
  zodiacSign?: ZodiacSign;
  children: string[];
  customStats?: Record<string, number>;
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
}
