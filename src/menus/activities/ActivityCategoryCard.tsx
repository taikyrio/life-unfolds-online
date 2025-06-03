
import React from 'react';
import { ActivityCategory } from '../../../types/activities';

interface ActivityCategoryCardProps {
  category: ActivityCategory;
  onClick: () => void;
}

export const ActivityCategoryCard: React.FC<ActivityCategoryCardProps> = ({ 
  category, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl text-left hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center space-x-4 hover:shadow-md hover:scale-[1.02] group ${
        category.id === 'crime' || category.id === 'cybercrime' ? 'border-2 border-red-200 hover:border-red-300' : ''
      }`}
    >
      <div className="text-3xl bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
        {category.emoji}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg">{category.title}</h3>
        <p className="text-sm text-gray-600">
          {category.activities.length} {category.activities.length === 1 ? 'activity' : 'activities'} available
        </p>
      </div>
      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
        →
      </div>
    </button>
  );
};
