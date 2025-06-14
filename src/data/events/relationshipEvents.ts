
import { DynamicEvent } from './eventTypes';

export const relationshipEvents: DynamicEvent[] = [
  {
    id: 'first_date',
    title: 'First Date',
    description: 'Someone you like has asked you out on a date. Where do you want to go?',
    emoji: '💕',
    category: 'relationship',
    choices: [
      {
        id: 'fancy_restaurant',
        text: 'Expensive restaurant',
        effects: { happiness: 25, relationships: 20, wealth: -200, looks: 5 },
        emoji: '🍽️',
        consequences: ['The date went wonderfully, but your wallet feels lighter.']
      },
      {
        id: 'coffee_date',
        text: 'Coffee shop',
        effects: { happiness: 15, relationships: 15, wealth: -20 },
        emoji: '☕',
        consequences: ['A nice, low-pressure date that went well.']
      },
      {
        id: 'park_walk',
        text: 'Walk in the park',
        effects: { happiness: 20, relationships: 10, health: 5 },
        emoji: '🌳',
        consequences: ['A romantic walk that brought you closer together.']
      },
      {
        id: 'netflix_and_chill',
        text: 'Movie at home',
        effects: { happiness: 10, relationships: 25 },
        emoji: '🍿',
        consequences: ['An intimate evening that deepened your connection.']
      }
    ],
    conditions: { minAge: 16, maxAge: 35, probability: 0.25 },
    weight: 15,
    flags: []
  },
  {
    id: 'relationship_breakup',
    title: 'Relationship Problems',
    description: 'Your relationship is going through a rough patch. What do you do?',
    emoji: '💔',
    category: 'relationship',
    choices: [
      {
        id: 'couples_therapy',
        text: 'Suggest couples therapy',
        effects: { happiness: 10, relationships: 20, wealth: -300 },
        emoji: '🛋️',
        consequences: ['Therapy helped you work through your issues.']
      },
      {
        id: 'romantic_gesture',
        text: 'Plan a romantic surprise',
        effects: { happiness: 15, relationships: 15, wealth: -150 },
        emoji: '🌹',
        consequences: ['Your thoughtful gesture rekindled the romance.']
      },
      {
        id: 'take_break',
        text: 'Take a break from each other',
        effects: { happiness: -20, relationships: -30, health: 5 },
        emoji: '😔',
        consequences: ['The break gave you both perspective, but things feel different.']
      },
      {
        id: 'end_relationship',
        text: 'End the relationship',
        effects: { happiness: -30, relationships: -50, health: -10 },
        emoji: '💔',
        consequences: ['Breaking up was hard, but you feel it was necessary.']
      }
    ],
    conditions: { minAge: 16, maxAge: 80, probability: 0.15 },
    weight: 10,
    flags: []
  },
  {
    id: 'marriage_proposal',
    title: 'Marriage Proposal',
    description: 'Your long-term partner has proposed marriage!',
    emoji: '💍',
    category: 'relationship',
    choices: [
      {
        id: 'accept_proposal',
        text: 'Say yes immediately',
        effects: { happiness: 50, relationships: 50, wealth: -5000 },
        emoji: '💕',
        consequences: ['You\'re engaged! Wedding planning begins.']
      },
      {
        id: 'need_time',
        text: 'Ask for time to think',
        effects: { happiness: 5, relationships: -10, smarts: 10 },
        emoji: '🤔',
        consequences: ['Your partner understands but seems a bit hurt.']
      },
      {
        id: 'decline_proposal',
        text: 'Politely decline',
        effects: { happiness: -20, relationships: -40 },
        emoji: '😞',
        consequences: ['Your partner is heartbroken and needs space.']
      }
    ],
    conditions: { minAge: 20, maxAge: 50, probability: 0.1 },
    weight: 20,
    flags: []
  }
];
