
import { LifeEvent } from '../../types/core';

export interface EventCondition {
  minAge?: number;
  maxAge?: number;
  lifeStage?: string;
  minStat?: { stat: string; value: number };
  maxStat?: { stat: string; value: number };
  hasFlag?: string;
  hasJob?: boolean;
  hasEducation?: string;
  probability?: number;
}

export interface DynamicEventChoice {
  id: string;
  text: string;
  emoji?: string;
  effects: { [key: string]: number };
  consequences?: string[];
}

export interface DynamicEvent extends Omit<LifeEvent, 'choices' | 'conditions'> {
  emoji: string;
  category: string;
  conditions: EventCondition;
  choices: DynamicEventChoice[];
  flags?: string[];
  consequences?: string[];
  weight: number;
}
