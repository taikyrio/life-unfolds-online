import { Character } from '../../types/game';

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

  // Update health (example: slight chance of health decrease with age)
  if (updatedCharacter.age > 60 && Math.random() < 0.3) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 5);
    ageEvents.push("You feel a bit weaker as you get older.");
  }

  // Check for death
  if (updatedCharacter.health <= 0) {
    ageEvents.push("Unfortunately, your health gave out. Game Over.");
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      gameOver: true,
      gameOverReason: "Died of old age"
    });
    return;
  }

  const newAgeHistory = { ...ageHistory };
  newAgeHistory[updatedCharacter.age] = ageEvents;
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
