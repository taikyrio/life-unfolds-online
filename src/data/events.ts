
import { GameEvent } from '../types/core';

export const gameEvents: GameEvent[] = [
  {
    id: 'childhood_playground',
    title: 'Playground Adventure',
    description: 'You discover a new playground in your neighborhood. What do you do?',
    choices: [
      {
        id: 'make_friends',
        text: 'Try to make new friends',
        emoji: '👫',
        consequences: [
          { type: 'stat', target: 'happiness', change: 10 },
          { type: 'stat', target: 'smarts', change: 5 }
        ]
      },
      {
        id: 'play_alone',
        text: 'Play by yourself',
        emoji: '🎈',
        consequences: [
          { type: 'stat', target: 'health', change: 5 },
          { type: 'stat', target: 'happiness', change: 5 }
        ]
      }
    ],
    ageRange: [3, 10],
    category: 'childhood',
    rarity: 0.7
  },
  {
    id: 'school_test',
    title: 'Important Test',
    description: 'You have a big test coming up at school. How do you prepare?',
    choices: [
      {
        id: 'study_hard',
        text: 'Study really hard',
        emoji: '📚',
        consequences: [
          { type: 'stat', target: 'smarts', change: 15 },
          { type: 'stat', target: 'happiness', change: -5 }
        ]
      },
      {
        id: 'study_normal',
        text: 'Study a normal amount',
        emoji: '✏️',
        consequences: [
          { type: 'stat', target: 'smarts', change: 8 },
          { type: 'stat', target: 'happiness', change: 2 }
        ]
      },
      {
        id: 'dont_study',
        text: 'Don\'t study at all',
        emoji: '🎮',
        consequences: [
          { type: 'stat', target: 'happiness', change: 8 },
          { type: 'stat', target: 'smarts', change: -5 }
        ]
      }
    ],
    ageRange: [6, 18],
    category: 'education',
    rarity: 0.6
  },
  {
    id: 'friend_conflict',
    title: 'Friend Argument',
    description: 'You got into an argument with your best friend. What do you do?',
    choices: [
      {
        id: 'apologize',
        text: 'Apologize first',
        emoji: '🤝',
        consequences: [
          { type: 'stat', target: 'happiness', change: 5 },
          { type: 'relationship', target: 'friend', change: 15 }
        ]
      },
      {
        id: 'wait',
        text: 'Wait for them to apologize',
        emoji: '⏰',
        consequences: [
          { type: 'stat', target: 'happiness', change: -5 },
          { type: 'relationship', target: 'friend', change: -5 }
        ]
      },
      {
        id: 'ignore',
        text: 'Ignore them completely',
        emoji: '🙄',
        consequences: [
          { type: 'stat', target: 'happiness', change: -10 },
          { type: 'relationship', target: 'friend', change: -20 }
        ]
      }
    ],
    ageRange: [5, 25],
    category: 'relationship',
    rarity: 0.5
  }
];
