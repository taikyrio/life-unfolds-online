
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character, LifeEvent, GameState } from '../types/game';
import { generateRandomName, generateRandomStats, applyStatEffects, isGameOver, getLifeStage } from '../utils/gameUtils';
import { getRandomEvent } from '../data/lifeEvents';
import { CharacterStats } from './CharacterStats';
import { EventCard } from './EventCard';
import { GameOverScreen } from './GameOverScreen';
import { toast } from '@/hooks/use-toast';

const GameBoard: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    character: {
      name: '',
      age: 0,
      year: new Date().getFullYear(),
      ...generateRandomStats()
    },
    currentEvent: null,
    gameStarted: false,
    gameOver: false,
    eventHistory: [],
    achievements: []
  });

  const startNewGame = () => {
    const newCharacter: Character = {
      name: generateRandomName(),
      age: 0,
      year: new Date().getFullYear(),
      ...generateRandomStats()
    };

    setGameState({
      character: newCharacter,
      currentEvent: null,
      gameStarted: true,
      gameOver: false,
      eventHistory: [`${newCharacter.name} was born in ${newCharacter.birthplace}!`],
      achievements: []
    });

    toast({
      title: `Welcome to life, ${newCharacter.name}! 👶`,
      description: `Born in ${newCharacter.birthplace}. Your journey begins...`,
    });
  };

  const ageUp = () => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const newAge = gameState.character.age + 1;
    const newYear = gameState.character.year + 1;
    
    // Natural aging effects
    let agingEffects: any = {
      health: newAge > 60 ? -2 : newAge > 40 ? -1 : newAge > 20 ? 0 : 1,
      happiness: 0,
      wealth: 0,
      relationships: 0
    };

    // Age-based income from jobs
    if (gameState.character.job && gameState.character.salary > 0) {
      agingEffects.wealth = gameState.character.salary;
    }

    // Education progression
    if (newAge === 6) agingEffects.education = 'Elementary School';
    if (newAge === 14) agingEffects.education = 'High School';

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

    // Generate age-appropriate event
    const newEvent = Math.random() > 0.3 ? getRandomEvent(updatedCharacter) : null;
    
    const ageMessage = `${updatedCharacter.name} turned ${newAge}!`;
    
    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: newEvent,
      eventHistory: [ageMessage, ...prev.eventHistory.slice(0, 9)] // Keep last 10 events
    }));

    toast({
      title: `Happy ${newAge}th Birthday! 🎂`,
      description: `Welcome to ${newYear}! You are now ${getLifeStage(newAge).toLowerCase()}.`,
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

    const eventMessage = `${gameState.currentEvent.title}: ${choice.text}`;
    
    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: null,
      eventHistory: [eventMessage, ...prev.eventHistory.slice(0, 9)]
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
            <p className="text-sm text-gray-600 mt-2">
              Inspired by BitLife - Make decisions that shape your character's destiny
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={startNewGame}
              className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
            >
              🍼 Start Your Life
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-bg p-4 font-nunito">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            🌟 LifeSim
          </h1>
          <p className="text-game-text">
            Living as {gameState.character.name} - {getLifeStage(gameState.character.age)} Age {gameState.character.age} ({gameState.character.year})
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
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
                    Nothing exciting is happening right now. Age up to continue your journey through life!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-game-text flex items-center gap-2">
                  📖 Life Journal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {gameState.eventHistory.length > 0 ? (
                    gameState.eventHistory.map((event, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border-l-4 border-primary/30"
                      >
                        {event}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">
                      Your life story will appear here...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
