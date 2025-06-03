
import { Character } from '../types/game';

export interface PersonalityType {
  id: string;
  name: string;
  description: string;
  traits: PersonalityTrait[];
  strengths: string[];
  weaknesses: string[];
  compatibleTypes: string[];
  statModifiers: {
    happiness?: number;
    relationships?: number;
    smarts?: number;
    health?: number;
  };
}

export interface PersonalityTrait {
  name: string;
  value: number; // -100 to 100
  description: string;
}

export interface MentalHealthCondition {
  id: string;
  name: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  triggers: string[];
  effects: {
    happiness?: number;
    health?: number;
    relationships?: number;
    productivity?: number;
  };
  treatments: MentalHealthTreatment[];
}

export interface MentalHealthTreatment {
  id: string;
  name: string;
  type: 'therapy' | 'medication' | 'lifestyle' | 'support_group';
  cost: number;
  effectiveness: number;
  duration: number; // months
  effects: {
    happiness?: number;
    health?: number;
    wealth?: number;
  };
}

export const personalityTypes: PersonalityType[] = [
  {
    id: 'enfp',
    name: 'The Campaigner (ENFP)',
    description: 'Enthusiastic, creative, and sociable free spirits',
    traits: [
      { name: 'Extraversion', value: 80, description: 'Gains energy from social interaction' },
      { name: 'Intuition', value: 70, description: 'Focuses on possibilities and patterns' },
      { name: 'Feeling', value: 75, description: 'Makes decisions based on values' },
      { name: 'Perceiving', value: 85, description: 'Prefers flexibility and spontaneity' }
    ],
    strengths: ['Creativity', 'Enthusiasm', 'Social skills', 'Adaptability'],
    weaknesses: ['Difficulty with routine', 'Overthinking', 'Emotional sensitivity'],
    compatibleTypes: ['intj', 'infj', 'enfj'],
    statModifiers: { happiness: 10, relationships: 15, smarts: 5 }
  },
  {
    id: 'intj',
    name: 'The Architect (INTJ)',
    description: 'Imaginative and strategic thinkers with a plan',
    traits: [
      { name: 'Introversion', value: -70, description: 'Gains energy from solitude' },
      { name: 'Intuition', value: 80, description: 'Focuses on possibilities and patterns' },
      { name: 'Thinking', value: 85, description: 'Makes logical decisions' },
      { name: 'Judging', value: 90, description: 'Prefers structure and planning' }
    ],
    strengths: ['Strategic thinking', 'Independence', 'Determination', 'Vision'],
    weaknesses: ['Social awkwardness', 'Impatience', 'Perfectionism'],
    compatibleTypes: ['enfp', 'entp', 'infp'],
    statModifiers: { smarts: 20, relationships: -5, happiness: 5 }
  },
  {
    id: 'esfj',
    name: 'The Consul (ESFJ)',
    description: 'Extraordinarily caring, social, and popular people',
    traits: [
      { name: 'Extraversion', value: 75, description: 'Gains energy from social interaction' },
      { name: 'Sensing', value: 70, description: 'Focuses on concrete details' },
      { name: 'Feeling', value: 80, description: 'Makes decisions based on values' },
      { name: 'Judging', value: 75, description: 'Prefers structure and planning' }
    ],
    strengths: ['Empathy', 'Organization', 'Loyalty', 'Practical skills'],
    weaknesses: ['Avoiding conflict', 'Worry about others', 'Sensitivity to criticism'],
    compatibleTypes: ['isfp', 'estp', 'istp'],
    statModifiers: { relationships: 20, happiness: 10, health: 5 }
  }
];

