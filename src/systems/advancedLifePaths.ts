
import { Character } from '../types/game';

export interface AdvancedCareerPath {
  id: string;
  name: string;
  category: 'military' | 'entertainment' | 'sports' | 'entrepreneurship';
  description: string;
  icon: string;
  requirements: {
    age?: number;
    education?: string;
    stats?: Partial<Character>;
    prerequisites?: string[];
  };
  stages: CareerStage[];
  specialEvents: string[];
  unlocks: string[];
}

export interface CareerStage {
  id: string;
  name: string;
  description: string;
  duration: number; // years
  salary: number;
  requirements?: {
    stats?: Partial<Character>;
    experience?: number;
  };
  events: StageEvent[];
  progressionChances: {
    promote: number;
    stagnate: number;
    demote: number;
  };
}

export interface StageEvent {
  id: string;
  name: string;
  description: string;
  probability: number;
  choices: EventChoice[];
}

export interface EventChoice {
  id: string;
  text: string;
  effects: {
    stats?: Partial<Character>;
    career?: {
      experience?: number;
      reputation?: number;
      promotion?: boolean;
    };
    relationships?: any;
  };
}

export const militaryPath: AdvancedCareerPath = {
  id: 'military',
  name: 'Military Career',
  category: 'military',
  description: 'Serve your country and climb the military ranks',
  icon: '🪖',
  requirements: {
    age: 18,
    stats: { health: 60, smarts: 50 }
  },
  stages: [
    {
      id: 'recruit',
      name: 'Recruit',
      description: 'Basic military training',
      duration: 1,
      salary: 35,
      events: [
        {
          id: 'boot_camp',
          name: 'Boot Camp Challenge',
          description: 'Intensive military training tests your limits',
          probability: 0.8,
          choices: [
            {
              id: 'excel',
              text: 'Excel in training',
              effects: {
                stats: { health: 10, happiness: 15 },
                career: { experience: 20, reputation: 15 }
              }
            },
            {
              id: 'struggle',
              text: 'Struggle but persevere',
              effects: {
                stats: { health: 5, happiness: -5 },
                career: { experience: 10 }
              }
            }
          ]
        }
      ],
      progressionChances: { promote: 0.7, stagnate: 0.25, demote: 0.05 }
    },
    {
      id: 'corporal',
      name: 'Corporal',
      description: 'Junior non-commissioned officer',
      duration: 2,
      salary: 50,
      events: [
        {
          id: 'combat_mission',
          name: 'Combat Deployment',
          description: 'You are deployed to a combat zone',
          probability: 0.4,
          choices: [
            {
              id: 'heroic',
              text: 'Act heroically',
              effects: {
                stats: { fame: 20, happiness: 25 },
                career: { experience: 30, reputation: 25 }
              }
            },
            {
              id: 'survive',
              text: 'Focus on survival',
              effects: {
                stats: { health: -10, happiness: -10 },
                career: { experience: 15 }
              }
            }
          ]
        }
      ],
      progressionChances: { promote: 0.6, stagnate: 0.35, demote: 0.05 }
    },
    {
      id: 'sergeant',
      name: 'Sergeant',
      description: 'Lead a squad of soldiers',
      duration: 3,
      salary: 75,
      events: [],
      progressionChances: { promote: 0.5, stagnate: 0.4, demote: 0.1 }
    },
    {
      id: 'lieutenant',
      name: 'Lieutenant',
      description: 'Junior officer commanding troops',
      duration: 4,
      salary: 95,
      requirements: { stats: { smarts: 70 } },
      events: [],
      progressionChances: { promote: 0.4, stagnate: 0.5, demote: 0.1 }
    },
    {
      id: 'captain',
      name: 'Captain',
      description: 'Company commander',
      duration: 5,
      salary: 120,
      events: [],
      progressionChances: { promote: 0.3, stagnate: 0.6, demote: 0.1 }
    },
    {
      id: 'colonel',
      name: 'Colonel',
      description: 'Senior field officer',
      duration: 6,
      salary: 180,
      requirements: { stats: { smarts: 80, relationships: 70 } },
      events: [],
      progressionChances: { promote: 0.2, stagnate: 0.7, demote: 0.1 }
    },
    {
      id: 'general',
      name: 'General',
      description: 'Strategic military leader',
      duration: 10,
      salary: 300,
      requirements: { stats: { smarts: 90, relationships: 80 } },
      events: [],
      progressionChances: { promote: 0.1, stagnate: 0.8, demote: 0.1 }
    }
  ],
  specialEvents: ['war_deployment', 'military_academy', 'peacekeeping_mission'],
  unlocks: ['veteran_benefits', 'security_contractor']
};

