
export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  creativity: number;
  ambition: number;
  empathy: number;
  resilience: number;
  curiosity: number;
}

export interface FamilyBackground {
  type: string;
  description: string;
  traits: {
    familyIncome: number;
    parentEducation: number;
    familyStability: number;
    parentalSupport: number;
    familySize: number;
  };
}

export interface SeasonalModifier {
  season: 'spring' | 'summer' | 'fall' | 'winter';
  eventProbabilityModifier: number;
  moodModifier: number;
  healthModifier: number;
  activityAvailability: string[];
}
