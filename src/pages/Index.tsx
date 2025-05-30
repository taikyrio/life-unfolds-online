
import React, { useState } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { GameState, Character } from '@/types/game';
import { createCharacter } from '@/utils/characterUtils';
import { generateRandomName } from '@/utils/characterUtils';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Generate random birth details
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1; // Safe day range for all months
    const randomName = generateRandomName();
    
    const character = createCharacter(randomName, birthMonth, birthDay);
    return {
      character,
      currentEvent: null,
      gameStarted: false,
      gameOver: false,
      eventHistory: [],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map()
      }
    };
  });

  return <GameBoard gameState={gameState} onGameStateChange={setGameState} />;
};

export default Index;
