
import { useState } from 'react';
import { GameState, LifeEvent } from '../types/game';
import { processAgeUp } from '../components/game/GameLogic';
import { dynamicConsequenceSystem } from '../systems/dynamicConsequenceSystem';
import { personalityEvolutionSystem } from '../systems/personalityEvolutionSystem';
import { skillTreeSystem } from '../systems/skillTreeSystem';

interface UseGameActionsProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: (history: Record<number, string[]>) => void;
  toast: any;
}

export function useGameActions({ 
  gameState, 
  onGameStateChange, 
  ageHistory, 
  setAgeHistory, 
  toast 
}: UseGameActionsProps) {
  const [currentEvent, setCurrentEvent] = useState<LifeEvent | null>(null);

  const handleAgeUp = () => {
    try {
      // Process consequences from previous choices
      const consequenceEvents = dynamicConsequenceSystem.processAgeConsequences(gameState.character);
      
      // Process normal age up
      const newGameState = processAgeUp(gameState);
      
      // Add any consequence events to the new game state
      if (consequenceEvents.length > 0) {
        setCurrentEvent(consequenceEvents[0]); // Show first consequence event
      }

      // Update age history
      const newAgeHistory = { ...ageHistory };
      if (!newAgeHistory[newGameState.character.age]) {
        newAgeHistory[newGameState.character.age] = [];
      }

      // Add age-appropriate events based on skills and personality
      const skillModifier = skillTreeSystem.getSkillModifier(newGameState.character, 'social');
      if (skillModifier > 5 && Math.random() < 0.3) {
        newAgeHistory[newGameState.character.age].push(
          '🌟 Your social skills opened up new opportunities!'
        );
      }

      setAgeHistory(newAgeHistory);
      onGameStateChange(newGameState);

      if (newGameState.gameOver) {
        toast({
          title: "Game Over",
          description: newGameState.gameOverReason || "Your life has ended.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error aging up:', error);
      toast({
        title: "Error",
        description: "There was an error aging up. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChoice = (choiceId: string) => {
    if (!currentEvent) return;

    const choice = currentEvent.choices?.find(c => c.id === choiceId);
    if (!choice) return;

    // Record choice for consequence system
    dynamicConsequenceSystem.recordChoice(
      currentEvent.id, 
      choiceId, 
      gameState.character, 
      choice
    );

    // Evolve personality based on choice
    personalityEvolutionSystem.evolvePersonality(
      gameState.character, 
      currentEvent.id, 
      choiceId
    );

    // Add skill experience based on choice
    if (currentEvent.id.includes('study')) {
      skillTreeSystem.addSkillExperience(gameState.character, 'critical_thinking', 20);
    } else if (currentEvent.id.includes('social')) {
      skillTreeSystem.addSkillExperience(gameState.character, 'communication', 15);
    } else if (currentEvent.id.includes('exercise')) {
      skillTreeSystem.addSkillExperience(gameState.character, 'fitness', 25);
    }

    // Apply choice effects
    const updatedCharacter = { ...gameState.character };
    if (choice.effects) {
      updatedCharacter.happiness = Math.max(0, Math.min(100, 
        updatedCharacter.happiness + (choice.effects.happiness || 0)
      ));
      updatedCharacter.health = Math.max(0, Math.min(100, 
        updatedCharacter.health + (choice.effects.health || 0)
      ));
      updatedCharacter.smarts = Math.max(0, Math.min(100, 
        updatedCharacter.smarts + (choice.effects.smarts || 0)
      ));
      updatedCharacter.looks = Math.max(0, Math.min(100, 
        updatedCharacter.looks + (choice.effects.looks || 0)
      ));
      updatedCharacter.wealth = Math.max(0, Math.min(1000, 
        updatedCharacter.wealth + (choice.effects.wealth || 0)
      ));
      updatedCharacter.relationships = Math.max(0, Math.min(100, 
        updatedCharacter.relationships + (choice.effects.relationships || 0)
      ));
    }

    // Update age history with choice result
    const newAgeHistory = { ...ageHistory };
    if (!newAgeHistory[updatedCharacter.age]) {
      newAgeHistory[updatedCharacter.age] = [];
    }
    newAgeHistory[updatedCharacter.age].push(
      `📝 ${currentEvent.title}: ${choice.text}`
    );

    setAgeHistory(newAgeHistory);
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    setCurrentEvent(null);

    toast({
      title: "Choice Made",
      description: `You chose: ${choice.text}`,
    });
  };

  const handleActivity = (activityType: string, activityId: string) => {
    const updatedCharacter = { ...gameState.character };
    
    // Add skill experience based on activity
    switch (activityType) {
      case 'gym':
        skillTreeSystem.addSkillExperience(updatedCharacter, 'fitness', 30);
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
        break;
      case 'library':
        skillTreeSystem.addSkillExperience(updatedCharacter, 'critical_thinking', 25);
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 3);
        break;
      case 'friends':
        skillTreeSystem.addSkillExperience(updatedCharacter, 'communication', 20);
        updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 4);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 3);
        break;
      case 'hobby':
        skillTreeSystem.addSkillExperience(updatedCharacter, 'artistic_expression', 25);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
        break;
    }

    // Evolve personality based on activity
    personalityEvolutionSystem.evolvePersonality(updatedCharacter, activityType, activityId);

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Activity Completed",
      description: `You spent time ${activityType === 'gym' ? 'working out' : 
                   activityType === 'library' ? 'studying' : 
                   activityType === 'friends' ? 'with friends' : 'on your hobby'}!`,
    });
  };

  return {
    handleAgeUp,
    handleChoice,
    handleActivity,
    currentEvent,
    setCurrentEvent
  };
}
