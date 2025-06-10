
import { Character } from '../types/character';
import { DynamicEvent } from '../data/events/eventTypes';

export interface SeasonalEvent {
  id: string;
  title: string;
  description: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  effects: {
    happiness?: number;
    health?: number;
    wealth?: number;
  };
}

export const generateSeasonalEvents = (character: Character): DynamicEvent[] => {
  const currentMonth = new Date().getMonth() + 1;
  let season: string;
  
  if (currentMonth >= 3 && currentMonth <= 5) {
    season = 'spring';
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    season = 'summer';
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    season = 'fall';
  } else {
    season = 'winter';
  }

  const events: SeasonalEvent[] = [];
  
  switch (season) {
    case 'spring':
      events.push({
        id: 'spring_cleaning',
        title: 'Spring Cleaning',
        description: 'Time for spring cleaning and fresh starts!',
        season: 'spring',
        effects: { happiness: 5, health: 3 }
      });
      break;
    case 'summer':
      events.push({
        id: 'summer_vacation',
        title: 'Summer Vacation',
        description: 'Perfect weather for outdoor activities and relaxation.',
        season: 'summer',
        effects: { happiness: 10, health: 5 }
      });
      break;
    case 'fall':
      events.push({
        id: 'autumn_harvest',
        title: 'Autumn Harvest',
        description: 'A time of reflection and preparation.',
        season: 'fall',
        effects: { happiness: 3, wealth: 5 }
      });
      break;
    case 'winter':
      events.push({
        id: 'winter_holidays',
        title: 'Winter Holidays',
        description: 'Holiday season brings joy and family time.',
        season: 'winter',
        effects: { happiness: 8, wealth: -10 }
      });
      break;
  }
  
  // Convert SeasonalEvent to DynamicEvent format
  return events.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    emoji: getSeasonEmoji(event.season),
    category: 'seasonal',
    conditions: {
      minAge: 3,
      maxAge: 18,
      probability: 0.3
    },
    choices: [{
      id: 'participate',
      text: 'Participate in the seasonal activity',
      emoji: '✨',
      effects: event.effects,
      consequences: []
    }],
    weight: 1,
    flags: []
  }));
};

export const applySeasonalEventModifiers = (events: DynamicEvent[], character: Character): DynamicEvent[] => {
  // Apply seasonal modifiers to existing events
  return events.map(event => {
    if (event.category === 'seasonal') {
      // Increase probability during appropriate seasons
      const modifiedEvent = { ...event };
      modifiedEvent.conditions = {
        ...event.conditions,
        probability: (event.conditions.probability || 0.3) * 1.2
      };
      return modifiedEvent;
    }
    return event;
  });
};

const getSeasonEmoji = (season: string): string => {
  switch (season) {
    case 'spring': return '🌸';
    case 'summer': return '☀️';
    case 'fall': return '🍂';
    case 'winter': return '❄️';
    default: return '🌟';
  }
};
