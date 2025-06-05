import { Character, GameState, LifeEvent } from '../../types/game';
import { 
  ageCharacter, 
  applyStatEffects, 
  isGameOver 
} from '../../utils/gameUtils';
import { evolveStatsNaturally, getStatMessage } from '../../utils/statEvolution';
import { dynamicEventSystem } from '../../data/dynamicEvents';
import { allRandomEvents } from '../../data/events/expandedRandomEvents';
import { processCareerProgression, calculateYearlySalary } from '../../systems/careerProgressionSystem';
import { lifeEvents } from '../../data/lifeEvents';
import { checkForHealthConditions } from '../../systems/healthSystem';
import { checkAchievements } from '../../systems/achievementSystem';
import { processYearlyFinances } from '../../systems/moneySystem';
import { applyStatBalancing } from '../../utils/statBalancing';
import { getLifeStage } from '../../utils/gameStateUtils';
import { autoEnrollEducation } from '../../handlers/educationProgression';

export const processAgeUp = (
  gameState: GameState,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: GameState) => void,
  toast: any
) => {
  if (gameState.gameOver) return;

  let updatedCharacter = { ...gameState.character };
  let newEventHistory = [...gameState.eventHistory];
  let newAchievements = [...gameState.achievements];
  let currentAgeEvents: string[] = [];

  // Age the character
  updatedCharacter = ageCharacter(updatedCharacter);

  // Process education year progression
  updatedCharacter = autoEnrollEducation(updatedCharacter, ageHistory, setAgeHistory);

  // Process yearly finances
  updatedCharacter = processYearlyFinances(updatedCharacter);

  // Apply natural stat evolution
  const statChanges = evolveStatsNaturally(updatedCharacter);
  Object.entries(statChanges).forEach(([key, value]) => {
    if (typeof value === 'number' && key in updatedCharacter) {
      const oldValue = (updatedCharacter as any)[key];
      (updatedCharacter as any)[key] = Math.max(0, Math.min(100, value));

      const change = value - oldValue;
      if (Math.abs(change) > 2) {
        const message = getStatMessage(key, change);
        if (message) {
          currentAgeEvents.push(message);
        }
      }
    }
  });

  // Check for health conditions
  const healthCondition = checkForHealthConditions(updatedCharacter);
  if (healthCondition) {
    currentAgeEvents.push(`You were diagnosed with ${healthCondition.name}. ${healthCondition.description}`);
    updatedCharacter.health = Math.max(0, updatedCharacter.health + healthCondition.effects.health);
    updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness + healthCondition.effects.happiness);
  }

  // Process career progression
  if (updatedCharacter.job && updatedCharacter.job !== 'Unemployed') {
    updatedCharacter.workExperience = (updatedCharacter.workExperience || 0) + 1;
    
    const careerProgression = processCareerProgression(updatedCharacter);
    if (careerProgression.promoted) {
      updatedCharacter.jobLevel = (updatedCharacter.jobLevel || 0) + 1;
      updatedCharacter.job = careerProgression.newTitle || updatedCharacter.job;
      updatedCharacter.salary = calculateYearlySalary(updatedCharacter);
      currentAgeEvents.push(careerProgression.message);
    }
  }

  // Enhanced event selection with expanded event pool
  const availableEvents = dynamicEventSystem.getAvailableEvents(updatedCharacter, gameState.eventTracker);
  
  // Add random events based on life circumstances
  const contextualEvents = allRandomEvents.filter(event => {
    const conditions = event.conditions;
    if (!conditions) return false;
    
    // Age check
    if (conditions.minAge && updatedCharacter.age < conditions.minAge) return false;
    if (conditions.maxAge && updatedCharacter.age > conditions.maxAge) return false;
    
    // Job check
    if (conditions.hasJob !== undefined) {
      const hasJob = updatedCharacter.job && updatedCharacter.job !== 'Unemployed';
      if (conditions.hasJob !== hasJob) return false;
    }
    
    // Probability check
    if (conditions.probability && Math.random() > conditions.probability) return false;
    
    return true;
  });
  
  const allAvailableEvents = [...availableEvents, ...contextualEvents];
  const selectedEvent = dynamicEventSystem.selectEvent(allAvailableEvents);

  // Calculate event probability based on character state and age
  const baseEventProbability = 0.3;
  const ageFactor = updatedCharacter.age < 18 ? 0.8 : updatedCharacter.age < 65 ? 1.0 : 0.6;
  const healthFactor = updatedCharacter.health < 30 ? 1.2 : 1.0;
  const eventProbability = Math.min(0.6, baseEventProbability * ageFactor * healthFactor);

  let hasEvent = false;
  if (selectedEvent && Math.random() < eventProbability) {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      currentEvent: selectedEvent,
      eventHistory: newEventHistory
    });
    hasEvent = true;
  }

  // Enhanced static event selection with better filtering
  if (!hasEvent && Math.random() < 0.5) {
    const eligibleEvents = lifeEvents.filter(event => {
      // Age requirements
      if (event.ageRequirement) {
        const { min, max } = event.ageRequirement;
        if (min && updatedCharacter.age < min) return false;
        if (max && updatedCharacter.age > max) return false;
      }

      // Additional context-based filtering
      if (event.requirements) {
        const { requirements } = event;
        if (requirements.education && 
            (!Array.isArray(updatedCharacter.education) || !updatedCharacter.education.includes(requirements.education))) return false;
        if (requirements.job && updatedCharacter.job !== requirements.job) return false;
        if (requirements.relationshipStatus && updatedCharacter.relationshipStatus !== requirements.relationshipStatus) return false;
        if (requirements.wealth && updatedCharacter.wealth < requirements.wealth) return false;
      }

      // Avoid repetitive events (check last 8 events instead of 5)
      const recentEvents = newEventHistory.slice(-8);
      if (recentEvents.some(eventText => eventText.includes(event.title))) return false;

      // Prevent certain events from happening too frequently
      if (event.category === 'health' && recentEvents.some(e => e.includes('health') || e.includes('doctor'))) return false;
      if (event.category === 'career' && updatedCharacter.age < 16) return false;

      return true;
    });

    if (eligibleEvents.length > 0) {
      // Weight events by category relevance to current life stage
      const weightedEvents = eligibleEvents.map(event => {
        let weight = 1;
        const lifeStage = getLifeStage(updatedCharacter.age);

        if (lifeStage === 'Teen' && event.category === 'education') weight = 2;
        if (lifeStage === 'Young Adult' && event.category === 'career') weight = 2;
        if (lifeStage === 'Adult' && event.category === 'family') weight = 1.5;
        if (updatedCharacter.health < 50 && event.category === 'health') weight = 2;

        return { event, weight };
      });

      const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);
      let randomValue = Math.random() * totalWeight;

      for (const weightedEvent of weightedEvents) {
        randomValue -= weightedEvent.weight;
        if (randomValue <= 0) {
          onGameStateChange({
            ...gameState,
            character: updatedCharacter,
            currentEvent: weightedEvent.event,
            eventHistory: newEventHistory
          });
          hasEvent = true;
          break;
        }
      }
    }
  }

  // Add age milestone events
  if (updatedCharacter.age === 1) {
    currentAgeEvents.push("You celebrated your first birthday!");
  } else if (updatedCharacter.age === 5) {
    currentAgeEvents.push("You started kindergarten.");
  } else if (updatedCharacter.age === 13) {
    currentAgeEvents.push("You became a teenager!");
  } else if (updatedCharacter.age === 18) {
    currentAgeEvents.push("You became an adult!");
  } else if (updatedCharacter.age === 21) {
    currentAgeEvents.push("You can now legally drink alcohol!");
  } else if (updatedCharacter.age === 65) {
    currentAgeEvents.push("You reached retirement age!");
  }

  // Check for achievements
  const newAchievementsList = checkAchievements(updatedCharacter, newEventHistory, newAchievements);
  if (newAchievementsList.length > 0) {
    newAchievementsList.forEach(achievement => {
      toast({
        title: "Achievement Unlocked! 🏆",
        description: `${achievement.emoji} ${achievement.name}: ${achievement.description}`,
        duration: 5000,
      });
      currentAgeEvents.push(`🏆 Achievement unlocked: ${achievement.name}!`);
      newAchievements.push(achievement.id);
    });
  }

  // Check if game is over
  const gameOverResult = isGameOver(updatedCharacter);
  if (gameOverResult.gameOver) {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      gameOver: true,
      gameOverReason: gameOverResult.reason,
      eventHistory: newEventHistory,
      achievements: newAchievements
    });
    return;
  }

  // Update age history
  if (currentAgeEvents.length > 0) {
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = currentAgeEvents;
    setAgeHistory(newAgeHistory);
  }

  // If no event occurred, just update the character
  if (!hasEvent) {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      eventHistory: newEventHistory,
      achievements: newAchievements
    });
  }
};

