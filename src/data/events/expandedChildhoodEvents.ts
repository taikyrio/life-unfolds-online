
import { LifeEvent } from '../../types/game';

export const expandedChildhoodEvents: LifeEvent[] = [
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word today!',
    emoji: '👶',
    category: 'family',
    age: 1,
    minAge: 1,
    maxAge: 3,
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: {
          happiness: 15,
          relationships: 10
        },
        emoji: '👩',
        consequences: ['Your mother was overjoyed and cried happy tears!']
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: {
          happiness: 15,
          relationships: 10
        },
        emoji: '👨',
        consequences: ['Your father picked you up and spun you around!']
      },
      {
        id: 'cookie',
        text: 'Say "Cookie"',
        effects: {
          happiness: 20,
          health: -5
        },
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
    age: 5,
    minAge: 3,
    maxAge: 8,
    choices: [
      {
        id: 'embrace_friend',
        text: 'Play elaborate games together',
        effects: {
          happiness: 20,
          smarts: 10,
          relationships: -5
        },
        emoji: '🎭',
        consequences: ['Your creativity flourished, but adults were concerned.']
      },
      {
        id: 'ignore_friend',
        text: 'Try to make real friends instead',
        effects: {
          relationships: 15,
          happiness: -10
        },
        emoji: '👫',
        consequences: ['You focused on making real connections.']
      }
    ]
  }
];
