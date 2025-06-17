
import { GameEvent } from '../types/core';

export const gameEvents: GameEvent[] = [
  {
    id: 'childhood_playground',
    title: 'Playground Adventure',
    description: 'You found something interesting at the playground.',
    ageRange: [4, 8],
    category: 'childhood',
    rarity: 0.7,
    choices: [
      {
        id: 'play_nice',
        text: 'Share with other kids',
        consequences: [
          { type: 'stat', target: 'happiness', change: 10 },
          { type: 'stat', target: 'kindness', change: 5 }
        ]
      },
      {
        id: 'keep_it',
        text: 'Keep it for yourself',
        consequences: [
          { type: 'stat', target: 'happiness', change: 5 },
          { type: 'stat', target: 'kindness', change: -3 }
        ]
      }
    ]
  },
  {
    id: 'school_test',
    title: 'Important Test',
    description: 'You have a big test coming up at school.',
    ageRange: [6, 18],
    category: 'education',
    rarity: 0.8,
    choices: [
      {
        id: 'study_hard',
        text: 'Study really hard',
        consequences: [
          { type: 'stat', target: 'smarts', change: 15 },
          { type: 'stat', target: 'happiness', change: -5 }
        ]
      },
      {
        id: 'wing_it',
        text: 'Wing it without studying',
        consequences: [
          { type: 'stat', target: 'smarts', change: -5 },
          { type: 'stat', target: 'happiness', change: 10 }
        ]
      },
      {
        id: 'cheat',
        text: 'Try to cheat',
        consequences: [
          { type: 'stat', target: 'smarts', change: 5 },
          { type: 'stat', target: 'happiness', change: -10 }
        ]
      }
    ]
  },
  {
    id: 'teen_party',
    title: 'Party Invitation',
    description: 'You were invited to a popular kid\'s party.',
    ageRange: [13, 18],
    category: 'relationship',
    rarity: 0.6,
    choices: [
      {
        id: 'go_party',
        text: 'Go to the party',
        consequences: [
          { type: 'stat', target: 'happiness', change: 20 },
          { type: 'stat', target: 'health', change: -5 }
        ]
      },
      {
        id: 'stay_home',
        text: 'Stay home and study',
        consequences: [
          { type: 'stat', target: 'smarts', change: 10 },
          { type: 'stat', target: 'happiness', change: -10 }
        ]
      }
    ]
  },
  {
    id: 'job_interview',
    title: 'Job Interview',
    description: 'You have an interview for your dream job.',
    ageRange: [18, 65],
    category: 'career',
    rarity: 0.5,
    choices: [
      {
        id: 'be_honest',
        text: 'Be completely honest',
        consequences: [
          { type: 'stat', target: 'happiness', change: 15 },
          { type: 'money', target: '', change: 500 }
        ]
      },
      {
        id: 'embellish',
        text: 'Embellish your experience',
        consequences: [
          { type: 'stat', target: 'happiness', change: -5 },
          { type: 'money', target: '', change: 1000 }
        ]
      }
    ]
  },
  {
    id: 'health_scare',
    title: 'Health Check',
    description: 'You notice something concerning about your health.',
    ageRange: [30, 80],
    category: 'health',
    rarity: 0.4,
    choices: [
      {
        id: 'see_doctor',
        text: 'See a doctor immediately',
        consequences: [
          { type: 'stat', target: 'health', change: 20 },
          { type: 'money', target: '', change: -200 }
        ]
      },
      {
        id: 'ignore_it',
        text: 'Ignore it and hope it goes away',
        consequences: [
          { type: 'stat', target: 'health', change: -15 },
          { type: 'stat', target: 'happiness', change: -10 }
        ]
      }
    ]
  }
];