export const mentalHealthConditions: MentalHealthCondition[] = [
  {
    id: 'anxiety',
    name: 'Anxiety Disorder',
    description: 'Persistent worry and fear affecting daily life',
    severity: 'moderate',
    symptoms: ['Excessive worry', 'Restlessness', 'Fatigue', 'Difficulty concentrating'],
    triggers: ['Stress', 'Major life changes', 'Work pressure', 'Relationship issues'],
    effects: { happiness: -20, health: -10, relationships: -10, productivity: -15 },
    treatments: [
      {
        id: 'cbt_therapy',
        name: 'Cognitive Behavioral Therapy',
        type: 'therapy',
        cost: 150,
        effectiveness: 80,
        duration: 6,
        effects: { happiness: 25, health: 10 }
      },
      {
        id: 'anti_anxiety_meds',
        name: 'Anti-Anxiety Medication',
        type: 'medication',
        cost: 50,
        effectiveness: 70,
        duration: 12,
        effects: { happiness: 20, health: 5 }
      }
    ]
  },
  {
    id: 'depression',
    name: 'Major Depression',
    description: 'Persistent feelings of sadness and loss of interest',
    severity: 'severe',
    symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep problems'],
    triggers: ['Loss of loved one', 'Job loss', 'Chronic illness', 'Isolation'],
    effects: { happiness: -40, health: -20, relationships: -15, productivity: -25 },
    treatments: [
      {
        id: 'therapy_depression',
        name: 'Psychotherapy',
        type: 'therapy',
        cost: 200,
        effectiveness: 85,
        duration: 8,
        effects: { happiness: 35, health: 15 }
      },
      {
        id: 'antidepressants',
        name: 'Antidepressant Medication',
        type: 'medication',
        cost: 80,
        effectiveness: 75,
        duration: 12,
        effects: { happiness: 30, health: 10 }
      }
    ]
  }
];

export const determinePersonalityType = (character: Character): PersonalityType => {
  // Simple algorithm based on character stats and behavior patterns
  let bestMatch = personalityTypes[0];
  let highestScore = 0;
  
  for (const type of personalityTypes) {
    let score = 0;
    
    // Factor in character stats
    if (character.relationships > 70 && type.statModifiers.relationships && type.statModifiers.relationships > 0) {
      score += 20;
    }
    
    if (character.smarts > 80 && type.statModifiers.smarts && type.statModifiers.smarts > 0) {
      score += 20;
    }
    
    if (character.happiness > 75 && type.statModifiers.happiness && type.statModifiers.happiness > 0) {
      score += 15;
    }
    
    // Add randomness for variety
    score += Math.random() * 30;
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = type;
    }
  }
  
  return bestMatch;
};

export const checkMentalHealthRisk = (character: Character): MentalHealthCondition | null => {
  let riskFactors = 0;
  
  // Calculate risk based on character state
  if (character.happiness < 30) riskFactors += 3;
  if (character.health < 40) riskFactors += 2;
  if (character.relationships < 30) riskFactors += 2;
  if (character.wealth < 10) riskFactors += 1;
  if (character.age > 60) riskFactors += 1;
  
  // Check for recent traumatic events
  const recentEvents = character.lifeEvents?.slice(-5) || [];
  const traumaticEvents = recentEvents.filter(event => 
    event.includes('death') || event.includes('divorce') || event.includes('fired')
  );
  riskFactors += traumaticEvents.length * 2;
  
  // Random chance based on risk factors
  const riskThreshold = Math.max(0.05, riskFactors * 0.02);
  
  if (Math.random() < riskThreshold) {
    // Higher chance of anxiety vs depression based on age and circumstances
    if (character.age < 35 || character.wealth < 50) {
      return mentalHealthConditions.find(c => c.id === 'anxiety') || null;
    } else {
      return mentalHealthConditions.find(c => c.id === 'depression') || null;
    }
  }
  
  return null;
};

export const seekMentalHealthTreatment = (
  character: Character,
  condition: MentalHealthCondition,
  treatment: MentalHealthTreatment
): { success: boolean; message: string; effects: any } => {
  if (character.wealth < treatment.cost) {
    return {
      success: false,
      message: `You can't afford ${treatment.name}. Cost: $${treatment.cost}k`,
      effects: {}
    };
  }
  
  const success = Math.random() < (treatment.effectiveness / 100);
  const effects = {
    wealth: -treatment.cost,
    ...treatment.effects
  };
  
  if (!success) {
    // Reduce effectiveness if treatment doesn't work well
    Object.keys(effects).forEach(key => {
      if (key !== 'wealth' && effects[key] > 0) {
        effects[key] = Math.floor(effects[key] / 2);
      }
    });
  }
  
  return {
    success,
    message: success ? 
      `${treatment.name} is helping with your ${condition.name}` : 
      `${treatment.name} had limited effectiveness for your ${condition.name}`,
    effects
  };
};
