
import { Career } from './types';
import { entryLevelCareers } from './entryLevel';
import { educationCareers } from './education';
import { technologyCareers } from './technology';
import { healthcareCareers } from './healthcare';
import { legalCareers } from './legal';
import { entertainmentCareers } from './entertainment';
import { businessCareers } from './business';

export type { Career, CareerLevel } from './types';

export const careerPaths: Career[] = [
  ...entryLevelCareers,
  ...educationCareers,
  ...technologyCareers,
  ...healthcareCareers,
  ...legalCareers,
  ...entertainmentCareers,
  ...businessCareers
];

export const getCareerById = (careerId: string): Career | undefined => {
  return careerPaths.find(career => career.id === careerId);
};

export const getCareersByCategory = (category: string): Career[] => {
  return careerPaths.filter(career => career.category === category);
};

export const getAllCareerCategories = (): string[] => {
  return [...new Set(careerPaths.map(career => career.category))];
};
