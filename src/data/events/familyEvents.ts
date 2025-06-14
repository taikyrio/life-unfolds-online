
import { DynamicEvent } from './eventTypes';

export const familyEvents: DynamicEvent[] = [
  {
    id: 'new_baby',
    title: 'New Family Member',
    description: 'A baby has been born in your family!',
    emoji: '👶',
    category: 'family',
    choices: [
      {
        id: 'enthusiastic_uncle',
        text: 'Become the best uncle/aunt ever',
        effects: { happiness: 30, relationships: 25, wealth: -500 },
        emoji: '🥰',
        consequences: ['Your involvement created a special bond with the baby.']
      },
      {
        id: 'supportive_helper',
        text: 'Help with practical needs',
        effects: { happiness: 15, relationships: 20, wealth: -200 },
        emoji: '🤝',
        consequences: ['Your practical support was deeply appreciated.']
      },
      {
        id: 'polite_distance',
        text: 'Keep polite distance',
        effects: { happiness: 5, relationships: -5 },
        emoji: '😐',
        consequences: ['You maintained your routine but felt somewhat disconnected.']
      }
    ],
    conditions: { minAge: 16, maxAge: 60, probability: 0.1 },
    weight: 12,
    flags: []
  },
  {
    id: 'family_death',
    title: 'Family Loss',
    description: 'A close family member has passed away unexpectedly.',
    emoji: '😢',
    category: 'family',
    choices: [
      {
        id: 'take_time_grieve',
        text: 'Take time off to grieve properly',
        effects: { happiness: -30, health: -10, wealth: -1000, relationships: 20 },
        emoji: '😭',
        consequences: ['Grieving properly helped you process the loss healthily.']
      },
      {
        id: 'stay_busy',
        text: 'Stay busy to cope',
        effects: { happiness: -20, health: -15, wealth: 200 },
        emoji: '😔',
        consequences: ['Staying busy helped short-term but you may need to process later.']
      },
      {
        id: 'seek_therapy',
        text: 'Get professional counseling',
        effects: { happiness: -15, health: 10, wealth: -800 },
        emoji: '🛋️',
        consequences: ['Therapy provided tools to cope with grief in healthy ways.']
      }
    ],
    conditions: { minAge: 10, maxAge: 100, probability: 0.08 },
    weight: 15,
    flags: []
  }
];
