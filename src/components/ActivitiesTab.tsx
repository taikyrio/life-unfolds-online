
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
      <div className="h-full bg-gray-100 p-4 overflow-y-auto">
        {/* Activities Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'gym', name: 'Gym', icon: '💪', description: 'Workout to improve health & looks', color: 'bg-red-500' },
            { id: 'library', name: 'Library', icon: '📚', description: 'Study to improve intelligence', color: 'bg-blue-500' },
            { id: 'movie', name: 'Movies', icon: '🎬', description: 'Watch movies for happiness', color: 'bg-purple-500' },
            { id: 'mall', name: 'Shopping', icon: '🛍️', description: 'Shop for happiness & looks', color: 'bg-pink-500' },
            { id: 'park', name: 'Park', icon: '🌳', description: 'Walk in the park for health', color: 'bg-green-500' },
            { id: 'friends', name: 'Friends', icon: '👥', description: 'Hang out with friends', color: 'bg-yellow-500' },
            { id: 'hobby', name: 'Hobby', icon: '🎨', description: 'Practice your hobbies', color: 'bg-indigo-500' },
            { id: 'volunteer', name: 'Volunteer', icon: '🤝', description: 'Help others in community', color: 'bg-teal-500' }
          ].map((activity) => (
            <button
              key={activity.id}
              onClick={() => onActivity(activity.id, activity.id)}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-95 text-left"
            >
              <div className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center text-2xl mx-auto mb-3 text-white`}>
                {activity.icon}
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 text-sm mb-1">{activity.name}</div>
                <div className="text-xs text-gray-500 leading-tight">{activity.description}</div>
              </div>
            </button>
          ))}
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
