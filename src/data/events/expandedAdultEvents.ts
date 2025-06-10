
import { LifeEvent } from '../../types/game';

export const expandedAdultEvents: LifeEvent[] = [
  {
    id: 'midlife_crisis',
    title: 'Midlife Crisis',
    description: 'You\'re questioning all your life choices and feel stuck in a rut.',
    emoji: '🤔',
    category: 'social',
    age: 45,
    minAge: 35,
    maxAge: 55,
    choices: [
      {
        id: 'buy_sports_car',
        text: 'Buy an expensive sports car',
        effects: {
          happiness: 20,
          wealth: -50000,
          looks: 10
        },
        emoji: '🏎️',
        consequences: ['You felt young again but your bank account suffered.']
      },
      {
        id: 'change_career',
        text: 'Completely change careers',
        effects: {
          happiness: 15,
          wealth: -20000,
          smarts: 10
        },
        emoji: '🔄',
        consequences: ['Starting over was scary but ultimately rewarding.']
      },
      {
        id: 'therapy',
        text: 'Seek therapy and counseling',
        effects: {
          happiness: 25,
          health: 15,
          wealth: -5000
        },
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
    age: 50,
    minAge: 25,
    maxAge: 80,
    choices: [
      {
        id: 'immediate_treatment',
        text: 'Seek immediate treatment',
        effects: {
          health: 15,
          wealth: -15000,
          happiness: -10
        },
        emoji: '💊',
        consequences: ['Early intervention saved your health and possibly your life.']
      },
      {
        id: 'second_opinion',
        text: 'Get a second opinion',
        effects: {
          health: 5,
          wealth: -5000,
          smarts: 5
        },
        emoji: '👨‍⚕️',
        consequences: ['The second doctor had a different diagnosis entirely.']
      }
    ]
  }
];
