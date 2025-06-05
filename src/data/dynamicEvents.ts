
import { createDynamicEventSystem } from './events/eventSystem';
import { allRandomEvents } from './events/expandedRandomEvents';
import { allEnhancedLifeStageEvents } from './events/enhancedLifeStageEvents';

// Enhanced dynamic event system that includes all event types
export const enhancedDynamicEventSystem = createDynamicEventSystem();

// Add all random events and enhanced life stage events to the system
enhancedDynamicEventSystem.events.push(...allRandomEvents, ...allEnhancedLifeStageEvents);

// Enhanced event selection with better probability weighting
const originalSelectEvent = enhancedDynamicEventSystem.selectEvent;
enhancedDynamicEventSystem.selectEvent = (availableEvents) => {
  if (availableEvents.length === 0) return null;
  
  // Apply age-based probability modifiers
  const weightedEvents = availableEvents.map(event => {
    let weight = event.weight || 1;
    
    // Increase probability of age-appropriate events
    if (event.conditions?.minAge && event.conditions?.maxAge) {
      const ageRange = event.conditions.maxAge - event.conditions.minAge;
      const idealAge = event.conditions.minAge + (ageRange * 0.5);
      
      // Events closer to ideal age are more likely
      const ageDifference = Math.abs(idealAge - event.conditions.minAge);
      weight *= Math.max(0.5, 1 - (ageDifference / ageRange));
    }
    
    // Major life events should be less frequent but more impactful
    if (event.id.includes('marriage') || event.id.includes('death') || event.id.includes('inheritance')) {
      weight *= 0.3;
    }
    
    // Career events more likely if employed
    if (event.category === 'career') {
      weight *= 1.5;
    }
    
    return { event, weight };
  });
  
  const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const weightedEvent of weightedEvents) {
    random -= weightedEvent.weight;
    if (random <= 0) return weightedEvent.event;
  }
  
  return weightedEvents[0]?.event || null;
};

export const dynamicEventSystem = enhancedDynamicEventSystem;
