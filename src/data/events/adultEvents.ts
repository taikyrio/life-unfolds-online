
import { DynamicEvent } from './eventTypes';

export const adultEvents: DynamicEvent[] = [
  // Young Adult Events (18-25)
  {
    id: 'college_decision',
    title: 'College Application Results',
    description: 'You received responses from the colleges you applied to.',
    emoji: '🎓',
    choices: [
      {
        id: 'prestigious_college',
        text: 'Accept prestigious university (expensive)',
        effects: { happiness: 30, smarts: 20, wealth: -500, relationships: 10 },
        emoji: '🎓'
      },
      {
        id: 'community_college',
        text: 'Go to community college (affordable)',
        effects: { happiness: 10, smarts: 10, wealth: -100 },
        emoji: '📚'
      },
      {
        id: 'skip_college',
        text: 'Enter the workforce immediately',
        effects: { happiness: -10, wealth: 200, smarts: -5 },
        emoji: '💼'
      }
    ],
    conditions: { minAge: 18, maxAge: 18, minStat: { stat: 'smarts', value: 60 }, probability: 0.9 },
    weight: 20
  },
  {
    id: 'first_apartment',
    title: 'Moving Out',
    description: 'It\'s time to get your own place. What type of housing do you choose?',
    emoji: '🏠',
    choices: [
      {
        id: 'luxury_apartment',
        text: 'Luxury apartment downtown',
        effects: { happiness: 30, wealth: -800, looks: 10 },
        emoji: '🏢'
      },
      {
        id: 'modest_apartment',
        text: 'Modest apartment',
        effects: { happiness: 15, wealth: -400 },
        emoji: '🏠'
      },
      {
        id: 'roommates',
        text: 'Share with roommates',
        effects: { happiness: 10, wealth: -200, relationships: 15 },
        emoji: '👥'
      },
      {
        id: 'stay_home',
        text: 'Stay with parents longer',
        effects: { happiness: -15, wealth: 100, relationships: -5 },
        emoji: '🏡'
      }
    ],
    conditions: { minAge: 18, maxAge: 22, probability: 0.7 },
    weight: 15
  },

  // Mid Adult Events (26-50)
  {
    id: 'career_crossroads',
    title: 'Career Opportunity',
    description: 'You\'ve been offered a new job with better pay but in a different city.',
    emoji: '✈️',
    choices: [
      {
        id: 'take_job',
        text: 'Take the new job',
        effects: { happiness: 20, wealth: 300, relationships: -15 },
        emoji: '✈️'
      },
      {
        id: 'negotiate',
        text: 'Try to negotiate with current employer',
        effects: { happiness: 5, wealth: 100 },
        emoji: '💬'
      },
      {
        id: 'stay_put',
        text: 'Stay in current job',
        effects: { happiness: -5, relationships: 10 },
        emoji: '🏢'
      }
    ],
    conditions: { minAge: 26, maxAge: 45, hasJob: true, probability: 0.4 },
    weight: 12
  },
  {
    id: 'midlife_crisis',
    title: 'Midlife Reflection',
    description: 'You\'re feeling unsatisfied with your life direction. What do you do?',
    emoji: '🔄',
    choices: [
      {
        id: 'career_change',
        text: 'Make a dramatic career change',
        effects: { happiness: 25, wealth: -200, smarts: 10 },
        emoji: '🔄'
      },
      {
        id: 'new_hobby',
        text: 'Pick up an exciting new hobby',
        effects: { happiness: 15, health: 5, wealth: -50 },
        emoji: '🎨'
      },
      {
        id: 'therapy',
        text: 'Seek professional help',
        effects: { happiness: 20, wealth: -100, smarts: 10 },
        emoji: '🛋️'
      },
      {
        id: 'accept_status_quo',
        text: 'Accept life as it is',
        effects: { happiness: -10 },
        emoji: '😔'
      }
    ],
    conditions: { minAge: 35, maxAge: 50, probability: 0.3 },
    weight: 10
  }
];
