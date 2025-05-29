import React, { useState, useEffect } from 'react';
import { Character, GameState, LifeEvent, Choice } from '../types/game';
import { BottomNavigation } from './BottomNavigation';
import { LifeTab } from './LifeTab';
import { CharacterHeader } from './CharacterHeader';
import { CharacterStats } from './CharacterStats';
import { ActivitiesTab } from './ActivitiesTab';
import { RelationshipsTab } from './RelationshipsTab';
import { CareersTab } from './CareersTab';
import { EducationTab } from './EducationTab';
import { AssetsTab } from './AssetsTab';
import { GameOverScreen } from './GameOverScreen';
import { ActivitiesMenu } from './menus/ActivitiesMenu';
import { RelationshipsMenu } from './menus/RelationshipsMenu';
import { AssetsMenu } from './menus/AssetsMenu';
import ActivityModal from './modals/ActivityModal';
import { 
  ageCharacter, 
  applyStatEffects, 
  isGameOver, 
  generateNewRelationships,
  findLove,
  intimateActivity,
  proposeMariage,
  getMarried,
  giveGift,
  haveBaby,
  handleEducationActions
} from '../utils/gameUtils';
import { evolveStatsNaturally, getStatMessage } from '../utils/statEvolution';
import { dynamicEventSystem } from '../data/dynamicEvents';
import { lifeEvents } from '../data/lifeEvents';
import { checkForHealthConditions, treatHealthCondition, healthConditions } from '../systems/healthSystem';
import { checkAchievements, achievements } from '../systems/achievementSystem';
import { calculateCompatibility, goOnDate, proposeMarriage } from '../systems/relationshipSystem';
import { useToast } from '@/components/ui/use-toast';
import { MobileNavigation } from './navigation/MobileNavigation';
import { EducationTab } from './tabs/EducationTab';
import { CareersTab } from './tabs/CareersTab';

interface GameBoardProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onGameStateChange }) => {
  const [activeTab, setActiveTab] = useState<'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education'>('life');
  const [showActivitiesMenu, setShowActivitiesMenu] = useState(false);
  const [showRelationshipsMenu, setShowRelationshipsMenu] = useState(false);
  const [showAssetsMenu, setShowAssetsMenu] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [ageHistory, setAgeHistory] = useState<Record<number, string[]>>({});
  const { toast } = useToast();

  useEffect(() => {
    if (!gameState.gameStarted) {
      onGameStateChange({
        ...gameState,
        gameStarted: true,
        character: gameState.character,
        eventTracker: {
          triggeredEvents: new Set(),
          lastEventAge: 0,
          eventCooldowns: new Map()
        }
      });
    }
  }, [gameState, onGameStateChange]);

