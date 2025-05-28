
import { LifeEvent } from '../types/game';

// Baby/Toddler Events (0-4)
const babyEvents: LifeEvent[] = [
  {
    id: 'first_word',
    title: 'First Word',
    description: 'You spoke your first word! What did you say?',
    emoji: '👶',
    category: 'random',
    ageRequirement: { min: 1, max: 2 },
    choices: [
      { id: 'mama', text: 'Mama!', emoji: '👩', effects: { happiness: 10, relationships: 5 } },
      { id: 'dada', text: 'Dada!', emoji: '👨', effects: { happiness: 10, relationships: 5 } },
      { id: 'no', text: 'No!', emoji: '🙄', effects: { happiness: 5, smarts: 5 } }
    ]
  },
  {
    id: 'potty_training',
    title: 'Potty Training',
    description: 'Your parents are trying to potty train you. How do you handle it?',
    emoji: '🚽',
    category: 'random',
    ageRequirement: { min: 2, max: 4 },
    choices: [
      { id: 'cooperative', text: 'Be cooperative', emoji: '😊', effects: { happiness: 10, relationships: 10 } },
      { id: 'resistant', text: 'Resist and cry', emoji: '😭', effects: { happiness: -5, relationships: -5 } },
      { id: 'accident', text: 'Have an accident', emoji: '😳', effects: { happiness: -5 } }
    ]
  }
];

// Child Events (5-12)
const childEvents: LifeEvent[] = [
  {
    id: 'elementary_grades',
    title: 'Report Card Day',
    description: 'You received your elementary school report card. How did you do?',
    emoji: '📊',
    category: 'education',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      { id: 'straight_a', text: 'Straight A\'s! You studied hard', emoji: '🌟', effects: { smarts: 15, happiness: 10 } },
      { id: 'average_grades', text: 'B\'s and C\'s - pretty average', emoji: '📝', effects: { smarts: 5, happiness: 5 } },
      { id: 'poor_grades', text: 'Mostly D\'s and F\'s...', emoji: '😞', effects: { smarts: -5, happiness: -10 } }
    ]
  },
  {
    id: 'playground_bully',
    title: 'Playground Bully',
    description: 'A bigger kid is picking on you at school. What do you do?',
    emoji: '😠',
    category: 'random',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      { id: 'fight_back', text: 'Fight back!', emoji: '👊', effects: { health: -10, happiness: 5, relationships: -5 } },
      { id: 'tell_teacher', text: 'Tell a teacher', emoji: '👩‍🏫', effects: { happiness: 10, relationships: 5 } },
      { id: 'ignore_bully', text: 'Just ignore them', emoji: '🙄', effects: { happiness: -5, health: -5 } }
    ]
  },
  {
    id: 'lost_tooth',
    title: 'Lost Tooth',
    description: 'You lost your first tooth! What do you do?',
    emoji: '🦷',
    category: 'random',
    ageRequirement: { min: 5, max: 8 },
    choices: [
      { id: 'tooth_fairy', text: 'Put it under your pillow', emoji: '🧚', effects: { happiness: 15, wealth: 5 } },
      { id: 'keep_tooth', text: 'Keep it as a souvenir', emoji: '📦', effects: { happiness: 5 } },
      { id: 'throw_away', text: 'Throw it away', emoji: '🗑️', effects: { happiness: -5 } }
    ]
  },
  {
    id: 'pet_goldfish',
    title: 'Pet Goldfish',
    description: 'Your parents got you a pet goldfish! What do you name it?',
    emoji: '🐠',
    category: 'family',
    ageRequirement: { min: 5, max: 12 },
    choices: [
      { id: 'goldie', text: 'Goldie', emoji: '✨', effects: { happiness: 20, relationships: 5 } },
      { id: 'nemo', text: 'Nemo', emoji: '🧡', effects: { happiness: 20, relationships: 5 } },
      { id: 'fishstick', text: 'Fishstick', emoji: '😂', effects: { happiness: 15, smarts: 5 } }
    ]
  },
  {
    id: 'school_play',
    title: 'School Play',
    description: 'You got cast in the school play! What role did you get?',
    emoji: '🎭',
    category: 'education',
    ageRequirement: { min: 7, max: 12 },
    choices: [
      { id: 'lead_role', text: 'The lead character!', emoji: '⭐', effects: { happiness: 25, fame: 5, relationships: 10 } },
      { id: 'supporting', text: 'A supporting character', emoji: '🎪', effects: { happiness: 15, relationships: 5 } },
      { id: 'tree', text: 'A tree (no lines)', emoji: '🌳', effects: { happiness: 5, smarts: 5 } }
    ]
  },
  {
    id: 'birthday_party',
    title: 'Birthday Party',
    description: 'It\'s your birthday! How many friends came to your party?',
    emoji: '🎂',
    category: 'random',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      { id: 'lots_friends', text: 'The whole class showed up!', emoji: '🎉', effects: { happiness: 30, relationships: 15 } },
      { id: 'few_friends', text: 'A few close friends', emoji: '👫', effects: { happiness: 20, relationships: 10 } },
      { id: 'no_friends', text: 'Just family...', emoji: '😢', effects: { happiness: -10, relationships: -5 } }
    ]
  }
];

