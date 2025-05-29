
import { Character } from '../../types/game';
import { applyForLoan } from '../../systems/moneySystem';
import { treatHealthCondition } from '../../systems/healthSystem';

export const handleEducationAction = (
  character: Character,
  action: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'enroll':
      if (data?.levelId) {
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

export const handleHealthAction = (
  character: Character,
  action: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'checkup':
      const cost = 100;
      if (updatedCharacter.wealth >= cost) {
        updatedCharacter.wealth -= cost;
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
        message = 'Annual checkup complete. Your health has improved!';
      } else {
        message = 'You cannot afford a medical checkup.';
      }
      break;

    case 'treat_condition':
      if (data?.condition && data?.treatmentIndex !== undefined) {
        const treatment = data.condition.treatmentOptions[data.treatmentIndex];
        if (updatedCharacter.wealth >= treatment.cost) {
          updatedCharacter = treatHealthCondition(updatedCharacter, data.condition, data.treatmentIndex);
          message = `Treatment completed: ${treatment.description}`;
        } else {
          message = `You cannot afford ${treatment.name}.`;
        }
      }
      break;

    case 'exercise':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 8);
      updatedCharacter.looks = Math.min(100, updatedCharacter.looks + 3);
      message = 'You exercised and feel healthier!';
      break;

    case 'diet':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 5);
      message = 'You invested in a healthy diet plan.';
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Health Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

export const handleLifestyleAction = (
  character: Character,
  action: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'buy_house':
      const houseCost = 200;
      if (updatedCharacter.wealth >= houseCost) {
        updatedCharacter.wealth -= houseCost;
        updatedCharacter.assets.push({
          name: 'House',
          type: 'real_estate',
          value: houseCost
        });
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 20);
        message = 'You bought your first house!';
      } else {
        message = 'You cannot afford a house right now.';
      }
      break;

    case 'buy_car':
      const carCost = 30;
      if (updatedCharacter.wealth >= carCost) {
        updatedCharacter.wealth -= carCost;
        updatedCharacter.assets.push({
          name: 'Car',
          type: 'vehicle',
          value: carCost
        });
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
        message = 'You bought a car!';
      } else {
        message = 'You cannot afford a car right now.';
      }
      break;

    case 'vacation':
      const vacationCost = 15;
      if (updatedCharacter.wealth >= vacationCost) {
        updatedCharacter.wealth -= vacationCost;
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 25);
        updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
        message = 'You went on a relaxing vacation!';
      } else {
        message = 'You cannot afford a vacation right now.';
      }
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Lifestyle Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

export const handleMoneyAction = (
  character: Character,
  action: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'apply_loan':
      if (data?.amount) {
        const loanResult = applyForLoan(updatedCharacter, data.amount);
        if (loanResult.approved) {
          updatedCharacter.wealth += data.amount;
          message = `Loan approved! You received $${data.amount}k at ${(loanResult.interestRate * 100).toFixed(1)}% interest.`;
        } else {
          message = `Loan denied: ${loanResult.reason}`;
        }
      }
      break;

    case 'invest':
      if (data?.amount && updatedCharacter.wealth >= data.amount) {
        updatedCharacter.wealth -= data.amount;
        const returnRate = (Math.random() * 0.5) - 0.2;
        const returns = Math.floor(data.amount * returnRate);
        updatedCharacter.wealth += data.amount + returns;
        
        if (returns > 0) {
          message = `Investment successful! You gained $${returns}k.`;
        } else {
          message = `Investment lost $${Math.abs(returns)}k.`;
        }
      } else {
        message = 'Insufficient funds for investment.';
      }
      break;

    case 'save':
      if (data?.amount && updatedCharacter.wealth >= data.amount) {
        const interest = Math.floor(data.amount * 0.02);
        updatedCharacter.wealth += interest;
        message = `You earned $${interest}k in savings interest.`;
      }
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Financial Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
