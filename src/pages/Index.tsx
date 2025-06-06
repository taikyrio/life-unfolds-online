
import React, { useState, useEffect } from 'react';
import { GameBoard } from '@/components/GameBoard';
import SplashScreen from '@/components/SplashScreen';
import { GameSettings } from '@/components/GameSettings';
import { CharacterCustomization } from '@/components/CharacterCustomization';
import { GameState } from '@/types/gameState';
import { Character } from '@/types/character';
import { generateRandomName, createCharacter, getRandomizedNewCharacter } from '@/utils/characterUtils';
import { randomizeStats } from '@/utils/statRandomization';
import { Button } from '@/components/ui/button';
import { BirthStory } from '@/components/BirthStory';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showCharacterCustomization, setShowCharacterCustomization] = useState(false);
  const [gameState, setGameState] = useState<GameState>(() => {
    // Generate random birth details
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1; // Safe day range for all months
    const randomName = generateRandomName();

    // Get randomization mode from localStorage
    const savedMode = localStorage.getItem('bitlife-stat-randomization') || 'realistic';
    const character = createCharacter(randomName, birthMonth, birthDay);

    // Apply randomization to starting stats
    const randomizedCharacter = randomizeStats(character, { 
      mode: savedMode as any,
      preserveAge: true,
      preserveEducation: true 
    });

    return {
      character: randomizedCharacter,
      currentEvent: null,
      gameStarted: false,
      gameOver: false,
      eventHistory: [],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map(),
        choiceHistory: []
      }
    };
  });

  const handleRandomizeStats = () => {
    const savedMode = localStorage.getItem('bitlife-stat-randomization') || 'realistic';
    const randomizedCharacter = randomizeStats(gameState.character, {
      mode: savedMode as any,
      preserveAge: true,
      preserveEducation: true,
      preserveWealth: false
    });

    setGameState(prev => ({
      ...prev,
      character: randomizedCharacter
    }));
  };

  const handleNewGame = () => {
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1;
    const randomName = generateRandomName();
    const savedMode = localStorage.getItem('bitlife-stat-randomization') || 'realistic';

    const newCharacter = getRandomizedNewCharacter({
      name: randomName,
      id: 'player'
    }, savedMode as any);

    setGameState({
      character: newCharacter,
      currentEvent: null,
      gameStarted: false,
      gameOver: false,
      eventHistory: [],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map(),
        choiceHistory: []
      }
    });
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const handleCustomCharacterCreate = (character: Character) => {
    setGameState({
      character,
      currentEvent: null,
      gameStarted: false,
      gameOver: false,
      eventHistory: [],
      achievements: [],
      eventTracker: {
        triggeredEvents: new Set(),
        lastEventAge: 0,
        eventCooldowns: new Map(),
        choiceHistory: []
      }
    });
    setShowCharacterCustomization(false);
  };

  return (
    <div className="relative">
      <GameBoard 
        gameState={gameState} 
        onGameStateChange={setGameState}
        onOpenSettings={() => setShowSettings(true)}
      />

      <GameSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onNewGame={handleNewGame}
        onRandomizeStats={handleRandomizeStats}
        onCustomCharacter={() => {
          setShowSettings(false);
          setShowCharacterCustomization(true);
        }}
      />

      <CharacterCustomization
        isOpen={showCharacterCustomization}
        onClose={() => setShowCharacterCustomization(false)}
        onCreateCharacter={handleCustomCharacterCreate}
        initialCharacter={{
          name: generateRandomName(),
          happiness: 50,
          health: 50,
          smarts: 50,
          looks: 50
        }}
      />
    </div>
  );
};

export default Index;
