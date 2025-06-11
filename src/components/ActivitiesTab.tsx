
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

  // Age-based activity availability
  const getAvailableActivities = () => {
    const age = character.age;
    const activities = [
      { id: 'gym', name: 'Gym', icon: '💪', description: 'Workout', color: 'bg-red-500', minAge: 12 },
      { id: 'library', name: 'Library', icon: '📚', description: 'Study', color: 'bg-blue-500', minAge: 4 },
      { id: 'movie', name: 'Movies', icon: '🎬', description: 'Entertainment', color: 'bg-purple-500', minAge: 8 },
      { id: 'mall', name: 'Shopping', icon: '🛍️', description: 'Shop', color: 'bg-pink-500', minAge: 12 },
      { id: 'park', name: 'Park', icon: '🌳', description: 'Walk', color: 'bg-green-500', minAge: 2 },
      { id: 'friends', name: 'Friends', icon: '👥', description: 'Socialize', color: 'bg-yellow-500', minAge: 6 },
      { id: 'hobby', name: 'Hobby', icon: '🎨', description: 'Practice', color: 'bg-indigo-500', minAge: 8 },
      { id: 'volunteer', name: 'Volunteer', icon: '🤝', description: 'Help others', color: 'bg-teal-500', minAge: 14 },
      { id: 'work', name: 'Work', icon: '💼', description: 'Extra hours', color: 'bg-gray-500', minAge: 14 }
    ];

    return activities.filter(activity => age >= activity.minAge);
  };

  if (isMobile) {
    const availableActivities = getAvailableActivities();
    
    return (
      <div className="h-full bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-bold text-gray-900 text-center">Activities</h2>
          <p className="text-xs text-gray-500 text-center">Choose how to spend your time</p>
        </div>

        {/* Activities Grid - Scrollable */}
        <div className="flex-1 p-4 overflow-y-auto">
          {availableActivities.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">👶</div>
              <div className="text-sm text-gray-600">You're too young for most activities!</div>
              <div className="text-xs text-gray-400 mt-1">Wait until you're older</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {availableActivities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => onActivity(activity.id, activity.id)}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 active:scale-95 active:bg-gray-50 min-h-[80px] flex flex-col justify-center items-center"
                >
                  <div className={`w-10 h-10 ${activity.color} rounded-xl flex items-center justify-center text-xl mx-auto mb-2 text-white shadow-md`}>
                    {activity.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-900 text-center">{activity.name}</div>
                  <div className="text-xs text-gray-500 text-center mt-1">{activity.description}</div>
                </button>
              ))}
            </div>
          )}
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
