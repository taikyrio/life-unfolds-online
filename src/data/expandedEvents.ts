
import { DynamicEvent } from './dynamicEvents';

export const expandedLifeEvents: DynamicEvent[] = [
  // Baby/Toddler Events (0-3)
  {
    id: 'learn_to_walk',
    title: 'First Steps',
    description: 'You\'re taking your first steps! Your family is so proud.',
    emoji: '👶',
    choices: [
      {
        id: 'walk_confidently',
        text: 'Walk confidently towards family',
        effects: { happiness: 20, health: 10, relationships: 15 },
        emoji: '🚶'
      },
      {
        id: 'fall_down',
        text: 'Fall down but get back up',
        effects: { happiness: 10, health: 5 },
        emoji: '😊'
      }
    ],
    conditions: { minAge: 1, maxAge: 2, probability: 0.9 },
    weight: 10
  },
  {
    id: 'imaginary_friend',
    title: 'Imaginary Friend',
    description: 'You\'ve created an imaginary friend named Bingo. Your parents think it\'s cute.',
    emoji: '👻',
    choices: [
      {
        id: 'embrace_friend',
        text: 'Play with Bingo every day',
        effects: { happiness: 25, smarts: 10, relationships: -5 },
        emoji: '🎭'
      },
      {
        id: 'ignore_friend',
        text: 'Ignore Bingo and play with real toys',
        effects: { happiness: 5, smarts: 5, relationships: 10 },
        emoji: '🧸'
      }
    ],
    conditions: { minAge: 3, maxAge: 5, probability: 0.4 },
    weight: 8
  },

  // Child Events (4-11)
  {
    id: 'lost_tooth',
    title: 'Lost Tooth',
    description: 'You lost your first tooth! The tooth fairy might visit.',
    emoji: '🦷',
    choices: [
      {
        id: 'tooth_fairy',
        text: 'Put it under your pillow',
        effects: { happiness: 20, wealth: 5 },
        emoji: '🧚'
      },
      {
        id: 'keep_tooth',
        text: 'Keep the tooth as a memento',
        effects: { happiness: 10, smarts: 5 },
        emoji: '💎'
      }
    ],
    conditions: { minAge: 5, maxAge: 8, probability: 0.7 },
    weight: 6
  },
  {
    id: 'playground_accident',
    title: 'Playground Accident',
    description: 'You fell off the monkey bars and scraped your knee badly.',
    emoji: '🩹',
    choices: [
      {
        id: 'cry_for_help',
        text: 'Cry and run to a teacher',
        effects: { happiness: -10, health: -5, relationships: 5 },
        emoji: '😭'
      },
      {
        id: 'tough_it_out',
        text: 'Be brave and clean it yourself',
        effects: { happiness: 5, health: -10, smarts: 10 },
        emoji: '💪'
      }
    ],
    conditions: { minAge: 6, maxAge: 10, probability: 0.3 },
    weight: 7
  },
  {
    id: 'pet_adoption',
    title: 'Family Pet',
    description: 'Your family is considering getting a pet. What do you suggest?',
    emoji: '🐕',
    choices: [
      {
        id: 'get_dog',
        text: 'Ask for a dog',
        effects: { happiness: 30, relationships: 20, wealth: -50 },
        emoji: '🐕'
      },
      {
        id: 'get_cat',
        text: 'Ask for a cat',
        effects: { happiness: 25, relationships: 15, wealth: -30 },
        emoji: '🐱'
      },
      {
        id: 'no_pet',
        text: 'Suggest waiting until later',
        effects: { happiness: -10, smarts: 10 },
        emoji: '🤔'
      }
    ],
    conditions: { minAge: 7, maxAge: 12, probability: 0.4 },
    weight: 9
  },
  {
    id: 'science_fair',
    title: 'Science Fair Project',
    description: 'You need to create a project for the school science fair.',
    emoji: '🔬',
    choices: [
      {
        id: 'volcano_project',
        text: 'Make a volcano that erupts',
        effects: { happiness: 20, smarts: 15, looks: -5 },
        emoji: '🌋'
      },
      {
        id: 'solar_system',
        text: 'Create a detailed solar system model',
        effects: { happiness: 15, smarts: 25 },
        emoji: '🪐'
      },
      {
        id: 'skip_fair',
        text: 'Don\'t participate',
        effects: { happiness: -15, smarts: -10 },
        emoji: '😔'
      }
    ],
    conditions: { minAge: 8, maxAge: 11, probability: 0.6 },
    weight: 8
  },

  // Teen Events (12-17)
  {
    id: 'first_phone',
    title: 'First Smartphone',
    description: 'Your parents are considering getting you your first smartphone.',
    emoji: '📱',
    choices: [
      {
        id: 'latest_phone',
        text: 'Ask for the latest model',
        effects: { happiness: 30, relationships: 20, wealth: -300 },
        emoji: '📱'
      },
      {
        id: 'basic_phone',
        text: 'Accept a basic smartphone',
        effects: { happiness: 20, relationships: 10, wealth: -100 },
        emoji: '📞'
      },
      {
        id: 'no_phone',
        text: 'Say you don\'t need one yet',
        effects: { happiness: -10, relationships: -15, smarts: 10 },
        emoji: '📚'
      }
    ],
    conditions: { minAge: 12, maxAge: 15, probability: 0.8 },
    weight: 12
  },
  {
    id: 'driving_test',
    title: 'Driver\'s License Test',
    description: 'You\'re old enough to take your driving test. Are you ready?',
    emoji: '🚗',
    choices: [
      {
        id: 'pass_test',
        text: 'Take the test confidently',
        effects: { happiness: 30, relationships: 15, looks: 10 },
        emoji: '🎉'
      },
      {
        id: 'fail_test',
        text: 'Take the test but fail',
        effects: { happiness: -20, relationships: -10 },
        emoji: '😞'
      },
      {
        id: 'wait_longer',
        text: 'Wait until you feel more ready',
        effects: { happiness: -5, smarts: 10 },
        emoji: '⏰'
      }
    ],
    conditions: { minAge: 16, maxAge: 17, probability: 0.9 },
    weight: 15
  },
  {
    id: 'prom_invitation',
    title: 'Prom Invitation',
    description: 'Prom is coming up. How do you want to handle it?',
    emoji: '💃',
    choices: [
      {
        id: 'ask_crush',
        text: 'Ask your crush to prom',
        effects: { happiness: 25, relationships: 20, looks: 10 },
        emoji: '💕'
      },
      {
        id: 'go_with_friends',
        text: 'Go with a group of friends',
        effects: { happiness: 20, relationships: 15 },
        emoji: '👥'
      },
      {
        id: 'skip_prom',
        text: 'Skip prom entirely',
        effects: { happiness: -15, relationships: -20, wealth: 100 },
        emoji: '🏠'
      }
    ],
    conditions: { minAge: 17, maxAge: 18, probability: 0.7 },
    weight: 13
  },
  {
    id: 'part_time_job',
    title: 'First Part-Time Job',
    description: 'You want to get a part-time job to earn some money.',
    emoji: '💼',
    choices: [
      {
        id: 'retail_job',
        text: 'Work at a clothing store',
        effects: { happiness: 10, wealth: 150, looks: 5, relationships: 10 },
        emoji: '👔'
      },
      {
        id: 'food_service',
        text: 'Work at a fast food restaurant',
        effects: { happiness: 5, wealth: 120, health: -5 },
        emoji: '🍔'
      },
      {
        id: 'focus_studies',
        text: 'Focus on studies instead',
        effects: { happiness: -5, smarts: 15 },
        emoji: '📚'
      }
    ],
    conditions: { minAge: 15, maxAge: 17, probability: 0.6 },
    weight: 11
  },

  // Young Adult Events (18-25)
  {
    id: 'college_roommate',
    title: 'College Roommate Drama',
    description: 'Your college roommate is being difficult and inconsiderate.',
    emoji: '🏠',
    choices: [
      {
        id: 'confront_roommate',
        text: 'Have an honest conversation',
        effects: { happiness: 15, relationships: 10, smarts: 5 },
        emoji: '💬'
      },
      {
        id: 'request_transfer',
        text: 'Request a room transfer',
        effects: { happiness: 5, relationships: -10, wealth: -50 },
        emoji: '📦'
      },
      {
        id: 'tolerate_behavior',
        text: 'Just deal with it',
        effects: { happiness: -15, health: -5 },
        emoji: '😤'
      }
    ],
    conditions: { minAge: 18, maxAge: 22, probability: 0.4 },
    weight: 8
  },
  {
    id: 'internship_opportunity',
    title: 'Internship Opportunity',
    description: 'You\'ve been offered an unpaid internship at a prestigious company.',
    emoji: '🎯',
    choices: [
      {
        id: 'take_internship',
        text: 'Accept the internship',
        effects: { happiness: 20, smarts: 20, relationships: 15, wealth: -100 },
        emoji: '🎯'
      },
      {
        id: 'find_paid_work',
        text: 'Look for paid work instead',
        effects: { happiness: 10, wealth: 200 },
        emoji: '💰'
      },
      {
        id: 'focus_studies',
        text: 'Focus on your studies',
        effects: { happiness: 5, smarts: 15 },
        emoji: '📖'
      }
    ],
    conditions: { minAge: 19, maxAge: 23, probability: 0.5 },
    weight: 12
  },
  {
    id: 'spring_break',
    title: 'Spring Break Plans',
    description: 'Spring break is coming up. Your friends want to go somewhere expensive.',
    emoji: '🏖️',
    choices: [
      {
        id: 'expensive_trip',
        text: 'Join the expensive trip',
        effects: { happiness: 30, relationships: 20, wealth: -500, health: -10 },
        emoji: '✈️'
      },
      {
        id: 'budget_trip',
        text: 'Suggest a budget-friendly alternative',
        effects: { happiness: 15, relationships: 5, wealth: -100 },
        emoji: '🚗'
      },
      {
        id: 'stay_home',
        text: 'Stay home and work',
        effects: { happiness: -10, relationships: -15, wealth: 200 },
        emoji: '🏠'
      }
    ],
    conditions: { minAge: 18, maxAge: 22, probability: 0.6 },
    weight: 9
  },

  // Adult Events (26-50)
  {
    id: 'wedding_invitation',
    title: 'Friend\'s Wedding',
    description: 'Your close friend is getting married and wants you to be in the wedding party.',
    emoji: '💒',
    choices: [
      {
        id: 'be_in_wedding',
        text: 'Accept the honor',
        effects: { happiness: 20, relationships: 25, wealth: -300 },
        emoji: '👰'
      },
      {
        id: 'attend_only',
        text: 'Attend but decline wedding party role',
        effects: { happiness: 10, relationships: 5, wealth: -100 },
        emoji: '🎉'
      },
      {
        id: 'decline_invitation',
        text: 'Politely decline',
        effects: { happiness: -10, relationships: -20 },
        emoji: '📧'
      }
    ],
    conditions: { minAge: 25, maxAge: 40, probability: 0.4 },
    weight: 10
  },
  {
    id: 'job_promotion',
    title: 'Promotion Opportunity',
    description: 'You\'ve been offered a promotion that requires relocating to another city.',
    emoji: '📈',
    choices: [
      {
        id: 'accept_promotion',
        text: 'Accept and relocate',
        effects: { happiness: 25, wealth: 400, relationships: -15 },
        emoji: '📦'
      },
      {
        id: 'negotiate_remote',
        text: 'Try to negotiate remote work',
        effects: { happiness: 15, wealth: 200, smarts: 10 },
        emoji: '💻'
      },
      {
        id: 'decline_promotion',
        text: 'Decline the promotion',
        effects: { happiness: -10, relationships: 15 },
        emoji: '🏠'
      }
    ],
    conditions: { minAge: 28, maxAge: 45, hasJob: true, probability: 0.3 },
    weight: 14
  },
  {
    id: 'investment_opportunity',
    title: 'Investment Opportunity',
    description: 'A friend offers you a chance to invest in their startup company.',
    emoji: '💡',
    choices: [
      {
        id: 'invest_large',
        text: 'Invest a significant amount',
        effects: { happiness: 10, wealth: -1000, relationships: 20 },
        emoji: '💰'
      },
      {
        id: 'invest_small',
        text: 'Make a small investment',
        effects: { happiness: 5, wealth: -200, relationships: 10 },
        emoji: '🪙'
      },
      {
        id: 'decline_investment',
        text: 'Politely decline',
        effects: { happiness: -5, relationships: -10 },
        emoji: '🚫'
      }
    ],
    conditions: { minAge: 25, maxAge: 50, minStat: { stat: 'wealth', value: 500 }, probability: 0.3 },
    weight: 8
  },

  // Senior Events (51+)
  {
    id: 'grandchild_birth',
    title: 'Becoming a Grandparent',
    description: 'Your child just had a baby! You\'re now a grandparent.',
    emoji: '👶',
    choices: [
      {
        id: 'involved_grandparent',
        text: 'Be very involved in grandchild\'s life',
        effects: { happiness: 30, relationships: 25, wealth: -100 },
        emoji: '👵'
      },
      {
        id: 'supportive_grandparent',
        text: 'Be supportive but give space',
        effects: { happiness: 20, relationships: 15 },
        emoji: '🤗'
      },
      {
        id: 'distant_grandparent',
        text: 'Maintain some distance',
        effects: { happiness: -5, relationships: -10 },
        emoji: '📞'
      }
    ],
    conditions: { minAge: 45, maxAge: 70, probability: 0.2 },
    weight: 12
  },
  {
    id: 'health_scare',
    title: 'Health Scare',
    description: 'You\'ve had some concerning symptoms and need to see a doctor.',
    emoji: '🏥',
    choices: [
      {
        id: 'immediate_checkup',
        text: 'Schedule an immediate appointment',
        effects: { happiness: -10, health: 15, wealth: -200 },
        emoji: '👨‍⚕️'
      },
      {
        id: 'wait_and_see',
        text: 'Wait and see if symptoms improve',
        effects: { happiness: -20, health: -10 },
        emoji: '⏰'
      },
      {
        id: 'home_remedies',
        text: 'Try home remedies first',
        effects: { happiness: -5, health: 5, wealth: -20 },
        emoji: '🌿'
      }
    ],
    conditions: { minAge: 50, maxAge: 80, probability: 0.4 },
    weight: 15
  }
];
