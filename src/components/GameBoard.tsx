
import React, { useState, useEffect } from 'react';
import { Character, LifeEvent, GameState } from '../types/game';
import { 
  generateRandomName, 
  generateRandomStats, 
  applyStatEffects, 
  isGameOver, 
  getLifeStage, 
  ageFamilyMembers, 
  generateNewRelationships, 
  findLove,
  intimateActivity,
  proposeMariage,
  getMarried,
  giveGift,
  haveBaby,
  generateInitialFamily
} from '../utils/gameUtils';
import { evolveStatsNaturally, getStatMessage } from '../utils/statEvolution';
import { getRandomEvent, createEventTracker } from '../data/lifeEvents';
import { dynamicEventSystem } from '../data/dynamicEvents';
import { 
  shouldAutoEnrollInSchool, 
  enrollInEducation, 
  progressEducation, 
  generateRandomName as generateEducationName 
} from '../utils/educationUtils';
import { CharacterHeader } from './CharacterHeader';
import { BottomNavigation } from './BottomNavigation';
import { LifeTab } from './LifeTab';
import { ActivitiesTab } from './ActivitiesTab';
import { CareersTab } from './CareersTab';
import { RelationshipsTab } from './RelationshipsTab';
import { EducationTab } from './EducationTab';
import { AssetsTab } from './AssetsTab';
import { GameOverScreen } from './GameOverScreen';
import { GameSettings } from './GameSettings';
import { ActivitiesMenu } from './menus/ActivitiesMenu';
import { RelationshipsMenu } from './menus/RelationshipsMenu';
import { AssetsMenu } from './menus/AssetsMenu';
import { CharacterStatsBar } from './stats/CharacterStatsBar';
import { CareerSelectionModal } from './CareerSelectionModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '../hooks/use-mobile';
import { EventCard } from './EventCard';

const GameBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'education' | 'assets'>('life');
  const [showSettings, setShowSettings] = useState(false);
  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);
  const [showRelationshipsMenu, setShowRelationshipsMenu] = useState(false);
  const [showAssetsMenu, setShowAssetsMenu] = useState(false);
  const [showCareerSelection, setShowCareerSelection] = useState(false);
  const [ageHistory, setAgeHistory] = useState<Array<{age: number, events: string[]}>>([]);
  const [gameState, setGameState] = useState<GameState>({
    character: {
      name: '',
      age: 0,
      year: new Date().getFullYear(),
      education: [],
      assets: [],
      birthMonth: 1,
      birthDay: 1,
      pets: [],
      fame: 0,
      nationality: 'American',
      birthComplications: false,
      familyMembers: [],
      ...generateRandomStats()
    },
    currentEvent: null,
    gameStarted: true,
    gameOver: false,
    eventHistory: [],
    achievements: [],
    eventTracker: createEventTracker()
  });

  const isMobile = useIsMobile();

  // Initialize game immediately
  useEffect(() => {
    if (!gameState.gameStarted || gameState.character.name === '') {
      startNewGame();
    }
  }, []);

  const startNewGame = () => {
    const baseCharacter = {
      name: generateEducationName(),
      age: 0,
      year: new Date().getFullYear(),
      education: [],
      assets: [],
      birthMonth: Math.floor(Math.random() * 12) + 1,
      birthDay: Math.floor(Math.random() * 28) + 1,
      pets: [],
      fame: 0,
      nationality: 'American',
      birthComplications: false,
      ...generateRandomStats()
    };

    const familyMembers = generateInitialFamily();
    const newCharacter: Character = {
      ...baseCharacter,
      familyMembers
    };

    const birthMessage = `I was born a ${Math.random() > 0.5 ? 'male' : 'female'} in ${newCharacter.birthplace}. My name is ${newCharacter.name}.`;

    setGameState({
      character: newCharacter,
      currentEvent: null,
      gameStarted: true,
      gameOver: false,
      eventHistory: [birthMessage],
      achievements: [],
      eventTracker: createEventTracker()
    });

    setAgeHistory([{
      age: 0,
      events: [birthMessage]
    }]);
  };

  const addEventToCurrentAge = (event: string) => {
    setAgeHistory(prev => {
      const currentAge = gameState.character.age;
      const existingAgeIndex = prev.findIndex(entry => entry.age === currentAge);
      
      if (existingAgeIndex !== -1) {
        const updated = [...prev];
        updated[existingAgeIndex] = {
          ...updated[existingAgeIndex],
          events: [...updated[existingAgeIndex].events, event]
        };
        return updated;
      } else {
        return [...prev, { age: currentAge, events: [event] }];
      }
    });
  };

  const ageUp = () => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const newAge = gameState.character.age + 1;
    const newYear = gameState.character.year + 1;

    // Advanced stat evolution system
    let updatedCharacter = { ...gameState.character, age: newAge, year: newYear };
    
    // Apply natural stat evolution
    const statEvolution = evolveStatsNaturally(updatedCharacter);
    updatedCharacter = { ...updatedCharacter, ...statEvolution };
    
    // Generate messages for significant stat changes
    const statMessages: string[] = [];
    Object.entries(statEvolution).forEach(([statName, newValue]) => {
      if (typeof newValue === 'number') {
        const oldValue = gameState.character[statName as keyof Character] as number;
        if (typeof oldValue === 'number') {
          const change = newValue - oldValue;
          const message = getStatMessage(statName, change);
          if (message) statMessages.push(message);
        }
      }
    });
    
    // Add stat messages to current age events
    statMessages.forEach(message => addEventToCurrentAge(message));

    // Zodiac influences (more pronounced)
    const zodiac = gameState.character.zodiacSign;
    const zodiacEffects: any = {};
    if (zodiac.element === 'water') {
      zodiacEffects.health = 1;
      zodiacEffects.happiness = 1;
    } else if (zodiac.element === 'fire') {
      zodiacEffects.happiness = 2;
      zodiacEffects.relationships = 1;
    } else if (zodiac.element === 'earth') {
      zodiacEffects.health = 1;
      zodiacEffects.smarts = 1;
    } else if (zodiac.element === 'air') {
      zodiacEffects.smarts = 2;
      zodiacEffects.relationships = 1;
    }
    
    updatedCharacter = applyStatEffects(updatedCharacter, zodiacEffects);

    // Add new age entry to history
    const newAgeMessage = `I am now ${newAge} years old.`;
    setAgeHistory(prev => [...prev, { age: newAge, events: [newAgeMessage] }]);

    // Check for auto-enrollment in school
    const autoEnrollLevel = shouldAutoEnrollInSchool(updatedCharacter);
    if (autoEnrollLevel) {
      const enrollResult = enrollInEducation(updatedCharacter, autoEnrollLevel);
      if (enrollResult.success && enrollResult.updatedCharacter) {
        updatedCharacter = enrollResult.updatedCharacter;
        addEventToCurrentAge(enrollResult.message);
        setGameState(prev => ({
          ...prev,
          character: updatedCharacter
        }));
        return;
      }
    }

    // Progress education if enrolled
    if (updatedCharacter.currentEducation) {
      const progressResult = progressEducation(updatedCharacter);
      if (progressResult.success && progressResult.updatedCharacter) {
        updatedCharacter = progressResult.updatedCharacter;
        
        let message = progressResult.message;
        if (progressResult.graduated) {
          message = `🎓 ${message}`;
          
          // Show career selection after graduation
          if (updatedCharacter.age >= 18 && !updatedCharacter.job) {
            setTimeout(() => {
              setShowCareerSelection(true);
            }, 1000);
          }
        }
        
        addEventToCurrentAge(message);
        setGameState(prev => ({
          ...prev,
          character: updatedCharacter
        }));
        return;
      }
    }

    if (updatedCharacter.isPregnant) {
      const pregnancyMonths = (updatedCharacter.pregnancyMonths || 0) + 1;
      
      if (pregnancyMonths >= 9) {
        const babyName = prompt('👶 Your baby is being born! What would you like to name them?');
        if (babyName && babyName.trim()) {
          const birthResult = haveBaby(updatedCharacter, babyName);
          
          if (birthResult.success && birthResult.baby) {
            updatedCharacter.familyMembers = [...updatedCharacter.familyMembers, birthResult.baby];
            updatedCharacter.children = [...updatedCharacter.children, birthResult.baby.name];
            updatedCharacter.isPregnant = false;
            updatedCharacter.pregnancyMonths = 0;
            
            addEventToCurrentAge(birthResult.message);
            setGameState(prev => ({
              ...prev,
              character: updatedCharacter
            }));
            return;
          }
        } else {
          const defaultNames = ['Baby', 'Jordan', 'Alex', 'Casey', 'Riley'];
          const defaultName = defaultNames[Math.floor(Math.random() * defaultNames.length)];
          const birthResult = haveBaby(updatedCharacter, defaultName);
          
          if (birthResult.success && birthResult.baby) {
            updatedCharacter.familyMembers = [...updatedCharacter.familyMembers, birthResult.baby];
            updatedCharacter.children = [...updatedCharacter.children, birthResult.baby.name];
            updatedCharacter.isPregnant = false;
            updatedCharacter.pregnancyMonths = 0;
            
            addEventToCurrentAge(birthResult.message);
            setGameState(prev => ({
              ...prev,
              character: updatedCharacter
            }));
            return;
          }
        }
      } else {
        updatedCharacter.pregnancyMonths = pregnancyMonths;
      }
    }

    updatedCharacter.familyMembers = ageFamilyMembers(updatedCharacter.familyMembers);
    const newRelationships = generateNewRelationships(updatedCharacter);
    updatedCharacter.familyMembers = [...updatedCharacter.familyMembers, ...newRelationships];

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

    // Use dynamic event system for more sophisticated events
    let newEvent = null;
    if (Math.random() > 0.25) { // 75% chance of event
      const availableEvents = dynamicEventSystem.getAvailableEvents(updatedCharacter, gameState.eventTracker);
      newEvent = dynamicEventSystem.selectEvent(availableEvents);
      
      // Fallback to basic events if no dynamic events available
      if (!newEvent) {
        newEvent = getRandomEvent(updatedCharacter, gameState.eventTracker);
      }
    }

    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: newEvent
    }));
  };

  const handleChoice = (choiceId: string) => {
    if (!gameState.currentEvent) return;

    const choice = gameState.currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    let updatedCharacter = applyStatEffects(gameState.character, choice.effects);

    // Add event to tracker to prevent repeated events
    const updatedTracker = { ...gameState.eventTracker };
    updatedTracker.triggeredEvents.add(gameState.currentEvent.id);

    // Handle consequences
    const eventMessage = `${gameState.currentEvent.title}: ${choice.text}`;
    addEventToCurrentAge(eventMessage);

    // Add choice consequences if they exist
    if (choice.consequences) {
      choice.consequences.forEach(consequence => {
        addEventToCurrentAge(consequence);
      });
    }

    // Check for flags or special effects
    const currentEvent = gameState.currentEvent as any;
    if (currentEvent.flags) {
      // Store flags for future event conditions
      // This could be expanded to a proper flag system
      updatedCharacter.flags = [...(updatedCharacter.flags || []), ...currentEvent.flags];
    }

    const gameOverCheck = isGameOver(updatedCharacter);

    if (gameOverCheck.gameOver) {
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        gameOver: true,
        gameOverReason: gameOverCheck.reason,
        currentEvent: null,
        eventTracker: updatedTracker
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      character: updatedCharacter,
      currentEvent: null,
      eventTracker: updatedTracker
    }));
  };

  const handleEducationAction = (action: string, data?: any) => {
    const character = gameState.character;
    
    switch (action) {
      case 'enroll':
        const enrollResult = enrollInEducation(character, data.degreeType);
        if (enrollResult.success && enrollResult.updatedCharacter) {
          setGameState(prev => ({
            ...prev,
            character: enrollResult.updatedCharacter!,
            eventHistory: [enrollResult.message, ...prev.eventHistory.slice(0, 9)]
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            eventHistory: [enrollResult.message, ...prev.eventHistory.slice(0, 9)]
          }));
        }
        break;
        
      case 'dropout':
        if (character.currentEducation) {
          const updatedCharacter = {
            ...character,
            currentEducation: undefined,
            happiness: Math.max(0, character.happiness - 20)
          };
          setGameState(prev => ({
            ...prev,
            character: updatedCharacter,
            eventHistory: [`Dropped out of ${character.currentEducation!.institution}.`, ...prev.eventHistory.slice(0, 9)]
          }));
        }
        break;
        
      case 'study_hard':
        if (character.currentEducation) {
          const gpaIncrease = 0.1 + (Math.random() * 0.2);
          const newGpa = Math.min(4.0, character.currentEducation.gpa + gpaIncrease);
          const updatedCharacter = {
            ...character,
            currentEducation: {
              ...character.currentEducation,
              gpa: newGpa
            },
            smarts: Math.min(100, character.smarts + 5),
            happiness: Math.max(0, character.happiness - 5)
          };
          setGameState(prev => ({
            ...prev,
            character: updatedCharacter,
            eventHistory: [`Studied hard and improved GPA to ${newGpa.toFixed(2)}!`, ...prev.eventHistory.slice(0, 9)]
          }));
        }
        break;
        
      case 'interact_classmate':
        const classmate = data.classmate;
        const interactionOutcomes = [
          { message: `Had a great conversation with ${classmate.name}!`, effects: { happiness: 10, relationships: 5 } },
          { message: `Studied together with ${classmate.name}.`, effects: { smarts: 5, relationships: 8 } },
          { message: `${classmate.name} helped you with homework.`, effects: { smarts: 8, happiness: 5 } },
          { message: `Had lunch with ${classmate.name}.`, effects: { happiness: 8, relationships: 10 } }
        ];
        
        const outcome = interactionOutcomes[Math.floor(Math.random() * interactionOutcomes.length)];
        const updatedCharacter = applyStatEffects(character, outcome.effects);
        
        setGameState(prev => ({
          ...prev,
          character: updatedCharacter,
          eventHistory: [outcome.message, ...prev.eventHistory.slice(0, 9)]
        }));
        break;
    }
  };

  const handleActivity = (activityType: string, activityId: string) => {
    const character = gameState.character;
    let effects: any = {};
    let message = '';

    // Handle activity logic here...
    if (activityId === 'find_love') {
      if (character.age < 16) {
        message = "You're too young to seriously look for love!";
      } else {
        const loveResult = findLove(character);
        if (loveResult.success && loveResult.partner) {
          const updatedFamilyMembers = [...character.familyMembers, loveResult.partner];
          setGameState(prev => ({
            ...prev,
            character: {
              ...prev.character,
              familyMembers: updatedFamilyMembers,
              relationshipStatus: 'dating',
              partnerName: loveResult.partner!.name,
              happiness: Math.min(100, prev.character.happiness + 25),
              relationships: Math.min(100, prev.character.relationships + 15)
            }
          }));
          addEventToCurrentAge(loveResult.message);
          return;
        } else {
          message = loveResult.message;
        }
      }
    }

    // Early Childhood Activities (0-5)
    if (character.age < 6) {
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

    // School Activities (6-17)
    else if (activityType === 'school activities') {
      switch (activityId) {
        case 'study_harder':
          if (character.age < 6) {
            effects = {};
            message = 'You\'re too young for formal studying!';
          } else {
            effects = { smarts: 15, happiness: -5 };
            message = 'You studied harder and improved your grades!';
          }
          break;
        case 'join_club':
          if (character.age < 10) {
            effects = {};
            message = 'You\'re too young to join school clubs!';
          } else {
            effects = { relationships: 20, happiness: 15, smarts: 5 };
            message = 'You joined a school club and made new friends!';
          }
          break;
        case 'sports_team':
          if (character.age < 8) {
            effects = {};
            message = 'You\'re too young for organized sports!';
          } else {
            effects = { health: 15, relationships: 15, looks: 5, happiness: 10 };
            message = 'You joined the sports team and got in great shape!';
          }
          break;
        case 'school_play':
          if (character.age < 10) {
            effects = {};
            message = 'You\'re too young for school productions!';
          } else {
            effects = { happiness: 20, looks: 10, relationships: 10 };
            message = 'You performed in the school play and got applause!';
          }
          break;
        case 'tutoring':
          if (character.wealth < 50) {
            effects = {};
            message = 'You can\'t afford tutoring right now!';
          } else {
            effects = { smarts: 20, wealth: -50 };
            message = 'The tutor helped you understand difficult subjects!';
          }
          break;
      }
    }

    // Career Activities
    else if (activityType === 'career') {
      if (!character.job) {
        effects = {};
        message = 'You need a job first before you can do career activities!';
      } else {
        switch (activityId) {
          case 'work_harder':
            effects = { wealth: 25, happiness: -5 };
            message = 'You worked extra hard and impressed your boss!';
            break;
          case 'ask_promotion':
            const promotionChance = Math.random() + (character.smarts / 200) + (character.relationships / 200);
            if (promotionChance > 0.6) {
              effects = { salary: 20, happiness: 25, jobLevel: 1 };
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
            const freelanceEarnings = Math.floor(Math.random() * 100) + 50;
            effects = { wealth: freelanceEarnings, happiness: 10 };
            message = `You earned $${freelanceEarnings}k from freelance work!`;
            break;
          case 'night_school':
            if (character.wealth < 100) {
              effects = {};
              message = 'You can\'t afford night school right now!';
            } else {
              effects = { smarts: 25, wealth: -100, happiness: -5 };
              message = 'You attended night school and expanded your knowledge!';
            }
            break;
        }
      }
    }

    // Health & Fitness Activities
    else if (activityType === 'health & fitness') {
      switch (activityId) {
        case 'gym':
          if (character.age < 14) {
            effects = {};
            message = 'You\'re too young for the gym!';
          } else if (character.wealth < 30) {
            effects = {};
            message = 'You can\'t afford a gym membership!';
          } else {
            effects = { health: 15, looks: 10, wealth: -30, happiness: 10 };
            message = 'You had a great workout at the gym!';
          }
          break;
        case 'doctor':
          if (character.wealth < 75) {
            effects = {};
            message = 'You can\'t afford a doctor visit!';
          } else {
            effects = { health: 20, wealth: -75 };
            message = 'The doctor gave you a clean bill of health!';
          }
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
          if (character.relationships < 20) {
            effects = {};
            message = 'You don\'t have enough friends to hang out with!';
          } else {
            effects = { happiness: 20, relationships: 15 };
            message = 'You had a great time hanging out with friends!';
          }
          break;
        case 'school_dance':
          if (character.age < 13 || character.age > 18) {
            effects = {};
            message = 'School dances are only for teenagers!';
          } else {
            effects = { happiness: 25, relationships: 10, looks: 5 };
            message = 'You danced the night away at the school dance!';
          }
          break;
        case 'study_group':
          if (character.age < 10) {
            effects = {};
            message = 'You\'re too young for study groups!';
          } else {
            effects = { smarts: 10, relationships: 10, happiness: 5 };
            message = 'Studying with friends made learning more fun!';
          }
          break;
        case 'party':
          if (character.age < 16) {
            effects = {};
            message = 'You\'re too young to go to parties!';
          } else {
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
          }
          break;
        case 'vacation':
          if (character.wealth < 200) {
            effects = {};
            message = 'You can\'t afford a vacation right now!';
          } else {
            effects = { happiness: 40, health: 15, wealth: -200 };
            message = 'You had a relaxing and rejuvenating vacation!';
          }
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
      if (character.age < 18) {
        effects = {};
        message = 'You\'re too young for these risky activities!';
      } else {
        switch (activityId) {
          case 'gamble':
            if (character.wealth < 50) {
              effects = {};
              message = 'You don\'t have enough money to gamble!';
            } else {
              const gambleOutcome = Math.random();
              if (gambleOutcome > 0.7) {
                const winnings = Math.floor(Math.random() * 200) + 100;
                effects = { wealth: winnings, happiness: 30 };
                message = `Lucky you! You won $${winnings}k gambling!`;
              } else {
                const losses = -Math.floor(Math.random() * 150) - 50;
                effects = { wealth: losses, happiness: -20 };
                message = `You lost $${Math.abs(losses)}k gambling. Maybe it's time to quit.`;
              }
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
    }

    // Relationship Activities
    else if (activityType === 'relationship') {
      switch (activityId) {
        case 'date_night':
          const partner = character.familyMembers.find(m => 
            (m.relationship === 'lover' || m.relationship === 'spouse') && m.alive
          );
          if (!partner) {
            effects = {};
            message = 'You need to be in a relationship first!';
          } else if (character.wealth < 50) {
            effects = {};
            message = 'You can\'t afford a date night!';
          } else {
            effects = { happiness: 20, relationships: 15, wealth: -50 };
            message = `You had a wonderful date night with ${partner.name}!`;
          }
          break;
        case 'give_gift_flowers':
          const flowerPartner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
          if (!flowerPartner) {
            effects = {};
            message = 'You need to be in a relationship first!';
          } else {
            const flowerResult = giveGift(character, flowerPartner.id, 'flowers');
            if (flowerResult.success) {
              effects = { wealth: -flowerResult.cost, relationships: flowerResult.relationshipChange };
              message = flowerResult.message;
            } else {
              effects = {};
              message = flowerResult.message;
            }
          }
          break;
        case 'give_gift_jewelry':
          const jewelryPartner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
          if (!jewelryPartner) {
            effects = {};
            message = 'You need to be in a relationship first!';
          } else {
            const jewelryResult = giveGift(character, jewelryPartner.id, 'jewelry');
            if (jewelryResult.success) {
              effects = { wealth: -jewelryResult.cost, relationships: jewelryResult.relationshipChange };
              message = jewelryResult.message;
            } else {
              effects = {};
              message = jewelryResult.message;
            }
          }
          break;
        case 'give_gift_expensive':
          const expensivePartner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
          if (!expensivePartner) {
            effects = {};
            message = 'You need to be in a relationship first!';
          } else {
            const expensiveResult = giveGift(character, expensivePartner.id, 'expensive');
            if (expensiveResult.success) {
              effects = { wealth: -expensiveResult.cost, relationships: expensiveResult.relationshipChange };
              message = expensiveResult.message;
            } else {
              effects = {};
              message = expensiveResult.message;
            }
          }
          break;
        case 'intimate_protected':
          const protectedResult = intimateActivity(character, true);
          if (protectedResult.success) {
            effects = { happiness: 15, relationships: 10 };
            message = protectedResult.message;
            if (protectedResult.pregnant) {
              effects.isPregnant = true;
              effects.pregnancyMonths = 0;
            }
          } else {
            effects = {};
            message = protectedResult.message;
          }
          break;
        case 'intimate_unprotected':
          const unprotectedResult = intimateActivity(character, false);
          if (unprotectedResult.success) {
            effects = { happiness: 20, relationships: 15 };
            message = unprotectedResult.message;
            if (unprotectedResult.pregnant) {
              effects.isPregnant = true;
              effects.pregnancyMonths = 0;
            }
          } else {
            effects = {};
            message = unprotectedResult.message;
          }
          break;
        case 'propose':
          const proposalResult = proposeMariage(character);
          if (proposalResult.success && proposalResult.accepted) {
            effects = { relationshipStatus: 'engaged', happiness: 30, relationships: 25 };
            message = proposalResult.message;
          } else {
            effects = { happiness: -15, relationships: -10 };
            message = proposalResult.message;
          }
          break;
        case 'plan_wedding':
          const weddingResult = getMarried(character);
          if (weddingResult.success) {
            effects = { 
              relationshipStatus: 'married', 
              happiness: 40, 
              relationships: 30,
              wealth: -(weddingResult.weddingCost || 0)
            };
            message = weddingResult.message;
            
            setGameState(prev => {
              const updatedFamilyMembers = prev.character.familyMembers.map(member => 
                member.relationship === 'lover' ? { ...member, relationship: 'spouse' as any } : member
              );
              return {
                ...prev,
                character: {
                  ...prev.character,
                  familyMembers: updatedFamilyMembers
                }
              };
            });
          } else {
            effects = {};
            message = weddingResult.message;
          }
          break;
        case 'compliment_partner':
          const complimentPartner = character.familyMembers.find(m => 
            (m.relationship === 'lover' || m.relationship === 'spouse') && m.alive
          );
          if (complimentPartner) {
            effects = { happiness: 10, relationships: 8 };
            message = `You complimented ${complimentPartner.name} and made them smile!`;
          } else {
            effects = {};
            message = 'You need a partner to compliment!';
          }
          break;
      }
    }

    // Pregnancy Activities
    else if (activityType === 'pregnancy') {
      if (!character.isPregnant) {
        effects = {};
        message = 'You need to be pregnant to do pregnancy activities!';
      } else {
        switch (activityId) {
          case 'prenatal_care':
            if (character.wealth < 50) {
              effects = {};
              message = 'You can\'t afford prenatal care!';
            } else {
              effects = { health: 15, wealth: -50, happiness: 10 };
              message = 'You had a prenatal checkup. Everything looks good!';
            }
            break;
          case 'baby_shopping':
            if (character.wealth < 100) {
              effects = {};
              message = 'You can\'t afford baby supplies!';
            } else {
              effects = { happiness: 15, wealth: -100 };
              message = 'You bought everything needed for the baby!';
            }
            break;
          case 'parenting_class':
            if (character.wealth < 75) {
              effects = {};
              message = 'You can\'t afford parenting classes!';
            } else {
              effects = { smarts: 10, happiness: 5, wealth: -75 };
              message = 'You learned valuable parenting skills!';
            }
            break;
        }
      }
    }

    if (message) {
      addEventToCurrentAge(message);
    }

    if (Object.keys(effects).length > 0) {
      const updatedCharacter = applyStatEffects(character, effects);
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter
      }));
    }
  };

  const handleCareerSelection = (careerId: string) => {
    const careerDatabase: { [key: string]: { title: string; salary: number } } = {
      fast_food: { title: 'Fast Food Worker', salary: 22 },
      retail: { title: 'Retail Associate', salary: 25 },
      office_assistant: { title: 'Office Assistant', salary: 30 },
      teacher: { title: 'Teacher', salary: 48 },
      nurse: { title: 'Nurse', salary: 65 },
      engineer: { title: 'Engineer', salary: 75 },
      doctor: { title: 'Doctor', salary: 185 },
      lawyer: { title: 'Lawyer', salary: 125 }
    };

    const career = careerDatabase[careerId];
    if (career) {
      const updatedCharacter = {
        ...gameState.character,
        job: career.title,
        salary: career.salary,
        jobLevel: 1
      };
      
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter
      }));
      
      addEventToCurrentAge(`🎉 You started working as a ${career.title}!`);
    }
    
    setShowCareerSelection(false);
  };

  const handleJobApplication = (jobId: string) => {
    if (jobId === 'quit') {
      const updatedCharacter = { ...gameState.character, job: undefined, salary: 0, jobLevel: 0 };
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        eventHistory: [`${gameState.character.name} quit their job.`, ...prev.eventHistory.slice(0, 9)]
      }));
      return;
    }

    // Enhanced job application with realistic success rates
    const jobDatabase: { [key: string]: { title: string; salary: number; requirements: { age: number; education: string; smarts?: number; looks?: number } } } = {
      fast_food: { title: 'Fast Food Worker', salary: 22, requirements: { age: 14, education: 'None' } },
      retail_worker: { title: 'Retail Associate', salary: 25, requirements: { age: 16, education: 'None' } },
      janitor: { title: 'Janitor', salary: 28, requirements: { age: 18, education: 'None' } },
      factory_worker: { title: 'Factory Worker', salary: 32, requirements: { age: 18, education: 'High School' } },
      electrician: { title: 'Electrician', salary: 55, requirements: { age: 20, education: 'Trade School' } },
      paramedic: { title: 'Paramedic', salary: 48, requirements: { age: 21, education: 'Associate Degree' } },
      police_officer: { title: 'Police Officer', salary: 52, requirements: { age: 21, education: 'Associate Degree' } },
      teacher: { title: 'Teacher', salary: 48, requirements: { age: 22, education: 'Bachelor Degree', smarts: 60 } },
      nurse: { title: 'Nurse', salary: 65, requirements: { age: 22, education: 'Bachelor Degree', smarts: 70 } },
      accountant: { title: 'Accountant', salary: 58, requirements: { age: 22, education: 'Bachelor Degree', smarts: 65 } },
      engineer: { title: 'Engineer', salary: 75, requirements: { age: 22, education: 'Bachelor Degree', smarts: 80 } },
      marketing_manager: { title: 'Marketing Manager', salary: 85, requirements: { age: 25, education: 'Bachelor Degree', smarts: 70, looks: 60 } },
      it_manager: { title: 'IT Manager', salary: 95, requirements: { age: 26, education: 'Bachelor Degree', smarts: 85 } },
      doctor: { title: 'Doctor', salary: 185, requirements: { age: 26, education: 'Medical Degree', smarts: 90 } },
      lawyer: { title: 'Lawyer', salary: 125, requirements: { age: 25, education: 'Law Degree', smarts: 85 } },
      investment_banker: { title: 'Investment Banker', salary: 145, requirements: { age: 24, education: 'MBA', smarts: 88 } },
      surgeon: { title: 'Surgeon', salary: 250, requirements: { age: 30, education: 'Medical Degree', smarts: 95 } },
      artist: { title: 'Artist', salary: 35, requirements: { age: 18, education: 'High School', looks: 50 } },
      musician: { title: 'Musician', salary: 28, requirements: { age: 16, education: 'None', looks: 60 } },
      writer: { title: 'Writer', salary: 42, requirements: { age: 20, education: 'Bachelor Degree', smarts: 75 } }
    };

    const job = jobDatabase[jobId];
    if (!job) return;

    const character = gameState.character;

    // Check eligibility
    const meetsAge = character.age >= job.requirements.age;
    const meetsEducation = job.requirements.education === 'None' || 
                          character.education.includes(job.requirements.education.split(' ')[0]);
    const meetsSmarts = !job.requirements.smarts || character.smarts >= job.requirements.smarts;
    const meetsLooks = !job.requirements.looks || character.looks >= job.requirements.looks;

    if (!meetsAge) {
      setGameState(prev => ({
        ...prev,
        eventHistory: [`You're too young for this job (need to be ${job.requirements.age}).`, ...prev.eventHistory.slice(0, 9)]
      }));
      return;
    }

    if (!meetsEducation) {
      setGameState(prev => ({
        ...prev,
        eventHistory: [`You don't meet the education requirements (need ${job.requirements.education}).`, ...prev.eventHistory.slice(0, 9)]
      }));
      return;
    }

    if (!meetsSmarts) {
      setGameState(prev => ({
        ...prev,
        eventHistory: [`You're not smart enough for this job (need ${job.requirements.smarts} smarts).`, ...prev.eventHistory.slice(0, 9)]
      }));
      return;
    }

    if (!meetsLooks) {
      setGameState(prev => ({
        ...prev,
        eventHistory: [`You don't meet the appearance requirements for this job.`, ...prev.eventHistory.slice(0, 9)]
      }));
      return;
    }

    // Calculate success rate based on character stats
    let successRate = 0.7; // Base success rate
    if (job.requirements.smarts && character.smarts > job.requirements.smarts) {
      successRate += 0.2;
    }
    if (job.requirements.looks && character.looks > job.requirements.looks) {
      successRate += 0.1;
    }
    if (character.relationships > 70) {
      successRate += 0.1; // Good social skills help with interviews
    }
    if (character.criminalRecord) {
      successRate -= 0.3; // Criminal record makes it harder
    }

    if (Math.random() < successRate) {
      const updatedCharacter = { 
        ...character, 
        job: job.title, 
        salary: job.salary, 
        jobLevel: 1 
      };
      setGameState(prev => ({
        ...prev,
        character: updatedCharacter,
        eventHistory: [`${character.name} got hired as a ${job.title}!`, ...prev.eventHistory.slice(0, 9)]
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        eventHistory: [`Your application for ${job.title} was rejected. Try improving your skills!`, ...prev.eventHistory.slice(0, 9)]
      }));
    }
  };

  const getLifeEventsText = () => {
    const events: string[] = [];
    
    // Character info
    events.push(`Age: ${gameState.character.age} years`);
    events.push(`I was born a ${Math.random() > 0.5 ? 'male' : 'female'} in ${gameState.character.birthplace}. I was conceived on the beach in Hawaii.`);
    events.push('');
    events.push(`My birthday is ${getMonthName(gameState.character.birthMonth)} ${gameState.character.birthDay}. I am a ${gameState.character.zodiacSign.name}.`);
    events.push('');
    events.push(`My name is ${gameState.character.name}.`);
    
    // Family information
    if (gameState.character.familyMembers && gameState.character.familyMembers.length > 0) {
      gameState.character.familyMembers.forEach(member => {
        if (member.relationship === 'father') {
          events.push(`My father is ${member.name}, a ${member.job || 'unemployed person'} (age ${member.age}).`);
        } else if (member.relationship === 'mother') {
          events.push(`My mother is ${member.name}, a ${member.job || 'unemployed person'} (age ${member.age}).`);
        } else if (member.relationship === 'sibling') {
          events.push(`I have a sibling named ${member.name}.`);
        }
      });
    }
    
    // Add pet information
    if (gameState.character.pets && gameState.character.pets.length > 0) {
      gameState.character.pets.forEach(pet => {
        events.push(`We have a family ${pet.type} named ${pet.name}.`);
      });
    }

    // Add age history events
    ageHistory.forEach(ageEntry => {
      if (ageEntry.age > 0) {
        events.push('');
        ageEntry.events.forEach(event => {
          events.push(event);
        });
      }
    });

    return events.join('\n');
  };

  const getMonthName = (month: number): string => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'January';
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

  return (
    <div className="min-h-screen bg-gray-100 font-nunito">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg relative flex flex-col overflow-hidden pb-32">
        {/* BitLife Header */}
        <div className="bg-red-500 text-white p-3 sm:p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-500 font-bold text-sm sm:text-lg">B</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">BitLIFE</h1>
              <p className="text-xs opacity-90">Life Simulator</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowSettings(true)}
            className="text-white hover:bg-white/20 p-2"
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <CharacterHeader character={gameState.character} />

        {/* Main content - Life events in scrollable box */}
        <div className="flex-1 px-2 sm:px-4 py-2 sm:py-4 bg-gray-50">
          <div className="bg-white rounded-lg border border-gray-200 h-[350px] sm:h-[400px] flex flex-col">
            <ScrollArea className="flex-1 p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {getLifeEventsText()}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Navigation */}
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onAgeUp={ageUp}
          character={gameState.character}
          onShowActivityMenu={() => setShowActivitiesMenu(true)}
          onShowRelationshipMenu={() => setShowRelationshipsMenu(true)}
          onShowAssetsMenu={() => setShowAssetsMenu(true)}
        />

        {/* Character Stats Bar */}
        <CharacterStatsBar character={gameState.character} />

        {/* Popup Menus */}
        <ActivitiesMenu
          isOpen={showActivitiesMenu}
          onClose={() => setShowActivitiesMenu(false)}
          character={gameState.character}
          onActivity={handleActivity}
        />

        <RelationshipsMenu
          isOpen={showRelationshipsMenu}
          onClose={() => setShowRelationshipsMenu(false)}
          character={gameState.character}
          onActivity={handleActivity}
        />

        <AssetsMenu
          isOpen={showAssetsMenu}
          onClose={() => setShowAssetsMenu(false)}
          character={gameState.character}
        />

        <GameSettings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onNewGame={startNewGame}
        />

        <CareerSelectionModal
          isOpen={showCareerSelection}
          onClose={() => setShowCareerSelection(false)}
          character={gameState.character}
          onSelectCareer={handleCareerSelection}
        />

        {gameState.currentEvent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <EventCard event={gameState.currentEvent} onChoice={handleChoice} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
