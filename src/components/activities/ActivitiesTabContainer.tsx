
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

  // Handle activity selection with logging
  const handleActivitySelect = (activity: Activity) => {
    // Call the original activity handler with the correct format
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
      <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ActivityHeader character={character} />

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
