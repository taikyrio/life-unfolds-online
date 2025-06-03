
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
}

export interface JobPerformance {
  currentLevel: number;
  yearsAtLevel: number;
  totalExperience: number;
  performanceRating: number;
  promotionEligible: boolean;
}

export interface Asset {
  id: string;
  name: string;
  type: 'property' | 'vehicle' | 'investment' | 'collectible';
  value: number;
  purchasePrice: number;
  purchaseAge: number;
  description: string;
}

export interface CriminalRecord {
  arrests: number;
  convictions: number;
  prisonTime: number;
  crimes: string[];
  notoriety: number;
}

export interface ZodiacSign {
  name: string;
  emoji: string;
  traits: string[];
  luckyNumbers: number[];
  element: 'fire' | 'earth' | 'air' | 'water';
}

export interface PersonalityTraits {
  kindness: number; // 0-100
  loyalty: number; // 0-100
  intelligence: number; // 0-100
  humor: number; // 0-100
  ambition: number; // 0-100
  stability: number; // 0-100
  generosity: number; // 0-100
}
