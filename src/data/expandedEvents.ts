
import { DynamicEvent } from './events/eventTypes';

export const expandedLifeEvents: DynamicEvent[] = [
  {
    id: 'lottery_ticket',
    title: 'Lucky Day',
    description: 'You found a lottery ticket on the ground. Do you want to claim it?',
    emoji: '🎰',
    choices: [
      {
        id: 'claim_ticket',
        text: 'Claim the ticket',
        effects: { happiness: 20, wealth: 100 },
        emoji: '💰'
      },
      {
        id: 'ignore_ticket',
        text: 'Leave it alone',
        effects: { happiness: -5 },
        emoji: '🚶'
      }
    ],
    conditions: { minAge: 18, probability: 0.1 },
    weight: 5
  },
  {
    id: 'random_encounter',
    title: 'Unexpected Meeting',
    description: 'You bump into an old friend on the street.',
    emoji: '👋',
    choices: [
      {
        id: 'catch_up',
        text: 'Stop and catch up',
        effects: { happiness: 15, relationships: 10 },
        emoji: '☕'
      },
      {
        id: 'polite_wave',
        text: 'Just wave and continue',
        effects: { happiness: 5 },
        emoji: '👋'
      }
    ],
    conditions: { minAge: 16, probability: 0.2 },
    weight: 8
  }
];