export const processChoice = (
  gameState: GameState,
  choiceId: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: GameState) => void
) => {
  if (!gameState.currentEvent) return;

  const choice = gameState.currentEvent.choices.find(c => c.id === choiceId);
  if (!choice) return;

  let updatedCharacter = applyStatEffects(gameState.character, choice.effects);

  // Apply stat balancing to make effects more realistic
  updatedCharacter = applyStatBalancing(updatedCharacter);

  if (choice.flags) {
    updatedCharacter.flags = [...(updatedCharacter.flags || []), ...choice.flags];
  }

  // Add delayed consequences system
  if (choice.effects.wealth && Math.abs(choice.effects.wealth) > 50) {
    // Large wealth changes might have tax implications or attract attention
    updatedCharacter.delayedEvents = updatedCharacter.delayedEvents || [];
    if (choice.effects.wealth > 0) {
      updatedCharacter.delayedEvents.push({
        age: updatedCharacter.age + 1,
        type: 'wealth_gain_attention',
        message: 'Your recent wealth gain has attracted attention from various parties.',
        effects: { notoriety: 10 }
      });
    }
  }

  // Track significant life decisions for future reference
  if (choice.effects.education || choice.effects.job || choice.effects.relationshipStatus) {
    updatedCharacter.majorDecisions = updatedCharacter.majorDecisions || [];
    updatedCharacter.majorDecisions.push({
      age: updatedCharacter.age,
      decision: choice.text,
      event: gameState.currentEvent.title
    });
  }

  const eventDescription = `${gameState.currentEvent.title}: ${choice.text}`;
  let ageEvents = ageHistory[updatedCharacter.age] || [];
  ageEvents.push(eventDescription);

  // Enhanced consequences with probability
  if (choice.consequences) {
    choice.consequences.forEach(consequence => {
      // Some consequences might not always happen
      if (Math.random() < 0.8) {
        ageEvents.push(consequence);
      }
    });
  }

  // Add choice-specific follow-up events
  if (choice.effects.criminalRecord) {
    ageEvents.push("Your criminal record may affect future opportunities.");
  }

  if (choice.effects.fame && choice.effects.fame > 20) {
    ageEvents.push("Your growing fame is starting to change how people treat you.");
  }

  const newAgeHistory = { ...ageHistory };
  newAgeHistory[updatedCharacter.age] = ageEvents;
  setAgeHistory(newAgeHistory);

  const newEventHistory = [...gameState.eventHistory, eventDescription];

  const newEventTracker = {
    ...gameState.eventTracker,
    triggeredEvents: new Set([...gameState.eventTracker.triggeredEvents, gameState.currentEvent.id]),
    lastEventAge: updatedCharacter.age,
    choiceHistory: [...(gameState.eventTracker.choiceHistory || []), {
      age: updatedCharacter.age,
      eventId: gameState.currentEvent.id,
      choiceId: choice.id,
      impact: Math.abs(Object.values(choice.effects).reduce((sum: number, val) => 
        sum + (typeof val === 'number' ? val : 0), 0))
    }]
  };

  onGameStateChange({
    ...gameState,
    character: updatedCharacter,
    currentEvent: null,
    eventHistory: newEventHistory,
    eventTracker: newEventTracker
  });
};