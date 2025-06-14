
import { DynamicEvent } from './eventTypes';

export const travelEvents: DynamicEvent[] = [
  {
    id: 'surprise_vacation',
    title: 'Vacation Opportunity',
    description: 'A friend invited you on a last-minute trip to Europe.',
    emoji: '✈️',
    category: 'social',
    choices: [
      {
        id: 'luxury_trip',
        text: 'Go all out with luxury accommodations',
        effects: { happiness: 50, wealth: -8000, relationships: 20, looks: 10 },
        emoji: '🏨',
        consequences: ['An amazing trip that created lifelong memories.']
      },
      {
        id: 'budget_trip',
        text: 'Go on a budget',
        effects: { happiness: 35, wealth: -3000, relationships: 15, health: 5 },
        emoji: '🎒',
        consequences: ['A fantastic adventure that proved experiences matter more than luxury.']
      },
      {
        id: 'decline_trip',
        text: 'Decline - too expensive',
        effects: { happiness: -15, wealth: 500, relationships: -10 },
        emoji: '😞',
        consequences: ['You saved money but felt FOMO when seeing their photos.']
      }
    ],
    conditions: { minAge: 18, maxAge: 60, probability: 0.08 },
    weight: 12,
    flags: []
  }
];