  const ageUp = () => {
    if (gameState.gameOver) return;

    let updatedCharacter = { ...gameState.character };
    let newEventHistory = [...gameState.eventHistory];
    let newAchievements = [...gameState.achievements];
    let currentAgeEvents: string[] = [];

    // Age the character
    updatedCharacter = ageCharacter(updatedCharacter);

    // Apply natural stat evolution
    const statChanges = evolveStatsNaturally(updatedCharacter);
    Object.entries(statChanges).forEach(([key, value]) => {
      if (typeof value === 'number' && key in updatedCharacter) {
        const oldValue = (updatedCharacter as any)[key];
        (updatedCharacter as any)[key] = Math.max(0, Math.min(100, value));
        
        // Log significant stat changes
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
      // Apply condition effects
      updatedCharacter.health = Math.max(0, updatedCharacter.health + healthCondition.effects.health);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness + healthCondition.effects.happiness);
    }

    // Check for dynamic events
    const availableEvents = dynamicEventSystem.getAvailableEvents(updatedCharacter, gameState.eventTracker);
    const selectedEvent = dynamicEventSystem.selectEvent(availableEvents);

    let hasEvent = false;
    if (selectedEvent && Math.random() < 0.3) { // 30% chance of dynamic event
      onGameStateChange({
        ...gameState,
        character: updatedCharacter,
        currentEvent: selectedEvent,
        eventHistory: newEventHistory
      });
      hasEvent = true;
    }

    // Check for random life events from static events
    if (!hasEvent && Math.random() < 0.4) { // 40% chance if no dynamic event
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

  const handleChoice = (choiceId: string) => {
    if (!gameState.currentEvent) return;

    const choice = gameState.currentEvent.choices.find(c => c.id === choiceId);
    if (!choice) return;

    let updatedCharacter = applyStatEffects(gameState.character, choice.effects);
    
    // Add flags if specified
    if (choice.flags) {
      updatedCharacter.flags = [...(updatedCharacter.flags || []), ...choice.flags];
    }

    // Create event description for history
    const eventDescription = `${gameState.currentEvent.title}: ${choice.text}`;
    let ageEvents = ageHistory[updatedCharacter.age] || [];
    ageEvents.push(eventDescription);

    // Add consequences to age history
    if (choice.consequences) {
      ageEvents.push(...choice.consequences);
    }

    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    const newEventHistory = [...gameState.eventHistory, eventDescription];

    // Mark event as triggered
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

  const handleActivityAction = (action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = '';
    let ageEvents = ageHistory[updatedCharacter.age] || [];

    switch (action) {
      case 'workout':
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
        message = 'You had a great workout session!';
        break;
      
      case 'read_book':
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 8);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 3);
        message = 'You learned something new from reading!';
        break;
      
      case 'socialize':
        updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 12);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
        message = 'You had a great time socializing with friends!';
        break;

      case 'meditation':
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
        message = 'Meditation helped you feel more centered and peaceful.';
        break;
    }

    if (message) {
      ageEvents.push(message);
      const newAgeHistory = { ...ageHistory };
      newAgeHistory[updatedCharacter.age] = ageEvents;
      setAgeHistory(newAgeHistory);

      toast({
        title: "Activity Complete",
        description: message,
      });
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  const handleRelationshipAction = (action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = '';
    let ageEvents = ageHistory[updatedCharacter.age] || [];

    switch (action) {
      case 'find_love':
        if (updatedCharacter.age < 16) {
          message = "You're too young for serious relationships!";
          break;
        }
        const loveResult = findLove(updatedCharacter);
        message = loveResult.message;
        if (loveResult.success && loveResult.partner) {
          updatedCharacter.familyMembers.push(loveResult.partner);
          updatedCharacter.relationshipStatus = 'dating';
        }
        break;

      case 'date_night':
        const partner = updatedCharacter.familyMembers.find(m => 
          m.relationship === 'lover' || m.relationship === 'spouse'
        );
        if (!partner) {
          message = "You need to be in a relationship first!";
          break;
        }
        
        const dateResult = goOnDate(updatedCharacter, partner, data.dateType || 'casual');
        message = dateResult.message;
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - dateResult.cost);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + dateResult.happinessChange);
        
        // Update partner's relationship quality
        const partnerIndex = updatedCharacter.familyMembers.findIndex(m => m.id === partner.id);
        if (partnerIndex >= 0) {
          updatedCharacter.familyMembers[partnerIndex].relationshipQuality = Math.min(100, 
            updatedCharacter.familyMembers[partnerIndex].relationshipQuality + dateResult.relationshipChange
          );
        }
        break;

      case 'propose':
        const fiancee = updatedCharacter.familyMembers.find(m => m.relationship === 'lover');
        if (!fiancee) {
          message = "You need to be dating someone first!";
          break;
        }
        
        const proposalResult = proposeMarriage(updatedCharacter, fiancee);
        message = proposalResult.message;
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - proposalResult.ringCost);
        
        if (proposalResult.accepted) {
          const fianceeIndex = updatedCharacter.familyMembers.findIndex(m => m.id === fiancee.id);
          if (fianceeIndex >= 0) {
            updatedCharacter.familyMembers[fianceeIndex].relationship = 'spouse';
            updatedCharacter.relationshipStatus = 'engaged';
            updatedCharacter.partnerName = fiancee.name;
          }
        }
        break;
    }

    if (message) {
      ageEvents.push(message);
      const newAgeHistory = { ...ageHistory };
      newAgeHistory[updatedCharacter.age] = ageEvents;
      setAgeHistory(newAgeHistory);

      toast({
        title: "Relationship Update",
        description: message,
      });
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  const handleEducationAction = (action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = '';
    let ageEvents = ageHistory[updatedCharacter.age] || [];

    switch (action) {
      case 'enroll':
        if (data?.levelId) {
          // Auto-enroll in education based on age and qualifications
          const educationLevels = [
            { id: 'elementary', name: 'Elementary School', cost: 0 },
            { id: 'middle', name: 'Middle School', cost: 0 },
            { id: 'high', name: 'High School', cost: 0 },
            { id: 'college', name: 'Community College', cost: 20 },
            { id: 'university', name: 'University', cost: 40 },
            { id: 'graduate', name: 'Graduate School', cost: 60 },
            { id: 'medical', name: 'Medical School', cost: 100 },
            { id: 'law', name: 'Law School', cost: 80 }
          ];
          
          const level = educationLevels.find(l => l.id === data.levelId);
          if (level && updatedCharacter.wealth >= level.cost) {
            updatedCharacter.currentEducation = {
              level: data.levelId,
              institution: `${level.name} Institute`,
              currentYear: 1,
              gpa: 3.0 + (updatedCharacter.smarts / 100),
              classmates: []
            };
            updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - level.cost);
            message = `Enrolled in ${level.name}!`;
          }
        }
        break;
        
      case 'progress':
        if (updatedCharacter.currentEducation) {
          const year = updatedCharacter.currentEducation.currentYear + 1;
          updatedCharacter.currentEducation.currentYear = year;
          updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
          message = `Completed year ${year - 1} of ${updatedCharacter.currentEducation.level}`;
        }
        break;
    }

    if (message) {
      ageEvents.push(message);
      const newAgeHistory = { ...ageHistory };
      newAgeHistory[updatedCharacter.age] = ageEvents;
      setAgeHistory(newAgeHistory);

      toast({
        title: "Education Update",
        description: message,
      });
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  const handleCareerAction = (action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = '';
    let ageEvents = ageHistory[updatedCharacter.age] || [];

    switch (action) {
      case 'apply':
        if (data?.careerId) {
          const careers = {
            'retail': { name: 'Retail Worker', salary: 25 },
            'food_service': { name: 'Food Service Worker', salary: 22 },
            'mechanic': { name: 'Mechanic', salary: 45 },
            'teacher': { name: 'Teacher', salary: 48 },
            'nurse': { name: 'Nurse', salary: 65 },
            'engineer': { name: 'Engineer', salary: 75 },
            'doctor': { name: 'Doctor', salary: 185 },
            'lawyer': { name: 'Lawyer', salary: 125 }
          };
          
          const career = careers[data.careerId as keyof typeof careers];
          if (career) {
            updatedCharacter.job = career.name;
            updatedCharacter.salary = career.salary;
            updatedCharacter.jobLevel = 1;
            message = `Got hired as a ${career.name}!`;
          }
        }
        break;
        
      case 'promote':
        if (updatedCharacter.job && updatedCharacter.jobLevel < 10) {
          updatedCharacter.jobLevel += 1;
          updatedCharacter.salary = Math.floor(updatedCharacter.salary * 1.15);
          message = `Promoted to Level ${updatedCharacter.jobLevel}!`;
        }
        break;
        
      case 'quit':
        updatedCharacter.job = undefined;
        updatedCharacter.salary = 0;
        updatedCharacter.jobLevel = 0;
        message = 'You quit your job.';
        break;
    }

    if (message) {
      ageEvents.push(message);
      const newAgeHistory = { ...ageHistory };
      newAgeHistory[updatedCharacter.age] = ageEvents;
      setAgeHistory(newAgeHistory);

      toast({
        title: "Career Update",
        description: message,
      });
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  };

  if (gameState.gameOver) {
    return <GameOverScreen 
      character={gameState.character} 
      reason={gameState.gameOverReason}
      onRestart={() => {
        // Reset game state
        const newGameState: GameState = {
          character: gameState.character,
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
        onGameStateChange(newGameState);
      }}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Character Header */}
      <CharacterHeader character={gameState.character} />
      
      {/* Character Stats - Below Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <CharacterStats character={gameState.character} />
      </div>

      {/* Main Content */}
      <div className="pb-24">
        {activeTab === 'life' && (
          <LifeTab 
            character={gameState.character}
            eventHistory={gameState.eventHistory}
            currentEvent={gameState.currentEvent}
            onAgeUp={ageUp}
            onChoice={handleChoice}
            ageHistory={ageHistory}
          />
        )}
        {activeTab === 'activities' && (
          <ActivitiesTab 
            character={gameState.character} 
            onActivity={handleActivityAction}
          />
        )}
        {activeTab === 'relationships' && (
          <RelationshipsTab character={gameState.character} />
        )}
        {activeTab === 'careers' && (
          <CareersTab 
            character={gameState.character}
            onCareerAction={handleCareerAction}
          />
        )}
        {activeTab === 'education' && (
          <EducationTab 
            character={gameState.character}
            onEducationAction={handleEducationAction}
          />
        )}
        {activeTab === 'assets' && (
          <AssetsTab character={gameState.character} />
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab as typeof activeTab)}
        character={gameState.character}
        onAgeUp={ageUp}
        onShowActivityMenu={() => setShowActivitiesMenu(true)}
        onShowRelationshipsMenu={() => setShowRelationshipsMenu(true)}
        onShowAssetsMenu={() => setShowAssetsMenu(true)}
      />

      {/* Modals and Menus - keep existing code */}
      {showActivitiesMenu && (
        <ActivitiesMenu
          isOpen={showActivitiesMenu}
          character={gameState.character}
          onClose={() => setShowActivitiesMenu(false)}
          onActivity={handleActivityAction}
        />
      )}

      {showRelationshipsMenu && (
        <RelationshipsMenu
          isOpen={showRelationshipsMenu}
          character={gameState.character}
          onClose={() => setShowRelationshipsMenu(false)}
          onActivity={handleRelationshipAction}
        />
      )}

      {showAssetsMenu && (
        <AssetsMenu
          isOpen={showAssetsMenu}
          character={gameState.character}
          onClose={() => setShowAssetsMenu(false)}
        />
      )}

      {showActivityModal && selectedActivity && (
        <ActivityModal
          character={gameState.character}
          onClose={() => {
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
          onSelectActivity={(activity) => {
            handleActivityAction(activity.id, activity);
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
        />
      )}
    </div>
  );
};
