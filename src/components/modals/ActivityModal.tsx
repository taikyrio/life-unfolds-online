
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Character } from '../../types/game';

interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  requirements?: {
    minAge?: number;
    maxAge?: number;
    minWealth?: number;
    education?: string;
  };
  effects: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
  };
}

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onSelectActivity: (activity: ActivityOption) => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  character,
  onSelectActivity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activityCategories = [
    {
      id: 'mind',
      title: 'Mind & Body',
      emoji: '🧠',
      activities: [
        {
          id: 'study',
          title: 'Study',
          description: 'Hit the books and increase your intelligence',
          emoji: '📚',
          requirements: { minAge: 6 },
          effects: { smarts: 5, happiness: -2 }
        },
        {
          id: 'gym',
          title: 'Go to the Gym',
          description: 'Work out and improve your health',
          emoji: '💪',
          requirements: { minAge: 12 },
          effects: { health: 8, looks: 3, happiness: 2 }
        },
        {
          id: 'meditate',
          title: 'Meditate',
          description: 'Find inner peace and happiness',
          emoji: '🧘',
          requirements: { minAge: 10 },
          effects: { happiness: 10, health: 2 }
        }
      ]
    },
    {
      id: 'social',
      title: 'Social',
      emoji: '👥',
      activities: [
        {
          id: 'party',
          title: 'Go to a Party',
          description: 'Have fun but risk your health',
          emoji: '🎉',
          requirements: { minAge: 16 },
          effects: { happiness: 8, health: -3, looks: 2 }
        },
        {
          id: 'volunteer',
          title: 'Volunteer',
          description: 'Help others and feel good about yourself',
          emoji: '🤝',
          requirements: { minAge: 14 },
          effects: { happiness: 6, smarts: 2 }
        }
      ]
    },
    {
      id: 'entertainment',
      title: 'Entertainment',
      emoji: '🎮',
      activities: [
        {
          id: 'movie',
          title: 'Watch a Movie',
          description: 'Relax and enjoy some entertainment',
          emoji: '🎬',
          requirements: { minAge: 5, minWealth: 15 },
          effects: { happiness: 4, wealth: -15 }
        },
        {
          id: 'shopping',
          title: 'Go Shopping',
          description: 'Treat yourself to something nice',
          emoji: '🛍️',
          requirements: { minAge: 12, minWealth: 50 },
          effects: { happiness: 6, looks: 3, wealth: -50 }
        }
      ]
    }
  ];

  if (character.age >= 18) {
    activityCategories.push({
      id: 'adult',
      title: 'Adult Activities',
      emoji: '🏦',
      activities: [
        {
          id: 'bank',
          title: 'Visit Bank',
          description: 'Manage your finances and apply for loans',
          emoji: '🏦',
          requirements: { minAge: 18 },
          effects: { happiness: 1, smarts: 1 }
        },
        {
          id: 'casino',
          title: 'Go to Casino',
          description: 'Try your luck but risk losing money',
          emoji: '🎰',
          requirements: { minAge: 21, minWealth: 100 },
          effects: { happiness: 5, wealth: -100 }
        }
      ]
    });
  }

  const canUseActivity = (activity: ActivityOption): boolean => {
    const req = activity.requirements;
    if (!req) return true;
    
    if (req.minAge && character.age < req.minAge) return false;
    if (req.maxAge && character.age > req.maxAge) return false;
    if (req.minWealth && character.wealth < req.minWealth) return false;
    
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory ? 
              activityCategories.find(c => c.id === selectedCategory)?.title : 
              'Activities'
            }
          </h2>
          <button
            onClick={selectedCategory ? () => setSelectedCategory(null) : onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          {!selectedCategory ? (
            <div className="space-y-3">
              {activityCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full p-4 bg-gray-50 rounded-2xl text-left hover:bg-gray-100 transition-colors flex items-center space-x-3"
                >
                  <span className="text-2xl">{category.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">
                      {category.activities.length} activities available
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {activityCategories
                .find(c => c.id === selectedCategory)
                ?.activities.map((activity) => {
                  const canUse = canUseActivity(activity);
                  return (
                    <button
                      key={activity.id}
                      onClick={() => canUse && onSelectActivity(activity)}
                      disabled={!canUse}
                      className={`w-full p-4 rounded-2xl text-left transition-colors flex items-start space-x-3 ${
                        canUse 
                          ? 'bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-200' 
                          : 'bg-gray-100 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-2xl mt-1">{activity.emoji}</span>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${canUse ? 'text-gray-900' : 'text-gray-500'}`}>
                          {activity.title}
                        </h3>
                        <p className={`text-sm ${canUse ? 'text-gray-600' : 'text-gray-400'}`}>
                          {activity.description}
                        </p>
                        {!canUse && activity.requirements && (
                          <p className="text-xs text-red-500 mt-1">
                            {activity.requirements.minAge && character.age < activity.requirements.minAge && 
                              `Requires age ${activity.requirements.minAge}+`}
                            {activity.requirements.minWealth && character.wealth < activity.requirements.minWealth && 
                              `Requires $${activity.requirements.minWealth}`}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
