import { DynamicEvent } from './eventTypes';
import { babyEvents } from './babyEvents';
import { enhancedChildhoodEvents } from './enhancedChildhoodEvents';
import { enhancedTeenageEvents } from './enhancedTeenageEvents';
import { enhancedAdultEvents } from './enhancedAdultEvents';
import { enhancedSeniorEvents } from './enhancedSeniorEvents';

// Export individual event arrays for direct access
export { babyEvents };
export { enhancedChildhoodEvents };
export { enhancedTeenageEvents };
export { enhancedAdultEvents };
export { enhancedSeniorEvents };

// Legacy exports for backward compatibility
export const enhancedBabyEvents = babyEvents;

// Combined export for convenience
export const allEnhancedLifeStageEvents: DynamicEvent[] = [
  ...babyEvents,
  ...enhancedChildhoodEvents,
  ...enhancedTeenageEvents,
  ...enhancedAdultEvents,
  ...enhancedSeniorEvents
];