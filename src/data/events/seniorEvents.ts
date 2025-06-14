
import { DynamicEvent } from './eventTypes';

export const seniorEvents: DynamicEvent[] = [
  {
    id: 'retirement_planning',
    title: 'Retirement Decision',
    description: 'You\'re eligible for retirement. What\'s your plan?',
    emoji: '🏖️',
    category: 'career',
    choices: [
      {
        id: 'full_retirement',
        text: 'Retire and enjoy life',
        effects: { happiness: 30, health: 10, wealth: -100 },
        emoji: '🏖️'
      },
      {
        id: 'part_time',
        text: 'Work part-time',
        effects: { happiness: 15, wealth: 50 },
        emoji: '⏰'
      },
      {
        id: 'keep_working',
        text: 'Continue working full-time',
        effects: { happiness: -10, health: -5, wealth: 200 },
        emoji: '💼'
      }
    ],
    conditions: { minAge: 65, maxAge: 70, hasJob: true, probability: 0.8 },
    weight: 15,
    flags: []
  }
];
