
import { Character } from '../types/character';

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: 'social' | 'academic' | 'physical' | 'creative' | 'technical' | 'financial';
  level: number;
  maxLevel: number;
  experience: number;
  experienceToNext: number;
  prerequisites: string[];
  benefits: SkillBenefit[];
  emoji: string;
}

export interface SkillBenefit {
  type: 'stat_bonus' | 'event_modifier' | 'career_unlock' | 'activity_unlock';
  value: number;
  description: string;
}

export interface SkillTree {
  [skillId: string]: Skill;
}

export class SkillTreeSystem {
  private static instance: SkillTreeSystem;

  static getInstance(): SkillTreeSystem {
    if (!SkillTreeSystem.instance) {
      SkillTreeSystem.instance = new SkillTreeSystem();
    }
    return SkillTreeSystem.instance;
  }

  initializeSkillTree(): SkillTree {
    return {
      // Social Skills
      'communication': {
        id: 'communication',
        name: 'Communication',
        description: 'Ability to express yourself clearly and persuasively',
        category: 'social',
        level: 1,
        maxLevel: 10,
        experience: 0,
        experienceToNext: 100,
        prerequisites: [],
        benefits: [
          { type: 'stat_bonus', value: 5, description: '+5 Relationships per level' },
          { type: 'event_modifier', value: 0.1, description: '10% better social outcomes' }
        ],
        emoji: '💬'
      },
      'leadership': {
        id: 'leadership',
        name: 'Leadership',
        description: 'Inspire and guide others effectively',
        category: 'social',
        level: 0,
        maxLevel: 8,
        experience: 0,
        experienceToNext: 150,
        prerequisites: ['communication'],
        benefits: [
          { type: 'career_unlock', value: 1, description: 'Unlocks management positions' },
          { type: 'stat_bonus', value: 3, description: '+3 Fame per level' }
        ],
        emoji: '👑'
      },
      // Academic Skills
      'critical_thinking': {
        id: 'critical_thinking',
        name: 'Critical Thinking',
        description: 'Analyze problems and make logical decisions',
        category: 'academic',
        level: 1,
        maxLevel: 10,
        experience: 0,
        experienceToNext: 120,
        prerequisites: [],
        benefits: [
          { type: 'stat_bonus', value: 4, description: '+4 Smarts per level' },
          { type: 'event_modifier', value: 0.15, description: '15% better academic outcomes' }
        ],
        emoji: '🧠'
      },
      'research': {
        id: 'research',
        name: 'Research',
        description: 'Find and analyze information effectively',
        category: 'academic',
        level: 0,
        maxLevel: 8,
        experience: 0,
        experienceToNext: 140,
        prerequisites: ['critical_thinking'],
        benefits: [
          { type: 'activity_unlock', value: 1, description: 'Unlocks advanced study options' },
          { type: 'career_unlock', value: 1, description: 'Unlocks research careers' }
        ],
        emoji: '🔍'
      },
      // Physical Skills
      'fitness': {
        id: 'fitness',
        name: 'Fitness',
        description: 'Physical strength and endurance',
        category: 'physical',
        level: 1,
        maxLevel: 10,
        experience: 0,
        experienceToNext: 80,
        prerequisites: [],
        benefits: [
          { type: 'stat_bonus', value: 3, description: '+3 Health per level' },
          { type: 'stat_bonus', value: 2, description: '+2 Looks per level' }
        ],
        emoji: '💪'
      },
      'athletics': {
        id: 'athletics',
        name: 'Athletics',
        description: 'Sports and competitive physical activities',
        category: 'physical',
        level: 0,
        maxLevel: 8,
        experience: 0,
        experienceToNext: 120,
        prerequisites: ['fitness'],
        benefits: [
          { type: 'career_unlock', value: 1, description: 'Unlocks sports careers' },
          { type: 'stat_bonus', value: 2, description: '+2 Fame per level' }
        ],
        emoji: '🏃'
      },
      // Creative Skills
      'artistic_expression': {
        id: 'artistic_expression',
        name: 'Artistic Expression',
        description: 'Create and appreciate various forms of art',
        category: 'creative',
        level: 1,
        maxLevel: 10,
        experience: 0,
        experienceToNext: 90,
        prerequisites: [],
        benefits: [
          { type: 'stat_bonus', value: 4, description: '+4 Happiness per level' },
          { type: 'activity_unlock', value: 1, description: 'Unlocks creative activities' }
        ],
        emoji: '🎨'
      },
      'performance': {
        id: 'performance',
        name: 'Performance',
        description: 'Entertain and captivate audiences',
        category: 'creative',
        level: 0,
        maxLevel: 8,
        experience: 0,
        experienceToNext: 130,
        prerequisites: ['artistic_expression'],
        benefits: [
          { type: 'career_unlock', value: 1, description: 'Unlocks entertainment careers' },
          { type: 'stat_bonus', value: 5, description: '+5 Fame per level' }
        ],
        emoji: '🎭'
      },
      // Technical Skills
      'technology': {
        id: 'technology',
        name: 'Technology',
        description: 'Understand and use modern technology',
        category: 'technical',
        level: 1,
        maxLevel: 10,
        experience: 0,
        experienceToNext: 110,
        prerequisites: [],
        benefits: [
          { type: 'career_unlock', value: 1, description: 'Unlocks tech careers' },
          { type: 'stat_bonus', value: 3, description: '+3 Smarts per level' }
        ],
        emoji: '💻'
      },
      // Financial Skills
      'financial_literacy': {
        id: 'financial_literacy',
        name: 'Financial Literacy',
        description: 'Manage money and understand investments',
        category: 'financial',
        level: 1,
        maxLevel: 10,
        experience: 0,
        experienceToNext: 100,
        prerequisites: [],
        benefits: [
          { type: 'stat_bonus', value: 2, description: '+2% investment returns per level' },
          { type: 'activity_unlock', value: 1, description: 'Unlocks investment options' }
        ],
        emoji: '💰'
      }
    };
  }