// Teen Events (13-17)
const teenEvents: LifeEvent[] = [
  {
    id: 'high_school_graduation',
    title: 'High School Graduation',
    description: 'You\'re graduating high school! What\'s your next step?',
    emoji: '🎓',
    category: 'education',
    ageRequirement: { min: 17, max: 19 },
    choices: [
      { id: 'go_to_college', text: 'Go to university', emoji: '🏫', effects: { education: 'University Student', wealth: -50, smarts: 10 } },
      { id: 'get_job', text: 'Get a job immediately', emoji: '💼', effects: { job: 'Retail Worker', salary: 25, wealth: 20 } },
      { id: 'gap_year', text: 'Take a gap year', emoji: '🌎', effects: { happiness: 15, wealth: -10 } }
    ]
  },
  {
    id: 'first_crush',
    title: 'First Crush',
    description: 'You have a crush on someone at school. Do you make a move?',
    emoji: '💕',
    category: 'relationship',
    ageRequirement: { min: 13, max: 17 },
    choices: [
      { id: 'ask_out', text: 'Ask them out', emoji: '💌', effects: { happiness: 20, relationships: 15, relationshipStatus: 'dating', partnerName: 'Alex' } },
      { id: 'write_note', text: 'Write them a love note', emoji: '💝', effects: { happiness: 10, relationships: 5 } },
      { id: 'stay_shy', text: 'Stay shy and do nothing', emoji: '😊', effects: { happiness: -5 } }
    ]
  },
  {
    id: 'prom_night',
    title: 'Prom Night',
    description: 'It\'s prom night! How do you want to spend it?',
    emoji: '💃',
    category: 'random',
    ageRequirement: { min: 16, max: 18 },
    choices: [
      { id: 'go_with_date', text: 'Go with a date', emoji: '💏', effects: { happiness: 25, relationships: 15, wealth: -50 } },
      { id: 'go_with_friends', text: 'Go with friends', emoji: '👫', effects: { happiness: 20, relationships: 10, wealth: -30 } },
      { id: 'skip_prom', text: 'Skip prom entirely', emoji: '🏠', effects: { happiness: -10, wealth: 20 } }
    ]
  },
  {
    id: 'drivers_license',
    title: 'Driver\'s License Test',
    description: 'You\'re taking your driving test! How did it go?',
    emoji: '🚗',
    category: 'random',
    ageRequirement: { min: 16, max: 18 },
    choices: [
      { id: 'pass_first_try', text: 'Passed on the first try!', emoji: '🎉', effects: { happiness: 30, smarts: 10 } },
      { id: 'pass_second_try', text: 'Passed on the second try', emoji: '😅', effects: { happiness: 15, smarts: 5 } },
      { id: 'fail_multiple', text: 'Failed multiple times', emoji: '😞', effects: { happiness: -15, smarts: -5 } }
    ]
  },
  {
    id: 'teen_job',
    title: 'First Job',
    description: 'You got your first part-time job! Where are you working?',
    emoji: '💼',
    category: 'career',
    ageRequirement: { min: 14, max: 17 },
    choices: [
      { id: 'fast_food', text: 'Fast food restaurant', emoji: '🍔', effects: { job: 'Fast Food Worker', salary: 15, wealth: 25 } },
      { id: 'retail', text: 'Retail store', emoji: '🛍️', effects: { job: 'Retail Worker', salary: 18, wealth: 30 } },
      { id: 'babysitting', text: 'Babysitting', emoji: '👶', effects: { job: 'Babysitter', salary: 12, wealth: 20, relationships: 5 } }
    ]
  },
  {
    id: 'acne_breakout',
    title: 'Acne Breakout',
    description: 'You\'re dealing with teenage acne. How do you handle it?',
    emoji: '😳',
    category: 'health',
    ageRequirement: { min: 13, max: 17 },
    choices: [
      { id: 'skincare_routine', text: 'Start a skincare routine', emoji: '🧴', effects: { looks: 10, wealth: -20, happiness: 10 } },
      { id: 'ignore_it', text: 'Ignore it, it\'ll go away', emoji: '🤷', effects: { looks: -5, happiness: -5 } },
      { id: 'see_dermatologist', text: 'See a dermatologist', emoji: '👩‍⚕️', effects: { looks: 15, wealth: -100, health: 5 } }
    ]
  }
];

