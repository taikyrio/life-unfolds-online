
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

export const generateSeasonalEvents = (season: string): SeasonalEvent[] => {
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
  
  return events;
};
