
import { useCallback } from 'react';
import { Character, GameState } from '../types/game';
import { processAgeUp, processChoice } from '../components/game/GameLogic';

interface UseGameActionsProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  toast: any;
}

export function useGameActions({
  gameState,
  onGameStateChange,
  ageHistory,
  setAgeHistory,
  toast
}: UseGameActionsProps) {
  const handleAgeUp = useCallback(async () => {
    if (gameState.gameOver) return;
    const newState = processAgeUp(gameState);
    
    // Update ageHistory with events for the current age
    const currentAge = newState.character.age;
    const newEvents = newState.eventHistory.slice(gameState.eventHistory.length);
    
    setAgeHistory(prev => ({
      ...prev,
      [currentAge]: newEvents
    }));
    
    onGameStateChange(newState);
  }, [gameState, onGameStateChange, setAgeHistory]);

  const handleChoice = useCallback((choiceId: string) => {
    const newState = processChoice(gameState, choiceId);
    onGameStateChange(newState);
  }, [gameState, onGameStateChange]);

  const handleCharacterUpdate = useCallback((updatedCharacter: Character) => {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  }, [gameState, onGameStateChange]);

  const handleEvent = useCallback((message: string) => {
    toast({
      title: "Event",
      description: message,
    });
  }, [toast]);

  const handleCriminalOperation = useCallback((operation: any) => {
    console.log('Criminal operation:', operation);
    toast({
      title: "Criminal Operation",
      description: "Criminal activities are not yet implemented",
    });
  }, [toast]);

  const handleCybercrime = useCallback((crime: any) => {
    console.log('Cybercrime:', crime);
    toast({
      title: "Cybercrime",
      description: "Cybercrime activities are not yet implemented",
    });
  }, [toast]);

  const handleMurder = useCallback((target: any) => {
    console.log('Murder target:', target);
    toast({
      title: "Murder",
      description: "Murder activities are not yet implemented",
    });
  }, [toast]);

  const handleActivity = useCallback((activityId: string, activityData?: any) => {
    if (activityData && activityData.type) {
      if (activityData.type === 'criminal_operation') {
        handleCriminalOperation(activityData);
        return;
      } else if (activityData.type === 'cybercrime') {
        handleCybercrime(activityData);
        return;
      } else if (activityData.type === 'murder') {
        handleMurder(activityData);
        return;
      }
    }

    // Process basic activities and update character stats
    let updatedCharacter = { ...gameState.character };
    let message = `You performed ${activityId}!`;

    // Basic activity effects
    if (activityId.includes('workout') || activityId.includes('exercise')) {
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      message = 'You exercised and feel healthier!';
    } else if (activityId.includes('read') || activityId.includes('study')) {
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 10);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 5);
      message = 'You studied hard and became smarter!';
    } else if (activityId.includes('social')) {
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 5);
      message = 'You had a great time socializing!';
    }

    // Update game state with modified character
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Activity Complete",
      description: message,
    });
  }, [gameState, onGameStateChange, toast, handleCriminalOperation, handleCybercrime, handleMurder]);

  const handleCareerActionWrapper = useCallback((action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = `Career action: ${action}`;

    switch (action) {
      case 'apply_job':
        if (data && data.salary) {
          updatedCharacter.job = data.name;
          updatedCharacter.salary = data.salary;
          updatedCharacter.jobLevel = 1;
          message = `You got hired as a ${data.name}!`;
        }
        break;
      case 'work_harder':
        const currentPerformance = updatedCharacter.jobPerformance || {
          rating: 50,
          lastReview: new Date().toISOString(),
          promotions: 0,
          warnings: 0
        };
        
        updatedCharacter.jobPerformance = {
          rating: Math.min(100, currentPerformance.rating + 10),
          lastReview: new Date().toISOString(),
          promotions: currentPerformance.promotions,
          warnings: currentPerformance.warnings
        };
        message = 'You worked harder and improved your performance!';
        break;
      case 'ask_promotion':
        const performanceRating = updatedCharacter.jobPerformance?.rating || 0;
        if (performanceRating > 70) {
          updatedCharacter.jobLevel = (updatedCharacter.jobLevel || 1) + 1;
          updatedCharacter.salary = Math.floor((updatedCharacter.salary || 0) * 1.2);
          
          if (!updatedCharacter.jobPerformance) {
            updatedCharacter.jobPerformance = {
              rating: performanceRating,
              lastReview: new Date().toISOString(),
              promotions: 1,
              warnings: 0
            };
          } else {
            updatedCharacter.jobPerformance.promotions += 1;
            updatedCharacter.jobPerformance.lastReview = new Date().toISOString();
          }
          
          message = 'You got promoted!';
        } else {
          message = 'Your promotion request was denied. Work harder!';
        }
        break;
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Career Action",
      description: message,
    });
  }, [gameState, onGameStateChange, toast]);

  const handleEducationActionWrapper = useCallback((action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = `Education action: ${action}`;

    switch (action) {
      case 'enroll_school':
        if (data) {
          const currentEducation = updatedCharacter.education || {
            currentStage: null,
            currentSchool: null,
            currentYear: 0,
            gpa: 0,
            completedStages: [],
            achievements: [],
            testScores: [],
            disciplinaryActions: 0,
            dropouts: 0,
            levels: [],
            grades: []
          };
          
          updatedCharacter.education = {
            currentStage: data.stage,
            currentSchool: data.school,
            currentYear: 1,
            gpa: currentEducation.gpa,
            completedStages: currentEducation.completedStages,
            achievements: currentEducation.achievements,
            testScores: currentEducation.testScores,
            disciplinaryActions: currentEducation.disciplinaryActions,
            dropouts: currentEducation.dropouts,
            levels: currentEducation.levels,
            grades: currentEducation.grades
          };
          message = `You enrolled in ${data.schoolName}!`;
        }
        break;
      case 'study_harder':
        const currentEducation = updatedCharacter.education || {
          currentStage: null,
          currentSchool: null,
          currentYear: 0,
          gpa: 0,
          completedStages: [],
          achievements: [],
          testScores: [],
          disciplinaryActions: 0,
          dropouts: 0,
          levels: [],
          grades: []
        };
        
        updatedCharacter.education = {
          currentStage: currentEducation.currentStage,
          currentSchool: currentEducation.currentSchool,
          currentYear: currentEducation.currentYear,
          gpa: Math.min(4.0, currentEducation.gpa + 0.2),
          completedStages: currentEducation.completedStages,
          achievements: currentEducation.achievements,
          testScores: currentEducation.testScores,
          disciplinaryActions: currentEducation.disciplinaryActions,
          dropouts: currentEducation.dropouts,
          levels: currentEducation.levels,
          grades: currentEducation.grades
        };
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
        message = 'You studied harder and improved your grades!';
        break;
      case 'graduate':
        if (updatedCharacter.education?.currentStage) {
          updatedCharacter.education.completedStages = [
            ...(updatedCharacter.education.completedStages || []),
            updatedCharacter.education.currentStage
          ];
          updatedCharacter.education.currentStage = null;
          updatedCharacter.education.currentSchool = null;
          message = 'Congratulations on graduating!';
        }
        break;
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Education Action",
      description: message,
    });
  }, [gameState, onGameStateChange, toast]);

  const handleHealthActionWrapper = useCallback((action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = `Health action: ${action}`;

    switch (action) {
      case 'doctor_visit':
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 20);
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 50);
        message = 'You visited the doctor and feel better!';
        break;
      case 'exercise':
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
        message = 'You exercised and feel healthier!';
        break;
      case 'diet':
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
        message = 'You started a healthy diet!';
        break;
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Health Action",
      description: message,
    });
  }, [gameState, onGameStateChange, toast]);

  const handleLifestyleActionWrapper = useCallback((action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = `Lifestyle action: ${action}`;

    switch (action) {
      case 'buy_house':
        if (updatedCharacter.wealth >= 200) {
          updatedCharacter.wealth -= 200;
          updatedCharacter.assets.push({
            id: 'house_' + Date.now(),
            name: 'House',
            type: 'house',
            value: 200,
            currentValue: 200,
            purchasePrice: 200
          });
          message = 'You bought a house!';
        } else {
          message = 'You cannot afford a house!';
        }
        break;
      case 'buy_car':
        if (updatedCharacter.wealth >= 30) {
          updatedCharacter.wealth -= 30;
          updatedCharacter.assets.push({
            id: 'car_' + Date.now(),
            name: 'Car',
            type: 'car',
            value: 30,
            currentValue: 30,
            purchasePrice: 30
          });
          message = 'You bought a car!';
        } else {
          message = 'You cannot afford a car!';
        }
        break;
      case 'vacation':
        if (updatedCharacter.wealth >= 15) {
          updatedCharacter.wealth -= 15;
          updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 20);
          message = 'You went on vacation and had a great time!';
        } else {
          message = 'You cannot afford a vacation!';
        }
        break;
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Lifestyle Action",
      description: message,
    });
  }, [gameState, onGameStateChange, toast]);

  const handleRelationshipActionWrapper = useCallback((action: string, data?: any) => {
    let updatedCharacter = { ...gameState.character };
    let message = `Relationship action: ${action}`;

    switch (action) {
      case 'make_friends':
        updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 10);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
        message = 'You made new friends!';
        break;
      case 'family_time':
        updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 5);
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
        message = 'You spent quality time with family!';
        break;
      case 'date':
        if (updatedCharacter.wealth >= 25) {
          updatedCharacter.wealth -= 25;
          updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 15);
          updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
          message = 'You had a wonderful date!';
        } else {
          message = 'You cannot afford to go on a date!';
        }
        break;
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Relationship Action",
      description: message,
    });
  }, [gameState, onGameStateChange, toast]);

  return {
    ageUp: handleAgeUp,
    handleChoice,
    handleCharacterUpdate,
    handleEvent,
    handleActivity,
    handleCareerAction: handleCareerActionWrapper,
    handleEducationAction: handleEducationActionWrapper,
    handleHealthAction: handleLifestyleActionWrapper,
    handleLifestyleAction: handleLifestyleActionWrapper,
    handleRelationshipAction: handleRelationshipActionWrapper
  };
}
