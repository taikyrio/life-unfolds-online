
import { DynamicEvent } from './eventTypes';

export const teenageEvents: DynamicEvent[] = [
  {
    id: 'first_crush',
    title: 'First Crush',
    description: 'You have developed feelings for someone at school. What do you do?',
    emoji: '💕',
    choices: [
      {
        id: 'confess',
        text: 'Tell them how you feel',
        effects: { happiness: 15, relationships: 20, looks: 5 },
        emoji: '💕',
        consequences: ['Whether they like you back depends on your looks and charm.']
      },
      {
        id: 'write_note',
        text: 'Write them a secret note',
        effects: { happiness: 10, smarts: 5, relationships: 10 },
        emoji: '💌'
      },
      {
        id: 'stay_quiet',
        text: 'Keep your feelings to yourself',
        effects: { happiness: -10 },
        emoji: '🤐'
      }
    ],
    conditions: { minAge: 12, maxAge: 16, probability: 0.6 },
    flags: ['romantic_interest'],
    weight: 15
  },
  {
    id: 'peer_pressure_party',
    title: 'Party Invitation',
    description: 'Your friends invite you to a party where there will be drinking and smoking.',
    emoji: '🎉',
    choices: [
      {
        id: 'go_party',
        text: 'Go to the party',
        effects: { happiness: 20, relationships: 15, health: -10 },
        emoji: '🎉',
        flags: ['party_experience'],
        consequences: ['You had fun but feel sick the next day.']
      },
      {
        id: 'go_supervised',
        text: 'Go but stay responsible',
        effects: { happiness: 10, relationships: 5, smarts: 5 },
        emoji: '🤝'
      },
      {
        id: 'decline',
        text: 'Decline the invitation',
        effects: { happiness: -5, relationships: -10, health: 5 },
        emoji: '🏠'
      }
    ],
    conditions: { minAge: 14, maxAge: 17, probability: 0.5 },
    weight: 12
  }
];
