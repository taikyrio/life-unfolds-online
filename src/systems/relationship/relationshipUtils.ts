
import { PersonalityTraits } from '../../types/core';

export const generatePersonality = (): PersonalityTraits => {
  return {
    kindness: Math.floor(Math.random() * 100),
    loyalty: Math.floor(Math.random() * 100),
    intelligence: Math.floor(Math.random() * 100),
    humor: Math.floor(Math.random() * 100),
    ambition: Math.floor(Math.random() * 100),
    stability: Math.floor(Math.random() * 100),
    generosity: Math.floor(Math.random() * 100),
    openness: Math.floor(Math.random() * 100)
  };
};

export const initializeRelationshipStats = (relationship: string, baseLevel: number) => {
  return {
    relationshipLevel: baseLevel,
    trust: baseLevel,
    communication: baseLevel,
    intimacy: relationship === 'lover' || relationship === 'spouse' ? baseLevel : 0,
    conflictResolution: baseLevel,
    sharedInterests: Math.floor(Math.random() * 100),
    timeSpentTogether: 0,
    lastInteraction: new Date().toISOString(),
    interactionHistory: [],
    respect: baseLevel
  };
};