// Young Adult Events (18-30)
const youngAdultEvents: LifeEvent[] = [
  {
    id: 'college_graduation',
    title: 'College Graduation',
    description: 'You graduated from university! What\'s your next move?',
    emoji: '🎓',
    category: 'education',
    ageRequirement: { min: 21, max: 25 },
    requirements: { education: 'University Student' },
    choices: [
      { id: 'graduate_school', text: 'Apply to graduate school', emoji: '📚', effects: { education: 'Graduate Student', wealth: -100, smarts: 15 } },
      { id: 'entry_level_job', text: 'Get an entry-level job', emoji: '💼', effects: { job: 'Office Assistant', salary: 35, wealth: 50 } },
      { id: 'travel_world', text: 'Travel the world first', emoji: '✈️', effects: { happiness: 25, wealth: -200, smarts: 10 } }
    ]
  },
  {
    id: 'first_apartment',
    title: 'First Apartment',
    description: 'You\'re moving out of your parents\' house! What kind of place do you get?',
    emoji: '🏠',
    category: 'random',
    ageRequirement: { min: 18, max: 25 },
    choices: [
      { id: 'studio_apartment', text: 'Cheap studio apartment', emoji: '🏢', effects: { wealth: -50, happiness: 15 } },
      { id: 'roommates', text: 'Share with roommates', emoji: '👥', effects: { wealth: -30, happiness: 10, relationships: 10 } },
      { id: 'nice_apartment', text: 'Nice one-bedroom', emoji: '🌟', effects: { wealth: -100, happiness: 25 } }
    ]
  },
  {
    id: 'student_loans',
    title: 'Student Loan Debt',
    description: 'Your student loan payments are due. How do you handle them?',
    emoji: '💸',
    category: 'random',
    ageRequirement: { min: 22, max: 30 },
    requirements: { education: 'University Student' },
    choices: [
      { id: 'pay_minimum', text: 'Pay the minimum', emoji: '💳', effects: { wealth: -50, happiness: -5 } },
      { id: 'pay_extra', text: 'Pay extra to pay off faster', emoji: '💪', effects: { wealth: -100, happiness: 10, smarts: 5 } },
      { id: 'defer_payments', text: 'Defer payments', emoji: '⏰', effects: { wealth: 0, happiness: -10 } }
    ]
  },
  {
    id: 'job_interview',
    title: 'Important Job Interview',
    description: 'You have an interview for your dream job! How do you prepare?',
    emoji: '👔',
    category: 'career',
    ageRequirement: { min: 22, max: 30 },
    choices: [
      { id: 'over_prepare', text: 'Research everything extensively', emoji: '📖', effects: { smarts: 10, salary: 25, happiness: 20 } },
      { id: 'normal_prep', text: 'Prepare adequately', emoji: '📝', effects: { salary: 15, happiness: 10 } },
      { id: 'wing_it', text: 'Wing it with confidence', emoji: '😎', effects: { salary: 5, happiness: 5 } }
    ]
  }
];

