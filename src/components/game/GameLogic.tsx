
import { Character, GameState, LifeEvent } from '../../types/game';
import { 
  ageCharacter, 
  applyStatEffects, 
  isGameOver 
} from '../../utils/gameUtils';
import { evolveStatsNaturally, getStatMessage } from '../../utils/statEvolution';
import { dynamicEventSystem } from '../../data/dynamicEvents';
import { lifeEvents } from '../../data/lifeEvents';
import { checkForHealthConditions } from '../../systems/healthSystem';
import { checkAchievements } from '../../systems/achievementSystem';
import { processYearlyFinances } from '../../systems/moneySystem';

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

  // Check for dynamic events
  const availableEvents = dynamicEventSystem.getAvailableEvents(updatedCharacter, gameState.eventTracker);
  const selectedEvent = dynamicEventSystem.selectEvent(availableEvents);

  let hasEvent = false;
  if (selectedEvent && Math.random() < 0.3) {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      currentEvent: selectedEvent,
      eventHistory: newEventHistory
    });
    hasEvent = true;
  }

  // Check for random life events from static events
  if (!hasEvent && Math.random() < 0.4) {
    const eligibleEvents = lifeEvents.filter(event => {
      if (event.ageRequirement) {
        const { min, max } = event.ageRequirement;
        if (min && updatedCharacter.age < min) return false;
        if (max && updatedCharacter.age > max) return false;
      }
      return true;
    });

    if (eligibleEvents.length > 0) {
      const randomEvent = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
      onGameStateChange({
        ...gameState,
        character: updatedCharacter,
        currentEvent: randomEvent,
        eventHistory: newEventHistory
      });
      hasEvent = true;
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
  const newAgeHistory = { ...ageHistory };
  if (currentAgeEvents.length > 0) {
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
  
  if (choice.flags) {
    updatedCharacter.flags = [...(updatedCharacter.flags || []), ...choice.flags];
  }

  const eventDescription = `${gameState.currentEvent.title}: ${choice.text}`;
  let ageEvents = ageHistory[updatedCharacter.age] || [];
  ageEvents.push(eventDescription);

  if (choice.consequences) {
    ageEvents.push(...choice.consequences);
  }

  const newAgeHistory = { ...ageHistory };
  newAgeHistory[updatedCharacter.age] = ageEvents;
  setAgeHistory(newAgeHistory);

  const newEventHistory = [...gameState.eventHistory, eventDescription];

  const newEventTracker = {
    ...gameState.eventTracker,
    triggeredEvents: new Set([...gameState.eventTracker.triggeredEvents, gameState.currentEvent.id]),
    lastEventAge: updatedCharacter.age
  };

  onGameStateChange({
    ...gameState,
    character: updatedCharacter,
    currentEvent: null,
    eventHistory: newEventHistory,
    eventTracker: newEventTracker
  });
};
