import { LifeEvent } from '../types/game';

// Event tracking interface
export interface EventTracker {
  triggeredEvents: Set<string>;
  lastEventAge: number;
  eventCooldowns: Map<string, number>;
}

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
    id: 'first_steps',
    title: 'First Steps',
    description: 'You took your first steps! Where did you walk to?',
    emoji: '👣',
    category: 'random',
    ageRequirement: { min: 1, max: 2 },
    choices: [
      { id: 'to_mom', text: 'Straight to mommy', emoji: '🤗', effects: { happiness: 15, relationships: 10 } },
      { id: 'to_toy', text: 'To your favorite toy', emoji: '🧸', effects: { happiness: 10, smarts: 5 } },
      { id: 'fall_down', text: 'You fell down immediately', emoji: '😅', effects: { happiness: 5, health: -2 } }
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
  },
  {
    id: 'diaper_rash',
    title: 'Diaper Rash',
    description: 'You developed a painful diaper rash. How do your parents handle it?',
    emoji: '😣',
    category: 'health',
    ageRequirement: { min: 0, max: 3 },
    choices: [
      { id: 'doctor_visit', text: 'Take you to the doctor', emoji: '👩‍⚕️', effects: { health: 10, wealth: -50 } },
      { id: 'home_remedy', text: 'Use home remedies', emoji: '🏠', effects: { health: 5, happiness: 5 } },
      { id: 'ignore', text: 'Hope it goes away', emoji: '🤷', effects: { health: -5, happiness: -10 } }
    ]
  },
  {
    id: 'baby_fever',
    title: 'Baby Fever',
    description: 'You came down with a high fever. Your parents are worried.',
    emoji: '🤒',
    category: 'health',
    ageRequirement: { min: 0, max: 4 },
    choices: [
      { id: 'hospital', text: 'Rush to the hospital', emoji: '🏥', effects: { health: 15, wealth: -200, happiness: -10 } },
      { id: 'pediatrician', text: 'Call the pediatrician', emoji: '📞', effects: { health: 10, wealth: -100 } },
      { id: 'wait_it_out', text: 'Monitor at home', emoji: '🌡️', effects: { health: 3, happiness: -5 } }
    ]
  },
  {
    id: 'toy_box_accident',
    title: 'Toy Box Accident',
    description: 'You accidentally hurt yourself while playing with toys.',
    emoji: '🧸',
    category: 'random',
    ageRequirement: { min: 1, max: 4 },
    choices: [
      { id: 'cry_loudly', text: 'Cry until parents come', emoji: '😭', effects: { happiness: -5, relationships: 5 } },
      { id: 'tough_it_out', text: 'Try to be brave', emoji: '😤', effects: { happiness: 5, health: -3 } },
      { id: 'find_bandaid', text: 'Look for a band-aid', emoji: '🩹', effects: { smarts: 5, health: 2 } }
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
    id: 'school_spelling_bee',
    title: 'Spelling Bee Competition',
    description: 'You\'re competing in the school spelling bee! How do you prepare?',
    emoji: '🐝',
    category: 'education',
    ageRequirement: { min: 7, max: 12 },
    choices: [
      { id: 'study_hard', text: 'Study word lists every day', emoji: '📚', effects: { smarts: 10, happiness: 5 } },
      { id: 'get_nervous', text: 'Get too nervous to study', emoji: '😰', effects: { smarts: -5, happiness: -5 } },
      { id: 'wing_it', text: 'Just wing it on the day', emoji: '🤷', effects: { happiness: 5, smarts: 2 } }
    ]
  },
  {
    id: 'bicycle_accident',
    title: 'Bicycle Accident',
    description: 'You fell off your bike while learning to ride. Are you hurt?',
    emoji: '🚲',
    category: 'random',
    ageRequirement: { min: 5, max: 10 },
    choices: [
      { id: 'scraped_knee', text: 'Just a scraped knee', emoji: '🩹', effects: { health: -5, happiness: -5 } },
      { id: 'broken_arm', text: 'You broke your arm!', emoji: '🏥', effects: { health: -20, wealth: -300, happiness: -15 } },
      { id: 'unhurt', text: 'You\'re perfectly fine', emoji: '😄', effects: { happiness: 10, health: 5 } }
    ]
  },
  {
    id: 'pet_hamster',
    title: 'Pet Hamster',
    description: 'Your parents got you a pet hamster! What do you name it?',
    emoji: '🐹',
    category: 'family',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      { id: 'cheeks', text: 'Cheeks', emoji: '🥰', effects: { happiness: 20, relationships: 5 } },
      { id: 'speedy', text: 'Speedy', emoji: '💨', effects: { happiness: 20, relationships: 5 } },
      { id: 'mr_whiskers', text: 'Mr. Whiskers', emoji: '🧔', effects: { happiness: 15, smarts: 5 } }
    ]
  },
  {
    id: 'school_lunch_money',
    title: 'School Lunch Money',
    description: 'You found lunch money on the cafeteria floor. What do you do?',
    emoji: '💰',
    category: 'random',
    ageRequirement: { min: 6, max: 12 },
    choices: [
      { id: 'turn_in', text: 'Turn it in to the office', emoji: '🏫', effects: { relationships: 10, happiness: 10 } },
      { id: 'keep_it', text: 'Keep it for yourself', emoji: '🤫', effects: { wealth: 10, happiness: 5 } },
      { id: 'buy_friend_lunch', text: 'Buy a friend lunch', emoji: '🍎', effects: { relationships: 15, wealth: -10, happiness: 15 } }
    ]
  },
  {
    id: 'show_and_tell',
    title: 'Show and Tell',
    description: 'It\'s your turn for show and tell! What do you bring?',
    emoji: '🎪',
    category: 'education',
    ageRequirement: { min: 5, max: 8 },
    choices: [
      { id: 'pet', text: 'Your pet', emoji: '🐕', effects: { happiness: 20, relationships: 15 } },
      { id: 'rock_collection', text: 'Your rock collection', emoji: '🪨', effects: { smarts: 10, happiness: 10 } },
      { id: 'nothing', text: 'Forget to bring anything', emoji: '😅', effects: { happiness: -10, relationships: -5 } }
    ]
  }
];