// Adult Events (30-50)
const adultEvents: LifeEvent[] = [
  {
    id: 'marriage_proposal',
    title: 'Marriage Proposal',
    description: 'Your partner wants to get married! What do you say?',
    emoji: '💍',
    category: 'relationship',
    ageRequirement: { min: 18 },
    requirements: { relationshipStatus: 'dating' },
    choices: [
      { id: 'say_yes', text: 'Yes! Let\'s get married!', emoji: '💒', effects: { relationshipStatus: 'married', happiness: 25, wealth: -100 } },
      { id: 'not_ready', text: 'I\'m not ready yet', emoji: '⏰', effects: { relationships: -10, happiness: -5 } },
      { id: 'break_up', text: 'Actually, let\'s break up', emoji: '💔', effects: { relationshipStatus: 'single', relationships: -30, happiness: -15, partnerName: undefined } }
    ]
  },
  {
    id: 'job_promotion',
    title: 'Promotion Opportunity',
    description: 'Your boss is considering you for a promotion. How do you handle it?',
    emoji: '📈',
    category: 'career',
    ageRequirement: { min: 22 },
    requirements: { job: 'any' },
    choices: [
      { id: 'work_overtime', text: 'Work extra hours to impress', emoji: '⏰', effects: { salary: 20, jobLevel: 1, health: -5, happiness: 10 } },
      { id: 'network_boss', text: 'Take your boss out for drinks', emoji: '🍻', effects: { salary: 15, wealth: -10, relationships: 5 } },
      { id: 'decline_promotion', text: 'You\'re happy where you are', emoji: '😌', effects: { happiness: 5, salary: 0 } }
    ]
  },
  {
    id: 'home_purchase',
    title: 'Buying Your First Home',
    description: 'You\'re ready to buy a house! What\'s your budget?',
    emoji: '🏡',
    category: 'random',
    ageRequirement: { min: 25, max: 45 },
    requirements: { wealth: 200 },
    choices: [
      { id: 'modest_home', text: 'Modest starter home', emoji: '🏠', effects: { wealth: -300, happiness: 20 } },
      { id: 'dream_home', text: 'Your dream home', emoji: '🏰', effects: { wealth: -800, happiness: 40 } },
      { id: 'keep_renting', text: 'Keep renting for now', emoji: '🏢', effects: { wealth: 50, happiness: -5 } }
    ]
  },
  {
    id: 'midlife_crisis',
    title: 'Midlife Crisis',
    description: 'You\'re feeling restless about your life choices. Time for a change?',
    emoji: '🏃‍♂️',
    category: 'random',
    ageRequirement: { min: 40, max: 55 },
    choices: [
      { id: 'buy_sports_car', text: 'Buy a sports car', emoji: '🏎️', effects: { wealth: -200, happiness: 20, fame: 5 } },
      { id: 'change_career', text: 'Change careers completely', emoji: '🔄', effects: { job: 'New Career', salary: 30, happiness: 15, wealth: -50 } },
      { id: 'stay_course', text: 'Stay the course', emoji: '⚓', effects: { happiness: 5, health: 5 } }
    ]
  },
  {
    id: 'lottery_ticket',
    title: 'Lucky Lottery',
    description: 'You found a lottery ticket on the ground. The jackpot is $50,000!',
    emoji: '🎫',
    category: 'random',
    ageRequirement: { min: 18 },
    choices: [
      { id: 'keep_ticket', text: 'Keep it - finders keepers!', emoji: '🤞', effects: { wealth: 500, happiness: 30, fame: 5 } },
      { id: 'find_owner', text: 'Try to find the real owner', emoji: '👮', effects: { relationships: 15, happiness: 20 } },
      { id: 'throw_away', text: 'Throw it away - gambling is bad', emoji: '🗑️', effects: { happiness: -5, smarts: 5 } }
    ]
  },
  {
    id: 'investment_opportunity',
    title: 'Investment Opportunity',
    description: 'A friend wants you to invest in their startup company.',
    emoji: '💼',
    category: 'career',
    ageRequirement: { min: 25 },
    requirements: { wealth: 100 },
    choices: [
      { id: 'invest_big', text: 'Invest $500', emoji: '💰', effects: { wealth: 1000, happiness: 15 } },
      { id: 'invest_small', text: 'Invest $100', emoji: '💵', effects: { wealth: 150, happiness: 10 } },
      { id: 'decline_investment', text: 'Too risky for me', emoji: '🛡️', effects: { relationships: -5, happiness: 5 } }
    ]
  }
];

