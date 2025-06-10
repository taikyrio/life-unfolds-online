
import { Character, HealthInsurance } from '../types/game';
import { HealthCondition } from './healthSystem';

export interface MedicalProcedure {
  id: string;
  name: string;
  description: string;
  cost: number;
  riskLevel: 'low' | 'medium' | 'high';
  successRate: number;
  recoveryTime: number;
  healthImprovement: number;
  happinessImpact: number;
  requirements?: {
    minAge?: number;
    maxAge?: number;
    minHealth?: number;
    insurance?: boolean;
  };
}

export interface HealthEmergency {
  id: string;
  name: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  treatmentOptions: EmergencyTreatment[];
  ageRisk: { min: number; max: number; probability: number }[];
}

export interface EmergencyTreatment {
  id: string;
  name: string;
  location: 'home' | 'clinic' | 'hospital' | 'emergency_room';
  cost: number;
  effectiveness: number;
  timeRequired: number;
  description: string;
}

export const healthInsurancePlans: HealthInsurance[] = [
  {
    provider: 'BasicCare',
    monthlyPremium: 150,
    deductible: 5000,
    coveragePercentage: 60,
    coverage: 60,
    maxCoverage: 100000,
    active: false
  },
  {
    provider: 'StandardHealth',
    monthlyPremium: 300,
    deductible: 2500,
    coveragePercentage: 80,
    coverage: 80,
    maxCoverage: 500000,
    active: false
  },
  {
    provider: 'PremiumCare',
    monthlyPremium: 600,
    deductible: 1000,
    coveragePercentage: 95,
    coverage: 95,
    maxCoverage: 1000000,
    active: false
  }
];

export const medicalProcedures: MedicalProcedure[] = [
  {
    id: 'annual_checkup',
    name: 'Annual Checkup',
    description: 'Routine medical examination to maintain health',
    cost: 200,
    riskLevel: 'low',
    successRate: 100,
    recoveryTime: 0,
    healthImprovement: 5,
    happinessImpact: 2,
    requirements: { minAge: 18 }
  },
  {
    id: 'dental_cleaning',
    name: 'Dental Cleaning',
    description: 'Professional teeth cleaning and oral health check',
    cost: 150,
    riskLevel: 'low',
    successRate: 100,
    recoveryTime: 0,
    healthImprovement: 3,
    happinessImpact: 5
  },
  {
    id: 'eye_surgery',
    name: 'LASIK Eye Surgery',
    description: 'Corrective eye surgery to improve vision',
    cost: 3000,
    riskLevel: 'medium',
    successRate: 95,
    recoveryTime: 2,
    healthImprovement: 10,
    happinessImpact: 15,
    requirements: { minAge: 18, minHealth: 70 }
  },
  {
    id: 'cosmetic_surgery',
    name: 'Cosmetic Surgery',
    description: 'Plastic surgery to enhance appearance',
    cost: 8000,
    riskLevel: 'medium',
    successRate: 90,
    recoveryTime: 4,
    healthImprovement: -5,
    happinessImpact: 20,
    requirements: { minAge: 18, minHealth: 60 }
  },
  {
    id: 'heart_surgery',
    name: 'Heart Surgery',
    description: 'Major cardiac procedure to treat heart disease',
    cost: 50000,
    riskLevel: 'high',
    successRate: 85,
    recoveryTime: 12,
    healthImprovement: 40,
    happinessImpact: -10,
    requirements: { minAge: 30, insurance: true }
  }
];

export const healthEmergencies: HealthEmergency[] = [
  {
    id: 'appendicitis',
    name: 'Appendicitis',
    description: 'Your appendix is inflamed and needs immediate attention!',
    severity: 'major',
    treatmentOptions: [
      {
        id: 'emergency_surgery',
        name: 'Emergency Surgery',
        location: 'emergency_room',
        cost: 15000,
        effectiveness: 95,
        timeRequired: 1,
        description: 'Immediate surgical removal of appendix'
      },
      {
        id: 'wait_it_out',
        name: 'Try to Wait It Out',
        location: 'home',
        cost: 0,
        effectiveness: 10,
        timeRequired: 0,
        description: 'Hope it gets better (very dangerous!)'
      }
    ],
    ageRisk: [
      { min: 10, max: 30, probability: 0.02 },
      { min: 31, max: 50, probability: 0.01 }
    ]
  },
  {
    id: 'heart_attack',
    name: 'Heart Attack',
    description: 'You\'re experiencing chest pain and difficulty breathing!',
    severity: 'critical',
    treatmentOptions: [
      {
        id: 'call_ambulance',
        name: 'Call 911',
        location: 'emergency_room',
        cost: 25000,
        effectiveness: 90,
        timeRequired: 1,
        description: 'Emergency medical response and hospital treatment'
      },
      {
        id: 'drive_hospital',
        name: 'Drive to Hospital',
        location: 'hospital',
        cost: 20000,
        effectiveness: 70,
        timeRequired: 1,
        description: 'Rush to hospital yourself (risky)'
      },
      {
        id: 'ignore_symptoms',
        name: 'Ignore Symptoms',
        location: 'home',
        cost: 0,
        effectiveness: 5,
        timeRequired: 0,
        description: 'Hope it passes (extremely dangerous!)'
      }
    ],
    ageRisk: [
      { min: 45, max: 100, probability: 0.05 }
    ]
  }
];

export const calculateInsuranceCoverage = (
  procedure: MedicalProcedure,
  insurance?: HealthInsurance
): { outOfPocket: number; covered: number } => {
  if (!insurance || !insurance.active) {
    return { outOfPocket: procedure.cost, covered: 0 };
  }
  
  const deductibleReached = true; // Simplified for now
  const coverableAmount = Math.min(procedure.cost, insurance.maxCoverage);
  const insurancePays = deductibleReached 
    ? coverableAmount * (insurance.coveragePercentage / 100)
    : 0;
  
  return {
    outOfPocket: procedure.cost - insurancePays,
    covered: insurancePays
  };
};

export const checkForHealthEmergency = (character: Character): HealthEmergency | null => {
  for (const emergency of healthEmergencies) {
    for (const risk of emergency.ageRisk) {
      if (character.age >= risk.min && character.age <= risk.max) {
        // Lower health increases emergency risk
        const healthMultiplier = (100 - character.health) / 100 * 2;
        const adjustedProbability = risk.probability * (1 + healthMultiplier);
        
        if (Math.random() < adjustedProbability) {
          return emergency;
        }
      }
    }
  }
  return null;
};

export const performMedicalProcedure = (
  character: Character,
  procedure: MedicalProcedure,
  insurance?: HealthInsurance
): { success: boolean; result: string; effects: any } => {
  const { outOfPocket } = calculateInsuranceCoverage(procedure, insurance);
  const success = Math.random() < (procedure.successRate / 100);
  
  const effects = {
    wealth: -outOfPocket,
    health: success ? procedure.healthImprovement : -5,
    happiness: success ? procedure.happinessImpact : -10
  };
  
  const result = success 
    ? `${procedure.name} was successful! You feel much better.`
    : `${procedure.name} had complications. You need time to recover.`;
  
  return { success, result, effects };
};
