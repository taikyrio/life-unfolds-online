
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Character } from '../../types/game';
import { ActivityCategoryCard } from './activities/ActivityCategoryCard';
import { ActivityCard } from './activities/ActivityCard';
import { canUseActivity, getRequirementText, getCodingSkill, getNotoriety } from './activities/ActivityUtils';
import { getActivityCategories } from '../../data/activityCategories';
import { crimeOperations, cybercrimes } from '../../data/criminalOperations';

interface ActivitiesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onActivity: (activityType: string, activityId: string | object) => void;
}

export const ActivitiesMenu: React.FC<ActivitiesMenuProps> = ({
  isOpen,
  onClose,
  character,
  onActivity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const hasPartner = character.familyMembers.some(member => 
    (member.relationship === 'lover' || member.relationship === 'spouse') && member.alive
  );

  const codingSkill = getCodingSkill(character);
  const notoriety = getNotoriety(character);
  const activityCategories = getActivityCategories(character.age, codingSkill);

  const handleActivityClick = (categoryId: string, activityId: string) => {
    if (categoryId === 'crime') {
      if (activityId.startsWith('murder_')) {
        const target = activityId === 'murder_family' ? 'family_member' : 'stranger';
        onActivity('murder', { target });
      } else if (crimeOperations[activityId]) {
        onActivity('criminal_operation', crimeOperations[activityId]);
      }
    } else if (categoryId === 'cybercrime') {
      if (cybercrimes[activityId]) {
        onActivity('cybercrime', cybercrimes[activityId]);
      }
    } else {
      onActivity(categoryId, activityId);
    }
  };

  if (!isOpen) return null;

  const selectedCategoryData = activityCategories.find(c => c.id === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
      <div className="glass-backdrop rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/30 transform transition-all duration-500 ease-out scale-100">
        {/* Enhanced Header */}
        <div className="apple-header sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="apple-back-button flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Back
              </button>
            )}
            <div className="flex-1">
              <h2 className="apple-title flex items-center gap-3">
                {selectedCategoryData && (
                  <span className="text-2xl">{selectedCategoryData.emoji}</span>
                )}
                {selectedCategory ? selectedCategoryData?.title : 'Activities'}
              </h2>
              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  🎂 Age {character.age}
                </span>
                <span className="flex items-center gap-1">
                  💰 ${character.wealth.toLocaleString()}
                </span>
                {codingSkill > 0 && (
                  <span className="flex items-center gap-1">
                    💻 Coding {codingSkill}
                  </span>
                )}
                {notoriety > 0 && (
                  <span className="flex items-center gap-1">
                    🚨 Notoriety {notoriety}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 group"
          >
            <X size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200" />
          </button>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] mobile-scroll">
          {!selectedCategory ? (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">
                  What would you like to do?
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Choose from {activityCategories.length} activity categories
                </p>
              </div>
              
              <div className="category-grid">
                {activityCategories.map((category) => (
                  <ActivityCategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedCategoryData?.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {selectedCategoryData?.activities.length} {selectedCategoryData?.activities.length === 1 ? 'activity' : 'activities'} available
                </p>
              </div>
              
              <div className="activity-grid">
                {selectedCategoryData?.activities.map((activity) => {
                  const canUse = canUseActivity(activity, character, hasPartner);
                  const requirementText = getRequirementText(activity, character, hasPartner);
                  
                  return (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      category={selectedCategory}
                      character={character}
                      canUse={canUse}
                      requirementText={requirementText}
                      onClick={() => handleActivityClick(selectedCategory, activity.id)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
