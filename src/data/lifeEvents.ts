
import { LifeEvent, CriminalRecord } from '../types/core';
import { Character } from '../types/character';

export const getRandomLifeEvent = (character: Character): LifeEvent | null => {
  const availableEvents = lifeEvents.filter(event => {
    if (event.minAge && character.age < event.minAge) return false;
    if (event.maxAge && character.age > event.maxAge) return false;
    return true;
  });

  if (availableEvents.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableEvents.length);
  return availableEvents[randomIndex];
};

export const lifeEvents: LifeEvent[] = [
  {
    id: 'school_success',
    title: 'Academic Achievement',
    description: 'You excelled in your studies this year!',
    type: 'positive',
    minAge: 5,
    maxAge: 22,
    effects: [
      { type: 'stat', target: 'smarts', value: 5 },
      { type: 'stat', target: 'happiness', value: 3 }
    ]
  },
  {
    id: 'make_friend',
    title: 'New Friendship',
    description: 'You made a new friend today!',
    type: 'positive',
    minAge: 3,
    maxAge: 80,
    effects: [
      { type: 'stat', target: 'happiness', value: 10 },
      { type: 'stat', target: 'relationships', value: 5 }
    ]
  },
  {
    id: 'minor_illness',
    title: 'Caught a Cold',
    description: 'You came down with a minor illness.',
    type: 'negative',
    minAge: 1,
    maxAge: 100,
    effects: [
      { type: 'stat', target: 'health', value: -5 },
      { type: 'stat', target: 'happiness', value: -2 }
    ]
  },
  {
    id: 'birthday_party',
    title: 'Birthday Celebration',
    description: 'You had a wonderful birthday party!',
    type: 'positive',
    minAge: 3,
    maxAge: 100,
    effects: [
      { type: 'stat', target: 'happiness', value: 15 }
    ]
  },
  {
    id: 'playground_accident',
    title: 'Playground Mishap',
    description: 'You had a small accident while playing.',
    type: 'negative',
    minAge: 3,
    maxAge: 12,
    effects: [
      { type: 'stat', target: 'health', value: -3 },
      { type: 'stat', target: 'happiness', value: -5 }
    ]
  }
];

export const createInitialCriminalRecord = (): CriminalRecord => ({
  arrests: 0,
  convictions: 0,
  prisonTime: 0,
  crimes: [],
  notoriety: 0,
  totalSentence: 0,
  currentlyIncarcerated: false,
  charges: [],
  timeServed: 0,
  isIncarcerated: false
});
