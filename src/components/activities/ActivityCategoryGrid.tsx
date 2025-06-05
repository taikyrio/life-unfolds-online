
import React from 'react';
import { Character } from '../../types/game';
import { ActivityCategory } from './ActivityData';
import { ChevronRight, Lock } from 'lucide-react';

interface ActivityCategoryGridProps {
  categories: ActivityCategory[];
  character: Character;
  onCategorySelect: (categoryId: string) => void;
}

export const ActivityCategoryGrid: React.FC<ActivityCategoryGridProps> = ({
  categories,
  character,
  onCategorySelect
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((category) => {
        const availableCount = category.activities.filter(activity => 
          character.age >= activity.minAge && (!activity.maxAge || character.age <= activity.maxAge)
        ).length;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="group relative p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 text-left hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                  {category.emoji}
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {category.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {availableCount} {availableCount === 1 ? 'activity' : 'activities'}
                </span>
                {character.age < category.unlockAge && (
                  <span className="flex items-center gap-1 text-xs text-red-500">
                    <Lock size={12} />
                    Age {category.unlockAge}+
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
