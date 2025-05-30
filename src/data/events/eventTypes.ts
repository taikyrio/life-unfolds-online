
import { LifeEvent } from '../../types/game';

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

export interface DynamicEvent extends LifeEvent {
  conditions: EventCondition;
  flags?: string[];
  consequences?: string[];
  weight: number;
}
