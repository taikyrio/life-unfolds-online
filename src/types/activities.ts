
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
  category: string;
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
}