// Senior Events (65+)
const seniorEvents: LifeEvent[] = [
  {
    id: 'retirement_planning',
    title: 'Retirement Time',
    description: 'You\'re eligible for retirement! What\'s your plan?',
    emoji: '🏖️',
    category: 'career',
    ageRequirement: { min: 65 },
    requirements: { job: 'any' },
    choices: [
      { id: 'full_retirement', text: 'Retire completely', emoji: '😌', effects: { job: undefined, salary: 0, happiness: 20, health: 10 } },
      { id: 'part_time', text: 'Work part-time', emoji: '⏰', effects: { salary: -50, happiness: 10 } },
      { id: 'keep_working', text: 'Keep working full-time', emoji: '💼', effects: { salary: 10, health: -5, happiness: -5 } }
    ]
  },
  {
    id: 'grandchildren',
    title: 'Grandchildren Visit',
    description: 'Your grandchildren are visiting! How do you spend time with them?',
    emoji: '👴',
    category: 'family',
    ageRequirement: { min: 60 },
    choices: [
      { id: 'spoil_them', text: 'Spoil them with treats', emoji: '🍭', effects: { happiness: 25, wealth: -50, relationships: 15 } },
      { id: 'teach_wisdom', text: 'Share life wisdom', emoji: '📚', effects: { happiness: 20, relationships: 10, smarts: 5 } },
      { id: 'play_games', text: 'Play games together', emoji: '🎲', effects: { happiness: 30, health: 5, relationships: 20 } }
    ]
  }
];

// Career-Specific Events
const careerEvents: LifeEvent[] = [
  // Doctor Events
  {
    id: 'medical_emergency',
    title: 'Medical Emergency',
    description: 'A patient is having a medical emergency! How do you respond?',
    emoji: '🚨',
    category: 'career',
    ageRequirement: { min: 25 },
    requirements: { job: 'Doctor' },
    choices: [
      { id: 'save_patient', text: 'Successfully save the patient', emoji: '❤️', effects: { happiness: 30, fame: 10, salary: 10 } },
      { id: 'do_best', text: 'Do your best but patient dies', emoji: '😢', effects: { happiness: -20, health: -10 } },
      { id: 'panic', text: 'Panic under pressure', emoji: '😰', effects: { happiness: -30, fame: -5, salary: -10 } }
    ]
  },
  // Teacher Events
  {
    id: 'difficult_student',
    title: 'Difficult Student',
    description: 'You have a particularly challenging student. How do you handle them?',
    emoji: '🎓',
    category: 'career',
    ageRequirement: { min: 22 },
    requirements: { job: 'Teacher' },
    choices: [
      { id: 'extra_help', text: 'Give them extra attention', emoji: '📚', effects: { happiness: 20, relationships: 15, smarts: 5 } },
      { id: 'strict_discipline', text: 'Use strict discipline', emoji: '📏', effects: { happiness: -5, relationships: -5 } },
      { id: 'involve_parents', text: 'Talk to their parents', emoji: '👨‍👩‍👧', effects: { happiness: 10, relationships: 10 } }
    ]
  },
  // Lawyer Events
  {
    id: 'big_case',
    title: 'High-Profile Case',
    description: 'You\'re assigned a high-profile legal case. How do you approach it?',
    emoji: '⚖️',
    category: 'career',
    ageRequirement: { min: 25 },
    requirements: { job: 'Lawyer' },
    choices: [
      { id: 'win_case', text: 'Win the case brilliantly', emoji: '🏆', effects: { happiness: 35, fame: 20, salary: 25 } },
      { id: 'settle', text: 'Negotiate a settlement', emoji: '🤝', effects: { happiness: 15, salary: 10 } },
      { id: 'lose_case', text: 'Lose the case', emoji: '😞', effects: { happiness: -25, fame: -10, salary: -15 } }
    ]
  }
];

