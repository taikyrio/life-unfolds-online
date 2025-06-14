
export interface LifeEvent {
  id: string;
  age: number;
  year: number;
  event: string;
  category: 'education' | 'career' | 'relationship' | 'health' | 'finance' | 'crime' | 'family' | 'achievement' | 'decision';
  impact?: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    money?: number;
  };
  timestamp: number;
}

export interface GameLog {
  characterId: string;
  characterName: string;
  birthYear: number;
  events: LifeEvent[];
  ageHistory?: Record<number, string[]>;
  lastSaved: number;
}
