
import { LifeEvent } from '../../types/game';

export const expandedAdultEvents: LifeEvent[] = [
  {
    id: 'midlife_crisis',
    title: 'Midlife Crisis',
    description: 'You\'re questioning all your life choices and feel stuck in a rut.',
    emoji: '🤔',
    category: 'social',
    minAge: 35,
    maxAge: 55,
    choices: [
      {
        id: 'buy_sports_car',
        text: 'Buy an expensive sports car',
        effects: [
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'money', value: -50000 },
          { type: 'stat', target: 'looks', value: 10 }
        ],
        emoji: '🏎️',
        consequences: ['You felt young again but your bank account suffered.']
      },
      {
        id: 'change_career',
        text: 'Completely change careers',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'money', value: -20000 },
          { type: 'stat', target: 'smarts', value: 10 }
        ],
        emoji: '🔄',
        consequences: ['Starting over was scary but ultimately rewarding.']
      },
      {
        id: 'therapy',
        text: 'Seek therapy and counseling',
        effects: [
          { type: 'stat', target: 'happiness', value: 25 },
          { type: 'stat', target: 'health', value: 15 },
          { type: 'money', value: -5000 }
        ],
        emoji: '🛋️',
        consequences: ['Professional help gave you new perspective on life.']
      }
    ]
  },
  {
    id: 'health_scare',
    title: 'Health Scare',
    description: 'Routine medical tests revealed something concerning.',
    emoji: '🏥',
    category: 'health',
    minAge: 25,
    maxAge: 80,
    choices: [
      {
        id: 'immediate_treatment',
        text: 'Seek immediate treatment',
        effects: [
          { type: 'stat', target: 'health', value: 15 },
          { type: 'money', value: -15000 },
          { type: 'stat', target: 'happiness', value: -10 }
        ],
        emoji: '💊',
        consequences: ['Early intervention saved your health and possibly your life.']
      },
      {
        id: 'second_opinion',
        text: 'Get a second opinion',
        effects: [
          { type: 'stat', target: 'health', value: 5 },
          { type: 'money', value: -5000 },
          { type: 'stat', target: 'smarts', value: 5 }
        ],
        emoji: '👨‍⚕️',
        consequences: ['The second doctor had a different diagnosis entirely.']
      }
    ]
  }
];
