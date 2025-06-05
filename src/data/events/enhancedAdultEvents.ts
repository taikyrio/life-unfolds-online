
import { DynamicEvent } from './eventTypes';

export const enhancedAdultEvents: DynamicEvent[] = [
  {
    id: 'job_promotion',
    title: 'Job Promotion Opportunity',
    description: 'Your boss is considering you for a promotion. This could change your career trajectory!',
    emoji: '📈',
    category: 'career',
    conditions: {
      minAge: 22,
      maxAge: 65,
      hasJob: true,
      probability: 0.4
    },
    choices: [
      {
        id: 'work_overtime',
        text: 'Work extra hard for it',
        emoji: '💼',
        effects: { wealth: 10, salary: 5000, happiness: -3, health: -2 }
      },
      {
        id: 'networking',
        text: 'Network with colleagues',
        emoji: '🤝',
        effects: { wealth: 8, relationships: 6, happiness: 2 }
      },
      {
        id: 'wait_and_see',
        text: 'Wait for natural progression',
        emoji: '⏰',
        effects: { wealth: 3, happiness: 1 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'apartment_hunting',
    title: 'Time to Move Out',
    description: "You're ready to get your own place! Time to start apartment hunting.",
    emoji: '🏠',
    category: 'lifestyle',
    conditions: {
      minAge: 18,
      maxAge: 30,
      probability: 0.5
    },
    choices: [
      {
        id: 'luxury_apartment',
        text: 'Get a luxury apartment',
        emoji: '✨',
        effects: { happiness: 15, wealth: -20, looks: 5 }
      },
      {
        id: 'modest_place',
        text: 'Find a modest place',
        emoji: '🏡',
        effects: { happiness: 8, wealth: -10 }
      },
      {
        id: 'stay_with_parents',
        text: 'Stay with parents longer',
        emoji: '👨‍👩‍👧‍👦',
        effects: { wealth: 5, happiness: -5, relationships: 3 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'marriage_proposal',
    title: 'Marriage Proposal',
    description: 'Your long-term partner has proposed! This is a life-changing moment.',
    emoji: '💍',
    category: 'relationships',
    conditions: {
      minAge: 20,
      maxAge: 50,
      probability: 0.3
    },
    choices: [
      {
        id: 'say_yes',
        text: 'Say yes!',
        emoji: '💒',
        effects: { happiness: 25, relationships: 20, wealth: -5 }
      },
      {
        id: 'need_time',
        text: 'Ask for more time',
        emoji: '🤔',
        effects: { happiness: -5, relationships: -10 }
      },
      {
        id: 'decline',
        text: 'Decline the proposal',
        emoji: '💔',
        effects: { happiness: -15, relationships: -25 }
      }
    ],
    weight: 1,
    flags: []
  }
];
