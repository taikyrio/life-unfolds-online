
import { Character, EventTracker } from '../../types/game';
import { getLifeStage } from '../../utils/gameStateUtils';
import { DynamicEvent } from './eventTypes';
import { childhoodEvents } from './childhoodEvents';
import { teenageEvents } from './teenageEvents';
import { adultEvents } from './adultEvents';
import { seniorEvents } from './seniorEvents';
import { expandedLifeEvents } from './expandedLifeEvents';

export const createDynamicEventSystem = () => {
  const events: DynamicEvent[] = [
    ...childhoodEvents,
    ...teenageEvents,
    ...adultEvents,
    ...seniorEvents,
    // Convert expanded life events to dynamic events
    ...expandedLifeEvents.map(event => ({
      ...event,
      conditions: {
        minAge: event.ageRequirement?.min,
        maxAge: event.ageRequirement?.max,
        probability: 0.3
      },
      weight: 1,
      flags: []
    }))
  ];

  const getAvailableEvents = (character: Character, eventTracker: EventTracker): DynamicEvent[] => {
    const lifeStage = getLifeStage(character.age);
    
    return events.filter(event => {
      const conditions = event.conditions;
      
      // Check age range
      if (conditions.minAge && character.age < conditions.minAge) return false;
      if (conditions.maxAge && character.age > conditions.maxAge) return false;
      
      // Check life stage
      if (conditions.lifeStage && lifeStage !== conditions.lifeStage) return false;
      
      // Check stat requirements
      if (conditions.minStat) {
        const statValue = character[conditions.minStat.stat as keyof Character] as number;
        if (statValue < conditions.minStat.value) return false;
      }
      
      if (conditions.maxStat) {
        const statValue = character[conditions.maxStat.stat as keyof Character] as number;
        if (statValue > conditions.maxStat.value) return false;
      }
      
      // Check job requirement
      if (conditions.hasJob !== undefined) {
        if (conditions.hasJob && !character.job) return false;
        if (!conditions.hasJob && character.job) return false;
      }
      
      // Check education requirement
      if (conditions.hasEducation && !character.education.completedStages.includes(conditions.hasEducation)) return false;
      
      // Check probability
      if (conditions.probability && Math.random() > conditions.probability) return false;
      
      // Check if event was already triggered recently
      if (eventTracker.triggeredEvents.has(event.id)) return false;
      
      // Check cooldown
      const cooldownKey = `${event.id}_cooldown`;
      const lastTriggered = eventTracker.eventCooldowns.get(cooldownKey);
      if (lastTriggered && (character.age - lastTriggered) < 2) return false;
      
      return true;
    });
  };

  const selectEvent = (availableEvents: DynamicEvent[]): DynamicEvent | null => {
    if (availableEvents.length === 0) return null;
    
    // Weighted random selection
    const totalWeight = availableEvents.reduce((sum, event) => sum + (event.weight || 1), 0);
    let random = Math.random() * totalWeight;
    
    for (const event of availableEvents) {
      random -= (event.weight || 1);
      if (random <= 0) return event;
    }
    
    return availableEvents[0];
  };

  return {
    getAvailableEvents,
    selectEvent,
    events
  };
};

export const dynamicEventSystem = createDynamicEventSystem();