export const entertainmentPath: AdvancedCareerPath = {
  id: 'entertainment',
  name: 'Entertainment Industry',
  category: 'entertainment',
  description: 'Pursue fame in acting, music, or social media',
  icon: '🎬',
  requirements: {
    age: 16,
    stats: { looks: 60 }
  },
  stages: [
    {
      id: 'aspiring_actor',
      name: 'Aspiring Actor',
      description: 'Auditioning for small roles',
      duration: 2,
      salary: 15,
      events: [
        {
          id: 'audition',
          name: 'Big Audition',
          description: 'A chance for a breakthrough role',
          probability: 0.6,
          choices: [
            {
              id: 'nail_it',
              text: 'Nail the audition',
              effects: {
                stats: { fame: 25, happiness: 20 },
                career: { experience: 25, reputation: 20 }
              }
            },
            {
              id: 'bomb',
              text: 'Bomb the audition',
              effects: {
                stats: { happiness: -15 },
                career: { experience: 5 }
              }
            }
          ]
        }
      ],
      progressionChances: { promote: 0.3, stagnate: 0.6, demote: 0.1 }
    },
    {
      id: 'supporting_actor',
      name: 'Supporting Actor',
      description: 'Getting regular supporting roles',
      duration: 3,
      salary: 65,
      events: [],
      progressionChances: { promote: 0.4, stagnate: 0.5, demote: 0.1 }
    },
    {
      id: 'lead_actor',
      name: 'Lead Actor',
      description: 'Starring in major productions',
      duration: 5,
      salary: 200,
      requirements: { stats: { fame: 50 } },
      events: [],
      progressionChances: { promote: 0.3, stagnate: 0.6, demote: 0.1 }
    },
    {
      id: 'a_list_celebrity',
      name: 'A-List Celebrity',
      description: 'Hollywood superstar',
      duration: 10,
      salary: 800,
      requirements: { stats: { fame: 80, looks: 70 } },
      events: [],
      progressionChances: { promote: 0.1, stagnate: 0.8, demote: 0.1 }
    }
  ],
  specialEvents: ['movie_premiere', 'award_show', 'scandal_event'],
  unlocks: ['production_company', 'celebrity_endorsements']
};

