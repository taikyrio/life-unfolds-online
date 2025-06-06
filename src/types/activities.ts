
export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  minAge?: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
  effects: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
    notoriety?: number;
  };
  category: string;
  consequences?: {
    arrestChance?: number;
    crimeType?: string;
  };
}

export interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}

export interface CrimeOperation {
  name: string;
  reward: number;
  arrestChance: number;
  notorietyGain: number;
  minReward: number;
  maxReward: number;
  failureChance?: number;
}

export interface CybercrimeOperation {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  risk: number;
  reward: number;
}

export interface ActivityResult {
  success: boolean;
  message: string;
  effects?: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
    notoriety?: number;
  };
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  cost: number;
  duration: number; // in hours
  effects: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
  };
  requirements?: {
    minAge?: number;
    maxAge?: number;
    wealth?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    job?: string;
    education?: string;
  };
  unlockConditions?: string[];
  riskFactors?: {
    injury?: number;
    arrest?: number;
    death?: number;
  };
  consequences?: {
    arrestChance?: number;
    crimeType?: string;
  };
  category?: string;
  arrestChance?: number;
}
