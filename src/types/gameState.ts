
import { Character } from './character';
import { StatEffects, Choice } from './core';

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  effects?: StatEffects;
  flags?: string[];
  consequences?: string[];
  oneTime?: boolean;
  choices?: Choice[];
  category?: 'career' | 'education' | 'relationship' | 'random' | 'crime' | 'health' | 'family' | 'social';
  ageRequirement?: { min?: number; max?: number };
  requirements?: {
    education?: string;
    job?: string;
    relationshipStatus?: string;
    wealth?: number;
    familyMember?: string;
    zodiacSign?: string;
    socialCircle?: string;
  };
}

export interface EventTracker {
  triggeredEvents: Set<string>;
  lastEventAge: number;
  eventCooldowns: Map<string, number>;
  choiceHistory?: any[];
}

export interface GameState {
  character: Character;
  currentEvent: LifeEvent | null;
  gameStarted: boolean;
  gameOver: boolean;
  gameOverReason?: string;
  eventHistory: string[];
  achievements: string[];
  eventTracker: EventTracker;
}

// Re-export for backward compatibility
export { StatEffects, Choice };