// Teen Events (13-17)
const teenEvents: LifeEvent[] = [
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
    id: 'first_job_interview',
    title: 'First Job Interview',
    description: 'You\'re interviewing for your first part-time job. How do you prepare?',
    emoji: '👔',
    category: 'career',
    ageRequirement: { min: 14, max: 17 },
    choices: [
      { id: 'research_company', text: 'Research the company thoroughly', emoji: '📚', effects: { smarts: 10, job: 'Part-time Worker', salary: 15 } },
      { id: 'dress_nicely', text: 'Focus on dressing nicely', emoji: '👗', effects: { looks: 5, job: 'Part-time Worker', salary: 12 } },
      { id: 'nervous_wreck', text: 'Get too nervous', emoji: '😰', effects: { happiness: -10, smarts: -5 } }
    ]
  },
  {
    id: 'high_school_heartbreak',
    title: 'High School Heartbreak',
    description: 'Your first relationship ended badly. How do you cope?',
    emoji: '💔',
    category: 'relationship',
    ageRequirement: { min: 14, max: 18 },
    requirements: { relationshipStatus: 'dating' },
    choices: [
      { id: 'cry_eat_ice_cream', text: 'Cry and eat ice cream', emoji: '🍦', effects: { happiness: -15, health: -5, relationshipStatus: 'single', partnerName: undefined } },
      { id: 'focus_on_friends', text: 'Focus on your friends', emoji: '👥', effects: { relationships: 15, happiness: 5, relationshipStatus: 'single', partnerName: undefined } },
      { id: 'rebound_relationship', text: 'Jump into a rebound', emoji: '💕', effects: { happiness: 10, relationships: -5, relationshipStatus: 'dating', partnerName: 'Casey' } }
    ]
  },
  {
    id: 'senior_skip_day',
    title: 'Senior Skip Day',
    description: 'All your friends are skipping school today. Do you join them?',
    emoji: '🏖️',
    category: 'random',
    ageRequirement: { min: 17, max: 18 },
    choices: [
      { id: 'skip_school', text: 'Skip with your friends', emoji: '🎉', effects: { happiness: 20, relationships: 15, smarts: -5 } },
      { id: 'go_to_school', text: 'Go to school anyway', emoji: '📚', effects: { smarts: 10, happiness: -5, relationships: -5 } },
      { id: 'fake_sick', text: 'Fake being sick', emoji: '🤒', effects: { happiness: 15, smarts: 2 } }
    ]
  },
  {
    id: 'college_acceptance',
    title: 'College Acceptance Letter',
    description: 'You received your college acceptance letters! What\'s the result?',
    emoji: '📬',
    category: 'education',
    ageRequirement: { min: 17, max: 18 },
    choices: [
      { id: 'dream_school', text: 'Accepted to your dream school!', emoji: '🎓', effects: { happiness: 30, smarts: 15, wealth: -200 } },
      { id: 'safety_school', text: 'Only got into your safety school', emoji: '😐', effects: { happiness: 5, smarts: 10, wealth: -100 } },
      { id: 'rejected_everywhere', text: 'Rejected from everywhere', emoji: '😢', effects: { happiness: -25, smarts: -5 } }
    ]
  },
  {
    id: 'teen_pregnancy_scare',
    title: 'Pregnancy Scare',
    description: 'You had a pregnancy scare. How do you handle it?',
    emoji: '😰',
    category: 'relationship',
    ageRequirement: { min: 15, max: 18 },
    requirements: { relationshipStatus: 'dating' },
    choices: [
      { id: 'take_test', text: 'Take a pregnancy test', emoji: '🧪', effects: { happiness: 10, smarts: 5 } },
      { id: 'tell_parents', text: 'Tell your parents', emoji: '👨‍👩‍👧', effects: { relationships: -10, happiness: -15 } },
      { id: 'ignore_it', text: 'Ignore it and hope', emoji: '🙈', effects: { happiness: -20, health: -5 } }
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
      { id: 'graduate_school', text: 'Apply to graduate school', emoji: '📚', effects: { education: ['Graduate Student'], wealth: -100, smarts: 15 } },
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
    id: 'quarter_life_crisis',
    title: 'Quarter-Life Crisis',
    description: 'You\'re feeling lost about your life direction. What do you do?',
    emoji: '😵‍💫',
    category: 'random',
    ageRequirement: { min: 24, max: 27 },
    choices: [
      { id: 'change_career', text: 'Completely change careers', emoji: '🔄', effects: { job: 'New Path', salary: 20, happiness: 15 } },
      { id: 'go_back_school', text: 'Go back to school', emoji: '🎓', effects: { education: ['Graduate Student'], wealth: -150, smarts: 20 } },
      { id: 'travel_solo', text: 'Take a solo trip to find yourself', emoji: '🎒', effects: { happiness: 20, wealth: -300, smarts: 10 } }
    ]
  },
  {
    id: 'online_dating',
    title: 'Online Dating',
    description: 'You decided to try online dating. How\'s it going?',
    emoji: '📱',
    category: 'relationship',
    ageRequirement: { min: 18, max: 35 },
    requirements: { relationshipStatus: 'single' },
    choices: [
      { id: 'found_love', text: 'Found someone amazing!', emoji: '💕', effects: { happiness: 25, relationshipStatus: 'dating', partnerName: 'Sam' } },
      { id: 'bad_dates', text: 'Went on terrible dates', emoji: '😒', effects: { happiness: -10, relationships: -5 } },
      { id: 'gave_up', text: 'Gave up after a week', emoji: '🙄', effects: { happiness: -5, smarts: 5 } }
    ]
  },
  {
    id: 'job_promotion_offer',
    title: 'Promotion Opportunity',
    description: 'Your boss offered you a promotion! What\'s your response?',
    emoji: '📈',
    category: 'career',
    ageRequirement: { min: 22, max: 35 },
    requirements: { job: 'any' },
    choices: [
      { id: 'accept_promotion', text: 'Accept eagerly', emoji: '🎉', effects: { salary: 25, jobLevel: 1, happiness: 20 } },
      { id: 'negotiate_salary', text: 'Negotiate for higher salary', emoji: '💰', effects: { salary: 35, jobLevel: 1, happiness: 15 } },
      { id: 'decline_promotion', text: 'Decline - too much stress', emoji: '😌', effects: { happiness: 10, health: 5 } }
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
    id: 'parent_aging',
    title: 'Aging Parents',
    description: 'Your parents are getting older and need more care. How do you help?',
    emoji: '👴',
    category: 'family',
    ageRequirement: { min: 35, max: 60 },
    choices: [
      { id: 'move_in_with_you', text: 'Have them move in with you', emoji: '🏠', effects: { relationships: 20, wealth: -100, happiness: 10 } },
      { id: 'nursing_home', text: 'Find a good nursing home', emoji: '🏥', effects: { wealth: -300, happiness: -10, relationships: -10 } },
      { id: 'hire_caregiver', text: 'Hire a caregiver', emoji: '👩‍⚕️', effects: { wealth: -200, happiness: 15, relationships: 15 } }
    ]
  },
  {
    id: 'child_college_tuition',
    title: 'Child\'s College Tuition',
    description: 'Your child got into college but tuition is expensive. What do you do?',
    emoji: '🎓',
    category: 'family',
    ageRequirement: { min: 40, max: 60 },
    requirements: { relationshipStatus: 'married' },
    choices: [
      { id: 'pay_full_tuition', text: 'Pay the full tuition', emoji: '💰', effects: { wealth: -500, happiness: 20, relationships: 25 } },
      { id: 'student_loans', text: 'Help them get student loans', emoji: '📄', effects: { wealth: -100, happiness: 10, relationships: 10 } },
      { id: 'community_college', text: 'Suggest community college first', emoji: '🏫', effects: { wealth: -50, happiness: 5, relationships: -5 } }
    ]
  }
];

// Senior Events (50+)
const seniorEvents: LifeEvent[] = [
  {
    id: 'retirement_planning',
    title: 'Retirement Time',
    description: 'You\'re eligible for retirement! What\'s your plan?',
    emoji: '🏖️',
    category: 'career',
    ageRequirement: { min: 60 },
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
    ageRequirement: { min: 50 },
    choices: [
      { id: 'spoil_them', text: 'Spoil them with treats', emoji: '🍭', effects: { happiness: 25, wealth: -50, relationships: 15 } },
      { id: 'teach_wisdom', text: 'Share life wisdom', emoji: '📚', effects: { happiness: 20, relationships: 10, smarts: 5 } },
      { id: 'play_games', text: 'Play games together', emoji: '🎲', effects: { happiness: 30, health: 5, relationships: 20 } }
    ]
  },
  {
    id: 'health_scare',
    title: 'Health Scare',
    description: 'You had a health scare that required medical attention.',
    emoji: '🏥',
    category: 'health',
    ageRequirement: { min: 55 },
    choices: [
      { id: 'follow_treatment', text: 'Follow all medical advice', emoji: '💊', effects: { health: 15, wealth: -300, happiness: 10 } },
      { id: 'second_opinion', text: 'Get a second opinion', emoji: '👩‍⚕️', effects: { health: 10, wealth: -150, smarts: 5 } },
      { id: 'ignore_advice', text: 'Ignore the doctor\'s advice', emoji: '🙄', effects: { health: -10, wealth: 0, happiness: 5 } }
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
  {
    id: 'malpractice_lawsuit',
    title: 'Malpractice Lawsuit',
    description: 'A patient is suing you for malpractice. How do you handle it?',
    emoji: '⚖️',
    category: 'career',
    ageRequirement: { min: 30 },
    requirements: { job: 'Doctor' },
    choices: [
      { id: 'fight_lawsuit', text: 'Fight it in court', emoji: '🏛️', effects: { wealth: -200, happiness: -15, fame: -10 } },
      { id: 'settle_out_of_court', text: 'Settle out of court', emoji: '🤝', effects: { wealth: -500, happiness: -5 } },
      { id: 'insurance_covers', text: 'Let insurance handle it', emoji: '📋', effects: { wealth: -50, happiness: -10 } }
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
  {
    id: 'teacher_strike',
    title: 'Teacher Strike',
    description: 'The teachers union is going on strike. Do you participate?',
    emoji: '✊',
    category: 'career',
    ageRequirement: { min: 25 },
    requirements: { job: 'Teacher' },
    choices: [
      { id: 'join_strike', text: 'Join the strike', emoji: '🪧', effects: { salary: 15, wealth: -100, relationships: 10 } },
      { id: 'cross_picket_line', text: 'Cross the picket line', emoji: '🚶', effects: { salary: -5, relationships: -15, happiness: -10 } },
      { id: 'take_sick_days', text: 'Take "sick" days', emoji: '🤒', effects: { happiness: 5, relationships: 5 } }
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
  },
  {
    id: 'bar_exam_retake',
    title: 'Bar Exam Retake',
    description: 'You failed the bar exam and need to retake it. How do you prepare?',
    emoji: '📝',
    category: 'career',
    ageRequirement: { min: 24 },
    requirements: { education: 'Law School' },
    choices: [
      { id: 'intensive_study', text: 'Study intensively for months', emoji: '📚', effects: { smarts: 20, job: 'Lawyer', salary: 80, happiness: 20 } },
      { id: 'bar_prep_course', text: 'Take an expensive prep course', emoji: '🏫', effects: { smarts: 15, wealth: -200, job: 'Lawyer', salary: 75 } },
      { id: 'give_up_law', text: 'Give up on law career', emoji: '😔', effects: { happiness: -20, job: 'Office Worker', salary: 35 } }
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
  },
  {
    id: 'marriage_troubles',
    title: 'Marriage Troubles',
    description: 'You and your spouse are having serious problems. What do you do?',
    emoji: '💔',
    category: 'relationship',
    ageRequirement: { min: 25 },
    requirements: { relationshipStatus: 'married' },
    choices: [
      { id: 'couples_therapy', text: 'Try couples therapy', emoji: '👩‍⚕️', effects: { relationships: 15, wealth: -150, happiness: 10 } },
      { id: 'trial_separation', text: 'Suggest a trial separation', emoji: '📦', effects: { relationships: -10, happiness: -15 } },
      { id: 'file_for_divorce', text: 'File for divorce', emoji: '📄', effects: { relationshipStatus: 'divorced', wealth: -300, happiness: -25, partnerName: undefined } }
    ]
  },
  {
    id: 'spouse_affair',
    title: 'Partner\'s Affair',
    description: 'You discovered your partner is having an affair. How do you respond?',
    emoji: '😡',
    category: 'relationship',
    ageRequirement: { min: 25 },
    requirements: { relationshipStatus: 'married' },
    choices: [
      { id: 'confront_them', text: 'Confront them immediately', emoji: '🗣️', effects: { relationships: -20, happiness: -20 } },
      { id: 'gather_evidence', text: 'Gather evidence first', emoji: '🔍', effects: { smarts: 10, happiness: -15 } },
      { id: 'pretend_ignorant', text: 'Pretend you don\'t know', emoji: '🙈', effects: { happiness: -30, health: -10 } }
    ]
  },
  {
    id: 'blind_date',
    title: 'Blind Date',
    description: 'Your friend set you up on a blind date. How did it go?',
    emoji: '👥',
    category: 'relationship',
    ageRequirement: { min: 18 },
    requirements: { relationshipStatus: 'single' },
    choices: [
      { id: 'perfect_match', text: 'They\'re perfect for you!', emoji: '💕', effects: { happiness: 25, relationshipStatus: 'dating', partnerName: 'Jordan' } },
      { id: 'awkward_evening', text: 'Awkward but bearable', emoji: '😬', effects: { happiness: -5, relationships: 5 } },
      { id: 'disaster_date', text: 'Complete disaster', emoji: '💥', effects: { happiness: -15, relationships: -10 } }
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
  },
  {
    id: 'tax_evasion',
    title: 'Tax Troubles',
    description: 'You\'re tempted to lie on your tax return to save money.',
    emoji: '📋',
    category: 'crime',
    ageRequirement: { min: 18 },
    choices: [
      { id: 'file_honestly', text: 'File honestly', emoji: '✅', effects: { wealth: -200, happiness: 10 } },
      { id: 'minor_lies', text: 'Tell some minor lies', emoji: '🤥', effects: { wealth: 100, happiness: -5 } },
      { id: 'major_fraud', text: 'Commit major tax fraud', emoji: '😈', effects: { wealth: 500, criminalRecord: true, happiness: 20 } }
    ]
  },
  {
    id: 'drunk_driving',
    title: 'Drunk Driving Decision',
    description: 'You\'ve been drinking at a party. Your friends want you to drive home.',
    emoji: '🍺',
    category: 'crime',
    ageRequirement: { min: 18 },
    choices: [
      { id: 'call_uber', text: 'Call an Uber instead', emoji: '🚗', effects: { wealth: -30, happiness: 10, health: 10 } },
      { id: 'sleep_at_party', text: 'Sleep at the party', emoji: '😴', effects: { happiness: 5, relationships: 5 } },
      { id: 'drive_drunk', text: 'Drive home anyway', emoji: '🚙', effects: { happiness: -20, health: -15, criminalRecord: true } }
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
  },
  {
    id: 'mental_health_struggle',
    title: 'Mental Health Struggle',
    description: 'You\'ve been feeling depressed lately. How do you handle it?',
    emoji: '😔',
    category: 'health',
    ageRequirement: { min: 16 },
    choices: [
      { id: 'see_therapist', text: 'See a therapist', emoji: '👩‍⚕️', effects: { happiness: 20, health: 15, wealth: -150 } },
      { id: 'talk_to_friends', text: 'Talk to friends', emoji: '👥', effects: { happiness: 10, relationships: 10 } },
      { id: 'self_medicate', text: 'Self-medicate with alcohol', emoji: '🍷', effects: { happiness: -10, health: -15 } }
    ]
  },
  {
    id: 'broken_bone',
    title: 'Broken Bone',
    description: 'You broke your arm in an accident. How do you handle the recovery?',
    emoji: '🦴',
    category: 'health',
    ageRequirement: { min: 8 },
    choices: [
      { id: 'follow_orders', text: 'Follow doctor\'s orders exactly', emoji: '👩‍⚕️', effects: { health: 15, wealth: -300, happiness: 5 } },
      { id: 'push_through_pain', text: 'Push through the pain', emoji: '💪', effects: { health: 5, happiness: 10 } },
      { id: 'ignore_treatment', text: 'Ignore treatment advice', emoji: '🙄', effects: { health: -10, wealth: 0, happiness: 5 } }
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
    id: 'lottery_ticket',
    title: 'Lottery Win',
    description: 'You won a small lottery prize! How much did you win?',
    emoji: '🎫',
    category: 'random',
    ageRequirement: { min: 18 },
    choices: [
      { id: 'small_win', text: '$1,000', emoji: '💵', effects: { wealth: 100, happiness: 20 } },
      { id: 'medium_win', text: '$10,000', emoji: '💰', effects: { wealth: 1000, happiness: 35, fame: 5 } },
      { id: 'big_win', text: '$100,000!', emoji: '🎰', effects: { wealth: 10000, happiness: 50, fame: 15 } }
    ]
  },
  {
    id: 'celebrity_encounter',
    title: 'Celebrity Encounter',
    description: 'You met a famous celebrity! How did it go?',
    emoji: '⭐',
    category: 'random',
    ageRequirement: { min: 10 },
    choices: [
      { id: 'got_autograph', text: 'Got their autograph', emoji: '✍️', effects: { happiness: 20, fame: 5 } },
      { id: 'became_friends', text: 'Became friends with them', emoji: '🤝', effects: { happiness: 30, fame: 15, relationships: 20 } },
      { id: 'embarrassed_yourself', text: 'Embarrassed yourself', emoji: '😳', effects: { happiness: -10, fame: -5 } }
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
  },
  {
    id: 'inherited_money',
    title: 'Inheritance',
    description: 'A distant relative left you money in their will. How much did you inherit?',
    emoji: '💰',
    category: 'random',
    ageRequirement: { min: 18 },
    choices: [
      { id: 'small_inheritance', text: '$5,000', emoji: '💵', effects: { wealth: 500, happiness: 15 } },
      { id: 'large_inheritance', text: '$50,000', emoji: '💎', effects: { wealth: 5000, happiness: 30 } },
      { id: 'mansion_inheritance', text: 'A mansion worth $500,000!', emoji: '🏰', effects: { wealth: 50000, happiness: 50, fame: 10 } }
    ]
  },
  {
    id: 'identity_theft',
    title: 'Identity Theft',
    description: 'Someone stole your identity and racked up debt. How do you handle it?',
    emoji: '🕵️',
    category: 'random',
    ageRequirement: { min: 18 },
    choices: [
      { id: 'hire_lawyer', text: 'Hire a lawyer', emoji: '⚖️', effects: { wealth: -200, happiness: 10 } },
      { id: 'handle_yourself', text: 'Handle it yourself', emoji: '📞', effects: { wealth: -100, smarts: 10, happiness: -10 } },
      { id: 'ignore_problem', text: 'Ignore it and hope it goes away', emoji: '🙈', effects: { wealth: -500, happiness: -20 } }
    ]
  },
  {
    id: 'natural_disaster',
    title: 'Natural Disaster',
    description: 'A natural disaster hit your area. How did you prepare?',
    emoji: '🌪️',
    category: 'random',
    ageRequirement: { min: 10 },
    choices: [
      { id: 'well_prepared', text: 'You were well prepared', emoji: '🎒', effects: { health: 10, wealth: -50, happiness: 15 } },
      { id: 'somewhat_prepared', text: 'Somewhat prepared', emoji: '📦', effects: { health: 5, wealth: -100, happiness: 5 } },
      { id: 'unprepared', text: 'Completely unprepared', emoji: '😱', effects: { health: -15, wealth: -300, happiness: -20 } }
    ]
  }
];

// Age-specific milestone events
const milestoneEvents: LifeEvent[] = [
  {
    id: 'sweet_sixteen',
    title: 'Sweet Sixteen',
    description: 'You\'re turning 16! How do you want to celebrate?',
    emoji: '🎂',
    category: 'random',
    ageRequirement: { min: 16, max: 16 },
    choices: [
      { id: 'big_party', text: 'Throw a huge party', emoji: '🎉', effects: { happiness: 30, relationships: 20, wealth: -200 } },
      { id: 'small_gathering', text: 'Small gathering with close friends', emoji: '👥', effects: { happiness: 20, relationships: 15, wealth: -50 } },
      { id: 'family_dinner', text: 'Just a family dinner', emoji: '🍽️', effects: { happiness: 10, relationships: 10, wealth: -20 } }
    ]
  },
  {
    id: 'eighteenth_birthday',
    title: 'Eighteen and Legal',
    description: 'You\'re 18 now! What\'s the first thing you do as an adult?',
    emoji: '🗳️',
    category: 'random',
    ageRequirement: { min: 18, max: 18 },
    choices: [
      { id: 'register_vote', text: 'Register to vote', emoji: '🗳️', effects: { happiness: 15, smarts: 10 } },
      { id: 'get_tattoo', text: 'Get a tattoo', emoji: '🎨', effects: { happiness: 20, looks: 5, wealth: -100 } },
      { id: 'buy_lottery_ticket', text: 'Buy a lottery ticket', emoji: '🎫', effects: { wealth: 10, happiness: 10 } }
    ]
  },
  {
    id: 'twenty_first_birthday',
    title: 'Twenty-First Birthday',
    description: 'You can legally drink now! How do you celebrate?',
    emoji: '🍺',
    category: 'random',
    ageRequirement: { min: 21, max: 21 },
    choices: [
      { id: 'bar_crawl', text: 'Go on a bar crawl', emoji: '🍻', effects: { happiness: 25, relationships: 15, health: -10, wealth: -100 } },
      { id: 'nice_dinner', text: 'Nice dinner with wine', emoji: '🍷', effects: { happiness: 20, wealth: -80 } },
      { id: 'dont_drink', text: 'Don\'t drink at all', emoji: '🚫', effects: { health: 10, happiness: 5 } }
    ]
  },
  {
    id: 'thirtieth_birthday',
    title: 'The Big 3-0',
    description: 'You\'re turning 30! How do you feel about this milestone?',
    emoji: '🎈',
    category: 'random',
    ageRequirement: { min: 30, max: 30 },
    choices: [
      { id: 'embrace_it', text: 'Embrace the new decade', emoji: '🤗', effects: { happiness: 20, smarts: 10 } },
      { id: 'quarter_life_crisis', text: 'Have a mini crisis', emoji: '😰', effects: { happiness: -15, wealth: -200 } },
      { id: 'ignore_age', text: 'Age is just a number', emoji: '😎', effects: { happiness: 15, health: 5 } }
    ]
  }
];

// Education-specific events
const educationSpecificEvents: LifeEvent[] = [
  {
    id: 'college_party',
    title: 'College Party',
    description: 'There\'s a huge party tonight, but you have an exam tomorrow.',
    emoji: '🎉',
    category: 'education',
    ageRequirement: { min: 18, max: 25 },
    requirements: { education: 'University Student' },
    choices: [
      { id: 'study_instead', text: 'Study for the exam', emoji: '📚', effects: { smarts: 15, happiness: -5 } },
      { id: 'party_hard', text: 'Party all night', emoji: '🍻', effects: { happiness: 20, relationships: 15, smarts: -10, health: -5 } },
      { id: 'quick_appearance', text: 'Make a quick appearance', emoji: '👋', effects: { happiness: 10, relationships: 10, smarts: 5 } }
    ]
  },
  {
    id: 'thesis_defense',
    title: 'Thesis Defense',
    description: 'You\'re defending your thesis for your advanced degree.',
    emoji: '🎓',
    category: 'education',
    ageRequirement: { min: 22, max: 30 },
    requirements: { education: 'Graduate Student' },
    choices: [
      { id: 'ace_defense', text: 'Ace the defense', emoji: '🌟', effects: { smarts: 25, happiness: 30, fame: 10 } },
      { id: 'barely_pass', text: 'Barely pass', emoji: '😅', effects: { smarts: 15, happiness: 10 } },
      { id: 'fail_defense', text: 'Fail the defense', emoji: '😞', effects: { smarts: -10, happiness: -25 } }
    ]
  },
  {
    id: 'study_abroad',
    title: 'Study Abroad Opportunity',
    description: 'You have a chance to study abroad for a semester.',
    emoji: '✈️',
    category: 'education',
    ageRequirement: { min: 19, max: 24 },
    requirements: { education: 'University Student' },
    choices: [
      { id: 'go_abroad', text: 'Study in Europe', emoji: '🇪🇺', effects: { smarts: 20, happiness: 25, wealth: -300 } },
      { id: 'stay_home', text: 'Stay at home university', emoji: '🏠', effects: { wealth: 100, happiness: 5 } },
      { id: 'work_instead', text: 'Work to save money', emoji: '💼', effects: { wealth: 200, happiness: -10 } }
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
  ...randomLifeEvents,
  ...milestoneEvents,
  ...educationSpecificEvents
];

// Enhanced event tracking and selection logic
export const createEventTracker = (): EventTracker => ({
  triggeredEvents: new Set<string>(),
  lastEventAge: 0,
  eventCooldowns: new Map<string, number>()
});

export const getRandomEvent = (character: any, eventTracker: EventTracker): LifeEvent | null => {
  // Don't trigger events on consecutive ages (except for milestone events)
  const currentAge = character.age;
  if (currentAge - eventTracker.lastEventAge < 1 && Math.random() > 0.3) {
    return null;
  }

  // Filter available events
  const availableEvents = lifeEvents.filter(event => {
    // Skip if already triggered (unless it's a repeatable event)
    if (eventTracker.triggeredEvents.has(event.id) && !isRepeatableEvent(event)) {
      return false;
    }

    // Check cooldown for repeatable events
    if (eventTracker.eventCooldowns.has(event.id)) {
      const cooldownEnd = eventTracker.eventCooldowns.get(event.id)!;
      if (currentAge < cooldownEnd) {
        return false;
      }
    }

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
    return null;
  }

  // Prioritize events based on age groups and life circumstances
  let priorityEvents = getPriorityEvents(availableEvents, character);
  
  // If no priority events, use all available
  if (priorityEvents.length === 0) {
    priorityEvents = availableEvents;
  }

  const selectedEvent = priorityEvents[Math.floor(Math.random() * priorityEvents.length)];
  
  // Mark event as triggered
  eventTracker.triggeredEvents.add(selectedEvent.id);
  eventTracker.lastEventAge = currentAge;
  
  // Set cooldown for repeatable events
  if (isRepeatableEvent(selectedEvent)) {
    const cooldownYears = getEventCooldown(selectedEvent);
    eventTracker.eventCooldowns.set(selectedEvent.id, currentAge + cooldownYears);
  }

  return selectedEvent;
};

// Helper function to determine if an event can repeat
const isRepeatableEvent = (event: LifeEvent): boolean => {
  const repeatableCategories = ['random', 'health', 'career'];
  const nonRepeatableEvents = [
    'first_word', 'first_steps', 'lost_tooth', 'drivers_license', 
    'high_school_graduation', 'college_graduation', 'marriage_proposal',
    'sweet_sixteen', 'eighteenth_birthday', 'twenty_first_birthday', 'thirtieth_birthday'
  ];
  
  return repeatableCategories.includes(event.category || '') && 
         !nonRepeatableEvents.includes(event.id);
};

// Helper function to get cooldown period for repeatable events
const getEventCooldown = (event: LifeEvent): number => {
  switch (event.category) {
    case 'health': return 2; // 2 years
    case 'career': return 3; // 3 years
    case 'random': return 1; // 1 year
    default: return 2;
  }
};

// Helper function to prioritize events based on character state
const getPriorityEvents = (events: LifeEvent[], character: any): LifeEvent[] => {
  const age = character.age;
  let priorityEvents = events;

  // Age-based priorities
  if (age >= 0 && age <= 4) {
    priorityEvents = events.filter(e => e.category === 'random' || e.category === 'family');
  } else if (age >= 5 && age <= 12) {
    priorityEvents = events.filter(e => e.category === 'education' || e.category === 'random' || e.category === 'family');
  } else if (age >= 13 && age <= 17) {
    priorityEvents = events.filter(e => e.category === 'education' || e.category === 'relationship' || e.category === 'random');
  } else if (age >= 18 && age <= 30) {
    priorityEvents = events.filter(e => e.category === 'career' || e.category === 'relationship' || e.category === 'random');
  } else if (age >= 31 && age <= 50) {
    priorityEvents = events.filter(e => e.category === 'career' || e.category === 'family' || e.category === 'random');
  } else if (age >= 51) {
    priorityEvents = events.filter(e => e.category === 'family' || e.category === 'health' || e.category === 'random');
  }

  // Job-specific priorities
  if (character.job) {
    const careerEvents = events.filter(e => e.category === 'career');
    if (careerEvents.length > 0 && Math.random() > 0.7) {
      priorityEvents = careerEvents;
    }
  }

  // Relationship status priorities
  if (character.relationshipStatus === 'single' && age >= 16) {
    const relationshipEvents = events.filter(e => e.category === 'relationship');
    if (relationshipEvents.length > 0 && Math.random() > 0.8) {
      priorityEvents = relationshipEvents;
    }
  }

  return priorityEvents;
};
