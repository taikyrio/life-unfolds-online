import { Character } from './character';

export interface CrimeSyndicate {
  id: string;
  name: string;
  type: 'mafia' | 'yakuza' | 'triad' | 'irish_mob' | 'latin_mafia' | 'sicilian_mafia';
  region: string;
  reputation: number;
  strength: number;
  territory: string[];
  rivals: string[];
  members: CrimeFamilyMember[];
  leadership: SyndicateLeadership;
  rules: string[];
  activities: string[];
}

export interface SyndicateLeadership {
  godfather?: string; // Member ID
  underboss?: string;
  captains: string[];
  soldiers: string[];
  associates: string[];
}

export interface CrimeFamilyMember {
  id: string;
  name: string;
  rank: CrimeRank;
  loyalty: number;
  competence: number;
  suspicion: number;
  isRat: boolean;
  joinDate: string;
  crimes: CrimeRecord[];
  earnings: number;
  alive: boolean;
  inPrison: boolean;
}

export type CrimeRank = 'associate' | 'soldier' | 'caporegime' | 'underboss' | 'godfather' | 'chairman' | 'padrino';

export interface CrimeRecord {
  id: string;
  type: CrimeType;
  date: string;
  success: boolean;
  earnings: number;
  notoriety: number;
  witnesses: number;
  arrested: boolean;
}

export type CrimeType = 
  | 'bank_robbery'
  | 'burglary' 
  | 'extortion'
  | 'grand_theft_auto'
  | 'pickpocket'
  | 'porch_pirate'
  | 'shoplift'
  | 'train_robbery'
  | 'murder'
  | 'assault'
  | 'arson'
  | 'drug_trafficking'
  | 'money_laundering'
  | 'racketeering';

export interface ExtortionTarget {
  id: string;
  name: string;
  businessType: string;
  wealth: number;
  compliance: number;
  hasProtection: boolean;
  location: string;
}

export interface CrimeOperation {
  id: string;
  type: CrimeType;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  requiredRank: CrimeRank;
  minimumMembers: number;
  basePayout: number;
  riskLevel: number;
  notorietyGain: number;
  successRate: number;
  timeRequired: number; // hours
}

export interface SyndicateEvent {
  id: string;
  type: 'boss_order' | 'rat_suspicion' | 'rival_encounter' | 'family_death' | 'promotion' | 'territory_dispute' | 'police_raid';
  description: string;
  choices: SyndicateEventChoice[];
  consequences: EventConsequence[];
}

export interface SyndicateEventChoice {
  id: string;
  text: string;
  requirements?: {
    rank?: CrimeRank;
    loyalty?: number;
    members?: number;
  };
  effects: EventConsequence;
}

export interface EventConsequence {
  loyalty?: number;
  reputation?: number;
  wealth?: number;
  health?: number;
  happiness?: number;
  suspicion?: number;
  arrest?: boolean;
  death?: boolean;
  promotion?: boolean;
  familyDeath?: string; // family member ID
}

export interface CriminalCharacterState {
  syndicateId?: string;
  rank: CrimeRank;
  madeStatus: boolean; // Has taken the oath
  loyalty: number;
  reputation: number;
  crimesCommitted: number;
  totalEarnings: number;
  suspicionLevel: number;
  isInformant: boolean;
  informantProgress?: InformantProgress;
  protectionLevel: number;
  territoryControlled: string[];
  enemyFamilies: string[];
}

export interface InformantProgress {
  evidenceCollected: number;
  evidenceRequired: number;
  timeRemaining: number; // years
  discoveryRisk: number;
  policeContact: string;
}

export interface WitnessProtectionOffer {
  available: boolean;
  newIdentity: boolean;
  relocationOptions: string[];
  familyIncluded: boolean;
  financialSupport: number;
}

export interface RankInfo {
  title: string;
  minLoyalty: number;
  responsibilities: string[];
  privileges: string[];
  promotionRequirements: {
    timeInRank: number;
    crimesCompleted: number;
    earnings: number;
    loyalty: number;
    specialTasks?: string[];
  };
}

export interface SyndicateHierarchy {
  associate: RankInfo;
  soldier: RankInfo;
  caporegime: RankInfo;
  underboss: RankInfo;
  godfather: RankInfo;
  chairman: RankInfo;
  padrino: RankInfo;
}

export interface RivalFamily {
  id: string;
  name: string;
  type: string;
  hostility: number;
  strength: number;
  territory: string[];
  recentActions: string[];
}