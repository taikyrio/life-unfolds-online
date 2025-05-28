import React, { useState, useEffect } from 'react';
import { Character, LifeEvent, GameState } from '../types/game';
import { generateRandomName, generateRandomStats, applyStatEffects, isGameOver, getLifeStage } from '../utils/gameUtils';
import { getRandomEvent, createEventTracker } from '../data/lifeEvents';
import { CharacterHeader } from './CharacterHeader';
import { BottomNavigation } from './BottomNavigation';
import { LifeTab } from './LifeTab';
import { ActivitiesTab } from './ActivitiesTab';
import { CareersTab } from './CareersTab';
import { RelationshipsTab } from './RelationshipsTab';
import { AssetsTab } from './AssetsTab';
import { GameOverScreen } from './GameOverScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '../hooks/use-mobile';
import { EventCard } from './EventCard';

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
    achievements: [],
    eventTracker: createEventTracker()
  });

  const isMobile = useIsMobile();

  const startNewGame = () => {
    const newCharacter: Character = {
      name: generateRandomName(),
      age: 0,
      year: new Date().getFullYear(),
      ...generateRandomStats()
    };

    // Generate birth event message with enhanced details
    const birthMessage = `${newCharacter.name} was born in ${newCharacter.birthplace}! ${newCharacter.zodiacSign.emoji} ${newCharacter.zodiacSign.name} • ${newCharacter.birthWeight.toFixed(1)} lbs${newCharacter.premature ? ' (Premature)' : ''}`;

    setGameState({
      character: newCharacter,
      currentEvent: null,
      gameStarted: true,
      gameOver: false,
      eventHistory: [birthMessage],
      achievements: [],
      eventTracker: createEventTracker()
    });

    // Welcome message removed - no toast notifications
  };

  const ageUp = () => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const newAge = gameState.character.age + 1;
    const newYear = gameState.character.year + 1;

    // Natural aging effects with zodiac influence
    let agingEffects: any = {
      health: newAge > 60 ? -2 : newAge > 40 ? -1 : newAge > 20 ? 0 : 1,
      happiness: 0,
      wealth: 0,
      relationships: 0
    };

    // Zodiac-based aging effects
    const zodiac = gameState.character.zodiacSign;
    if (zodiac.element === 'water' && newAge > 50) agingEffects.health += 1; // Water signs age better
    if (zodiac.element === 'fire' && newAge < 30) agingEffects.happiness += 2; // Fire signs happier when young

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

    // Generate age-appropriate event using event tracker
    const newEvent = Math.random() > 0.15 ? getRandomEvent(updatedCharacter, gameState.eventTracker) : null;

    const ageMessage = `${updatedCharacter.name} turned ${newAge}!`;

    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: newEvent,
      eventHistory: [ageMessage, ...prev.eventHistory.slice(0, 9)]
    }));

    // Event notifications removed - no toast notifications
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

    // Choice notification removed - no toast notifications
  };

  const handleActivity = (activityType: string, activityId: string) => {
    let effects: any = {};
    let message = '';
    
    // Consolidated activity system based on life stage
    const lifeStage = getLifeStage(gameState.character.age);
    
    // Early Childhood Activities
    if (gameState.character.age < 6) {
      switch (activityId) {
        case 'play_toys':
          effects = { happiness: 15, smarts: 5 };
          message = 'You had fun playing with toys and learned something new!';
          break;
        case 'watch_cartoons':
          effects = { happiness: 10, smarts: 2 };
          message = 'You watched cartoons and laughed a lot!';
          break;
        case 'nap':
          effects = { health: 10, happiness: 5 };
          message = 'You took a nice nap and feel refreshed!';
          break;
      }
    }
    
    // School Activities
    else if (activityType === 'school activities') {
      switch (activityId) {
        case 'study_harder':
          effects = { smarts: 15, happiness: -5 };
          message = 'You studied harder and improved your grades!';
          break;
        case 'join_club':
          effects = { relationships: 20, happiness: 15, smarts: 5 };
          message = 'You joined a school club and made new friends!';
          break;
        case 'sports_team':
          effects = { health: 15, relationships: 15, looks: 5, happiness: 10 };
          message = 'You joined the sports team and got in great shape!';
          break;
        case 'school_play':
          effects = { happiness: 20, looks: 10, relationships: 10 };
          message = 'You performed in the school play and got applause!';
          break;
        case 'tutoring':
          effects = { smarts: 20, wealth: -50 };
          message = 'The tutor helped you understand difficult subjects!';
          break;
      }
    }
    
    // Career Activities
    else if (activityType === 'career') {
      switch (activityId) {
        case 'work_harder':
          effects = { wealth: 25, happiness: -5 };
          message = 'You worked extra hard and impressed your boss!';
          break;
        case 'ask_promotion':
          const promotionChance = Math.random();
          if (promotionChance > 0.6) {
            effects = { salary: 20, happiness: 25 };
            message = 'Congratulations! You got promoted!';
          } else {
            effects = { happiness: -10 };
            message = 'Your promotion request was denied. Maybe next time.';
          }
          break;
        case 'job_search':
          effects = { happiness: 5 };
          message = 'You spent time looking for new job opportunities.';
          break;
        case 'freelance':
          effects = { wealth: Math.floor(Math.random() * 100) + 50, happiness: 10 };
          message = 'You earned some extra money from freelance work!';
          break;
        case 'night_school':
          effects = { smarts: 25, wealth: -100, happiness: -5 };
          message = 'You attended night school and expanded your knowledge!';
          break;
      }
    }
    
    // Health & Fitness Activities
    else if (activityType === 'health & fitness') {
      switch (activityId) {
        case 'gym':
          effects = { health: 15, looks: 10, wealth: -30, happiness: 10 };
          message = 'You had a great workout at the gym!';
          break;
        case 'doctor':
          effects = { health: 20, wealth: -75 };
          message = 'The doctor gave you a clean bill of health!';
          break;
        case 'meditation':
          effects = { happiness: 20, health: 5 };
          message = 'You found inner peace through meditation.';
          break;
        case 'diet':
          effects = { health: 10, looks: 5, happiness: 5 };
          message = 'You started eating healthier and feel great!';
          break;
      }
    }
    
    // Social & Entertainment Activities
    else if (activityType === 'social & entertainment' || activityType === 'social life') {
      switch (activityId) {
        case 'hang_friends':
          effects = { happiness: 20, relationships: 15 };
          message = 'You had a great time hanging out with friends!';
          break;
        case 'school_dance':
          effects = { happiness: 25, relationships: 10, looks: 5 };
          message = 'You danced the night away at the school dance!';
          break;
        case 'study_group':
          effects = { smarts: 10, relationships: 10, happiness: 5 };
          message = 'Studying with friends made learning more fun!';
          break;
        case 'party':
          const partyOutcome = Math.random();
          if (partyOutcome > 0.8) {
            effects = { happiness: 30, relationships: 20, health: -10 };
            message = 'You had an amazing time at the party!';
          } else if (partyOutcome > 0.6) {
            effects = { happiness: 15, relationships: 10 };
            message = 'You enjoyed the party and met some interesting people.';
          } else {
            effects = { happiness: -10, health: -5, relationships: -5 };
            message = 'The party got out of hand and you regret going.';
          }
          break;
        case 'vacation':
          effects = { happiness: 40, health: 15, wealth: -200 };
          message = 'You had a relaxing and rejuvenating vacation!';
          break;
        case 'volunteer':
          effects = { happiness: 25, relationships: 15 };
          message = 'Volunteering made you feel good about helping others!';
          break;
        case 'hobby':
          effects = { happiness: 20, smarts: 10 };
          message = 'You learned a new hobby and had fun doing it!';
          break;
      }
    }
    
    // Risky Activities
    else if (activityType === 'risky activities') {
      switch (activityId) {
        case 'gamble':
          const gambleOutcome = Math.random();
          if (gambleOutcome > 0.7) {
            effects = { wealth: Math.floor(Math.random() * 200) + 100, happiness: 30 };
            message = 'Lucky you! You won big at gambling!';
          } else {
            effects = { wealth: -Math.floor(Math.random() * 150) - 50, happiness: -20 };
            message = 'You lost money gambling. Maybe it\'s time to quit.';
          }
          break;
        case 'street_race':
          const raceOutcome = Math.random();
          if (raceOutcome > 0.8) {
            effects = { happiness: 25, wealth: 100 };
            message = 'You won the street race and earned some prize money!';
          } else if (raceOutcome > 0.4) {
            effects = { happiness: 10 };
            message = 'You lost the race but had an adrenaline rush!';
          } else {
            effects = { health: -20, wealth: -300, happiness: -15 };
            message = 'You crashed during the race and got injured!';
          }
          break;
        case 'shoplift':
          const stealOutcome = Math.random();
          if (stealOutcome > 0.6) {
            effects = { wealth: 25, happiness: 10 };
            message = 'You got away with shoplifting some small items.';
          } else {
            effects = { criminalRecord: true, happiness: -25, relationships: -15 };
            message = 'You got caught shoplifting and now have a criminal record!';
          }
          break;
      }
    }

    if (Object.keys(effects).length > 0) {
      const updatedCharacter = applyStatEffects(gameState.character, effects);
      
      // Consolidate into yearly entry instead of individual activities
      const yearEntry = `Age ${gameState.character.age}: ${message}`;
      
      // Check if there's already an entry for this age
      const existingEntryIndex = gameState.eventHistory.findIndex(entry => 
        entry.startsWith(`Age ${gameState.character.age}:`)
      );
      
      let newEventHistory;
      if (existingEntryIndex !== -1) {
        // Replace existing entry for this age
        newEventHistory = [...gameState.eventHistory];
        newEventHistory[existingEntryIndex] = yearEntry;
      } else {
        // Add new entry and limit to last 10 years
        newEventHistory = [yearEntry, ...gameState.eventHistory.slice(0, 9)];
      }
      
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        eventHistory: newEventHistory
      }));

      // Auto-navigate to Life tab
      setActiveTab('life');

      // Activity notification removed - no toast notifications
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
      // Job quit notification removed - no toast notifications
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
      // Job hired notification removed - no toast notifications
    }
  };

  const renderTabContent = () => {
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
        return <RelationshipsTab character={gameState.character} />;
      case 'assets':
        return (
          <div className="text-center py-8 px-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Assets</h2>
            <p className="text-gray-600">Coming soon! Buy property, vehicles, and luxury items.</p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAgeButton = () => {
    // Age button is now handled by BottomNavigation
    return null;
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-nunito">
        <Card className="w-full max-w-sm sm:max-w-md animate-scale-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              🌟 LifeSim
            </CardTitle>
            <p className="text-game-text text-base sm:text-lg">
              Navigate through life's choices and create your unique story
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Inspired by BitLife - Make decisions that shape your character's destiny
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={startNewGame}
              className="w-full py-2 sm:py-3 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-105"
            >
              🍼 Start Your Life
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-nunito">
      {/* BitLife-style header */}
      <div className="bg-red-500 p-3 text-center">
        <h1 className="text-2xl font-bold text-white">
          🌟 LifeSim
        </h1>
      </div>

      <CharacterHeader character={gameState.character} />

      {renderTabContent()}

      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onAgeUp={ageUp}
      />
      
      {/* Event Modal Overlay */}
      {gameState.currentEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <EventCard event={gameState.currentEvent} onChoice={handleChoice} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