export const sportsPath: AdvancedCareerPath = {
  id: 'sports',
  name: 'Professional Sports',
  category: 'sports',
  description: 'Become a professional athlete',
  icon: '⚽',
  requirements: {
    age: 16,
    stats: { health: 80 }
  },
  stages: [
    {
      id: 'amateur_athlete',
      name: 'Amateur Athlete',
      description: 'Training and competing locally',
      duration: 2,
      salary: 0,
      events: [
        {
          id: 'injury_risk',
          name: 'Training Injury',
          description: 'Intensive training leads to injury risk',
          probability: 0.3,
          choices: [
            {
              id: 'rest',
              text: 'Rest and recover',
              effects: {
                stats: { health: 5 },
                career: { experience: 5 }
              }
            },
            {
              id: 'push_through',
              text: 'Push through the pain',
              effects: {
                stats: { health: -10 },
                career: { experience: 15 }
              }
            }
          ]
        }
      ],
      progressionChances: { promote: 0.2, stagnate: 0.7, demote: 0.1 }
    },
    {
      id: 'semi_pro',
      name: 'Semi-Professional',
      description: 'Playing in minor leagues',
      duration: 3,
      salary: 35,
      events: [],
      progressionChances: { promote: 0.3, stagnate: 0.6, demote: 0.1 }
    },
    {
      id: 'professional',
      name: 'Professional Athlete',
      description: 'Competing at the highest level',
      duration: 8,
      salary: 300,
      requirements: { stats: { health: 85 } },
      events: [],
      progressionChances: { promote: 0.2, stagnate: 0.7, demote: 0.1 }
    },
    {
      id: 'superstar',
      name: 'Sports Superstar',
      description: 'Elite athlete with endorsements',
      duration: 6,
      salary: 1200,
      requirements: { stats: { health: 90, fame: 70 } },
      events: [],
      progressionChances: { promote: 0.1, stagnate: 0.8, demote: 0.1 }
    }
  ],
  specialEvents: ['championship_game', 'olympic_selection', 'career_ending_injury'],
  unlocks: ['sports_commentary', 'coaching_career']
};

export const entrepreneurshipPath: AdvancedCareerPath = {
  id: 'entrepreneurship',
  name: 'Entrepreneurship',
  category: 'entrepreneurship',
  description: 'Build your own business empire',
  icon: '💼',
  requirements: {
    age: 18,
    stats: { smarts: 70 }
  },
  stages: [
    {
      id: 'startup_founder',
      name: 'Startup Founder',
      description: 'Launching your first business',
      duration: 2,
      salary: -20, // negative because startup costs
      events: [
        {
          id: 'funding_round',
          name: 'Investor Meeting',
          description: 'Pitching to potential investors',
          probability: 0.7,
          choices: [
            {
              id: 'secure_funding',
              text: 'Secure major funding',
              effects: {
                stats: { wealth: 100, happiness: 25 },
                career: { experience: 20, reputation: 15 }
              }
            },
            {
              id: 'bootstrap',
              text: 'Bootstrap the business',
              effects: {
                stats: { wealth: -20, happiness: -10 },
                career: { experience: 15 }
              }
            }
          ]
        }
      ],
      progressionChances: { promote: 0.3, stagnate: 0.5, demote: 0.2 }
    },
    {
      id: 'small_business_owner',
      name: 'Small Business Owner',
      description: 'Growing your business',
      duration: 3,
      salary: 80,
      events: [],
      progressionChances: { promote: 0.4, stagnate: 0.5, demote: 0.1 }
    },
    {
      id: 'ceo',
      name: 'CEO',
      description: 'Leading a successful company',
      duration: 8,
      salary: 400,
      requirements: { stats: { relationships: 75 } },
      events: [],
      progressionChances: { promote: 0.3, stagnate: 0.6, demote: 0.1 }
    },
    {
      id: 'business_mogul',
      name: 'Business Mogul',
      description: 'Multi-billion dollar empire',
      duration: 15,
      salary: 2000,
      requirements: { stats: { smarts: 85, relationships: 85 } },
      events: [],
      progressionChances: { promote: 0.1, stagnate: 0.8, demote: 0.1 }
    }
  ],
  specialEvents: ['ipo_launch', 'hostile_takeover', 'market_crash'],
  unlocks: ['angel_investor', 'business_empire']
};

export const advancedLifePaths = [
  militaryPath,
  entertainmentPath,
  sportsPath,
  entrepreneurshipPath
];

export const getAdvancedPathById = (id: string): AdvancedCareerPath | undefined => {
  return advancedLifePaths.find(path => path.id === id);
};

export const getEligiblePaths = (character: Character): AdvancedCareerPath[] => {
  return advancedLifePaths.filter(path => {
    const req = path.requirements;
    return (!req.age || character.age >= req.age) &&
           (!req.stats || Object.entries(req.stats).every(([stat, value]) => 
             character[stat as keyof Character] >= value)) &&
           (!req.education || character.education.completedStages?.includes(req.education));
  });
};
