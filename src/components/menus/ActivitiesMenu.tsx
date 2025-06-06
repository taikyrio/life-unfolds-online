
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Character } from '../../types/game';
import { ActivityCategoryCard } from './activities/ActivityCategoryCard';
import { ActivityCard } from './activities/ActivityCard';
import { canUseActivity, getRequirementText, getCodingSkill, getNotoriety } from './activities/ActivityUtils';
import { getActivityCategories } from '../../data/activityCategories';
import { crimeOperations, cybercrimes } from '../../data/criminalOperations';

interface ActivitiesMenuProps {
  character: Character;
  onActivity: (activityType: string, activityId: string | object) => void;
  onClose: () => void;
  onActivityComplete?: () => void;
  isOpen: boolean;
}

export const ActivitiesMenu: React.FC<ActivitiesMenuProps> = ({
  isOpen,
  onClose,
  character,
  onActivity,
  onActivityComplete
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const hasPartner = character.familyMembers?.some(member => 
    (member.relationship === 'lover' || member.relationship === 'spouse') && member.alive
  ) || false;

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out translate-y-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory ? 
                activityCategories.find(c => c.id === selectedCategory)?.title : 
                'Choose Activity'
              }
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Age: {character.age} | Wealth: ${character.wealth}
              {codingSkill > 0 && ` | Coding: ${codingSkill}`}
              {notoriety > 0 && ` | Notoriety: ${notoriety}`}
            </p>
          </div>
          <button
            onClick={selectedCategory ? () => setSelectedCategory(null) : onClose}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {!selectedCategory ? (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm mb-4">What would you like to do?</p>
              {activityCategories.map((category) => (
                <ActivityCategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {activityCategories
                .find(c => c.id === selectedCategory)
                ?.activities.map((activity) => {
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
          )}
        </div>
      </div>
    </div>
  );
};
