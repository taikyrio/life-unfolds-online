import { Character, GameState } from '../../types/game';
import { generateInitialFamily } from '../../utils/familyUtils';
import { consequenceSystem } from '../../systems/consequenceSystem';
import { metaProgressionSystem } from '../../systems/metaProgressionSystem';

export const processGameLogic = (character: Character): Character => {
  let updatedCharacter = { ...character };

  // Initialize missing properties if they don't exist
  if (!updatedCharacter.education) {
    updatedCharacter.education = {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      completedStages: [],
      achievements: [],
      testScores: [],
      disciplinaryActions: 0,
      dropouts: 0,
      levels: [],
      grades: []
    };
  }

  // Initialize family members if they don't exist or is not an array
  if (!Array.isArray(updatedCharacter.familyMembers) || updatedCharacter.familyMembers.length === 0) {
    console.log('Initializing family members...');
    updatedCharacter.familyMembers = generateInitialFamily();
    console.log('Family members initialized:', updatedCharacter.familyMembers);
  }

  if (!updatedCharacter.relationshipStatus) {
    updatedCharacter.relationshipStatus = 'single';
  }

  if (!updatedCharacter.lifeEvents) {
    updatedCharacter.lifeEvents = [];
  }

  // Initialize consequence tracking
  if (!updatedCharacter.consequenceTracker) {
    updatedCharacter.consequenceTracker = consequenceSystem.initializeConsequenceTracker();
  }

  if (!updatedCharacter.reputation) {
    updatedCharacter.reputation = consequenceSystem.initializeReputationSystem();
  }

  // Initialize meta progression
  if (!updatedCharacter.metaProgression) {
    updatedCharacter.metaProgression = metaProgressionSystem.initializeMetaProgression();
  }

  return updatedCharacter;
};

export const validateCharacterData = (character: Character): boolean => {
  // Ensure required properties exist
  if (!character.id || !character.name) return false;
  if (typeof character.age !== 'number') return false;
  if (typeof character.health !== 'number') return false;
  if (typeof character.happiness !== 'number') return false;
  if (typeof character.smarts !== 'number') return false;
  if (typeof character.looks !== 'number') return false;
  if (typeof character.wealth !== 'number') return false;

  return true;
};

export const initializeCharacterDefaults = (character: Partial<Character>): Character => {
  const defaultCharacter = {
    id: character.id || 'default',
    name: character.name || 'Unknown',
    gender: character.gender || 'female',
    age: character.age || 0,
    health: character.health || 100,
    happiness: character.happiness || 50,
    smarts: character.smarts || 50,
    looks: character.looks || 50,
    wealth: character.wealth || 100,
    relationships: character.relationships || 50,
    achievements: character.achievements || [],
    assets: character.assets || [],
    children: character.children || [],
    fame: character.fame || 0,
    familyMembers: character.familyMembers || [],
    lifeEvents: character.lifeEvents || [],
    education: character.education || {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      completedStages: [],
      achievements: [],
      testScores: [],
      disciplinaryActions: 0,
      dropouts: 0,
      levels: [],
      grades: []
    },
    relationshipStatus: character.relationshipStatus || 'single',
    ...character
  };

  // Ensure family members are initialized
  if (!Array.isArray(defaultCharacter.familyMembers) || defaultCharacter.familyMembers.length === 0) {
    defaultCharacter.familyMembers = generateInitialFamily();
  }

  // Initialize consequence tracking
  if (!defaultCharacter.consequenceTracker) {
    defaultCharacter.consequenceTracker = consequenceSystem.initializeConsequenceTracker();
  }

  if (!defaultCharacter.reputation) {
    defaultCharacter.reputation = consequenceSystem.initializeReputationSystem();
  }

  // Initialize meta progression
  if (!defaultCharacter.metaProgression) {
    defaultCharacter.metaProgression = metaProgressionSystem.initializeMetaProgression();
  }

  return defaultCharacter;
};

