
import React, { useState, useEffect } from 'react';
import { Character, LifeEvent, GameState } from '../types/game';
import { generateRandomName, generateRandomStats, applyStatEffects, isGameOver, getLifeStage } from '../utils/gameUtils';
import { getRandomEvent } from '../data/lifeEvents';
import { CharacterHeader } from './CharacterHeader';
import { BottomNavigation } from './BottomNavigation';
import { LifeTab } from './LifeTab';
import { ActivitiesTab } from './ActivitiesTab';
import { CareersTab } from './CareersTab';
import { GameOverScreen } from './GameOverScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const GameBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets'>('life');
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
      eventHistory: [ageMessage, ...prev.eventHistory.slice(0, 9)]
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

  const handleActivity = (activityType: string, activityId: string) => {
    // Activity system implementation
    let effects: any = {};
    let message = '';

    // Education activities
    if (activityType === 'education') {
      switch (activityId) {
        case 'study':
          effects = { smarts: 5, happiness: -2 };
          message = 'You studied hard and improved your knowledge!';
          break;
        case 'library':
          effects = { smarts: 3, happiness: 1 };
          message = 'You spent time reading at the library.';
          break;
        case 'tutor':
          effects = { smarts: 10, wealth: -100 };
          message = 'You hired a tutor and learned a lot!';
          break;
      }
    }
    // Health activities
    else if (activityType === 'health & fitness') {
      switch (activityId) {
        case 'gym':
          effects = { health: 5, looks: 3, wealth: -20 };
          message = 'You worked out at the gym!';
          break;
        case 'doctor':
          effects = { health: 10, wealth: -50 };
          message = 'You visited the doctor for a checkup.';
          break;
        case 'meditation':
          effects = { happiness: 8, health: 2 };
          message = 'You meditated and found inner peace.';
          break;
      }
    }

    if (Object.keys(effects).length > 0) {
      const updatedCharacter = applyStatEffects(gameState.character, effects);
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        eventHistory: [message, ...prev.eventHistory.slice(0, 9)]
      }));

      toast({
        title: 'Activity completed! 🎯',
        description: message,
      });
    }
  };

  const handleJobApplication = (jobId: string) => {
    if (jobId === 'quit') {
      const updatedCharacter = { ...gameState.character, job: undefined, salary: 0, jobLevel: 0 };
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        eventHistory: [`${gameState.character.name} quit their job.`, ...prev.eventHistory.slice(0, 9)]
      }));
      toast({
        title: 'Job quit! 💼',
        description: 'You are now unemployed.',
      });
      return;
    }

    // Job application logic would go here
    const jobTitles: { [key: string]: { title: string; salary: number } } = {
      retail_worker: { title: 'Retail Worker', salary: 25 },
      fast_food: { title: 'Fast Food Worker', salary: 20 },
      office_assistant: { title: 'Office Assistant', salary: 35 },
      teacher: { title: 'Teacher', salary: 50 },
      doctor: { title: 'Doctor', salary: 120 },
      lawyer: { title: 'Lawyer', salary: 100 },
    };

    const job = jobTitles[jobId];
    if (job) {
      const updatedCharacter = { 
        ...gameState.character, 
        job: job.title, 
        salary: job.salary, 
        jobLevel: 1 
      };
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        eventHistory: [`${gameState.character.name} got hired as a ${job.title}!`, ...prev.eventHistory.slice(0, 9)]
      }));
      toast({
        title: 'Congratulations! 🎉',
        description: `You got the job as ${job.title}!`,
      });
    }
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

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'life':
        return (
          <LifeTab
            character={gameState.character}
            currentEvent={gameState.currentEvent}
            onAgeUp={ageUp}
            onChoice={handleChoice}
            eventHistory={gameState.eventHistory}
          />
        );
      case 'activities':
        return <ActivitiesTab character={gameState.character} onActivity={handleActivity} />;
      case 'careers':
        return <CareersTab character={gameState.character} onJobApplication={handleJobApplication} />;
      case 'relationships':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-game-text mb-4">Relationships</h2>
            <p className="text-gray-600">Coming soon! Manage your relationships with family and friends.</p>
          </div>
        );
      case 'assets':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-game-text mb-4">Assets</h2>
            <p className="text-gray-600">Coming soon! Buy property, vehicles, and luxury items.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-game-bg pb-20 font-nunito">
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">
            🌟 LifeSim
          </h1>
        </div>

        <CharacterHeader character={gameState.character} />
        
        {renderActiveTab()}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default GameBoard;
