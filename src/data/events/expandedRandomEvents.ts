
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
    weight: 10
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
    weight: 12
  }
];

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
    weight: 15
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
    weight: 10
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
    weight: 20
  }
];

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
    weight: 8
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
    weight: 10
  }
];

export const financialEvents: DynamicEvent[] = [
  {
    id: 'unexpected_inheritance',
    title: 'Surprise Inheritance',
    description: 'A distant relative you barely knew has left you money in their will.',
    emoji: '💰',
    category: 'random',
    choices: [
      {
        id: 'invest_wisely',
        text: 'Invest the money wisely',
        effects: { wealth: 15000, smarts: 10, happiness: 20 },
        emoji: '📈',
        consequences: ['Your smart investment choices paid off well.']
      },
      {
        id: 'pay_off_debts',
        text: 'Pay off existing debts',
        effects: { wealth: 8000, happiness: 25, health: 10 },
        emoji: '💳',
        consequences: ['Being debt-free feels amazing and reduces stress.']
      },
      {
        id: 'splurge_spending',
        text: 'Go on a shopping spree',
        effects: { wealth: 5000, happiness: 30, looks: 15 },
        emoji: '🛍️',
        consequences: ['You enjoyed the splurge but wonder if you should have saved more.']
      },
      {
        id: 'donate_charity',
        text: 'Donate most to charity',
        effects: { wealth: 2000, happiness: 40, relationships: 20 },
        emoji: '❤️',
        consequences: ['Your generosity made a real difference in others\' lives.']
      }
    ],
    conditions: { minAge: 18, maxAge: 80, probability: 0.05 },
    weight: 15
  },
  {
    id: 'car_breakdown',
    title: 'Car Trouble',
    description: 'Your car has broken down and needs expensive repairs.',
    emoji: '🚗',
    category: 'random',
    choices: [
      {
        id: 'repair_car',
        text: 'Pay for the repairs',
        effects: { wealth: -2500, happiness: 10 },
        emoji: '🔧',
        consequences: ['Your car is running like new again.']
      },
      {
        id: 'buy_used_car',
        text: 'Buy a different used car',
        effects: { wealth: -8000, happiness: 5 },
        emoji: '🚙',
        consequences: ['You found a reliable used car within your budget.']
      },
      {
        id: 'use_public_transport',
        text: 'Rely on public transportation',
        effects: { wealth: -200, happiness: -15, health: 5 },
        emoji: '🚌',
        consequences: ['Public transport is cheaper but less convenient.']
      },
      {
        id: 'bike_everywhere',
        text: 'Start biking everywhere',
        effects: { wealth: -500, happiness: 5, health: 20 },
        emoji: '🚴',
        consequences: ['Biking improved your fitness but takes more time.']
      }
    ],
    conditions: { minAge: 18, maxAge: 80, probability: 0.15 },
    weight: 10
  },
  {
    id: 'lottery_ticket',
    title: 'Lottery Ticket',
    description: 'You bought a lottery ticket on impulse while getting gas.',
    emoji: '🎟️',
    category: 'random',
    choices: [
      {
        id: 'win_jackpot',
        text: 'Win the jackpot! ($1M)',
        effects: { wealth: 1000000, happiness: 100, relationships: -20 },
        emoji: '💎',
        consequences: ['You won big! But suddenly everyone wants to be your friend.']
      },
      {
        id: 'win_small',
        text: 'Win $5,000',
        effects: { wealth: 5000, happiness: 30 },
        emoji: '💰',
        consequences: ['A nice windfall that brightened your month!']
      },
      {
        id: 'win_tiny',
        text: 'Win $100',
        effects: { wealth: 100, happiness: 10 },
        emoji: '💵',
        consequences: ['Enough for a nice dinner out!']
      },
      {
        id: 'lose',
        text: 'Lose (as expected)',
        effects: { happiness: -2 },
        emoji: '😞',
        consequences: ['Just another losing ticket, but it was fun to dream.']
      }
    ],
    conditions: { minAge: 18, maxAge: 100, probability: 0.1 },
    weight: 5
  }
];

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
    weight: 12
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
    weight: 15
  }
];

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
    weight: 8
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
    weight: 6
  }
];

export const travelEvents: DynamicEvent[] = [
  {
    id: 'surprise_vacation',
    title: 'Vacation Opportunity',
    description: 'A friend invited you on a last-minute trip to Europe.',
    emoji: '✈️',
    category: 'social',
    choices: [
      {
        id: 'luxury_trip',
        text: 'Go all out with luxury accommodations',
        effects: { happiness: 50, wealth: -8000, relationships: 20, looks: 10 },
        emoji: '🏨',
        consequences: ['An amazing trip that created lifelong memories.']
      },
      {
        id: 'budget_trip',
        text: 'Go on a budget',
        effects: { happiness: 35, wealth: -3000, relationships: 15, health: 5 },
        emoji: '🎒',
        consequences: ['A fantastic adventure that proved experiences matter more than luxury.']
      },
      {
        id: 'decline_trip',
        text: 'Decline - too expensive',
        effects: { happiness: -15, wealth: 500, relationships: -10 },
        emoji: '😞',
        consequences: ['You saved money but felt FOMO when seeing their photos.']
      }
    ],
    conditions: { minAge: 18, maxAge: 60, probability: 0.08 },
    weight: 12
  }
];

export const allRandomEvents: DynamicEvent[] = [
  ...schoolWorkEvents,
  ...relationshipEvents,
  ...healthEvents,
  ...financialEvents,
  ...familyEvents,
  ...legalEvents,
  ...travelEvents
];
