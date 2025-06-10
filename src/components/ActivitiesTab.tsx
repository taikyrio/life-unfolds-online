
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
      <div className="h-full bg-white overflow-y-auto">
        {/* BitLife-style Activities List */}
        <div className="divide-y divide-gray-200">
          {[
            { id: 'gym', name: 'Go to the gym', icon: '💪', description: 'Work out to improve health and looks' },
            { id: 'library', name: 'Go to the library', icon: '📚', description: 'Study to improve smarts' },
            { id: 'movie', name: 'Go to the movies', icon: '🎬', description: 'Have fun and improve happiness' },
            { id: 'mall', name: 'Go shopping', icon: '🛍️', description: 'Spend money to improve happiness' },
            { id: 'park', name: 'Walk in the park', icon: '🌳', description: 'Relax and improve health' },
            { id: 'friends', name: 'Hang with friends', icon: '👥', description: 'Socialize and improve relationships' },
            { id: 'hobby', name: 'Practice hobby', icon: '🎨', description: 'Develop skills and have fun' },
            { id: 'volunteer', name: 'Volunteer', icon: '🤝', description: 'Help others and feel good' }
          ].map((activity) => (
            <button
              key={activity.id}
              onClick={() => onActivity(activity.id, activity.id)}
              className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{activity.name}</div>
                <div className="text-sm text-gray-500">{activity.description}</div>
              </div>
              <span className="text-gray-400">›</span>
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
