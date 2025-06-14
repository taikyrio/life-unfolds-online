
import { DynamicEvent } from './eventTypes';

export const healthEvents: DynamicEvent[] = [
  {
    id: 'flu_outbreak',
    title: 'Flu Season',
    description: 'There\'s a flu outbreak going around. You\'re starting to feel sick.',
    emoji: '🤒',
    category: 'health',
    choices: [
      {
        id: 'rest_at_home',
        text: 'Take time off and rest',
        effects: { health: 20, happiness: -10, wealth: -200 },
        emoji: '🏠',
        consequences: ['You recovered quickly by resting properly.']
      },
      {
        id: 'work_through_it',
        text: 'Power through and work',
        effects: { health: -20, wealth: 100, relationships: -15 },
        emoji: '😷',
        consequences: ['You spread your illness to coworkers and took longer to recover.']
      },
      {
        id: 'see_doctor',
        text: 'Visit the doctor immediately',
        effects: { health: 15, wealth: -400 },
        emoji: '👨‍⚕️',
        consequences: ['The doctor prescribed medication that helped you recover.']
      }
    ],
    conditions: { minAge: 5, maxAge: 100, probability: 0.2 },
    weight: 8,
    flags: []
  },
  {
    id: 'gym_injury',
    title: 'Workout Injury',
    description: 'You injured yourself while exercising. Your back is in serious pain.',
    emoji: '🏋️‍♂️',
    category: 'health',
    choices: [
      {
        id: 'physical_therapy',
        text: 'Get physical therapy',
        effects: { health: 25, wealth: -800 },
        emoji: '🏥',
        consequences: ['Physical therapy helped you recover properly.']
      },
      {
        id: 'pain_medication',
        text: 'Just take pain medication',
        effects: { health: 5, wealth: -50, happiness: -10 },
        emoji: '💊',
        consequences: ['The pain persisted and you developed dependency concerns.']
      },
      {
        id: 'ignore_injury',
        text: 'Ignore it and hope it heals',
        effects: { health: -15, happiness: -20 },
        emoji: '🤐',
        consequences: ['Ignoring the injury made it much worse over time.']
      }
    ],
    conditions: { minAge: 16, maxAge: 70, probability: 0.15 },
    weight: 10,
    flags: []
  }
];
