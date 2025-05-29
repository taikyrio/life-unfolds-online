
import { Character } from '../../types/game';

export const handleCareerAction = (
  character: Character,
  action: string,
  data?: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'criminal_operation':
      if (data) {
        const operation = data;
        const successChance = 100 - operation.arrestChance;
        const isSuccessful = Math.random() * 100 < successChance;
        
        if (isSuccessful) {
          const reward = Math.floor(Math.random() * (operation.maxReward - operation.minReward + 1)) + operation.minReward;
          updatedCharacter.wealth += reward;
          
          const currentNotoriety = updatedCharacter.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0';
          const newNotoriety = Math.min(100, parseInt(currentNotoriety) + operation.notorietyGain);
          updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('notoriety:')) || [];
          updatedCharacter.flags.push(`notoriety:${newNotoriety}`);
          
          message = `${operation.name} successful! You earned $${reward}k and gained ${operation.notorietyGain} notoriety.`;
        } else {
          updatedCharacter.criminalRecord = true;
          updatedCharacter.health = Math.max(0, updatedCharacter.health - 20);
          updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 30);
          message = `${operation.name} failed! You were arrested and now have a criminal record.`;
        }
      }
      break;

    case 'murder':
      if (data?.target) {
        const murderChance = 70;
        const isSuccessful = Math.random() * 100 < murderChance;
        
        if (isSuccessful) {
          if (data.target === 'family_member' && updatedCharacter.familyMembers.length > 0) {
            const familyIndex = Math.floor(Math.random() * updatedCharacter.familyMembers.length);
            const victim = updatedCharacter.familyMembers[familyIndex];
            updatedCharacter.familyMembers[familyIndex].alive = false;
            updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 50);
            message = `You murdered ${victim.name}. The guilt weighs heavily on you.`;
          } else if (data.target === 'stranger') {
            updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 30);
            message = 'You murdered a stranger. The deed is done, but at what cost?';
          }
          
          const currentNotoriety = updatedCharacter.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0';
          const newNotoriety = Math.min(100, parseInt(currentNotoriety) + 30);
          updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('notoriety:')) || [];
          updatedCharacter.flags.push(`notoriety:${newNotoriety}`);
        } else {
          updatedCharacter.criminalRecord = true;
          message = 'Murder attempt failed! You were caught and arrested.';
        }
      }
      break;

    case 'coding_practice':
      if (updatedCharacter.age >= 8) {
        const currentCoding = updatedCharacter.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0';
        const newCoding = Math.min(100, parseInt(currentCoding) + 5);
        updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('coding:')) || [];
        updatedCharacter.flags.push(`coding:${newCoding}`);
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 3);
        message = `You practiced coding and improved your skills! Coding skill: ${newCoding}/100`;
      }
      break;

    case 'cybercrime':
      if (data && updatedCharacter.age >= 14) {
        const codingSkill = parseInt(updatedCharacter.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0');
        const successChance = Math.min(90, codingSkill * 0.8);
        const isSuccessful = Math.random() * 100 < successChance;
        
        if (isSuccessful) {
          const reward = Math.floor(codingSkill * 2 + Math.random() * 50);
          updatedCharacter.wealth += reward;
          
          const currentNotoriety = updatedCharacter.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0';
          const newNotoriety = Math.min(100, parseInt(currentNotoriety) + 10);
          updatedCharacter.flags = updatedCharacter.flags?.filter(f => !f.startsWith('notoriety:')) || [];
          updatedCharacter.flags.push(`notoriety:${newNotoriety}`);
          
          message = `${data.name} successful! You earned $${reward}k through cybercrime.`;
        } else {
          updatedCharacter.criminalRecord = true;
          message = `${data.name} failed! Your digital footprint was traced back to you.`;
        }
      }
      break;

    case 'join_criminal_career':
      if (data?.id) {
        updatedCharacter.job = data.name;
        updatedCharacter.salary = data.baseSalary;
        updatedCharacter.jobLevel = 1;
        message = `You joined the ${data.name} career path!`;
      }
      break;

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
