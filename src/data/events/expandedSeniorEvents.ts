
import { LifeEvent } from '../../types/game';

export const expandedSeniorEvents: LifeEvent[] = [
  {
    id: 'retirement_planning',
    title: 'Retirement Decision',
    description: 'You\'re eligible for retirement. What will you do?',
    emoji: '👴',
    category: 'career',
    age: 65,
    minAge: 62,
    maxAge: 70,
    choices: [
      {
        id: 'retire_early',
        text: 'Retire immediately',
        effects: {
          happiness: 25,
          health: 15,
          wealth: -10000
        },
        emoji: '🏖️',
        consequences: ['Freedom felt amazing but money became tighter.']
      },
      {
        id: 'work_longer',
        text: 'Keep working',
        effects: {
          wealth: 20000,
          happiness: -10,
          health: -5
        },
        emoji: '💼',
        consequences: ['The extra income was nice but you felt tired.']
      },
      {
        id: 'part_time',
        text: 'Work part-time',
        effects: {
          happiness: 15,
          wealth: 5000,
          health: 5
        },
        emoji: '⏰',
        consequences: ['The perfect balance of income and leisure time.']
      }
    ]
  }
];
