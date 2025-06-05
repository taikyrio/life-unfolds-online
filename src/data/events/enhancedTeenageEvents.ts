
import { DynamicEvent } from './eventTypes';

export const enhancedTeenageEvents: DynamicEvent[] = [
  {
    id: 'first_crush',
    title: 'First Crush',
    description: 'You have developed your first romantic feelings for someone at school.',
    emoji: '💕',
    category: 'teenage',
    conditions: {
      minAge: 13,
      maxAge: 17,
      probability: 0.7
    },
    choices: [
      {
        id: 'confess_feelings',
        text: 'Tell them how you feel',
        emoji: '💌',
        effects: { happiness: 10, relationships: 8, looks: 2 }
      },
      {
        id: 'admire_secretly',
        text: 'Keep it a secret',
        emoji: '🤫',
        effects: { happiness: 3, relationships: 1 }
      },
      {
        id: 'focus_studies',
        text: 'Focus on your studies instead',
        emoji: '📚',
        effects: { smarts: 5, happiness: -2 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'prom_invitation',
    title: 'Prom Invitation',
    description: 'Someone asked you to prom! This could be the night of your life.',
    emoji: '💃',
    category: 'teenage',
    conditions: {
      minAge: 16,
      maxAge: 18,
      probability: 0.6
    },
    choices: [
      {
        id: 'say_yes',
        text: 'Accept the invitation',
        emoji: '✨',
        effects: { happiness: 15, relationships: 12, looks: 5 }
      },
      {
        id: 'decline_politely',
        text: 'Politely decline',
        emoji: '🙅',
        effects: { happiness: -5, relationships: -3 }
      },
      {
        id: 'ask_someone_else',
        text: 'Ask someone else instead',
        emoji: '💪',
        effects: { happiness: 8, relationships: 5, looks: 3 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'driving_test',
    title: 'Driving Test',
    description: "It's time for your driving test! You've been practicing for months.",
    emoji: '🚗',
    category: 'teenage',
    conditions: {
      minAge: 16,
      maxAge: 18,
      probability: 0.8
    },
    choices: [
      {
        id: 'ace_the_test',
        text: 'Drive perfectly',
        emoji: '🏆',
        effects: { happiness: 20, relationships: 8, smarts: 3 }
      },
      {
        id: 'barely_pass',
        text: 'Pass but make some mistakes',
        emoji: '😅',
        effects: { happiness: 10, relationships: 3 }
      },
      {
        id: 'fail_test',
        text: 'Fail the test',
        emoji: '😞',
        effects: { happiness: -10, relationships: -5 }
      }
    ],
    weight: 1,
    flags: []
  }
];
