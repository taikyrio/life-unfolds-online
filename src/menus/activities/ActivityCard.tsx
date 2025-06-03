
import React from 'react';
import { ActivityOption } from '../../../types/activities';
import { Character } from '../../../types/game';

interface ActivityCardProps {
  activity: ActivityOption;
  category: string;
  character: Character;
  canUse: boolean;
  requirementText: string;
  onClick: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  category, 
  character, 
  canUse, 
  requirementText, 
  onClick 
}) => {
  return (
    <div
      className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
        canUse 
          ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer hover:scale-[1.02]' 
          : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
      } ${
        category === 'crime' || category === 'cybercrime' ? 'border-red-200 hover:border-red-300' : ''
      }`}
      onClick={() => canUse && onClick()}
    >
      <div className="flex items-start space-x-4">
        <div className={`text-3xl ${canUse ? '' : 'grayscale'}`}>
          {activity.emoji}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${canUse ? 'text-gray-900' : 'text-gray-500'}`}>
            {activity.title}
          </h3>
          <p className={`text-sm mt-1 ${canUse ? 'text-gray-600' : 'text-gray-400'}`}>
            {activity.description}
          </p>
          
          {/* Requirements not met */}
          {!canUse && (
            <div className="mt-2 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
              {requirementText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
