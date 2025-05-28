
export interface Character {
  name: string;
  age: number;
  health: number;
  happiness: number;
  smarts: number;
  looks: number;
  wealth: number;
  relationships: number;
  year: number;
  
  // Career & Education
  job?: string;
  jobLevel: number;
  salary: number;
  education: string;
  
  // Relationships
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children: string[];
  
  // Life Status
  criminalRecord: boolean;
  fame: number;
  nationality: string;
  birthplace: string;
}

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  choices: Choice[];
  category?: 'career' | 'education' | 'relationship' | 'random' | 'crime' | 'health' | 'family';
  ageRequirement?: { min?: number; max?: number };
  requirements?: {
    education?: string;
    job?: string;
    relationshipStatus?: string;
    wealth?: number;
  };
}

export interface Choice {
  id: string;
  text: string;
  effects: StatEffects;
  emoji?: string;
  consequences?: string[];
  unlocks?: string[];
}

export interface StatEffects {
  health?: number;
  happiness?: number;
  smarts?: number;
  looks?: number;
  wealth?: number;
  relationships?: number;
  salary?: number;
  fame?: number;
  job?: string;
  jobLevel?: number;
  education?: string;
  relationshipStatus?: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children?: string[];
  criminalRecord?: boolean;
}

export interface GameState {
  character: Character;
  currentEvent: LifeEvent | null;
  gameStarted: boolean;
  gameOver: boolean;
  gameOverReason?: string;
  eventHistory: string[];
  achievements: string[];
}