// Relationship Events
const relationshipEvents: LifeEvent[] = [
  {
    id: 'anniversary',
    title: 'Wedding Anniversary',
    description: 'It\'s your wedding anniversary! How do you celebrate?',
    emoji: '💖',
    category: 'relationship',
    ageRequirement: { min: 20 },
    requirements: { relationshipStatus: 'married' },
    choices: [
      { id: 'romantic_dinner', text: 'Romantic dinner for two', emoji: '🍽️', effects: { happiness: 25, relationships: 20, wealth: -100 } },
      { id: 'vacation', text: 'Take a vacation together', emoji: '✈️', effects: { happiness: 35, relationships: 25, wealth: -300 } },
      { id: 'simple_celebration', text: 'Simple celebration at home', emoji: '🏠', effects: { happiness: 15, relationships: 10, wealth: -20 } }
    ]
  },
  {
    id: 'pregnancy_announcement',
    title: 'Pregnancy News',
    description: 'Your partner tells you they\'re pregnant! How do you react?',
    emoji: '🤱',
    category: 'relationship',
    ageRequirement: { min: 18 },
    requirements: { relationshipStatus: 'married' },
    choices: [
      { id: 'excited', text: 'You\'re thrilled!', emoji: '🎉', effects: { happiness: 30, relationships: 25 } },
      { id: 'nervous', text: 'You\'re nervous but happy', emoji: '😅', effects: { happiness: 15, relationships: 15 } },
      { id: 'overwhelmed', text: 'You feel overwhelmed', emoji: '😰', effects: { happiness: -10, relationships: -5 } }
    ]
  }
];

// Crime Events
const crimeEvents: LifeEvent[] = [
  {
    id: 'shoplifting_temptation',
    title: 'Shoplifting Temptation',
    description: 'You see an expensive item in a store with no security cameras...',
    emoji: '🛒',
    category: 'crime',
    ageRequirement: { min: 13 },
    choices: [
      { id: 'steal_item', text: 'Take it when no one\'s looking', emoji: '😈', effects: { wealth: 50, happiness: 10, criminalRecord: true } },
      { id: 'buy_item', text: 'Buy it honestly', emoji: '💳', effects: { wealth: -50, happiness: 10 } },
      { id: 'walk_away', text: 'Walk away', emoji: '🚶', effects: { happiness: 5 } }
    ]
  },
  {
    id: 'speeding_ticket',
    title: 'Speeding Ticket',
    description: 'You got pulled over for speeding! What do you do?',
    emoji: '🚔',
    category: 'crime',
    ageRequirement: { min: 16 },
    choices: [
      { id: 'pay_fine', text: 'Pay the fine', emoji: '💸', effects: { wealth: -100, happiness: -10 } },
      { id: 'fight_ticket', text: 'Fight it in court', emoji: '⚖️', effects: { wealth: -50, happiness: 5, smarts: 5 } },
      { id: 'bribe_officer', text: 'Try to bribe the officer', emoji: '💰', effects: { wealth: -200, criminalRecord: true, happiness: -20 } }
    ]
  }
];

// Health Events
const healthEvents: LifeEvent[] = [
  {
    id: 'flu_season',
    title: 'Flu Season',
    description: 'Everyone around you is getting sick. How do you protect yourself?',
    emoji: '🤧',
    category: 'health',
    ageRequirement: { min: 5 },
    choices: [
      { id: 'get_vaccine', text: 'Get a flu shot', emoji: '💉', effects: { health: 10, wealth: -30, happiness: 5 } },
      { id: 'vitamins', text: 'Take lots of vitamins', emoji: '💊', effects: { health: 5, wealth: -20 } },
      { id: 'ignore', text: 'Ignore it, you\'ll be fine', emoji: '🤷', effects: { health: -15, happiness: -10 } }
    ]
  },
  {
    id: 'gym_membership',
    title: 'Gym Membership',
    description: 'A gym is offering a special membership deal. Interested?',
    emoji: '🏋️',
    category: 'health',
    ageRequirement: { min: 16 },
    choices: [
      { id: 'join_gym', text: 'Sign up for a year', emoji: '💪', effects: { health: 20, looks: 15, wealth: -200, happiness: 15 } },
      { id: 'free_trial', text: 'Just do the free trial', emoji: '🆓', effects: { health: 5, looks: 3, happiness: 5 } },
      { id: 'decline', text: 'Exercise is overrated', emoji: '🛋️', effects: { health: -5, happiness: 5 } }
    ]
  }
];

