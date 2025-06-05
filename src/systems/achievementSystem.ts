
export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: string;
  requirements: {
    stat?: { name: string; value: number };
    events?: string[];
    age?: number;
    wealth?: number;
  };
}

const achievements: Achievement[] = [
  {
    id: 'first_job',
    name: 'First Job',
    description: 'Got your first job',
    emoji: '💼',
    category: 'career',
    requirements: {}
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Accumulated $1,000,000',
    emoji: '💰',
    category: 'wealth',
    requirements: { wealth: 1000000 }
  }
];

export const checkAchievements = (
  character: any, 
  eventHistory: string[], 
  currentAchievements: string[]
): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  achievements.forEach(achievement => {
    if (currentAchievements.includes(achievement.id)) return;
    
    let qualifies = true;
    
    if (achievement.requirements.wealth && character.wealth < achievement.requirements.wealth) {
      qualifies = false;
    }
    
    if (achievement.requirements.age && character.age < achievement.requirements.age) {
      qualifies = false;
    }
    
    if (qualifies) {
      newAchievements.push(achievement);
    }
  });
  
  return newAchievements;
};
