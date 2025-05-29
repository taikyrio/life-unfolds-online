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
import { ActivityModal } from './modals/ActivityModal';
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

  if (gameState.gameOver) {
    return <GameOverScreen 
      character={gameState.character} 
      reason={gameState.gameOverReason}
      achievements={gameState.achievements}
      eventHistory={gameState.eventHistory}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Character Header */}
      <CharacterHeader character={gameState.character} />
      
      {/* Navigation - Centered */}
      <div className="flex justify-center py-2 bg-white border-b border-gray-200">
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAgeUp={ageUp}
          character={gameState.character}
          onShowActivityMenu={() => setShowActivitiesMenu(true)}
          onShowRelationshipsMenu={() => setShowRelationshipsMenu(true)}
          onShowAssetsMenu={() => setShowAssetsMenu(true)}
        />
      </div>

      {/* Character Stats - Below Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <CharacterStats character={gameState.character} />
      </div>

      {/* Main Content */}
      <div className="pb-20">
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
          <ActivitiesTab character={gameState.character} />
        )}
        {activeTab === 'relationships' && (
          <RelationshipsTab character={gameState.character} />
        )}
        {activeTab === 'careers' && (
          <CareersTab character={gameState.character} />
        )}
        {activeTab === 'education' && (
          <EducationTab character={gameState.character} />
        )}
        {activeTab === 'assets' && (
          <AssetsTab character={gameState.character} />
        )}
      </div>

      {/* Modals and Menus */}
      {showActivitiesMenu && (
        <ActivitiesMenu
          character={gameState.character}
          onClose={() => setShowActivitiesMenu(false)}
          onActivitySelect={(activity) => {
            setSelectedActivity(activity);
            setShowActivityModal(true);
            setShowActivitiesMenu(false);
          }}
        />
      )}

      {showRelationshipsMenu && (
        <RelationshipsMenu
          character={gameState.character}
          onClose={() => setShowRelationshipsMenu(false)}
          onActionSelect={handleRelationshipAction}
        />
      )}

      {showAssetsMenu && (
        <AssetsMenu
          character={gameState.character}
          onClose={() => setShowAssetsMenu(false)}
          onAssetAction={() => {}}
        />
      )}

      {showActivityModal && selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          character={gameState.character}
          onClose={() => {
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
          onConfirm={(data) => {
            handleActivityAction(selectedActivity.id, data);
            setShowActivityModal(false);
            setSelectedActivity(null);
          }}
        />
      )}
    </div>
  );
};
