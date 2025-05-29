
export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  minAge?: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
}

export interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}

export interface CrimeOperation {
  name: string;
  minReward: number;
  maxReward: number;
  arrestChance: number;
  notorietyGain: number;
}

export interface CybercrimeOperation {
  name: string;
}

export interface MurderTarget {
  target: string;
}
