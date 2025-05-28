
export interface Character {
  name: string;
  age: number;
  health: number;
  happiness: number;
  wealth: number;
  relationships: number;
  year: number;
}

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  effects: StatEffects;
  emoji?: string;
}

export interface StatEffects {
  health?: number;
  happiness?: number;
  wealth?: number;
  relationships?: number;
}

export interface GameState {
  character: Character;
  currentEvent: LifeEvent | null;
  gameStarted: boolean;
  gameOver: boolean;
  gameOverReason?: string;
}
