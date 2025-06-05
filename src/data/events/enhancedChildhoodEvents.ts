
import { DynamicEvent } from './eventTypes';

export const enhancedChildhoodEvents: DynamicEvent[] = [
  {
    id: 'playground_friend',
    title: 'New Playground Friend',
    description: 'You met a new friend at the playground who wants to play with you!',
    emoji: '🛝',
    category: 'childhood',
    conditions: {
      minAge: 3,
      maxAge: 8,
      probability: 0.6
    },
    choices: [
      {
        id: 'play_together',
        text: 'Play together',
        emoji: '🤝',
        effects: { happiness: 8, relationships: 10 }
      },
      {
        id: 'play_alone',
        text: 'Keep playing alone',
        emoji: '🎯',
        effects: { happiness: 2, relationships: -2 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'lost_tooth',
    title: 'Lost Your First Tooth',
    description: 'Your tooth fell out! The tooth fairy might visit tonight.',
    emoji: '🦷',
    category: 'childhood',
    conditions: {
      minAge: 5,
      maxAge: 8,
      probability: 0.5
    },
    choices: [
      {
        id: 'put_under_pillow',
        text: 'Put it under your pillow',
        emoji: '💰',
        effects: { happiness: 10, wealth: 1 }
      },
      {
        id: 'keep_tooth',
        text: 'Keep the tooth as a souvenir',
        emoji: '📿',
        effects: { happiness: 5 }
      }
    ],
    weight: 1,
    flags: []
  },
  {
    id: 'school_talent_show',
    title: 'School Talent Show',
    description: 'Your school is having a talent show and you want to participate!',
    emoji: '🎭',
    category: 'childhood',
    conditions: {
      minAge: 6,
      maxAge: 12,
      probability: 0.4
    },
    choices: [
      {
        id: 'sing_performance',
        text: 'Sing a song',
        emoji: '🎵',
        effects: { happiness: 8, looks: 3, relationships: 5 }
      },
      {
        id: 'magic_tricks',
        text: 'Perform magic tricks',
        emoji: '🎩',
        effects: { happiness: 7, smarts: 4, relationships: 3 }
      },
      {
        id: 'skip_show',
        text: 'Too nervous, skip it',
        emoji: '😰',
        effects: { happiness: -3, relationships: -1 }
      }
    ],
    weight: 1,
    flags: []
  }
];
