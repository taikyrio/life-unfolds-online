
import { Character } from '../types/game';

export interface HealthCondition {
  id: string;
  name: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  effects: {
    health: number;
    happiness: number;
    wealth?: number; // Treatment costs
  };
  treatmentOptions: {
    name: string;
    cost: number;
    effectiveness: number;
    description: string;
  }[];
  ageRisk: { min: number; max: number; probability: number }[];
}

export const healthConditions: HealthCondition[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    description: 'You have a stuffy nose and feel under the weather.',
    severity: 'mild',
    effects: { health: -5, happiness: -10 },
    treatmentOptions: [
      { name: 'Rest and fluids', cost: 0, effectiveness: 70, description: 'Stay home and drink lots of water' },
      { name: 'Over-the-counter medicine', cost: 20, effectiveness: 85, description: 'Buy cold medicine from pharmacy' },
      { name: 'See a doctor', cost: 100, effectiveness: 95, description: 'Get professional medical advice' }
    ],
    ageRisk: [
      { min: 0, max: 100, probability: 0.3 }
    ]
  },
  {
    id: 'broken_bone',
    name: 'Broken Bone',
    description: 'You\'ve broken a bone and need medical attention.',
    severity: 'moderate',
    effects: { health: -25, happiness: -20 },
    treatmentOptions: [
      { name: 'Emergency room visit', cost: 500, effectiveness: 90, description: 'Get immediate professional treatment' },
      { name: 'Walk-in clinic', cost: 200, effectiveness: 70, description: 'Cheaper but longer wait times' },
      { name: 'Ignore it', cost: 0, effectiveness: 10, description: 'Try to tough it out (not recommended)' }
    ],
    ageRisk: [
      { min: 5, max: 25, probability: 0.1 },
      { min: 60, max: 100, probability: 0.15 }
    ]
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'You\'ve been feeling persistently sad and unmotivated.',
    severity: 'moderate',
    effects: { health: -10, happiness: -30 },
    treatmentOptions: [
      { name: 'Therapy', cost: 150, effectiveness: 80, description: 'Talk to a professional therapist' },
      { name: 'Medication', cost: 100, effectiveness: 70, description: 'Antidepressant medication' },
      { name: 'Self-care', cost: 50, effectiveness: 50, description: 'Exercise, meditation, and lifestyle changes' },
      { name: 'Do nothing', cost: 0, effectiveness: 20, description: 'Hope it gets better on its own' }
    ],
    ageRisk: [
      { min: 15, max: 30, probability: 0.2 },
      { min: 40, max: 60, probability: 0.15 }
    ]
  },
  {
    id: 'heart_disease',
    name: 'Heart Disease',
    description: 'You\'ve been diagnosed with cardiovascular problems.',
    severity: 'severe',
    effects: { health: -40, happiness: -25 },
    treatmentOptions: [
      { name: 'Surgery', cost: 2000, effectiveness: 85, description: 'Expensive but most effective treatment' },
      { name: 'Medication', cost: 300, effectiveness: 65, description: 'Manage with daily medication' },
      { name: 'Lifestyle changes', cost: 100, effectiveness: 45, description: 'Diet and exercise modifications' }
    ],
    ageRisk: [
      { min: 45, max: 100, probability: 0.1 }
    ]
  },
  {
    id: 'cancer',
    name: 'Cancer',
    description: 'You\'ve been diagnosed with cancer and need treatment.',
    severity: 'critical',
    effects: { health: -50, happiness: -40 },
    treatmentOptions: [
      { name: 'Aggressive treatment', cost: 5000, effectiveness: 75, description: 'Chemotherapy and radiation' },
      { name: 'Conservative treatment', cost: 2000, effectiveness: 50, description: 'Less intensive treatment plan' },
      { name: 'Palliative care', cost: 500, effectiveness: 25, description: 'Focus on comfort and quality of life' }
    ],
    ageRisk: [
      { min: 50, max: 100, probability: 0.05 }
    ]
  }
];

export const checkForHealthConditions = (character: Character): HealthCondition | null => {
  for (const condition of healthConditions) {
    for (const risk of condition.ageRisk) {
      if (character.age >= risk.min && character.age <= risk.max) {
        if (Math.random() < risk.probability) {
          return condition;
        }
      }
    }
  }
  return null;
};

export const treatHealthCondition = (
  character: Character, 
  condition: HealthCondition, 
  treatmentIndex: number
): Character => {
  const treatment = condition.treatmentOptions[treatmentIndex];
  const updatedCharacter = { ...character };
  
  // Apply treatment costs
  updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - treatment.cost);
  
  // Apply treatment effects based on effectiveness
  const effectivenessFactor = treatment.effectiveness / 100;
  const healthRestore = Math.abs(condition.effects.health) * effectivenessFactor;
  const happinessRestore = Math.abs(condition.effects.happiness) * effectivenessFactor;
  
  updatedCharacter.health = Math.min(100, updatedCharacter.health + healthRestore);
  updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + happinessRestore);
  
  return updatedCharacter;
};
