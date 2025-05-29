import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Character } from '../../types/game';

interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  minAge?: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
}

interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}

interface ActivitiesMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
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

  const getCodingSkill = () => {
    return parseInt(character.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0');
  };

  const getNotoriety = () => {
    return parseInt(character.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0');
  };

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
          minAge: 6
        },
        {
          id: 'gym',
          title: 'Go to the Gym',
          description: 'Work out and improve your health',
          emoji: '💪',
          minAge: 14,
          minWealth: 30
        },
        {
          id: 'meditate',
          title: 'Meditate',
          description: 'Find inner peace and happiness',
          emoji: '🧘',
          minAge: 10
        },
        {
          id: 'coding_practice',
          title: 'Practice Coding',
          description: 'Learn programming skills for future opportunities',
          emoji: '💻',
          minAge: 8
        }
      ]
    },
    {
      id: 'social',
      title: 'Social',
      emoji: '👥',
      activities: [
        {
          id: 'find_love',
          title: 'Find Love',
          description: 'Look for someone special',
          emoji: '💕',
          minAge: 16
        },
        {
          id: 'date_night',
          title: 'Date Night',
          description: 'Have a romantic evening with your partner',
          emoji: '🌹',
          minAge: 16,
          minWealth: 50,
          requiresPartner: true
        },
        {
          id: 'party',
          title: 'Go to a Party',
          description: 'Have fun but risk your health',
          emoji: '🎉',
          minAge: 16
        },
        {
          id: 'volunteer',
          title: 'Volunteer',
          description: 'Help others and feel good about yourself',
          emoji: '🤝',
          minAge: 14
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
          minAge: 5,
          minWealth: 15
        },
        {
          id: 'shopping',
          title: 'Go Shopping',
          description: 'Treat yourself to something nice',
          emoji: '🛍️',
          minAge: 12,
          minWealth: 50
        }
      ]
    }
  ];

  // Add crime category
  activityCategories.push({
    id: 'crime',
    title: 'Criminal Activities',
    emoji: '🔫',
    activities: [
      {
        id: 'pickpocket',
        title: 'Pickpocket',
        description: 'Steal from unsuspecting victims',
        emoji: '👛',
        minAge: 12
      },
      {
        id: 'burglary',
        title: 'Burglary',
        description: 'Break into homes and steal valuables',
        emoji: '🏠',
        minAge: 14
      },
      {
        id: 'bank_robbery',
        title: 'Bank Robbery',
        description: 'Rob a bank for big money (high risk)',
        emoji: '🏦',
        minAge: 18,
        minWealth: 10 // Need some money for equipment
      },
      {
        id: 'extortion',
        title: 'Extortion',
        description: 'Collect protection money from businesses',
        emoji: '💰',
        minAge: 16
      },
      {
        id: 'murder_family',
        title: 'Murder Family Member',
        description: 'Kill a family member (extremely dangerous)',
        emoji: '🔪',
        minAge: 16
      },
      {
        id: 'murder_stranger',
        title: 'Murder Stranger',
        description: 'Kill a random person (very risky)',
        emoji: '💀',
        minAge: 16
      }
    ]
  });

  // Add cybercrime if eligible
  if (character.age >= 14 && getCodingSkill() >= 20) {
    activityCategories.push({
      id: 'cybercrime',
      title: 'Cybercrime',
      emoji: '💻',
      activities: [
        {
          id: 'hack_bank',
          title: 'Hack Bank',
          description: 'Steal money through digital theft',
          emoji: '🏧',
          minAge: 14
        },
        {
          id: 'identity_theft',
          title: 'Identity Theft',
          description: 'Steal personal information for profit',
          emoji: '🆔',
          minAge: 14
        },
        {
          id: 'ransomware',
          title: 'Deploy Ransomware',
          description: 'Lock computer systems for ransom',
          emoji: '🔒',
          minAge: 16
        },
        {
          id: 'corporate_espionage',
          title: 'Corporate Espionage',
          description: 'Steal company secrets and data',
          emoji: '🕵️',
          minAge: 18
        }
      ]
    });
  }

  // Add adult activities if character is 18+
  if (character.age >= 18) {
    activityCategories.push({
      id: 'adult',
      title: 'Adult Activities',
      emoji: '🏦',
      activities: [
        {
          id: 'casino',
          title: 'Go to Casino',
          description: 'Try your luck but risk losing money',
          emoji: '🎰',
          minAge: 21,
          minWealth: 100
        },
        {
          id: 'bar',
          title: 'Go to Bar',
          description: 'Have some drinks and socialize',
          emoji: '🍺',
          minAge: 21,
          minWealth: 30
        }
      ]
    });
  }

  const canUseActivity = (activity: ActivityOption): boolean => {
    if (activity.minAge && character.age < activity.minAge) return false;
    if (activity.maxAge && character.age > activity.maxAge) return false;
    if (activity.minWealth && character.wealth < activity.minWealth) return false;
    if (activity.requiresPartner && !hasPartner) return false;
    
    return true;
  };

  const getRequirementText = (activity: ActivityOption): string => {
    const requirements = [];
    if (activity.minAge && character.age < activity.minAge) {
      requirements.push(`Requires age ${activity.minAge}+`);
    }
    if (activity.minWealth && character.wealth < activity.minWealth) {
      requirements.push(`Requires $${activity.minWealth}`);
    }
    if (activity.requiresPartner && !hasPartner) {
      requirements.push('Requires a partner');
    }
    return requirements.join(', ');
  };

  const handleActivityClick = (categoryId: string, activityId: string) => {
    if (categoryId === 'crime') {
      const crimeOperations = {
        pickpocket: { name: 'Pickpocket', minReward: 1, maxReward: 5, arrestChance: 15, notorietyGain: 2 },
        burglary: { name: 'Burglary', minReward: 10, maxReward: 50, arrestChance: 25, notorietyGain: 5 },
        bank_robbery: { name: 'Bank Robbery', minReward: 100, maxReward: 500, arrestChance: 60, notorietyGain: 20 },
        extortion: { name: 'Extortion', minReward: 20, maxReward: 100, arrestChance: 30, notorietyGain: 8 }
      };
      
      if (activityId.startsWith('murder_')) {
        const target = activityId === 'murder_family' ? 'family_member' : 'stranger';
        onActivity('murder', { target });
      } else if (crimeOperations[activityId as keyof typeof crimeOperations]) {
        onActivity('criminal_operation', crimeOperations[activityId as keyof typeof crimeOperations]);
      }
    } else if (categoryId === 'cybercrime') {
      const cybercrimes = {
        hack_bank: { name: 'Bank Hacking' },
        identity_theft: { name: 'Identity Theft' },
        ransomware: { name: 'Ransomware Attack' },
        corporate_espionage: { name: 'Corporate Espionage' }
      };
      
      if (cybercrimes[activityId as keyof typeof cybercrimes]) {
        onActivity('cybercrime', cybercrimes[activityId as keyof typeof cybercrimes]);
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
              {getCodingSkill() > 0 && ` | Coding: ${getCodingSkill()}`}
              {getNotoriety() > 0 && ` | Notoriety: ${getNotoriety()}`}
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
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl text-left hover:from-blue-50 hover:to-purple-50 transition-all duration-200 flex items-center space-x-4 hover:shadow-md hover:scale-[1.02] group ${
                    category.id === 'crime' || category.id === 'cybercrime' ? 'border-2 border-red-200 hover:border-red-300' : ''
                  }`}
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
              {activityCategories
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
                      } ${
                        selectedCategory === 'crime' || selectedCategory === 'cybercrime' ? 'border-red-200 hover:border-red-300' : ''
                      }`}
                      onClick={() => canUse && handleActivityClick(selectedCategory, activity.id)}
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
                          
                          {/* Requirements not met */}
                          {!canUse && (
                            <div className="mt-2 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
                              {getRequirementText(activity)}
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
