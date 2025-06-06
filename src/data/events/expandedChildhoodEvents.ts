
import { LifeEvent } from '../../types/game';

export const expandedChildhoodEvents: LifeEvent[] = [
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word today!',
    emoji: '👶',
    category: 'family',
    minAge: 1,
    maxAge: 3,
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 }
        ],
        emoji: '👩',
        consequences: ['Your mother was overjoyed and cried happy tears!']
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 }
        ],
        emoji: '👨',
        consequences: ['Your father picked you up and spun you around!']
      },
      {
        id: 'cookie',
        text: 'Say "Cookie"',
        effects: [
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'stat', target: 'health', value: -5 }
        ],
        emoji: '🍪',
        consequences: ['Everyone laughed and gave you cookies!']
      }
    ]
  },
  {
    id: 'imaginary_friend',
    title: 'Imaginary Friend',
    description: 'You\'ve made an imaginary friend who goes everywhere with you.',
    emoji: '👻',
    category: 'social',
    minAge: 3,
    maxAge: 8,
    choices: [
      {
        id: 'embrace_friend',
        text: 'Play elaborate games together',
        effects: [
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'stat', target: 'smarts', value: 10 },
          { type: 'stat', target: 'relationships', value: -5 }
        ],
        emoji: '🎭',
        consequences: ['Your creativity flourished, but adults were concerned.']
      },
      {
        id: 'ignore_friend',
        text: 'Try to make real friends instead',
        effects: [
          { type: 'stat', target: 'relationships', value: 15 },
          { type: 'stat', target: 'happiness', value: -10 }
        ],
        emoji: '👫',
        consequences: ['You focused on making real connections.']
      }
    ]
  }
];
