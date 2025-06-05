
import { DynamicEvent } from './eventTypes';

export const enhancedSeniorEvents: DynamicEvent[] = [
  {
    id: 'retirement_planning',
    title: 'Retirement Time',
    description: "After decades of work, it's time to think about retirement.",
    emoji: '🏖️',
    category: 'lifestyle',
    conditions: {
      minAge: 60,
      maxAge: 70,
      hasJob: true,
      probability: 0.8
    },
    choices: [
      {
        id: 'retire_comfortably',
        text: 'Retire and enjoy life',
        emoji: '🌅',
        effects: { happiness: 20, health: 10, wealth: -5 }
      },
      {
        id: 'work_longer',
        text: 'Work a few more years',
        emoji: '💼',
        effects: { wealth: 15, happiness: -5, health: -3 }
      },
      {
        id: 'part_time',
        text: 'Switch to part-time',
        emoji: '⚖️',
        effects: { happiness: 10, wealth: 5, health: 3 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'grandchildren_visit',
    title: 'Grandchildren Visit',
    description: 'Your grandchildren are coming to visit for the weekend!',
    emoji: '👴👵',
    category: 'family',
    conditions: {
      minAge: 55,
      maxAge: 100,
      probability: 0.6
    },
    choices: [
      {
        id: 'spoil_them',
        text: 'Spoil them with treats',
        emoji: '🍭',
        effects: { happiness: 15, relationships: 10, wealth: -3 }
      },
      {
        id: 'teach_wisdom',
        text: 'Share life lessons',
        emoji: '📖',
        effects: { happiness: 12, relationships: 8, smarts: 2 }
      },
      {
        id: 'play_games',
        text: 'Play games together',
        emoji: '🎲',
        effects: { happiness: 18, relationships: 12, health: 5 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'health_checkup',
    title: 'Important Health Checkup',
    description: 'Your doctor wants to do a comprehensive health screening.',
    emoji: '🏥',
    category: 'health',
    conditions: {
      minAge: 50,
      maxAge: 100,
      probability: 0.7
    },
    choices: [
      {
        id: 'full_screening',
        text: 'Get comprehensive screening',
        emoji: '🔬',
        effects: { health: 8, happiness: -2, wealth: -2 }
      },
      {
        id: 'basic_checkup',
        text: 'Just basic checkup',
        emoji: '🩺',
        effects: { health: 3, wealth: -1 }
      },
      {
        id: 'skip_appointment',
        text: 'Skip the appointment',
        emoji: '🚫',
        effects: { health: -5, happiness: 2 }
      }
    ],
    weight: 1,
    flags: []
  }
];
