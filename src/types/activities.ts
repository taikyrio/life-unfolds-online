
export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  effects: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
    fame?: number;
  };
  minAge?: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
  category: string;
}

export interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  effects: Record<string, number>;
  cost?: number;
  resultText?: string;
  requirements?: {
    minAge?: number;
    maxAge?: number;
    minWealth?: number;
    education?: string;
  };
}

export interface CrimeOperation {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  risk: number;
  reward: number;
  type: 'criminal_operation';
}

export interface CybercrimeOperation {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  risk: number;
  reward: number;
  type: 'cybercrime';
}
