
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
    }
  ],
  specialEvents: ['movie_premiere', 'award_show', 'scandal_event'],
  unlocks: ['production_company', 'celebrity_endorsements']
};

export const advancedLifePaths = [militaryPath, entertainmentPath];

export const getAdvancedPathById = (id: string): AdvancedCareerPath | undefined => {
  return advancedLifePaths.find(path => path.id === id);
};

export const getEligiblePaths = (character: Character): AdvancedCareerPath[] => {
  return advancedLifePaths.filter(path => {
    const req = path.requirements;
    return (!req.age || character.age >= req.age) &&
           (!req.stats || Object.entries(req.stats).every(([stat, value]) => 
             character[stat as keyof Character] >= value));
  });
};
