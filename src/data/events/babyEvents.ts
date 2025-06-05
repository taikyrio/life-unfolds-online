
import { DynamicEvent } from './eventTypes';

export const babyEvents: DynamicEvent[] = [
  {
    id: 'baby_first_steps',
    title: 'First Steps',
    description: 'You took your very first steps! Your parents are so proud.',
    emoji: '👶',
    category: 'childhood',
    conditions: {
      minAge: 0,
      maxAge: 2,
      probability: 0.8
    },
    choices: [
      {
        id: 'celebrate',
        text: 'Take more steps!',
        emoji: '🎉',
        effects: { happiness: 5, health: 2 }
      }
    ],
    weight: 2,
    flags: []
  },
  {
    id: 'baby_first_word',
    title: 'First Word',
    description: 'You said your first word! It was "mama" and your parents cried happy tears.',
    emoji: '🗣️',
    category: 'childhood',
    conditions: {
      minAge: 0,
      maxAge: 2,
      probability: 0.7
    },
    choices: [
      {
        id: 'say_more',
        text: 'Try to say more words',
        emoji: '💬',
        effects: { smarts: 3, relationships: 5 }
      }
    ],
    weight: 2,
    flags: []
  }
];
