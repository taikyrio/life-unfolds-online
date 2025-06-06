import { LifeEvent } from '../../types/game';

export const expandedLifeEvents: LifeEvent[] = [
  // Childhood Events (0-12)
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word today!',
    emoji: '👶',
    category: 'family',
    minAge: 1,
    maxAge: 3,
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 }
        ],
        emoji: '👩',
        consequences: ['Your mother was overjoyed and cried happy tears!']
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 }
        ],
        emoji: '👨',
        consequences: ['Your father picked you up and spun you around!']
      },
      {
        id: 'cookie',
        text: 'Say "Cookie"',
        effects: [
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'stat', target: 'health', value: -5 }
        ],
        emoji: '🍪',
        consequences: ['Everyone laughed and gave you cookies!']
      }
    ]
  },
  {
    id: 'imaginary_friend',
    title: 'Imaginary Friend',
    description: 'You\'ve made an imaginary friend who goes everywhere with you.',
    emoji: '👻',
    category: 'social',
    minAge: 3,
    maxAge: 8,
    choices: [
      {
        id: 'embrace_friend',
        text: 'Play elaborate games together',
        effects: [
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'stat', target: 'smarts', value: 10 },
          { type: 'stat', target: 'relationships', value: -5 }
        ],
        emoji: '🎭',
        consequences: ['Your creativity flourished, but adults were concerned.']
      },
      {
        id: 'ignore_friend',
        text: 'Try to make real friends instead',
        effects: [
          { type: 'stat', target: 'relationships', value: 15 },
          { type: 'stat', target: 'happiness', value: -10 }
        ],
        emoji: '👫',
        consequences: ['You focused on making real connections.']
      }
    ]
  },

  // School Age Events (5-18)
  {
    id: 'school_bully',
    title: 'School Bully',
    description: 'A bigger kid at school has been picking on you.',
    emoji: '😠',
    category: 'social',
    minAge: 6,
    maxAge: 16,
    choices: [
      {
        id: 'fight_back',
        text: 'Stand up and fight back',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'health', value: -10 },
          { type: 'stat', target: 'relationships', value: 5 },
          { type: 'stat', target: 'notoriety', value: 5 }
        ],
        emoji: '👊',
        consequences: ['You earned respect but got in trouble with teachers.']
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: [
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'stat', target: 'relationships', value: -5 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '👨‍🏫',
        consequences: ['The bullying stopped but some kids called you a snitch.']
      },
      {
        id: 'make_friends',
        text: 'Try to befriend the bully',
        effects: [
          { type: 'stat', target: 'relationships', value: 15 },
          { type: 'stat', target: 'happiness', value: 10 }
        ],
        emoji: '🤝',
        consequences: ['You discovered they were just having problems at home.']
      },
      {
        id: 'ignore_bully',
        text: 'Ignore them completely',
        effects: [
          { type: 'stat', target: 'happiness', value: -15 },
          { type: 'stat', target: 'health', value: -5 },
          { type: 'stat', target: 'smarts', value: 5 }
        ],
        emoji: '🙈',
        consequences: ['The bullying continued but you focused on your studies.']
      }
    ]
  },

  // Technology & Modern Life
  {
    id: 'first_smartphone',
    title: 'First Smartphone',
    description: 'Your parents finally got you your first smartphone!',
    emoji: '📱',
    category: 'social',
    minAge: 10,
    maxAge: 16,
    choices: [
      {
        id: 'social_media_addict',
        text: 'Spend all day on social media',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 },
          { type: 'stat', target: 'health', value: -10 },
          { type: 'stat', target: 'smarts', value: -5 }
        ],
        emoji: '📱',
        consequences: ['You became popular online but your grades suffered.']
      },
      {
        id: 'responsible_use',
        text: 'Use it responsibly',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'smarts', value: 5 },
          { type: 'stat', target: 'relationships', value: 5 }
        ],
        emoji: '⚖️',
        consequences: ['You maintained a healthy balance with technology.']
      },
      {
        id: 'learn_programming',
        text: 'Learn to code apps',
        effects: [
          { type: 'stat', target: 'smarts', value: 20 },
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'stat', target: 'wealth', value: 10 }
        ],
        emoji: '💻',
        consequences: ['You discovered a passion for technology and programming.']
      }
    ]
  },

  // Young Adult Events (18-30)
  {
    id: 'college_party',
    title: 'Wild College Party',
    description: 'You\'re invited to the biggest party of the semester.',
    emoji: '🎉',
    category: 'social',
    minAge: 18,
    maxAge: 25,
    requirements: { education: 'College' },
    choices: [
      {
        id: 'party_hard',
        text: 'Party until dawn',
        effects: [
          { type: 'stat', target: 'happiness', value: 25 },
          { type: 'stat', target: 'relationships', value: 15 },
          { type: 'stat', target: 'health', value: -15 },
          { type: 'stat', target: 'smarts', value: -5 }
        ],
        emoji: '🍻',
        consequences: ['You had an amazing time but failed your midterm exam.']
      },
      {
        id: 'designated_driver',
        text: 'Be the designated driver',
        effects: [
          { type: 'stat', target: 'relationships', value: 20 },
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '🚗',
        consequences: ['Everyone respected your responsibility and safety.']
      },
      {
        id: 'study_instead',
        text: 'Stay home and study',
        effects: [
          { type: 'stat', target: 'smarts', value: 15 },
          { type: 'stat', target: 'happiness', value: -10 },
          { type: 'stat', target: 'relationships', value: -5 }
        ],
        emoji: '📚',
        consequences: ['You aced your exam but missed out on social connections.']
      }
    ]
  },

  {
    id: 'job_interview',
    title: 'Important Job Interview',
    description: 'You have an interview for your dream job.',
    emoji: '💼',
    category: 'career',
    minAge: 18,
    maxAge: 35,
    choices: [
      {
        id: 'honest_approach',
        text: 'Be completely honest',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'relationships', value: 10 },
          { type: 'stat', target: 'wealth', value: 15 }
        ],
        emoji: '😊',
        consequences: ['Your honesty impressed them and you got the job!']
      },
      {
        id: 'embellish_resume',
        text: 'Embellish your qualifications',
        effects: [
          { type: 'stat', target: 'wealth', value: 25 },
          { type: 'stat', target: 'happiness', value: -5 },
          { type: 'stat', target: 'notoriety', value: 5 }
        ],
        emoji: '🎭',
        consequences: ['You got the job but constantly worry about being found out.']
      },
      {
        id: 'nervous_breakdown',
        text: 'Have a nervous breakdown',
        effects: [
          { type: 'stat', target: 'happiness', value: -20 },
          { type: 'stat', target: 'health', value: -10 },
          { type: 'stat', target: 'relationships', value: -5 }
        ],
        emoji: '😰',
        consequences: ['The interview went terribly and you didn\'t get the job.']
      }
    ]
  },

  // Adult Life Events (25-65)
  {
    id: 'midlife_crisis',
    title: 'Midlife Crisis',
    description: 'You\'re questioning all your life choices and feel stuck in a rut.',
    emoji: '🤔',
    category: 'social',
    minAge: 35,
    maxAge: 55,
    choices: [
      {
        id: 'buy_sports_car',
        text: 'Buy an expensive sports car',
        effects: [
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'stat', target: 'wealth', value: -50000 },
          { type: 'stat', target: 'looks', value: 10 }
        ],
        emoji: '🏎️',
        consequences: ['You felt young again but your bank account suffered.']
      },
      {
        id: 'change_career',
        text: 'Completely change careers',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'wealth', value: -20000 },
          { type: 'stat', target: 'smarts', value: 10 }
        ],
        emoji: '🔄',
        consequences: ['Starting over was scary but ultimately rewarding.']
      },
      {
        id: 'therapy',
        text: 'Seek therapy and counseling',
        effects: [
          { type: 'stat', target: 'happiness', value: 25 },
          { type: 'stat', target: 'health', value: 15 },
          { type: 'stat', target: 'wealth', value: -5000 }
        ],
        emoji: '🛋️',
        consequences: ['Professional help gave you new perspective on life.']
      },
      {
        id: 'accept_life',
        text: 'Accept your life as it is',
        effects: [
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '🧘',
        consequences: ['You found peace in accepting your circumstances.']
      }
    ]
  },

  // Health & Medical Events
  {
    id: 'health_scare',
    title: 'Health Scare',
    description: 'Routine medical tests revealed something concerning.',
    emoji: '🏥',
    category: 'health',
    minAge: 25,
    maxAge: 80,
    choices: [
      {
        id: 'immediate_treatment',
        text: 'Seek immediate treatment',
        effects: [
          { type: 'stat', target: 'health', value: 15 },
          { type: 'stat', target: 'wealth', value: -15000 },
          { type: 'stat', target: 'happiness', value: -10 }
        ],
        emoji: '💊',
        consequences: ['Early intervention saved your health and possibly your life.']
      },
      {
        id: 'second_opinion',
        text: 'Get a second opinion',
        effects: [
          { type: 'stat', target: 'health', value: 5 },
          { type: 'stat', target: 'wealth', value: -5000 },
          { type: 'stat', target: 'smarts', value: 5 }
        ],
        emoji: '👨‍⚕️',
        consequences: ['The second doctor had a different diagnosis entirely.']
      },
      {
        id: 'ignore_results',
        text: 'Ignore the results',
        effects: [
          { type: 'stat', target: 'happiness', value: 5 },
          { type: 'stat', target: 'health', value: -25 }
        ],
        emoji: '🙈',
        consequences: ['Ignoring the problem made it much worse over time.']
      }
    ]
  },

  // Financial Events
  {
    id: 'lottery_ticket',
    title: 'Lottery Ticket',
    description: 'You bought a lottery ticket on a whim.',
    emoji: '🎟️',
    category: 'random',
    minAge: 18,
    maxAge: 100,
    choices: [
      {
        id: 'small_win',
        text: 'Win $1,000',
        effects: [
          { type: 'stat', target: 'wealth', value: 1000 },
          { type: 'stat', target: 'happiness', value: 20 }
        ],
        emoji: '💰',
        consequences: ['A nice little windfall that brightened your day!']
      },
      {
        id: 'big_win',
        text: 'Win $100,000!',
        effects: [
          { type: 'stat', target: 'wealth', value: 100000 },
          { type: 'stat', target: 'happiness', value: 50 },
          { type: 'stat', target: 'relationships', value: -10 }
        ],
        emoji: '💎',
        consequences: ['You won big but suddenly everyone wanted to be your friend.']
      },
      {
        id: 'nothing',
        text: 'Win nothing',
        effects: [
          { type: 'stat', target: 'happiness', value: -5 }
        ],
        emoji: '😞',
        consequences: ['Just another losing ticket, but you weren\'t surprised.']
      }
    ]
  },

  // Modern Technology Events
  {
    id: 'cryptocurrency_boom',
    title: 'Cryptocurrency Investment',
    description: 'Everyone is talking about investing in cryptocurrency.',
    emoji: '₿',
    category: 'career',
    minAge: 18,
    maxAge: 50,
    choices: [
      {
        id: 'invest_big',
        text: 'Invest your life savings',
        effects: [
          { type: 'stat', target: 'wealth', value: 50000 },
          { type: 'stat', target: 'happiness', value: 20 },
          { type: 'stat', target: 'health', value: -10 }
        ],
        emoji: '🚀',
        consequences: ['You struck it rich but the stress was overwhelming!']
      },
      {
        id: 'invest_small',
        text: 'Invest a small amount',
        effects: [
          { type: 'stat', target: 'wealth', value: 5000 },
          { type: 'stat', target: 'happiness', value: 10 },
          { type: 'stat', target: 'smarts', value: 5 }
        ],
        emoji: '💰',
        consequences: ['Your cautious approach paid off with modest gains.']
      },
      {
        id: 'stay_away',
        text: 'Avoid cryptocurrency entirely',
        effects: [
          { type: 'stat', target: 'happiness', value: -5 },
          { type: 'stat', target: 'smarts', value: 5 }
        ],
        emoji: '🙅',
        consequences: ['You watched others get rich while staying financially safe.']
      }
    ]
  },

  // Environmental Events
  {
    id: 'climate_activism',
    title: 'Climate Change Rally',
    description: 'There\'s a climate change protest happening in your city.',
    emoji: '🌍',
    category: 'social',
    minAge: 16,
    maxAge: 50,
    choices: [
      {
        id: 'join_protest',
        text: 'Join the protest',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'relationships', value: 10 },
          { type: 'stat', target: 'notoriety', value: 5 }
        ],
        emoji: '✊',
        consequences: ['You felt empowered standing up for the environment.']
      },
      {
        id: 'counter_protest',
        text: 'Join a counter-protest',
        effects: [
          { type: 'stat', target: 'happiness', value: -10 },
          { type: 'stat', target: 'relationships', value: -10 },
          { type: 'stat', target: 'notoriety', value: 10 }
        ],
        emoji: '🚫',
        consequences: ['Your controversial stance got you a lot of negative attention.']
      },
      {
        id: 'stay_neutral',
        text: 'Stay out of it',
        effects: [
          { type: 'stat', target: 'happiness', value: 0 }
        ],
        emoji: '🤷',
        consequences: ['You avoided the controversy but felt uninvolved.']
      }
    ]
  },

  // Senior Events (65+)
  {
    id: 'retirement_planning',
    title: 'Retirement Decision',
    description: 'You\'re eligible for retirement. What will you do?',
    emoji: '👴',
    category: 'career',
    minAge: 62,
    maxAge: 70,
    choices: [
      {
        id: 'retire_early',
        text: 'Retire immediately',
        effects: [
          { type: 'stat', target: 'happiness', value: 25 },
          { type: 'stat', target: 'health', value: 15 },
          { type: 'stat', target: 'wealth', value: -10000 }
        ],
        emoji: '🏖️',
        consequences: ['Freedom felt amazing but money became tighter.']
      },
      {
        id: 'work_longer',
        text: 'Keep working',
        effects: [
          { type: 'stat', target: 'wealth', value: 20000 },
          { type: 'stat', target: 'happiness', value: -10 },
          { type: 'stat', target: 'health', value: -5 }
        ],
        emoji: '💼',
        consequences: ['The extra income was nice but you felt tired.']
      },
      {
        id: 'part_time',
        text: 'Work part-time',
        effects: [
          { type: 'stat', target: 'happiness', value: 15 },
          { type: 'stat', target: 'wealth', value: 5000 },
          { type: 'stat', target: 'health', value: 5 }
        ],
        emoji: '⏰',
        consequences: ['The perfect balance of income and leisure time.']
      }
    ]
  }
];
