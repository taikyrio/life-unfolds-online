
import { LifeEvent } from '../../types/game';

export const expandedSeniorEvents: LifeEvent[] = [
  {
    id: 'retirement_planning',
    title: 'Retirement Decision',
    description: 'You\'re eligible for retirement. What will you do?',
    emoji: '👴',
    category: 'career',
    minAge: 62,
    maxAge: 70,
    choices: [
      {
        id: 'retire_early',
        text: 'Retire immediately',
        effects: [
          { type: 'stat', target: 'happiness', value: 25 },
          { type: 'stat', target: 'health', value: 15 },
          { type: 'money', value: -10000 }
        ],
        emoji: '🏖️',
        consequences: ['Freedom felt amazing but money became tighter.']
      },
      {
        id: 'work_longer',
        text: 'Keep working',
        effects: [
          { type: 'money', value: 20000 },
          { type: 'stat', target: 'happiness', value: -10 },
          { type: 'stat', target: 'health', value: -5 }
        ],
        emoji: '💼',
        consequences: ['The extra income was nice but you felt tired.']
      },
      {
        id: 'part_time',
        text: 'Work part-time',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'money', value: 5000 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '⏰',
        consequences: ['The perfect balance of income and leisure time.']
      }
    ]
  }
];
