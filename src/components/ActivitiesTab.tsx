
import React from 'react';
import { Character } from '../types/game';
import { ActivitiesTabContainer } from './activities/ActivitiesTabContainer';
import { useIsMobile } from '../hooks/use-mobile';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="h-full bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <h2 className="text-xl font-bold text-gray-900 text-center">Activities</h2>
          <p className="text-sm text-gray-500 text-center">Choose how to spend your time</p>
        </div>

        {/* Activities Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'gym', name: 'Gym', icon: '💪', description: 'Workout', color: 'bg-red-500' },
              { id: 'library', name: 'Library', icon: '📚', description: 'Study', color: 'bg-blue-500' },
              { id: 'movie', name: 'Movies', icon: '🎬', description: 'Entertainment', color: 'bg-purple-500' },
              { id: 'mall', name: 'Shopping', icon: '🛍️', description: 'Shop', color: 'bg-pink-500' },
              { id: 'park', name: 'Park', icon: '🌳', description: 'Walk', color: 'bg-green-500' },
              { id: 'friends', name: 'Friends', icon: '👥', description: 'Socialize', color: 'bg-yellow-500' },
              { id: 'hobby', name: 'Hobby', icon: '🎨', description: 'Practice', color: 'bg-indigo-500' },
              { id: 'volunteer', name: 'Volunteer', icon: '🤝', description: 'Help others', color: 'bg-teal-500' },
              { id: 'work', name: 'Work', icon: '💼', description: 'Extra hours', color: 'bg-gray-500' }
            ].map((activity) => (
              <button
                key={activity.id}
                onClick={() => onActivity(activity.id, activity.id)}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-95"
              >
                <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center text-xl mx-auto mb-2 text-white shadow-sm`}>
                  {activity.icon}
                </div>
                <div className="text-xs font-medium text-gray-900 mb-1">{activity.name}</div>
                <div className="text-xs text-gray-500 leading-tight">{activity.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ActivitiesTabContainer 
      character={character}
      onActivity={onActivity}
    />
  );
};
