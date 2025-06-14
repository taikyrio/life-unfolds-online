
import { DynamicEvent } from './eventTypes';

export const legalEvents: DynamicEvent[] = [
  {
    id: 'speeding_ticket',
    title: 'Traffic Stop',
    description: 'You were pulled over for speeding on your way to work.',
    emoji: '🚔',
    category: 'crime',
    choices: [
      {
        id: 'accept_ticket',
        text: 'Accept the ticket politely',
        effects: { wealth: -250, happiness: -10 },
        emoji: '😔',
        consequences: ['You paid the fine and resolved to drive more carefully.']
      },
      {
        id: 'argue_officer',
        text: 'Argue with the officer',
        effects: { wealth: -500, happiness: -20, relationships: -10 },
        emoji: '😠',
        consequences: ['Your attitude made things worse and increased the fine.']
      },
      {
        id: 'court_fight',
        text: 'Fight it in court',
        effects: { wealth: -100, happiness: 5, smarts: 5 },
        emoji: '⚖️',
        consequences: ['You successfully contested the ticket and learned about legal process.']
      }
    ],
    conditions: { minAge: 16, maxAge: 80, probability: 0.15 },
    weight: 8,
    flags: []
  },
  {
    id: 'jury_duty',
    title: 'Jury Duty',
    description: 'You\'ve been called for jury duty on an important case.',
    emoji: '⚖️',
    category: 'social',
    choices: [
      {
        id: 'serve_faithfully',
        text: 'Serve as a responsible citizen',
        effects: { happiness: 20, relationships: 15, wealth: -500, smarts: 10 },
        emoji: '🏛️',
        consequences: ['You fulfilled your civic duty and gained insight into the justice system.']
      },
      {
        id: 'try_avoid',
        text: 'Try to get out of it',
        effects: { happiness: 5, wealth: 100, relationships: -5 },
        emoji: '🤷',
        consequences: ['You managed to avoid service but felt a bit guilty.']
      }
    ],
    conditions: { minAge: 18, maxAge: 70, probability: 0.1 },
    weight: 6,
    flags: []
  }
];
