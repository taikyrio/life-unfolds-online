
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { getActivityCategories, Activity } from './ActivityData';
import { ActivityHeader } from './ActivityHeader';
import { ActivityCategoryGrid } from './ActivityCategoryGrid';
import { ActivityList } from './ActivityList';

interface ActivitiesTabContainerProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTabContainer: React.FC<ActivitiesTabContainerProps> = ({ 
  character, 
  onActivity 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activityCategories = getActivityCategories().filter(category => 
    character.age >= category.unlockAge
  );

  const handleActivitySelect = (activity: Activity) => {
    onActivity(activity.id, null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    const category = activityCategories.find(c => c.id === selectedCategory);
    if (!category) return null;

    const availableActivities = category.activities.filter(activity => 
      character.age >= activity.minAge && (!activity.maxAge || character.age <= activity.maxAge)
    );

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <ActivityHeader 
          character={character} 
          selectedCategory={category} 
          onBack={handleBackToCategories} 
        />

        <ActivityList 
          activities={availableActivities}
          character={character}
          onActivitySelect={handleActivitySelect}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Activities Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-2">🎯</div>
          <h1 className="text-2xl font-bold mb-2">Activities</h1>
          <p className="text-blue-100 mb-4">Choose what to do with your time</p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span>👶</span>
              <span>Age {character.age}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💰</span>
              <span>${character.wealth}k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <ActivityCategoryGrid 
          categories={activityCategories}
          character={character}
          onCategorySelect={setSelectedCategory}
        />
      </div>
    </div>
  );
};
