
export interface EventChoice {
  id: string;
  text: string;
  emoji?: string;
  effects: Record<string, number>;
  consequences?: string[];
}

export interface EventConditions {
  minAge?: number;
  maxAge?: number;
  probability: number;
  lifeStage?: string;
  minStat?: { stat: string; value: number };
  maxStat?: { stat: string; value: number };
  hasJob?: boolean;
  hasEducation?: string;
}

export interface DynamicEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  choices: EventChoice[];
  conditions: EventConditions;
  weight: number;
  flags: string[];
}