  addSkillExperience(character: Character, skillId: string, experience: number): void {
    if (!character.customStats) {
      character.customStats = {};
    }
    if (!character.customStats.skillTree) {
      character.customStats.skillTree = this.initializeSkillTree();
    }

    const skill = character.customStats.skillTree[skillId];
    if (!skill || skill.level >= skill.maxLevel) return;

    skill.experience += experience;
    
    while (skill.experience >= skill.experienceToNext && skill.level < skill.maxLevel) {
      skill.experience -= skill.experienceToNext;
      skill.level++;
      skill.experienceToNext = Math.floor(skill.experienceToNext * 1.2);
      
      this.applySkillBenefits(character, skill);
    }
  }

  private applySkillBenefits(character: Character, skill: Skill): void {
    skill.benefits.forEach(benefit => {
      switch (benefit.type) {
        case 'stat_bonus':
          if (skill.category === 'social') {
            character.relationships = Math.min(100, character.relationships + benefit.value);
          } else if (skill.category === 'academic') {
            character.smarts = Math.min(100, character.smarts + benefit.value);
          } else if (skill.category === 'physical') {
            character.health = Math.min(100, character.health + benefit.value);
          }
          break;
      }
    });
  }

  getAvailableSkills(character: Character): Skill[] {
    if (!character.customStats?.skillTree) return [];
    
    return Object.values(character.customStats.skillTree).filter(skill => {
      return skill.prerequisites.every(prereq => {
        const prereqSkill = character.customStats!.skillTree[prereq];
        return prereqSkill && prereqSkill.level > 0;
      });
    });
  }

  getSkillModifier(character: Character, category: string): number {
    if (!character.customStats?.skillTree) return 0;
    
    const relevantSkills = Object.values(character.customStats.skillTree)
      .filter(skill => skill.category === category);
    
    return relevantSkills.reduce((total, skill) => total + skill.level, 0);
  }
}

export const skillTreeSystem = SkillTreeSystem.getInstance();
