
import { DynamicEvent } from './eventTypes';

export const schoolWorkEvents: DynamicEvent[] = [
  {
    id: 'school_project',
    title: 'Group Project Drama',
    description: 'You\'re assigned to work on a group project, but your teammates aren\'t pulling their weight.',
    emoji: '📚',
    category: 'education',
    choices: [
      {
        id: 'do_all_work',
        text: 'Do all the work yourself',
        effects: { smarts: 15, happiness: -20, health: -10, relationships: -5 },
        emoji: '😤',
        consequences: ['You got an A+ but felt exhausted and resentful.']
      },
      {
        id: 'confront_team',
        text: 'Confront your teammates',
        effects: { relationships: 10, smarts: 5, happiness: 5 },
        emoji: '💬',
        consequences: ['Your assertiveness helped motivate the team.']
      },
      {
        id: 'tell_teacher',
        text: 'Report to the teacher',
        effects: { smarts: 10, relationships: -15, happiness: -5 },
        emoji: '🏫',
        consequences: ['The teacher intervened, but classmates called you a snitch.']
      },
      {
        id: 'accept_mediocrity',
        text: 'Accept a lower grade',
        effects: { happiness: 5, smarts: -10 },
        emoji: '🤷',
        consequences: ['You kept the peace but learned less.']
      }
    ],
    conditions: { minAge: 12, maxAge: 22, probability: 0.3 },
    weight: 10,
    flags: []
  },
  {
    id: 'work_promotion_opportunity',
    title: 'Promotion Opportunity',
    description: 'Your boss is considering you for a promotion, but it means more responsibility and longer hours.',
    emoji: '📈',
    category: 'career',
    choices: [
      {
        id: 'accept_promotion',
        text: 'Accept the promotion eagerly',
        effects: { wealth: 500, happiness: 20, health: -15, relationships: -10 },
        emoji: '💼',
        consequences: ['You got promoted but work-life balance suffered.']
      },
      {
        id: 'negotiate_terms',
        text: 'Negotiate better terms',
        effects: { wealth: 300, happiness: 15, smarts: 10 },
        emoji: '🤝',
        consequences: ['Your negotiation skills impressed management.']
      },
      {
        id: 'decline_politely',
        text: 'Politely decline',
        effects: { happiness: 10, health: 5, wealth: -100 },
        emoji: '😊',
        consequences: ['You maintained work-life balance but missed the opportunity.']
      }
    ],
    conditions: { minAge: 18, maxAge: 65, hasJob: true, probability: 0.2 },
    weight: 12,
    flags: []
  }
];
