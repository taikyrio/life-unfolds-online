
import { LifeEvent } from '../../utils/gameLogger';

export const categories = [
  { id: 'all', name: 'All Events', icon: '📋', color: 'bg-gray-500' },
  { id: 'education', name: 'Education', icon: '🎓', color: 'bg-blue-500' },
  { id: 'career', name: 'Career', icon: '💼', color: 'bg-green-500' },
  { id: 'relationship', name: 'Love', icon: '❤️', color: 'bg-red-500' },
  { id: 'health', name: 'Health', icon: '🏥', color: 'bg-orange-500' },
  { id: 'finance', name: 'Money', icon: '💰', color: 'bg-yellow-500' },
  { id: 'achievement', name: 'Goals', icon: '🏆', color: 'bg-purple-500' }
];

export const categorizeEvent = (event: string): LifeEvent['category'] => {
  const eventLower = event.toLowerCase();
  if (eventLower.includes('school') || eventLower.includes('grade') || eventLower.includes('study')) return 'education';
  if (eventLower.includes('job') || eventLower.includes('work') || eventLower.includes('career')) return 'career';
  if (eventLower.includes('love') || eventLower.includes('dating') || eventLower.includes('marriage')) return 'relationship';
  if (eventLower.includes('health') || eventLower.includes('sick') || eventLower.includes('doctor')) return 'health';
  if (eventLower.includes('money') || eventLower.includes('buy') || eventLower.includes('$')) return 'finance';
  if (eventLower.includes('achievement') || eventLower.includes('award') || eventLower.includes('won')) return 'achievement';
  return 'family';
};

export const getEventIcon = (category: LifeEvent['category']) => {
  const categoryData = categories.find(c => c.id === category);
  return categoryData?.icon || '📝';
};

export const getEventColor = (category: LifeEvent['category']) => {
  const categoryData = categories.find(c => c.id === category);
  return categoryData?.color || 'bg-gray-500';
};
