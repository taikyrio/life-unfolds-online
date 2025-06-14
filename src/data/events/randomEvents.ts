
import { DynamicEvent } from './eventTypes';
import { schoolWorkEvents } from './schoolWorkEvents';
import { relationshipEvents } from './relationshipEvents';
import { healthEvents } from './healthEvents';
import { financialEvents } from './financialEvents';
import { familyEvents } from './familyEvents';
import { legalEvents } from './legalEvents';
import { travelEvents } from './travelEvents';

export const allRandomEvents: DynamicEvent[] = [
  ...schoolWorkEvents,
  ...relationshipEvents,
  ...healthEvents,
  ...financialEvents,
  ...familyEvents,
  ...legalEvents,
  ...travelEvents
];

// Re-export individual categories for specific use cases
export {
  schoolWorkEvents,
  relationshipEvents,
  healthEvents,
  financialEvents,
  familyEvents,
  legalEvents,
  travelEvents
};
