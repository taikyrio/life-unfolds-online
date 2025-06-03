
import { LifeEvent } from '../../types/game';

export const expandedLifeEvents: LifeEvent[] = [
  // Childhood Events (0-12)
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word today!',
    emoji: '👶',
    category: 'family',
    ageRequirement: { min: 1, max: 3 },
    choices: [
      {
        id: 'mama',
        text: 'Say "Mama"',
        effects: { happiness: 15, relationships: 10 },
        emoji: '👩',
        consequences: ['Your mother was overjoyed and cried happy tears!']
      },
      {
        id: 'dada',
        text: 'Say "Dada"',
        effects: { happiness: 15, relationships: 10 },
        emoji: '👨',
        consequences: ['Your father picked you up and spun you around!']
      },
      {
        id: 'cookie',
        text: 'Say "Cookie"',
        effects: { happiness: 20, health: -5 },
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
    ageRequirement: { min: 3, max: 8 },
    choices: [
      {
        id: 'embrace_friend',
        text: 'Play elaborate games together',
        effects: { happiness: 20, smarts: 10, relationships: -5 },
        emoji: '🎭',
        consequences: ['Your creativity flourished, but adults were concerned.']
      },
      {
        id: 'ignore_friend',
        text: 'Try to make real friends instead',
        effects: { relationships: 15, happiness: -10 },
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
    ageRequirement: { min: 6, max: 16 },
    choices: [
      {
        id: 'fight_back',
        text: 'Stand up and fight back',
        effects: { happiness: 10, health: -10, relationships: 5, notoriety: 5 },
        emoji: '👊',
        consequences: ['You earned respect but got in trouble with teachers.']
      },
      {
        id: 'tell_teacher',
        text: 'Tell a teacher',
        effects: { happiness: 5, relationships: -5, health: 5 },
        emoji: '👨‍🏫',
        consequences: ['The bullying stopped but some kids called you a snitch.']
      },
      {
        id: 'make_friends',
        text: 'Try to befriend the bully',
        effects: { relationships: 15, happiness: 10 },
        emoji: '🤝',
        consequences: ['You discovered they were just having problems at home.']
      },
      {
        id: 'ignore_bully',
        text: 'Ignore them completely',
        effects: { happiness: -15, health: -5, smarts: 5 },
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
    ageRequirement: { min: 10, max: 16 },
    choices: [
      {
        id: 'social_media_addict',
        text: 'Spend all day on social media',
        effects: { happiness: 15, relationships: 10, health: -10, smarts: -5 },
        emoji: '📱',
        consequences: ['You became popular online but your grades suffered.']
      },
      {
        id: 'responsible_use',
        text: 'Use it responsibly',
        effects: { happiness: 10, smarts: 5, relationships: 5 },
        emoji: '⚖️',
        consequences: ['You maintained a healthy balance with technology.']
      },
      {
        id: 'learn_programming',
        text: 'Learn to code apps',
        effects: { smarts: 20, happiness: 5, wealth: 10 },
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
    ageRequirement: { min: 18, max: 25 },
    requirements: { education: 'College' },
    choices: [
      {
        id: 'party_hard',
        text: 'Party until dawn',
        effects: { happiness: 25, relationships: 15, health: -15, smarts: -5 },
        emoji: '🍻',
        consequences: ['You had an amazing time but failed your midterm exam.']
      },
      {
        id: 'designated_driver',
        text: 'Be the designated driver',
        effects: { relationships: 20, happiness: 5, health: 5 },
        emoji: '🚗',
        consequences: ['Everyone respected your responsibility and safety.']
      },
      {
        id: 'study_instead',
        text: 'Stay home and study',
        effects: { smarts: 15, happiness: -10, relationships: -5 },
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
    ageRequirement: { min: 18, max: 35 },
    choices: [
      {
        id: 'honest_approach',
        text: 'Be completely honest',
        effects: { happiness: 10, relationships: 10, wealth: 15 },
        emoji: '😊',
        consequences: ['Your honesty impressed them and you got the job!']
      },
      {
        id: 'embellish_resume',
        text: 'Embellish your qualifications',
        effects: { wealth: 25, happiness: -5, notoriety: 5 },
        emoji: '🎭',
        consequences: ['You got the job but constantly worry about being found out.']
      },
      {
        id: 'nervous_breakdown',
        text: 'Have a nervous breakdown',
        effects: { happiness: -20, health: -10, relationships: -5 },
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
    ageRequirement: { min: 35, max: 55 },
    choices: [
      {
        id: 'buy_sports_car',
        text: 'Buy an expensive sports car',
        effects: { happiness: 20, wealth: -50000, looks: 10 },
        emoji: '🏎️',
        consequences: ['You felt young again but your bank account suffered.']
      },
      {
        id: 'change_career',
        text: 'Completely change careers',
        effects: { happiness: 15, wealth: -20000, smarts: 10 },
        emoji: '🔄',
        consequences: ['Starting over was scary but ultimately rewarding.']
      },
      {
        id: 'therapy',
        text: 'Seek therapy and counseling',
        effects: { happiness: 25, health: 15, wealth: -5000 },
        emoji: '🛋️',
        consequences: ['Professional help gave you new perspective on life.']
      },
      {
        id: 'accept_life',
        text: 'Accept your life as it is',
        effects: { happiness: 10, health: 5 },
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
    ageRequirement: { min: 25, max: 80 },
    choices: [
      {
        id: 'immediate_treatment',
        text: 'Seek immediate treatment',
        effects: { health: 15, wealth: -15000, happiness: -10 },
        emoji: '💊',
        consequences: ['Early intervention saved your health and possibly your life.']
      },
      {
        id: 'second_opinion',
        text: 'Get a second opinion',
        effects: { health: 5, wealth: -5000, smarts: 5 },
        emoji: '👨‍⚕️',
        consequences: ['The second doctor had a different diagnosis entirely.']
      },
      {
        id: 'ignore_results',
        text: 'Ignore the results',
        effects: { happiness: 5, health: -25 },
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
    ageRequirement: { min: 18, max: 100 },
    choices: [
      {
        id: 'small_win',
        text: 'Win $1,000',
        effects: { wealth: 1000, happiness: 20 },
        emoji: '💰',
        consequences: ['A nice little windfall that brightened your day!']
      },
      {
        id: 'big_win',
        text: 'Win $100,000!',
        effects: { wealth: 100000, happiness: 50, relationships: -10 },
        emoji: '💎',
        consequences: ['You won big but suddenly everyone wanted to be your friend.']
      },
      {
        id: 'nothing',
        text: 'Win nothing',
        effects: { happiness: -5 },
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
    ageRequirement: { min: 18, max: 50 },
    choices: [
      {
        id: 'invest_big',
        text: 'Invest your life savings',
        effects: { wealth: 50000, happiness: 20, health: -10 },
        emoji: '🚀',
        consequences: ['You struck it rich but the stress was overwhelming!']
      },
      {
        id: 'invest_small',
        text: 'Invest a small amount',
        effects: { wealth: 5000, happiness: 10, smarts: 5 },
        emoji: '💰',
        consequences: ['Your cautious approach paid off with modest gains.']
      },
      {
        id: 'stay_away',
        text: 'Avoid cryptocurrency entirely',
        effects: { happiness: -5, smarts: 5 },
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
    ageRequirement: { min: 16, max: 50 },
    choices: [
      {
        id: 'join_protest',
        text: 'Join the protest',
        effects: { happiness: 15, relationships: 10, notoriety: 5 },
        emoji: '✊',
        consequences: ['You felt empowered standing up for the environment.']
      },
      {
        id: 'counter_protest',
        text: 'Join a counter-protest',
        effects: { happiness: -10, relationships: -10, notoriety: 10 },
        emoji: '🚫',
        consequences: ['Your controversial stance got you a lot of negative attention.']
      },
      {
        id: 'stay_neutral',
        text: 'Stay out of it',
        effects: { happiness: 0 },
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
    ageRequirement: { min: 62, max: 70 },
    choices: [
      {
        id: 'retire_early',
        text: 'Retire immediately',
        effects: { happiness: 25, health: 15, wealth: -10000 },
        emoji: '🏖️',
        consequences: ['Freedom felt amazing but money became tighter.']
      },
      {
        id: 'work_longer',
        text: 'Keep working',
        effects: { wealth: 20000, happiness: -10, health: -5 },
        emoji: '💼',
        consequences: ['The extra income was nice but you felt tired.']
      },
      {
        id: 'part_time',
        text: 'Work part-time',
        effects: { happiness: 15, wealth: 5000, health: 5 },
        emoji: '⏰',
        consequences: ['The perfect balance of income and leisure time.']
      }
    ]
  }
];
