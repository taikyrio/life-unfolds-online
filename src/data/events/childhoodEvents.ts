
import { DynamicEvent } from './eventTypes';

export const childhoodEvents: DynamicEvent[] = [
  // Infant/Toddler Events (0-3)
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word! Your parents are overjoyed.',
    emoji: '👶',
    category: 'childhood',
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: { happiness: 15, relationships: 10 },
        emoji: '👶'
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: { happiness: 15, relationships: 10 },
        emoji: '👶'
      }
    ],
    conditions: { minAge: 1, maxAge: 2, probability: 0.8 },
    weight: 10
  },
  {
    id: 'potty_training',
    title: 'Potty Training',
    description: 'Your parents are trying to potty train you.',
    emoji: '🚽',
    category: 'childhood',
    choices: [
      {
        id: 'cooperate',
        text: 'Try your best to learn',
        effects: { happiness: 10, smarts: 5, relationships: 15 },
        emoji: '🚽'
      },
      {
        id: 'resist',
        text: 'Throw a tantrum',
        effects: { happiness: -5, relationships: -10 },
        emoji: '😭'
      }
    ],
    conditions: { minAge: 2, maxAge: 3, probability: 0.9 },
    weight: 8
  },

  // Child Events (4-11)
  {
    id: 'school_bully',
    title: 'School Bully',
    description: 'A bigger kid at school is picking on you and demanding your lunch money.',
    emoji: '👊',
    category: 'childhood',
    choices: [
      {
        id: 'stand_up',
        text: 'Stand up to the bully',
        effects: { happiness: 20, relationships: 10, health: -5 },
        emoji: '👊',
        consequences: ['You gained confidence but got a black eye.']
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: { happiness: 5, relationships: -5, smarts: 5 },
        emoji: '🏫',
        consequences: ['The teacher helped, but some kids call you a snitch.']
      },
      {
        id: 'give_money',
        text: 'Give them your lunch money',
        effects: { happiness: -15, wealth: -5, relationships: -10 },
        emoji: '💰',
        consequences: ['The bullying continues and you go hungry.']
      }
    ],
    conditions: { minAge: 6, maxAge: 11, probability: 0.4 },
    flags: ['bully_encounter'],
    weight: 12
  },
  {
    id: 'talent_show',
    title: 'School Talent Show',
    description: 'Your school is hosting a talent show. Do you want to participate?',
    emoji: '🎤',
    category: 'childhood',
    choices: [
      {
        id: 'sing',
        text: 'Perform a song',
        effects: { happiness: 25, looks: 10, relationships: 15 },
        emoji: '🎤'
      },
      {
        id: 'dance',
        text: 'Do a dance routine',
        effects: { happiness: 20, health: 5, looks: 15, relationships: 10 },
        emoji: '💃'
      },
      {
        id: 'skip',
        text: 'Don\'t participate',
        effects: { happiness: -5 },
        emoji: '😔'
      }
    ],
    conditions: { minAge: 7, maxAge: 11, probability: 0.3 },
    weight: 8
  }
];