import { gameLogger } from '../../utils/gameLogger';
export const processAgeUp = (gameState: GameState): GameState => {
  const updatedCharacter = { ...gameState.character };
  const previousAge = updatedCharacter.age;
  updatedCharacter.age += 1;
  
  // Initialize character in logger if needed
  if (updatedCharacter.id && updatedCharacter.name) {
    const birthYear = updatedCharacter.birthYear || (new Date().getFullYear() - updatedCharacter.age);
    gameLogger.initializeCharacter(updatedCharacter.id, updatedCharacter.name, birthYear);
  }

  // Process consequences for aging up
  consequenceSystem.processConsequences(updatedCharacter, 'age_up');

  // Check for achievements and add karma
  if (updatedCharacter.metaProgression) {
    const newAchievements = metaProgressionSystem.checkAchievements(updatedCharacter, updatedCharacter.metaProgression);

    // Add karma for aging up
    metaProgressionSystem.addKarma(
      updatedCharacter, 
      updatedCharacter.metaProgression, 
      'wisdom', 
      1, 
      `Aged to ${updatedCharacter.age}`
    );

    // Add karma for major life milestones
    if (updatedCharacter.age === 18) {
      metaProgressionSystem.addKarma(updatedCharacter, updatedCharacter.metaProgression, 'success', 10, 'Became an adult');
    } else if (updatedCharacter.age === 65) {
      metaProgressionSystem.addKarma(updatedCharacter, updatedCharacter.metaProgression, 'wisdom', 25, 'Reached retirement age');
    }

    // Update best stats
    Object.keys(updatedCharacter.metaProgression.bestStats).forEach(stat => {
      const currentValue = (updatedCharacter as any)[stat] || 0;
      if (currentValue > updatedCharacter.metaProgression!.bestStats[stat]) {
        updatedCharacter.metaProgression!.bestStats[stat] = currentValue;
      }
    });
  }

  // Generate age-appropriate events
  const ageEvents: string[] = [];

  // Birthday event
  ageEvents.push(`🎂 You turned ${updatedCharacter.age} years old!`);

  // Age-specific milestone events
  if (updatedCharacter.age === 1) {
    ageEvents.push(`👶 You learned to walk and say your first words!`);
  } else if (updatedCharacter.age === 5) {
    ageEvents.push(`🎒 You started kindergarten and made new friends!`);
  } else if (updatedCharacter.age === 13) {
    ageEvents.push(`🧑‍🎓 You became a teenager and entered middle school!`);
  } else if (updatedCharacter.age === 18) {
    ageEvents.push(`🎓 You graduated from high school and became an adult!`);
  } else if (updatedCharacter.age === 21) {
    ageEvents.push(`🍾 You can now legally drink alcohol!`);
  } else if (updatedCharacter.age === 30) {
    ageEvents.push(`💼 You're entering your thirties - time to get serious about life!`);
  } else if (updatedCharacter.age === 50) {
    ageEvents.push(`🏠 You've reached middle age - time to reflect on your accomplishments.`);
  } else if (updatedCharacter.age === 65) {
    ageEvents.push(`👴 You've reached retirement age! Time to enjoy your golden years.`);
  }
  
  // Ensure every age has at least one event - add a general life event if no specific events occurred
  if (ageEvents.length === 0) {
    const generalEvents = [
      `📅 You celebrated your ${updatedCharacter.age}th birthday.`,
      `⏰ Another year has passed in your life journey.`,
      `🌟 You gained more life experience at age ${updatedCharacter.age}.`,
      `📖 You lived through the age of ${updatedCharacter.age}.`,
      `🎂 You turned ${updatedCharacter.age} and reflected on your life.`
    ];
    ageEvents.push(generalEvents[Math.floor(Math.random() * generalEvents.length)]);
  }

  // Random life events based on age
  if (updatedCharacter.age > 5 && Math.random() < 0.3) {
    const randomEvents = [
      `📚 You learned something new and gained knowledge.`,
      `😊 You had a great day that improved your mood.`,
      `💪 You felt particularly healthy today.`,
      `👥 You had meaningful interactions with others.`
    ];
    ageEvents.push(randomEvents[Math.floor(Math.random() * randomEvents.length)]);
  }

  // Age-related stat changes
  if (updatedCharacter.age > 30) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 1);
    if (updatedCharacter.health < 80) {
      ageEvents.push(`🏥 You're starting to feel the effects of aging on your health.`);
    }
  }

  if (updatedCharacter.age > 50) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 2);
    updatedCharacter.looks = Math.max(0, updatedCharacter.looks - 1);
    if (updatedCharacter.looks < 60) {
      ageEvents.push(`👴 You notice some gray hairs and wrinkles appearing.`);
    }
  }

  // Death check
  if (updatedCharacter.health <= 0 || updatedCharacter.age >= 120) {
    // End of life - calculate final karma and legacy
    if (updatedCharacter.metaProgression) {
      metaProgressionSystem.addKarma(
        updatedCharacter, 
        updatedCharacter.metaProgression, 
        'resilience', 
        updatedCharacter.age, 
        `Lived to age ${updatedCharacter.age}`
      );

      // Transfer to legacy
      updatedCharacter.metaProgression.legacy.totalKarma += updatedCharacter.metaProgression.lifeKarma.totalKarma;
      updatedCharacter.metaProgression.totalLifetimePlays += 1;
    }

    return {
      ...gameState,
      character: updatedCharacter,
      gameOver: true,
      gameOverReason: updatedCharacter.health <= 0 ? 'Death by poor health' : 'Death by old age'
    };
  }

  // Log events to gameLogger and update event history
  ageEvents.forEach(event => {
    gameLogger.logEvent({
      age: updatedCharacter.age,
      year: updatedCharacter.birthYear ? updatedCharacter.birthYear + updatedCharacter.age : new Date().getFullYear(),
      event: event,
      category: 'achievement'
    });
  });

  const updatedEventHistory = [...gameState.eventHistory, ...ageEvents];

  return {
    ...gameState,
    character: updatedCharacter,
    eventHistory: updatedEventHistory
  };
};

export const processChoice = (gameState: GameState, choiceId: string): GameState => {
  // Basic choice processing
  return gameState;
};