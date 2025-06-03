
import { Character } from '../types/game';

export interface Country {
  id: string;
  name: string;
  emoji: string;
  continent: string;
  description: string;
  language: string;
  currency: string;
  economicLevel: 'developing' | 'developed' | 'advanced';
  opportunities: CountryOpportunity[];
  uniqueEvents: string[];
  immigrationRequirements: {
    wealth?: number;
    education?: string;
    skills?: string[];
    age?: { min?: number; max?: number };
  };
  livingCosts: {
    housing: number;
    food: number;
    healthcare: number;
    education: number;
  };
  qualityOfLife: {
    healthcare: number;
    education: number;
    safety: number;
    freedom: number;
    environment: number;
  };
}

export interface CountryOpportunity {
  id: string;
  name: string;
  type: 'career' | 'education' | 'investment' | 'lifestyle';
  description: string;
  requirements: {
    citizenship?: boolean;
    education?: string;
    wealth?: number;
    age?: { min?: number; max?: number };
  };
  benefits: {
    wealth?: number;
    happiness?: number;
    health?: number;
    fame?: number;
    reputation?: number;
  };
}

export const countries: Country[] = [
  {
    id: 'usa',
    name: 'United States',
    emoji: '🇺🇸',
    continent: 'North America',
    description: 'Land of opportunity with diverse career paths',
    language: 'English',
    currency: 'USD',
    economicLevel: 'advanced',
    opportunities: [
      {
        id: 'silicon_valley',
        name: 'Silicon Valley Tech Career',
        type: 'career',
        description: 'High-paying tech jobs in California',
        requirements: { education: 'university', wealth: 50 },
        benefits: { wealth: 200, fame: 20 }
      },
      {
        id: 'hollywood',
        name: 'Hollywood Entertainment',
        type: 'career',
        description: 'Fame and fortune in the entertainment industry',
        requirements: { age: { min: 18, max: 35 } },
        benefits: { fame: 100, wealth: 150 }
      }
    ],
    uniqueEvents: ['american_dream', 'wall_street_boom'],
    immigrationRequirements: { wealth: 100, education: 'high_school' },
    livingCosts: { housing: 80, food: 60, healthcare: 120, education: 100 },
    qualityOfLife: { healthcare: 75, education: 85, safety: 70, freedom: 90, environment: 65 }
  },
  {
    id: 'norway',
    name: 'Norway',
    emoji: '🇳🇴',
    continent: 'Europe',
    description: 'High quality of life and social benefits',
    language: 'Norwegian',
    currency: 'NOK',
    economicLevel: 'advanced',
    opportunities: [
      {
        id: 'oil_industry',
        name: 'Oil Industry Career',
        type: 'career',
        description: 'Lucrative oil and gas sector jobs',
        requirements: { education: 'university' },
        benefits: { wealth: 180, health: 10 }
      },
      {
        id: 'social_benefits',
        name: 'Universal Healthcare',
        type: 'lifestyle',
        description: 'Free healthcare and education',
        requirements: { citizenship: true },
        benefits: { health: 30, happiness: 20 }
      }
    ],
    uniqueEvents: ['midnight_sun', 'aurora_borealis'],
    immigrationRequirements: { wealth: 150, education: 'university' },
    livingCosts: { housing: 120, food: 90, healthcare: 0, education: 0 },
    qualityOfLife: { healthcare: 95, education: 95, safety: 95, freedom: 85, environment: 90 }
  },
  {
    id: 'india',
    name: 'India',
    emoji: '🇮🇳',
    continent: 'Asia',
    description: 'Rapidly growing economy with tech opportunities',
    language: 'Hindi/English',
    currency: 'INR',
    economicLevel: 'developing',
    opportunities: [
      {
        id: 'bollywood',
        name: 'Bollywood Career',
        type: 'career',
        description: 'Film industry opportunities',
        requirements: { age: { min: 18, max: 30 } },
        benefits: { fame: 80, wealth: 60 }
      },
      {
        id: 'it_outsourcing',
        name: 'IT Services',
        type: 'career',
        description: 'Growing technology sector',
        requirements: { education: 'university' },
        benefits: { wealth: 90, reputation: 15 }
      }
    ],
    uniqueEvents: ['monsoon_season', 'tech_boom'],
    immigrationRequirements: { wealth: 20 },
    livingCosts: { housing: 20, food: 15, healthcare: 30, education: 25 },
    qualityOfLife: { healthcare: 60, education: 70, safety: 55, freedom: 65, environment: 45 }
  }
];

export const emigrateToCountry = (
  character: Character,
  targetCountry: Country
): { success: boolean; message: string; effects?: any } => {
  const requirements = targetCountry.immigrationRequirements;
  
  // Check requirements
  if (requirements.wealth && character.wealth < requirements.wealth) {
    return { 
      success: false, 
      message: `You need at least $${requirements.wealth}k to immigrate to ${targetCountry.name}` 
    };
  }
  
  if (requirements.education && !character.education.completedStages.includes(requirements.education)) {
    return { 
      success: false, 
      message: `You need ${requirements.education} education to immigrate to ${targetCountry.name}` 
    };
  }
  
  if (requirements.age) {
    if (requirements.age.min && character.age < requirements.age.min) {
      return { success: false, message: `You're too young to immigrate to ${targetCountry.name}` };
    }
    if (requirements.age.max && character.age > requirements.age.max) {
      return { success: false, message: `You're too old to immigrate to ${targetCountry.name}` };
    }
  }
  
  // Calculate emigration costs
  const emigrationCost = Math.floor(targetCountry.livingCosts.housing / 2);
  
  return {
    success: true,
    message: `Successfully emigrated to ${targetCountry.name}!`,
    effects: {
      wealth: -emigrationCost,
      happiness: 15,
      currentCountry: targetCountry.id
    }
  };
};

export const getCountryByName = (name: string): Country | undefined => {
  return countries.find(country => country.name === name || country.id === name);
};