// Random Life Events
const randomLifeEvents: LifeEvent[] = [
  {
    id: 'social_media_viral',
    title: 'Viral Social Media Post',
    description: 'Your social media post went viral! What was it about?',
    emoji: '📱',
    category: 'random',
    ageRequirement: { min: 13 },
    choices: [
      { id: 'funny_video', text: 'A funny video you made', emoji: '😂', effects: { happiness: 25, fame: 15, relationships: 10 } },
      { id: 'inspirational', text: 'An inspirational message', emoji: '✨', effects: { happiness: 20, fame: 10, relationships: 15 } },
      { id: 'embarrassing', text: 'Something embarrassing', emoji: '😳', effects: { happiness: -15, fame: 10, relationships: -10 } }
    ]
  },
  {
    id: 'wallet_found',
    title: 'Found Wallet',
    description: 'You found a wallet on the street with $200 cash inside. What do you do?',
    emoji: '👛',
    category: 'random',
    ageRequirement: { min: 10 },
    choices: [
      { id: 'return_wallet', text: 'Return it to the owner', emoji: '🤝', effects: { happiness: 20, relationships: 15, wealth: 50 } },
      { id: 'keep_money', text: 'Keep the money', emoji: '💰', effects: { wealth: 200, happiness: 10, relationships: -5 } },
      { id: 'police_station', text: 'Turn it in to police', emoji: '👮', effects: { happiness: 15, relationships: 10 } }
    ]
  },
  {
    id: 'food_poisoning',
    title: 'Food Poisoning',
    description: 'You ate at a sketchy restaurant and got food poisoning. How do you handle it?',
    emoji: '🤢',
    category: 'health',
    ageRequirement: { min: 16 },
    choices: [
      { id: 'see_doctor', text: 'Go to the doctor', emoji: '👩‍⚕️', effects: { health: 10, wealth: -100, happiness: 5 } },
      { id: 'rest_home', text: 'Rest at home', emoji: '🛏️', effects: { health: 5, happiness: -10 } },
      { id: 'sue_restaurant', text: 'Sue the restaurant', emoji: '⚖️', effects: { wealth: 500, happiness: 15, health: 5 } }
    ]
  }
];

// Combine all events
export const lifeEvents: LifeEvent[] = [
  ...babyEvents,
  ...childEvents,
  ...teenEvents,
  ...youngAdultEvents,
  ...adultEvents,
  ...seniorEvents,
  ...careerEvents,
  ...relationshipEvents,
  ...crimeEvents,
  ...healthEvents,
  ...randomLifeEvents
];

// Enhanced event selection logic
export const getRandomEvent = (character: any): LifeEvent => {
  const availableEvents = lifeEvents.filter(event => {
    // Age requirement check
    if (event.ageRequirement) {
      if (event.ageRequirement.min && character.age < event.ageRequirement.min) return false;
      if (event.ageRequirement.max && character.age > event.ageRequirement.max) return false;
    }
    
    // Requirements check
    if (event.requirements) {
      if (event.requirements.education && character.education !== event.requirements.education) return false;
      if (event.requirements.job && event.requirements.job !== 'any' && character.job !== event.requirements.job) return false;
      if (event.requirements.relationshipStatus && character.relationshipStatus !== event.requirements.relationshipStatus) return false;
      if (event.requirements.wealth && character.wealth < event.requirements.wealth) return false;
    }
    
    return true;
  });
  
  if (availableEvents.length === 0) {
    // Fallback to basic age-appropriate events
    const fallbackEvents = lifeEvents.filter(event => {
      if (!event.ageRequirement) return true;
      if (event.ageRequirement.min && character.age < event.ageRequirement.min) return false;
      if (event.ageRequirement.max && character.age > event.ageRequirement.max) return false;
      return true;
    });
    
    if (fallbackEvents.length === 0) {
      return lifeEvents[Math.floor(Math.random() * lifeEvents.length)];
    }
    
    return fallbackEvents[Math.floor(Math.random() * fallbackEvents.length)];
  }
  
  // Weight events by category for more realistic distribution
  const categoryWeights = {
    'education': character.age < 25 ? 0.3 : 0.1,
    'career': character.age >= 18 && character.age < 65 ? 0.3 : 0.1,
    'relationship': character.age >= 13 ? 0.2 : 0.1,
    'health': 0.15,
    'family': 0.15,
    'random': 0.2,
    'crime': 0.1
  };
  
  const randomIndex = Math.floor(Math.random() * availableEvents.length);
  return availableEvents[randomIndex];
};
