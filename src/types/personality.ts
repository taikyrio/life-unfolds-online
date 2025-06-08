
export interface PersonalityTraits {
  kindness: number;
  loyalty: number;
  intelligence: number;
  humor: number;
  ambition: number;
  stability: number;
  generosity: number;
  openness: number;
  creativity: number;
  confidence: number;
  empathy: number;
  resilience: number;
}

export interface BirthSeasonEffects {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  traitModifiers: Partial<PersonalityTraits>;
  eventProbabilityModifiers: Record<string, number>;
  specialEvents: string[];
}

export interface FamilyBackground {
  socioeconomicStatus: 'poor' | 'working-class' | 'middle-class' | 'upper-middle' | 'wealthy';
  parentalEducation: 'no-education' | 'high-school' | 'college' | 'graduate' | 'doctorate';
  familyDynamic: 'stable' | 'chaotic' | 'distant' | 'close-knit' | 'troubled';
  culturalBackground: 'traditional' | 'progressive' | 'religious' | 'secular' | 'mixed';
  parentalCareers: string[];
  familyValues: string[];
  startingAdvantages: string[];
  startingChallenges: string[];
}

export const BIRTH_SEASON_EFFECTS: Record<string, BirthSeasonEffects> = {
  spring: {
    season: 'spring',
    traitModifiers: { creativity: 3, openness: 4 },
    eventProbabilityModifiers: { 'nature_events': 1.2, 'social_events': 1.1 },
    specialEvents: ['spring_festival', 'easter_celebration', 'nature_walk']
  },
  summer: {
    season: 'summer',
    traitModifiers: { confidence: 4, humor: 3 },
    eventProbabilityModifiers: { 'outdoor_events': 1.3, 'travel_events': 1.2 },
    specialEvents: ['summer_vacation', 'beach_trip', 'summer_camp']
  },
  autumn: {
    season: 'autumn',
    traitModifiers: { intelligence: 4, stability: 3, resilience: 2 },
    eventProbabilityModifiers: { 'academic_events': 1.2, 'family_events': 1.1 },
    specialEvents: ['back_to_school', 'halloween', 'thanksgiving']
  },
  winter: {
    season: 'winter',
    traitModifiers: { resilience: 5, empathy: 4, loyalty: 3 },
    eventProbabilityModifiers: { 'indoor_events': 1.3, 'family_events': 1.2 },
    specialEvents: ['christmas', 'new_year', 'winter_storm']
  }
};
