
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character, LifeEvent, GameState } from '../types/game';
import { generateRandomName, generateRandomStats, applyStatEffects, isGameOver } from '../utils/gameUtils';
import { getRandomEvent } from '../data/lifeEvents';
import { CharacterStats } from './CharacterStats';
import { EventCard } from './EventCard';
import { GameOverScreen } from './GameOverScreen';
import { toast } from '@/hooks/use-toast';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    character: {
      name: '',
      age: 18,
      year: new Date().getFullYear(),
      ...generateRandomStats()
    },
    currentEvent: null,
    gameStarted: false,
    gameOver: false
  });

  const startNewGame = () => {
    const newCharacter: Character = {
      name: generateRandomName(),
      age: 18,
      year: new Date().getFullYear(),
      ...generateRandomStats()
    };

    setGameState({
      character: newCharacter,
      currentEvent: getRandomEvent(),
      gameStarted: true,
      gameOver: false
    });

    toast({
      title: `Welcome to life, ${newCharacter.name}! 👋`,
      description: 'Your journey begins now. Make wise choices!',
    });
  };

  const ageUp = () => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const newAge = gameState.character.age + 1;
    const newYear = gameState.character.year + 1;
    
    // Natural aging effects
    const agingEffects = {
      health: newAge > 60 ? -2 : newAge > 40 ? -1 : 0,
      happiness: 0,
      wealth: Math.floor(Math.random() * 20) + 10, // Small income each year
      relationships: 0
    };

    const updatedCharacter = applyStatEffects(
      { ...gameState.character, age: newAge, year: newYear },
      agingEffects
    );

    const gameOverCheck = isGameOver(updatedCharacter);
    
    if (gameOverCheck.gameOver) {
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        gameOver: true,
        gameOverReason: gameOverCheck.reason,
        currentEvent: null
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: getRandomEvent()
    }));

    toast({
      title: `Happy ${newAge}th Birthday! 🎂`,
      description: `Welcome to ${newYear}!`,
    });
  };

  const handleChoice = (choiceId: string) => {
    if (!gameState.currentEvent) return;

    const choice = gameState.currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const updatedCharacter = applyStatEffects(gameState.character, choice.effects);
    
    const gameOverCheck = isGameOver(updatedCharacter);
    
    if (gameOverCheck.gameOver) {
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        gameOver: true,
        gameOverReason: gameOverCheck.reason,
        currentEvent: null
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: null
    }));

    toast({
      title: 'Choice made! 🎯',
      description: choice.text,
    });
  };

  if (gameState.gameOver) {
    return (
      <GameOverScreen 
        character={gameState.character}
        reason={gameState.gameOverReason}
        onRestart={startNewGame}
      />
    );
  }

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen bg-game-bg flex items-center justify-center p-4 font-nunito">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary mb-2">
              🌟 LifeSim
            </CardTitle>
            <p className="text-game-text text-lg">
              Navigate through life's choices and create your unique story
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={startNewGame}
              className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
            >
              🚀 Start Your Life
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg p-4 font-nunito">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            🌟 LifeSim
          </h1>
          <p className="text-game-text">
            Living as {gameState.character.name} - Age {gameState.character.age} ({gameState.character.year})
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <CharacterStats character={gameState.character} />
            
            <Card>
              <CardContent className="p-4">
                <Button 
                  onClick={ageUp}
                  className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
                  disabled={!!gameState.currentEvent}
                >
                  🎂 Age Up (+1 Year)
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            {gameState.currentEvent ? (
              <EventCard 
                event={gameState.currentEvent}
                onChoice={handleChoice}
              />
            ) : (
              <Card className="animate-fade-in">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">😴</div>
                  <h3 className="text-xl font-semibold text-game-text mb-2">
                    Peaceful Times
                  </h3>
                  <p className="text-gray-600">
                    Nothing exciting is happening right now. Age up to continue your journey!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
