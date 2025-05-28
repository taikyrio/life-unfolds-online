
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
  };
  effects: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
  };
}

interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onSelectActivity: (activity: ActivityOption) => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  character,
  onSelectActivity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const activityCategories: ActivityCategory[] = [
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

  // Add adult activities if character is 18+
  const allCategories = [...activityCategories];
  if (character.age >= 18) {
    allCategories.push({
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

  const formatEffects = (effects: ActivityOption['effects']): string => {
    const effectStrings: string[] = [];
    Object.entries(effects).forEach(([key, value]) => {
      if (value !== 0 && value !== undefined) {
        const sign = value > 0 ? '+' : '';
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        effectStrings.push(`${label}: ${sign}${value}`);
      }
    });
    return effectStrings.join(', ');
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
                allCategories.find(c => c.id === selectedCategory)?.title : 
                'Choose Activity'
              }
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Age: {character.age} | Wealth: ${character.wealth}
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
              {allCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl text-left hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center space-x-4 hover:shadow-md hover:scale-[1.02] group"
                >
                  <div className="text-3xl bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    {category.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{category.title}</h3>
                    <p className="text-sm text-gray-600">
                      {category.activities.length} {category.activities.length === 1 ? 'activity' : 'activities'} available
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    →
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {allCategories
                .find(c => c.id === selectedCategory)
                ?.activities.map((activity) => {
                  const canUse = canUseActivity(activity);
                  return (
                    <div
                      key={activity.id}
                      className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                        canUse 
                          ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer hover:scale-[1.02]' 
                          : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                      }`}
                      onClick={() => canUse && onSelectActivity(activity)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`text-3xl ${canUse ? '' : 'grayscale'}`}>
                          {activity.emoji}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-lg ${canUse ? 'text-gray-900' : 'text-gray-500'}`}>
                            {activity.title}
                          </h3>
                          <p className={`text-sm mt-1 ${canUse ? 'text-gray-600' : 'text-gray-400'}`}>
                            {activity.description}
                          </p>
                          
                          {/* Effects preview */}
                          {canUse && (
                            <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                              {formatEffects(activity.effects)}
                            </div>
                          )}
                          
                          {/* Requirements not met */}
                          {!canUse && activity.requirements && (
                            <div className="mt-2 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
                              {activity.requirements.minAge && character.age < activity.requirements.minAge && 
                                `Requires age ${activity.requirements.minAge}+`}
                              {activity.requirements.minWealth && character.wealth < activity.requirements.minWealth && 
                                ` Requires $${activity.requirements.minWealth}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Demo component to show the modal in action
export default function ActivityModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [character, setCharacter] = useState<Character>({
    name: 'Demo Character',
    age: 25,
    wealth: 150,
    happiness: 75,
    health: 80,
    smarts: 65,
    looks: 70,
    relationships: 60,
    year: 2024,
    zodiacSign: {
      name: 'Leo',
      emoji: '♌',
      traits: ['Confident', 'Generous'],
      luckyNumbers: [1, 3, 10],
      element: 'fire'
    },
    birthMonth: 8,
    birthDay: 15,
    familyMembers: [],
    pets: [],
    jobLevel: 1,
    salary: 30000,
    education: ['High School'],
    relationshipStatus: 'single',
    children: [],
    criminalRecord: false,
    fame: 0,
    nationality: 'American',
    birthplace: 'New York',
    birthWeight: 7.5,
    birthComplications: false,
    premature: false,
    assets: []
  });

  const handleSelectActivity = (activity: ActivityOption) => {
    // Apply activity effects to character
    const updatedCharacter = { ...character };
    Object.entries(activity.effects).forEach(([key, value]) => {
      if (value !== undefined && key in updatedCharacter) {
        const currentValue = (updatedCharacter as any)[key];
        if (typeof currentValue === 'number') {
          (updatedCharacter as any)[key] = Math.max(0, Math.min(100, currentValue + value));
        }
      }
    });
    
    setCharacter(updatedCharacter);
    setIsModalOpen(false);
    
    // Show feedback
    alert(`You chose: ${activity.title}!\nEffects: ${Object.entries(activity.effects).map(([k, v]) => `${k}: ${v && v > 0 ? '+' : ''}${v}`).join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Life Simulator</h1>
        
        {/* Character Stats */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Character Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="text-lg font-semibold">{character.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Wealth</p>
              <p className="text-lg font-semibold">${character.wealth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Happiness</p>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${character.happiness}%` }}
                  />
                </div>
                <span className="text-sm">{character.happiness}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Health</p>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${character.health}%` }}
                  />
                </div>
                <span className="text-sm">{character.health}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Smarts</p>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${character.smarts}%` }}
                  />
                </div>
                <span className="text-sm">{character.smarts}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Looks</p>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className="h-full bg-pink-400 rounded-full"
                    style={{ width: `${character.looks}%` }}
                  />
                </div>
                <span className="text-sm">{character.looks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Choose Activity 🎯
        </button>
      </div>

      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        character={character}
        onSelectActivity={handleSelectActivity}
      />
    </div>
  );
}
