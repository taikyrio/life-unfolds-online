import { Character } from '../types/character';
import { Activity } from '../types/activities';
import { PrisonState } from '../types/prison';
import { getCrimeToSentenceMapping, PRISON_FACILITIES } from '../data/prisonData';

export const processActivityAction = (
  character: Character,
  activity: Activity
): { 
  character: Character; 
  message: string; 
  success: boolean;
  shouldReturnToLife?: boolean;
  shouldGoToPrison?: boolean;
} => {
  // Check if character meets requirements
  if (activity.requirements) {
    const req = activity.requirements;

    if (req.minAge && character.age < req.minAge) {
      return {
        character,
        message: `You must be at least ${req.minAge} years old to do this activity.`,
        success: false
      };
    }

    if (req.maxAge && character.age > req.maxAge) {
      return {
        character,
        message: `You are too old for this activity.`,
        success: false
      };
    }

    if (req.wealth && character.wealth < req.wealth) {
      return {
        character,
        message: `You need at least $${req.wealth.toLocaleString()} to do this activity.`,
        success: false
      };
    }

    if (req.health && character.health < req.health) {
      return {
        character,
        message: `You need at least ${req.health} health to do this activity.`,
        success: false
      };
    }
  }

  // Check if character can afford the activity
  if (character.wealth < activity.cost) {
    return {
      character,
      message: `You need $${activity.cost.toLocaleString()} to do this activity.`,
      success: false
    };
  }

  // Handle crime activities with arrest chance
  if (activity.consequences?.arrestChance && activity.consequences?.crimeType) {
    const arrested = Math.random() * 100 < activity.consequences.arrestChance;

    if (arrested) {
      // Send to prison
      const sentenceMapping = getCrimeToSentenceMapping();
      const crimeData = sentenceMapping[activity.consequences.crimeType as keyof typeof sentenceMapping];

      if (crimeData) {
        const sentence = Math.floor(Math.random() * (crimeData.max - crimeData.min + 1)) + crimeData.min;
        const facility = PRISON_FACILITIES[crimeData.facility as keyof typeof PRISON_FACILITIES];

        const newPrisonState: PrisonState = {
          isInPrison: true,
          sentence: sentence,
          timeServed: 0,
          crime: activity.consequences.crimeType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          facility: facility.name,
          securityLevel: facility.securityLevel,
          reputation: 0,
          cellmates: [],
          disciplinaryActions: 0,
          prisonJobSalary: 0,
          paroleEligible: false
        };

        const arrestMessage = `You were arrested for ${newPrisonState.crime} and sentenced to ${sentence} years in ${facility.name}`;

        const newCharacter = {
          ...character,
          lifeEvents: [...character.lifeEvents, arrestMessage],
          customStats: {
            ...character.customStats,
            prisonState: newPrisonState
          }
        };

        return {
          character: newCharacter,
          message: arrestMessage,
          success: false,
          shouldGoToPrison: true
        };
      }
    }
  }

  // Check for arrest for criminal activities (only for age 18+)
  if (activity.category === 'crime' && character.age >= 18) {
    const arrestChance = activity.arrestChance || 0;
    if (Math.random() < arrestChance) {
      // Create prison state for arrest
      const sentence = Math.floor(Math.random() * 3) + 1; // 1-3 years for petty crimes
      const newPrisonState = {
        isInPrison: true,
        sentence: sentence,
        timeServed: 0,
        crime: activity.name,
        facility: 'County Jail',
        securityLevel: 'minimum' as const,
        reputation: 0,
        cellmates: [],
        disciplinaryActions: 0,
        prisonJobSalary: 0,
        paroleEligible: false
      };

      const arrestMessage = `You were arrested for ${activity.name} and sentenced to ${sentence} years in prison.`;

      const newCharacter = {
        ...character,
        lifeEvents: [...character.lifeEvents, arrestMessage],
        customStats: {
          ...character.customStats,
          prisonState: newPrisonState
        }
      };

      return {
        character: newCharacter,
        message: arrestMessage,
        success: false,
        shouldGoToPrison: true
      };
    }
  }

  // Process the activity normally
  let newCharacter = { ...character };

  // Deduct cost
  newCharacter.wealth = Math.max(0, newCharacter.wealth - activity.cost);

  // Track criminal activities for career progression
  if (activity.category === 'crime') {
    const currentNotoriety = newCharacter.customStats?.notoriety || 0;
    const currentCoding = newCharacter.customStats?.coding || 0;
    const currentCrimesCommitted = newCharacter.customStats?.crimesCommitted || 0;
    
    newCharacter.customStats = {
      ...newCharacter.customStats,
      notoriety: Math.min(100, currentNotoriety + (activity.effects.fame || 5)),
      crimesCommitted: currentCrimesCommitted + 1,
      // If it's a cyber crime, also increase coding skill
      coding: activity.name.toLowerCase().includes('hack') || activity.name.toLowerCase().includes('cyber') 
        ? Math.min(100, currentCoding + 3) 
        : currentCoding,
      // Initialize crime state if needed
      crimeState: newCharacter.customStats?.crimeState || {
        rank: 'associate',
        madeStatus: false,
        loyalty: 50,
        reputation: 0,
        crimesCommitted: currentCrimesCommitted + 1,
        totalEarnings: 0,
        suspicionLevel: 0,
        isInformant: false,
        protectionLevel: 0,
        territoryControlled: [],
        enemyFamilies: []
      }
    };
  }

  // Apply effects
  if (activity.effects.health) {
    newCharacter.health = Math.max(0, Math.min(100, newCharacter.health + activity.effects.health));
  }
  if (activity.effects.happiness) {
    newCharacter.happiness = Math.max(0, Math.min(100, newCharacter.happiness + activity.effects.happiness));
  }
  if (activity.effects.smarts) {
    newCharacter.smarts = Math.max(0, Math.min(100, newCharacter.smarts + activity.effects.smarts));
  }
  if (activity.effects.looks) {
    newCharacter.looks = Math.max(0, Math.min(100, newCharacter.looks + activity.effects.looks));
  }
  if (activity.effects.wealth) {
    newCharacter.wealth = Math.max(0, newCharacter.wealth + activity.effects.wealth);
  }
  if (activity.effects.relationships) {
    newCharacter.relationships = Math.max(0, Math.min(100, newCharacter.relationships + activity.effects.relationships));
  }
  if (activity.effects.fame) {
    newCharacter.fame = Math.max(0, Math.min(100, newCharacter.fame + activity.effects.fame));
  }

  // Handle risk factors
  let riskMessage = '';
  if (activity.riskFactors) {
    if (activity.riskFactors.injury && Math.random() * 100 < activity.riskFactors.injury) {
      const damage = Math.floor(Math.random() * 20) + 10;
      newCharacter.health = Math.max(0, newCharacter.health - damage);
      riskMessage = ` You were injured and lost ${damage} health.`;
    }

    if (activity.riskFactors.death && Math.random() * 100 < activity.riskFactors.death) {
      newCharacter.health = 0;
      riskMessage = ' The activity went horribly wrong and you died.';
    }
  }

  const message = `You completed ${activity.name}.${riskMessage}`;

  // Add to life events
  newCharacter.lifeEvents = [...newCharacter.lifeEvents, message];

  return {
    character: newCharacter,
    message,
    success: true,
    shouldReturnToLife: true
  };
};