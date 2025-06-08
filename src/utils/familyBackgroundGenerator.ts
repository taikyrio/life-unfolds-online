
import { FamilyBackground, PersonalityTraits } from '../types/personality';
import { FamilyMember } from '../types/relationships';

const SOCIOECONOMIC_BACKGROUNDS = [
  {
    status: 'poor' as const,
    probability: 0.15,
    wealthRange: [0, 500],
    parentEducation: ['no-education', 'high-school'],
    advantages: [],
    challenges: ['financial_stress', 'limited_opportunities', 'food_insecurity']
  },
  {
    status: 'working-class' as const,
    probability: 0.25,
    wealthRange: [500, 2000],
    parentEducation: ['high-school', 'college'],
    advantages: ['strong_work_ethic'],
    challenges: ['financial_pressure', 'limited_resources']
  },
  {
    status: 'middle-class' as const,
    probability: 0.35,
    wealthRange: [2000, 8000],
    parentEducation: ['high-school', 'college', 'graduate'],
    advantages: ['stable_home', 'education_support'],
    challenges: ['pressure_to_succeed']
  },
  {
    status: 'upper-middle' as const,
    probability: 0.20,
    wealthRange: [8000, 25000],
    parentEducation: ['college', 'graduate', 'doctorate'],
    advantages: ['private_tutoring', 'extracurricular_access', 'college_fund'],
    challenges: ['high_expectations', 'pressure_to_maintain_status']
  },
  {
    status: 'wealthy' as const,
    probability: 0.05,
    wealthRange: [25000, 100000],
    parentEducation: ['graduate', 'doctorate'],
    advantages: ['elite_education', 'networking_opportunities', 'trust_fund'],
    challenges: ['isolation', 'entitlement_risk', 'public_scrutiny']
  }
];

const FAMILY_DYNAMICS = [
  { type: 'stable', probability: 0.4, traitEffects: { stability: 10, loyalty: 5 } },
  { type: 'close-knit', probability: 0.25, traitEffects: { empathy: 8, loyalty: 10 } },
  { type: 'distant', probability: 0.15, traitEffects: { independence: 8, resilience: 5 } },
  { type: 'chaotic', probability: 0.12, traitEffects: { resilience: 10, adaptability: 8 } },
  { type: 'troubled', probability: 0.08, traitEffects: { resilience: 15, empathy: 5 } }
];

const CULTURAL_BACKGROUNDS = [
  { type: 'traditional', probability: 0.3, values: ['respect', 'discipline', 'family_honor'] },
  { type: 'progressive', probability: 0.25, values: ['equality', 'innovation', 'self_expression'] },
  { type: 'religious', probability: 0.2, values: ['faith', 'community', 'compassion'] },
  { type: 'secular', probability: 0.15, values: ['logic', 'science', 'individual_freedom'] },
  { type: 'mixed', probability: 0.1, values: ['tolerance', 'balance', 'adaptability'] }
];

export const generateFamilyBackground = (): FamilyBackground => {
  // Select socioeconomic status
  const randomSocio = Math.random();
  let cumulativeProbability = 0;
  const socioBackground = SOCIOECONOMIC_BACKGROUNDS.find(bg => {
    cumulativeProbability += bg.probability;
    return randomSocio <= cumulativeProbability;
  }) || SOCIOECONOMIC_BACKGROUNDS[2]; // Default to middle-class

  // Select family dynamic
  const randomDynamic = Math.random();
  cumulativeProbability = 0;
  const familyDynamic = FAMILY_DYNAMICS.find(fd => {
    cumulativeProbability += fd.probability;
    return randomDynamic <= cumulativeProbability;
  }) || FAMILY_DYNAMICS[0]; // Default to stable

  // Select cultural background
  const randomCultural = Math.random();
  cumulativeProbability = 0;
  const culturalBg = CULTURAL_BACKGROUNDS.find(cb => {
    cumulativeProbability += cb.probability;
    return randomCultural <= cumulativeProbability;
  }) || CULTURAL_BACKGROUNDS[0]; // Default to traditional

  // Generate parent careers based on education and socioeconomic status
  const parentalCareers = generateParentCareers(socioBackground);

  return {
    socioeconomicStatus: socioBackground.status,
    parentalEducation: socioBackground.parentEducation[Math.floor(Math.random() * socioBackground.parentEducation.length)] as any,
    familyDynamic: familyDynamic.type as any,
    culturalBackground: culturalBg.type as any,
    parentalCareers,
    familyValues: culturalBg.values,
    startingAdvantages: socioBackground.advantages,
    startingChallenges: socioBackground.challenges
  };
};

const generateParentCareers = (socioBackground: any): string[] => {
  const careersByClass = {
    poor: ['unemployed', 'janitor', 'fast_food_worker', 'cleaner'],
    'working-class': ['mechanic', 'nurse_aide', 'cashier', 'truck_driver', 'factory_worker'],
    'middle-class': ['teacher', 'nurse', 'accountant', 'police_officer', 'manager'],
    'upper-middle': ['doctor', 'lawyer', 'engineer', 'professor', 'consultant'],
    wealthy: ['CEO', 'surgeon', 'investment_banker', 'judge', 'entrepreneur']
  };

  const availableCareers = careersByClass[socioBackground.status] || careersByClass['middle-class'];
  return [
    availableCareers[Math.floor(Math.random() * availableCareers.length)],
    availableCareers[Math.floor(Math.random() * availableCareers.length)]
  ];
};

export const applyFamilyBackgroundEffects = (
  character: any,
  background: FamilyBackground
): any => {
  let updatedCharacter = { ...character };

  // Apply wealth effects
  const socioWealth = SOCIOECONOMIC_BACKGROUNDS.find(bg => bg.status === background.socioeconomicStatus);
  if (socioWealth) {
    const [min, max] = socioWealth.wealthRange;
    updatedCharacter.wealth = Math.floor(Math.random() * (max - min)) + min;
  }

  // Apply family dynamic effects to personality
  const dynamicEffects = FAMILY_DYNAMICS.find(fd => fd.type === background.familyDynamic);
  if (dynamicEffects && updatedCharacter.personalityTraits) {
    Object.entries(dynamicEffects.traitEffects).forEach(([trait, bonus]) => {
      if (updatedCharacter.personalityTraits[trait] !== undefined) {
        updatedCharacter.personalityTraits[trait] = Math.min(100, 
          updatedCharacter.personalityTraits[trait] + bonus);
      }
    });
  }

  return updatedCharacter;
};
