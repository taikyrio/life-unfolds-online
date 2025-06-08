
import { BIRTH_SEASON_EFFECTS, BirthSeasonEffects } from '../types/personality';
import { Character } from '../types/character';
import { DynamicEvent } from '../data/events/eventTypes';

export const getBirthSeason = (birthMonth: number): string => {
  if (birthMonth >= 3 && birthMonth <= 5) return 'spring';
  if (birthMonth >= 6 && birthMonth <= 8) return 'summer';
  if (birthMonth >= 9 && birthMonth <= 11) return 'autumn';
  return 'winter';
};

export const getCurrentSeason = (): string => {
  const month = new Date().getMonth() + 1;
  return getBirthSeason(month);
};

export const applySeasonalEventModifiers = (
  events: DynamicEvent[],
  character: Character
): DynamicEvent[] => {
  const birthSeason = getBirthSeason(character.birthMonth || 1);
  const currentSeason = getCurrentSeason();
  const seasonEffects = BIRTH_SEASON_EFFECTS[birthSeason];
  const currentSeasonEffects = BIRTH_SEASON_EFFECTS[currentSeason];

  return events.map(event => {
    let modifiedEvent = { ...event };
    let probabilityMultiplier = 1;

    // Apply birth season effects
    Object.entries(seasonEffects.eventProbabilityModifiers).forEach(([category, modifier]) => {
      if (event.category === category) {
        probabilityMultiplier *= modifier;
      }
    });

    // Apply current season effects (lighter influence)
    Object.entries(currentSeasonEffects.eventProbabilityModifiers).forEach(([category, modifier]) => {
      if (event.category === category) {
        probabilityMultiplier *= (modifier * 0.5 + 0.5); // Dampen current season effect
      }
    });

    // Modify event probability
    if (modifiedEvent.conditions?.probability) {
      modifiedEvent.conditions.probability *= probabilityMultiplier;
    }

    return modifiedEvent;
  });
};

export const generateSeasonalEvents = (character: Character): DynamicEvent[] => {
  const birthSeason = getBirthSeason(character.birthMonth || 1);
  const seasonEffects = BIRTH_SEASON_EFFECTS[birthSeason];

  return seasonEffects.specialEvents.map(eventId => ({
    id: `seasonal_${eventId}`,
    title: getSeasonalEventTitle(eventId),
    description: getSeasonalEventDescription(eventId),
    emoji: getSeasonalEventEmoji(eventId),
    category: 'seasonal',
    conditions: {
      minAge: 3,
      maxAge: 18,
      probability: 0.3
    },
    choices: getSeasonalEventChoices(eventId),
    weight: 1.5,
    flags: ['seasonal']
  }));
};

const getSeasonalEventTitle = (eventId: string): string => {
  const titles: Record<string, string> = {
    spring_festival: 'Spring Festival',
    easter_celebration: 'Easter Celebration',
    nature_walk: 'Nature Walk',
    summer_vacation: 'Summer Vacation',
    beach_trip: 'Beach Trip',
    summer_camp: 'Summer Camp',
    back_to_school: 'Back to School',
    halloween: 'Halloween Night',
    thanksgiving: 'Thanksgiving Dinner',
    christmas: 'Christmas Morning',
    new_year: 'New Year\'s Eve',
    winter_storm: 'Winter Storm'
  };
  return titles[eventId] || 'Seasonal Event';
};

const getSeasonalEventDescription = (eventId: string): string => {
  const descriptions: Record<string, string> = {
    spring_festival: 'Your community is celebrating the arrival of spring with a local festival.',
    easter_celebration: 'It\'s Easter time and your family is planning a celebration.',
    nature_walk: 'The weather is perfect for a nature walk in the blooming outdoors.',
    summer_vacation: 'Summer break has arrived! Your family is planning a vacation.',
    beach_trip: 'It\'s a hot summer day, perfect for a trip to the beach.',
    summer_camp: 'Your parents are considering sending you to summer camp.',
    back_to_school: 'Summer is ending and it\'s time to prepare for the new school year.',
    halloween: 'Halloween has arrived! Time to decide on your costume and activities.',
    thanksgiving: 'Your family is gathering for Thanksgiving dinner.',
    christmas: 'It\'s Christmas morning and presents await under the tree!',
    new_year: 'New Year\'s Eve is here - a time for reflection and resolutions.',
    winter_storm: 'A big winter storm is approaching your area.'
  };
  return descriptions[eventId] || 'A seasonal event is happening.';
};

const getSeasonalEventEmoji = (eventId: string): string => {
  const emojis: Record<string, string> = {
    spring_festival: '🌸',
    easter_celebration: '🐰',
    nature_walk: '🌳',
    summer_vacation: '✈️',
    beach_trip: '🏖️',
    summer_camp: '🏕️',
    back_to_school: '🎒',
    halloween: '🎃',
    thanksgiving: '🦃',
    christmas: '🎄',
    new_year: '🎆',
    winter_storm: '❄️'
  };
  return emojis[eventId] || '🌟';
};

const getSeasonalEventChoices = (eventId: string): any[] => {
  const choices: Record<string, any[]> = {
    spring_festival: [
      { id: 'participate', text: 'Join the festivities', emoji: '🎉', effects: { happiness: 10, relationships: 5 } },
      { id: 'volunteer', text: 'Volunteer to help', emoji: '🤝', effects: { happiness: 8, relationships: 8, empathy: 3 } },
      { id: 'stay_home', text: 'Stay home instead', emoji: '🏠', effects: { happiness: -2 } }
    ],
    summer_vacation: [
      { id: 'beach_vacation', text: 'Go to the beach', emoji: '🏖️', effects: { happiness: 15, health: 5 } },
      { id: 'mountain_trip', text: 'Visit the mountains', emoji: '⛰️', effects: { happiness: 12, health: 8 } },
      { id: 'staycation', text: 'Stay home and relax', emoji: '🏠', effects: { happiness: 5, wealth: 200 } }
    ],
    halloween: [
      { id: 'trick_or_treat', text: 'Go trick-or-treating', emoji: '🍭', effects: { happiness: 12, relationships: 6 } },
      { id: 'costume_party', text: 'Attend a costume party', emoji: '🎭', effects: { happiness: 10, relationships: 8 } },
      { id: 'scary_movies', text: 'Watch scary movies at home', emoji: '👻', effects: { happiness: 6 } }
    ]
  };
  
  return choices[eventId] || [
    { id: 'enjoy', text: 'Enjoy the moment', emoji: '😊', effects: { happiness: 5 } },
    { id: 'skip', text: 'Skip this event', emoji: '🚫', effects: { happiness: -1 } }
  ];
};
