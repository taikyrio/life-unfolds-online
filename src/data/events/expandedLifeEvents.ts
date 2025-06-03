
import { LifeEvent } from '../../types/game';

export const expandedLifeEvents: LifeEvent[] = [
  // Childhood Events (0-12)
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word!',
    emoji: '👶',
    category: 'family',
    ageRequirement: { min: 0, max: 2 },
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: { happiness: 10, relationships: 5 },
        emoji: '👩'
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: { happiness: 10, relationships: 5 },
        emoji: '👨'
      }
    ]
  },
  {
    id: 'playground_incident',
    title: 'Playground Drama',
    description: 'Another kid took your toy at the playground.',
    emoji: '🏰',
    category: 'social',
    ageRequirement: { min: 3, max: 7 },
    choices: [
      {
        id: 'fight_back',
        text: 'Fight for your toy',
        effects: { health: -5, happiness: 5, relationships: -10 },
        emoji: '👊'
      },
      {
        id: 'tell_parent',
        text: 'Tell your parent',
        effects: { happiness: 5, relationships: 10 },
        emoji: '🗣️'
      },
      {
        id: 'share',
        text: 'Offer to share',
        effects: { happiness: 10, relationships: 15 },
        emoji: '🤝'
      }
    ]
  },
  {
    id: 'school_bully',
    title: 'School Bully',
    description: 'A bully is picking on you at school.',
    emoji: '😠',
    category: 'social',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      {
        id: 'stand_up',
        text: 'Stand up to them',
        effects: { health: -10, happiness: 5, relationships: -5 },
        emoji: '💪'
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: { happiness: 10, relationships: 5 },
        emoji: '👩‍🏫'
      },
      {
        id: 'avoid',
        text: 'Try to avoid them',
        effects: { happiness: -5, health: 5 },
        emoji: '🏃'
      }
    ]
  },
  
  // Teenage Events (13-19)
  {
    id: 'first_crush',
    title: 'First Crush',
    description: 'You have a crush on someone at school!',
    emoji: '💕',
    category: 'relationship',
    ageRequirement: { min: 13, max: 16 },
    choices: [
      {
        id: 'confess',
        text: 'Tell them how you feel',
        effects: { happiness: 15, relationships: 10 },
        emoji: '💌'
      },
      {
        id: 'secret_admirer',
        text: 'Keep it a secret',
        effects: { happiness: 5 },
        emoji: '🤐'
      },
      {
        id: 'ask_friend',
        text: 'Ask a friend for advice',
        effects: { happiness: 8, relationships: 5 },
        emoji: '👥'
      }
    ]
  }
];
