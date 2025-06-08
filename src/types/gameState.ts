
import { Character } from './character';
import { LifeEvent } from './core';

export interface EventTracker {
  triggeredEvents: Set<string>;
  lastEventAge: number;
  eventCooldowns: Map<string, number>;
  choiceHistory: any[];
}

export interface GameState {
  character: Character;
  currentEvent: LifeEvent | null;
  gameStarted: boolean;
  gameOver: boolean;
  gameOverReason?: string;
  eventHistory: any[];
  achievements: string[];
  eventTracker: EventTracker;
  ageHistory?: Record<number, string[]>;
}
