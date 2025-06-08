
import { Character } from '../../types/character';
import { EventTracker } from '../../types/character';
import { getLifeStage } from '../../utils/gameUtils';
import { DynamicEvent } from './eventTypes';
import { childhoodEvents } from './childhoodEvents';
import { teenageEvents } from './teenageEvents';
import { adultEvents } from './adultEvents';
import { seniorEvents } from './seniorEvents';
import { expandedLifeEvents } from './expandedLifeEvents';
import { allEnhancedLifeStageEvents } from './enhancedLifeStageEvents';
import { applySeasonalEventModifiers, generateSeasonalEvents } from '../../utils/seasonalEventSystem';

export const createDynamicEventSystem = () => {
  const events: DynamicEvent[] = [
    ...childhoodEvents,
    ...teenageEvents,
    ...adultEvents,
    ...seniorEvents,
    // Add enhanced life stage events
    ...allEnhancedLifeStageEvents,
    // Convert expanded life events to dynamic events
    ...expandedLifeEvents.map(event => ({
      ...event,
      emoji: event.emoji || '📝',
      category: event.category || 'general',
      conditions: {
        minAge: event.minAge,
        maxAge: event.maxAge,
        probability: 0.3
      },
      choices: event.choices?.map(choice => ({
        id: choice.id,
        text: choice.text,
        emoji: choice.emoji || '🔘',
        effects: choice.effects ? Object.fromEntries(
          Object.entries(choice.effects).map(([key, value]) => [key, typeof value === 'number' ? value : 0])
        ) : {},
        consequences: choice.consequences || []
      })) || [],
      weight: 1,
      flags: []
    }))
  ];

  const getAvailableEvents = (character: Character, eventTracker: EventTracker): DynamicEvent[] => {
    const lifeStage = getLifeStage(character.age);
    
    let availableEvents = events.filter(event => {
      const conditions = event.conditions;
      
      // Strict age range checking
      if (conditions.minAge !== undefined && character.age < conditions.minAge) return false;
      if (conditions.maxAge !== undefined && character.age > conditions.maxAge) return false;
      
      // Life stage validation - must match exactly if specified
      if (conditions.lifeStage && lifeStage !== conditions.lifeStage) return false;
      
      // Stat requirements validation
      if (conditions.minStat) {
        const statValue = character[conditions.minStat.stat as keyof Character] as number;
        if (typeof statValue !== 'number' || statValue < conditions.minStat.value) return false;
      }
      
      if (conditions.maxStat) {
        const statValue = character[conditions.maxStat.stat as keyof Character] as number;
        if (typeof statValue !== 'number' || statValue > conditions.maxStat.value) return false;
      }
      
      // Job requirement validation
      if (conditions.hasJob !== undefined) {
        if (conditions.hasJob && !character.job) return false;
        if (!conditions.hasJob && character.job) return false;
      }
      
      // Education requirement validation
      if (conditions.hasEducation && !character.education?.completedStages?.includes(conditions.hasEducation)) return false;
      
      // Probability check
      if (conditions.probability !== undefined && Math.random() > conditions.probability) return false;
      
      // Prevent duplicate events
      if (eventTracker.triggeredEvents && eventTracker.triggeredEvents.has(event.id)) return false;
      
      // Cooldown check - ensure events don't repeat too frequently
      const cooldownKey = `${event.id}_cooldown`;
      const lastTriggered = eventTracker.eventCooldowns?.get(cooldownKey);
      if (lastTriggered && (character.age - lastTriggered) < 3) return false;
      
      // Enhanced life stage validation
      const characterLifeStage = lifeStage.toLowerCase();
      
      // Don't show baby events to non-babies
      if (character.age > 2 && event.id.includes('baby')) return false;
      
      // Don't show adult events to children/teens
      if (character.age < 18 && (
        event.id.includes('job_promotion') || 
        event.id.includes('marriage') || 
        event.id.includes('apartment_hunting') ||
        event.category === 'career'
      )) return false;
      
      // Don't show childhood events to adults
      if (character.age > 18 && (
        event.id.includes('playground') || 
        event.id.includes('school_talent') ||
        event.id.includes('lost_tooth') ||
        event.category === 'childhood'
      )) return false;
      
      // Don't show teen events to adults/children
      if ((character.age < 13 || character.age > 19) && (
        event.id.includes('prom') || 
        event.id.includes('first_crush') ||
        event.id.includes('driving_test') ||
        event.category === 'teenage'
      )) return false;
      
      // Don't show senior events to younger people
      if (character.age < 50 && (
        event.id.includes('retirement') || 
        event.id.includes('grandchildren') ||
        event.id.includes('health_checkup')
      )) return false;
      
      return true;
    });

    // Apply seasonal modifiers to events
    availableEvents = applySeasonalEventModifiers(availableEvents, character);

    // Add seasonal events for younger characters
    if (character.age >= 3 && character.age <= 18) {
      const seasonalEvents = generateSeasonalEvents(character);
      availableEvents.push(...seasonalEvents);
    }

    return availableEvents;
  };

  const selectEvent = (availableEvents: DynamicEvent[]): DynamicEvent | null => {
    if (availableEvents.length === 0) return null;
    
    // Weighted random selection with personality influence
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
