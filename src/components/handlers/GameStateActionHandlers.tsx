import { Character } from '../../types/game';
import { isGameOver } from '../../utils/gameStateUtils';
import { ageFamilyMembers, generateNewRelationships } from '../../utils/familyUtils';
import { gameLogger } from '../../utils/gameLogger';

export const handleAgeUp = (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  // Increase age
  updatedCharacter.age += 1;
  ageEvents.push(`You aged up to ${updatedCharacter.age}!`);

  // Age family members and add new relationships
  updatedCharacter.familyMembers = ageFamilyMembers(updatedCharacter.familyMembers);
  const newRelationships = generateNewRelationships(updatedCharacter);
  updatedCharacter.familyMembers = [...updatedCharacter.familyMembers, ...newRelationships];

  // Natural health changes with age
  if (updatedCharacter.age > 50 && Math.random() < 0.2) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 3);
    ageEvents.push("You feel the effects of aging on your health.");
  } else if (updatedCharacter.age > 30 && Math.random() < 0.1) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 1);
    ageEvents.push("You notice minor changes in your health.");
  }

  // Young adult health recovery chance
  const isYoungAdult = updatedCharacter.age >= 18 && updatedCharacter.age <= 35;
  if (isYoungAdult && updatedCharacter.health < 30 && Math.random() < 0.3) {
    updatedCharacter.health = Math.min(100, updatedCharacter.health + 15);
    ageEvents.push("Your young body shows remarkable recovery!");
  }

  // Check for game over
  const gameOverCheck = isGameOver(updatedCharacter);
  if (gameOverCheck.gameOver) {
    ageEvents.push(gameOverCheck.reason || "Game Over");
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      gameOver: true,
      gameOverReason: gameOverCheck.reason
    });

    toast({
      title: "Game Over",
      description: gameOverCheck.reason,
      variant: "destructive",
    });
    return;
  }

  // Critical health warning for young adults
  if (updatedCharacter.health <= 20 && isYoungAdult) {
    ageEvents.push("⚠️ Your health is critically low! Seek medical attention immediately!");
    toast({
      title: "Critical Health Warning",
      description: "Your health is dangerously low. Consider visiting a doctor or hospital.",
      variant: "destructive",
    });
  }

  // Ensure this age exists in age history even if no events occurred
  const newAgeHistory = { ...ageHistory };
  if (!newAgeHistory[updatedCharacter.age]) {
    newAgeHistory[updatedCharacter.age] = [];
  }

  // If no events occurred for this age, add a default life event
  if (ageEvents.length === 0) {
    const defaultEvents = [
      `📅 You turned ${updatedCharacter.age} years old.`,
      `🌟 Another year of life experience gained.`,
      `⏰ Time continues to pass in your life journey.`,
      `📖 You lived through age ${updatedCharacter.age}.`
    ];
    const randomDefault = defaultEvents[Math.floor(Math.random() * defaultEvents.length)];
    ageEvents.push(randomDefault);
  }

  // Log all age events to gameLogger
  ageEvents.forEach(event => {
    gameLogger.logEvent({
      age: updatedCharacter.age,
      year: (updatedCharacter.birthYear || new Date().getFullYear() - updatedCharacter.age) + updatedCharacter.age,
      event: event,
      category: 'achievement'
    });
  });

  // Add any new events that aren't already recorded
  ageEvents.forEach(event => {
    if (!newAgeHistory[updatedCharacter.age].includes(event)) {
      newAgeHistory[updatedCharacter.age].push(event);
    }
  });

  setAgeHistory(newAgeHistory);

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

export const handleDeath = (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  const deathReason = data?.reason || "Unknown causes";
  const deathYear = character.age;
  const deathMessage = `You died at age ${deathYear} due to ${deathReason}.`;

  // Add death message to age history
  let ageEvents = ageHistory[character.age] || [];
  ageEvents.push(deathMessage);
  const newAgeHistory = { ...ageHistory };
  newAgeHistory[character.age] = ageEvents;
  setAgeHistory(newAgeHistory);

  // Update game state to game over
  onGameStateChange({
    ...gameState,
    gameOver: true,
    gameOverReason: deathMessage,
    character: { ...character, alive: false }
  });

  toast({
    title: "Game Over",
    description: deathMessage,
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export const handleEmigrate = (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  const newCountry = data?.country || "Unknown";
  const emigrationMessage = `You emigrated to ${newCountry} at age ${character.age}.`;

  // Add emigration message to age history
  let ageEvents = ageHistory[character.age] || [];
  ageEvents.push(emigrationMessage);
  const newAgeHistory = { ...ageHistory };
  newAgeHistory[character.age] = ageEvents;
  setAgeHistory(newAgeHistory);

  // Update game state (you might want to add country or region to character state)
  onGameStateChange({
    ...gameState,
    character: { ...character, country: newCountry }
  });

  toast({
    title: "Emigration",
    description: emigrationMessage,
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};

export const handleSurrender = (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  const surrenderMessage = `You surrendered at age ${character.age}. Game Over.`;

  // Add surrender message to age history
  let ageEvents = ageHistory[character.age] || [];
  ageEvents.push(surrenderMessage);
  const newAgeHistory = { ...ageHistory };
  newAgeHistory[character.age] = ageEvents;
  setAgeHistory(newAgeHistory);

  // Update game state to game over
  onGameStateChange({
    ...gameState,
    gameOver: true,
    gameOverReason: surrenderMessage
  });

  toast({
    title: "Game Over",
    description: surrenderMessage,
    status: "info",
    duration: 5000,
    isClosable: true,
  });
};

export const handleHealthAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'doctor_visit':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 50);
      message = 'You visited the doctor and feel healthier!';
      break;
    case 'exercise':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 3);
      message = 'You exercised and feel great!';
      break;
    default:
      message = `You completed ${action} health activity.`;
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Health Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

export const handleLifestyleAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'vacation':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 20);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 200);
      message = 'You had an amazing vacation!';
      break;
    case 'party':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 5);
      message = 'You had a great time at the party!';
      break;
    default:
      message = `You completed ${action} lifestyle activity.`;
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Lifestyle Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

export const handleMoneyAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'invest':
      const investAmount = data?.amount || 100;
      if (updatedCharacter.wealth >= investAmount) {
        updatedCharacter.wealth -= investAmount;
        const return_rate = Math.random() * 0.2 + 0.05; // 5-25% return
        const profit = Math.floor(investAmount * return_rate);
        updatedCharacter.wealth += investAmount + profit;
        message = `You invested $${investAmount}k and earned $${profit}k profit!`;
      } else {
        message = 'You don\'t have enough money to invest.';
      }
      break;
    case 'gamble':
      const betAmount = data?.amount || 50;
      if (updatedCharacter.wealth >= betAmount) {
        updatedCharacter.wealth -= betAmount;
        if (Math.random() < 0.4) { // 40% chance to win
          const winnings = betAmount * 2;
          updatedCharacter.wealth += winnings;
          message = `You won $${winnings}k gambling!`;
        } else {
          message = `You lost $${betAmount}k gambling.`;
        }
      } else {
        message = 'You don\'t have enough money to gamble.';
      }
      break;
    default:
      message = `You completed ${action} money activity.`;
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Money Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
