
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
      <div className="h-full bg-gray-50 overflow-y-auto">
        {/* InstLife-style Activities Grid */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {[
            { id: 'gym', name: 'Gym', icon: '💪', description: 'Build strength & health', color: 'from-red-400 to-pink-400' },
            { id: 'library', name: 'Library', icon: '📚', description: 'Study & improve smarts', color: 'from-blue-400 to-indigo-400' },
            { id: 'movie', name: 'Movies', icon: '🎬', description: 'Have fun & relax', color: 'from-purple-400 to-pink-400' },
            { id: 'mall', name: 'Shopping', icon: '🛍️', description: 'Spend money for happiness', color: 'from-yellow-400 to-orange-400' },
            { id: 'park', name: 'Park', icon: '🌳', description: 'Walk & improve health', color: 'from-green-400 to-emerald-400' },
            { id: 'friends', name: 'Friends', icon: '👥', description: 'Socialize & have fun', color: 'from-indigo-400 to-purple-400' },
            { id: 'hobby', name: 'Hobby', icon: '🎨', description: 'Practice skills', color: 'from-pink-400 to-rose-400' },
            { id: 'volunteer', name: 'Volunteer', icon: '🤝', description: 'Help others', color: 'from-cyan-400 to-blue-400' }
          ].map((activity) => (
            <button
              key={activity.id}
              onClick={() => onActivity(activity.id, activity.id)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg`}>
                {activity.icon}
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900 text-sm mb-1">{activity.name}</div>
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
