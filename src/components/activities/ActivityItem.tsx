
import React from 'react';
import { Character } from '../../types/game';
import { Activity } from './ActivityData';
import { isActivityAvailable, getRequirementText } from './ActivityUtils';
import { ChevronRight, Lock, Star, Sparkles } from 'lucide-react';

interface ActivityItemProps {
  activity: Activity;
  character: Character;
  onSelect: (activity: Activity) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  character,
  onSelect
}) => {
  const available = isActivityAvailable(activity, character);
  const requirementText = getRequirementText(activity, character);

  return (
    <button
      onClick={() => available && onSelect(activity)}
      disabled={!available}
      className={`group relative p-5 rounded-2xl border transition-all duration-300 text-left ${
        available 
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]' 
          : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-60'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`text-3xl p-3 rounded-xl ${available ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
          {activity.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${available ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
              {activity.name}
            </h3>
            {activity.difficulty === 'extreme' && <Sparkles size={16} className="text-red-500" />}
            {activity.difficulty === 'hard' && <Star size={16} className="text-orange-500" />}
            {!available && <Lock size={16} className="text-gray-400" />}
          </div>
          <p className={`text-sm mt-1 ${available ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
            {activity.description}
          </p>
          {!available && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {requirementText}
            </p>
          )}
          {activity.minWealth && available && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              Cost: ${activity.minWealth.toLocaleString()}
            </p>
          )}
        </div>
        {available && (
          <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
        )}
      </div>
    </button>
  );
};
