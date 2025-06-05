import { Character } from '../types/game';
import { careerPaths, getCareerById } from '../data/careers/index';
import { Career } from '../data/careers/types';

export interface CareerProgressionResult {
  promoted: boolean;
  newTitle?: string;
  salaryIncrease?: number;
  message: string;
}

export const processCareerProgression = (character: Character): CareerProgressionResult => {
  if (!character.job || character.job === 'Unemployed') {
    return { promoted: false, message: '' };
  }

  const career = getCareerById(character.jobId || '');
  if (!career) {
    return { promoted: false, message: '' };
  }

  const currentLevel = character.jobLevel || 0;
  const nextLevel = career.levels[currentLevel + 1];

  if (!nextLevel) {
    return { promoted: false, message: 'You\'ve reached the top of your career ladder!' };
  }

  // Check if promotion requirements are met
  const experience = character.workExperience || 0;
  const meetsRequirements = (
    (!nextLevel.requirements.experience || experience >= nextLevel.requirements.experience) &&
    (!nextLevel.requirements.age || character.age >= nextLevel.requirements.age) &&
    (!nextLevel.requirements.stats || Object.entries(nextLevel.requirements.stats).every(
      ([stat, value]) => (character as any)[stat] >= value
    ))
  );

  if (!meetsRequirements) {
    return { promoted: false, message: '' };
  }

  // Random promotion chance
  const promotionRoll = Math.random();
  const promotionChance = nextLevel.promotionChance * getPromotionModifier(character);

  if (promotionRoll <= promotionChance) {
    const salaryIncrease = nextLevel.salary - career.levels[currentLevel].salary;
    return {
      promoted: true,
      newTitle: nextLevel.title,
      salaryIncrease,
      message: `Congratulations! You've been promoted to ${nextLevel.title}!`
    };
  }

  return { promoted: false, message: '' };
};

const getPromotionModifier = (character: Character): number => {
  let modifier = 1.0;

  // Performance-based modifiers
  if (character.smarts > 80) modifier += 0.2;
  if (character.relationships > 70) modifier += 0.15;
  if (character.health > 80) modifier += 0.1;
  if (character.happiness > 70) modifier += 0.1;

  // Negative modifiers
  if (character.health < 50) modifier -= 0.2;
  if (character.happiness < 40) modifier -= 0.15;

  return Math.max(0.1, modifier);
};

export const calculateYearlySalary = (character: Character): number => {
  if (!character.job || character.job === 'Unemployed') {
    return 0;
  }

  const career = getCareerById(character.jobId || '');
  if (!career) {
    return character.salary || 0;
  }

  const currentLevel = character.jobLevel || 0;
  const baseSalary = career.levels[currentLevel]?.salary || 0;

  // Add performance bonuses
  let performanceMultiplier = 1.0;
  if (character.smarts > 80) performanceMultiplier += 0.1;
  if (character.relationships > 70) performanceMultiplier += 0.05;

  return Math.floor(baseSalary * performanceMultiplier);
};

export const getCareerBenefits = (character: Character) => {
  if (!character.job || character.job === 'Unemployed') {
    return null;
  }

  const career = getCareerById(character.jobId || '');
  return career?.benefits || null;
};