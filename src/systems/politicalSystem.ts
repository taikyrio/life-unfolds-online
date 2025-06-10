import { Character } from '../types/game';

export interface PoliticalParty {
  id: string;
  name: string;
  ideology: 'liberal' | 'conservative' | 'moderate' | 'progressive' | 'libertarian';
  description: string;
  popularity: number;
  policies: string[];
}

export interface PoliticalPosition {
  id: string;
  title: string;
  level: 'local' | 'state' | 'national' | 'international';
  requirements: {
    age?: { min: number; max?: number };
    education?: string;
    wealth?: number;
    reputation?: number;
    experience?: string[];
  };
  responsibilities: string[];
  benefits: {
    salary: number;
    fame: number;
    influence: number;
  };
  campaignCost: number;
}

export interface PoliticalEvent {
  id: string;
  name: string;
  description: string;
  type: 'election' | 'scandal' | 'policy' | 'crisis';
  choices: PoliticalChoice[];
}

export interface PoliticalChoice {
  id: string;
  text: string;
  alignment: 'liberal' | 'conservative' | 'moderate';
  effects: {
    reputation?: number;
    popularity?: number;
    wealth?: number;
    happiness?: number;
  };
}

export const politicalParties: PoliticalParty[] = [
  {
    id: 'democratic',
    name: 'Democratic Party',
    ideology: 'liberal',
    description: 'Progressive policies and social justice',
    popularity: 45,
    policies: ['Healthcare Reform', 'Climate Action', 'Education Funding']
  },
  {
    id: 'republican',
    name: 'Republican Party',
    ideology: 'conservative',
    description: 'Traditional values and free market economics',
    popularity: 43,
    policies: ['Tax Cuts', 'Defense Spending', 'Business Deregulation']
  },
  {
    id: 'independent',
    name: 'Independent',
    ideology: 'moderate',
    description: 'Non-partisan approach to governance',
    popularity: 12,
    policies: ['Bipartisan Solutions', 'Government Reform', 'Fiscal Responsibility']
  }
];

export const politicalPositions: PoliticalPosition[] = [
  {
    id: 'city_council',
    title: 'City Council Member',
    level: 'local',
    requirements: { age: { min: 18 }, reputation: 30 },
    responsibilities: ['Local ordinances', 'Budget approval', 'Community issues'],
    benefits: { salary: 30, fame: 10, influence: 5 },
    campaignCost: 10
  },
  {
    id: 'mayor',
    title: 'Mayor',
    level: 'local',
    requirements: { age: { min: 25 }, reputation: 50, experience: ['city_council'] },
    responsibilities: ['City administration', 'Policy implementation', 'Public relations'],
    benefits: { salary: 80, fame: 25, influence: 15 },
    campaignCost: 50
  },
  {
    id: 'state_representative',
    title: 'State Representative',
    level: 'state',
    requirements: { age: { min: 25 }, education: 'university', reputation: 60 },
    responsibilities: ['State legislation', 'Committee work', 'Constituent services'],
    benefits: { salary: 60, fame: 20, influence: 20 },
    campaignCost: 100
  },
  {
    id: 'governor',
    title: 'Governor',
    level: 'state',
    requirements: { age: { min: 30 }, reputation: 80, experience: ['state_representative'] },
    responsibilities: ['State administration', 'Budget oversight', 'Emergency management'],
    benefits: { salary: 150, fame: 50, influence: 40 },
    campaignCost: 500
  },
  {
    id: 'senator',
    title: 'Senator',
    level: 'national',
    requirements: { age: { min: 30 }, reputation: 90, wealth: 100 },
    responsibilities: ['Federal legislation', 'Committee leadership', 'National policy'],
    benefits: { salary: 180, fame: 70, influence: 60 },
    campaignCost: 1000
  },
  {
    id: 'president',
    title: 'President',
    level: 'national',
    requirements: { age: { min: 35 }, reputation: 95, experience: ['governor', 'senator'] },
    responsibilities: ['Executive leadership', 'Foreign policy', 'National security'],
    benefits: { salary: 400, fame: 100, influence: 100 },
    campaignCost: 5000
  }
];

export const campaignForOffice = (
  character: Character,
  position: PoliticalPosition,
  party: PoliticalParty
): { success: boolean; message: string; effects?: any } => {
  // Check requirements
  if (position.requirements.age && character.age < position.requirements.age.min) {
    return { success: false, message: `You must be at least ${position.requirements.age.min} years old` };
  }
  
  // Handle reputation as either number or ReputationSystem object
  const reputationValue = typeof character.reputation === 'number' 
    ? character.reputation 
    : (character.reputation && typeof character.reputation === 'object' 
       ? (character.reputation as any).total || (character.reputation as any).value || 0
       : 0);
  
  if (position.requirements.reputation && reputationValue < position.requirements.reputation) {
    return { success: false, message: `You need ${position.requirements.reputation} reputation points` };
  }
  
  if (position.requirements.wealth && character.wealth < position.requirements.wealth) {
    return { success: false, message: `You need $${position.requirements.wealth}k wealth` };
  }
  
  if (character.wealth < position.campaignCost) {
    return { success: false, message: `Campaign costs $${position.campaignCost}k` };
  }
  
  // Calculate win probability
  const baseChance = 30;
  const reputationBonus = Math.min(reputationValue / 2, 30);
  const wealthBonus = Math.min(character.wealth / 100, 20);
  const partyBonus = party.popularity / 5;
  
  const winChance = baseChance + reputationBonus + wealthBonus + partyBonus;
  const success = Math.random() * 100 < winChance;
  
  const effects = {
    wealth: -position.campaignCost,
    reputation: success ? 20 : -10,
    fame: success ? position.benefits.fame : 5
  };
  
  if (success) {
    effects.wealth += position.benefits.salary;
  }
  
  return {
    success,
    message: success ? 
      `Congratulations! You won the election for ${position.title}!` : 
      `You lost the election for ${position.title}. Better luck next time!`,
    effects
  };
};

export const generatePoliticalEvent = (character: Character): PoliticalEvent | null => {
  if (!character.job || !character.job.includes('Political') || Math.random() > 0.3) {
    return null;
  }
  
  const events: PoliticalEvent[] = [
    {
      id: 'budget_crisis',
      name: 'Budget Crisis',
      description: 'The government is facing a budget shortfall. How do you respond?',
      type: 'crisis',
      choices: [
        {
          id: 'raise_taxes',
          text: 'Raise taxes on the wealthy',
          alignment: 'liberal',
          effects: { reputation: -5, popularity: 10 }
        },
        {
          id: 'cut_spending',
          text: 'Cut government spending',
          alignment: 'conservative',
          effects: { reputation: 5, popularity: -5 }
        },
        {
          id: 'compromise',
          text: 'Seek a bipartisan compromise',
          alignment: 'moderate',
          effects: { reputation: 10, popularity: 5 }
        }
      ]
    }
  ];
  
  return events[Math.floor(Math.random() * events.length)];
};
