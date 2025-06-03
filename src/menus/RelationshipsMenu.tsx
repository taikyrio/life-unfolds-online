
import React, { useState } from 'react';
import { X, Heart, Gift, Users, Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { Character } from '../../types/game';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RelationshipMenuProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const RelationshipsMenu: React.FC<RelationshipMenuProps> = ({
  isOpen,
  onClose,
  character,
  onActivity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const hasPartner = character.familyMembers.some(member => 
    (member.relationship === 'lover' || member.relationship === 'spouse') && member.alive
  );

  const hasLover = character.familyMembers.some(member => 
    member.relationship === 'lover' && member.alive
  );

  const isMarried = character.relationshipStatus === 'married';
  const isEngaged = character.relationshipStatus === 'engaged';

  const relationshipCategories = [
    {
      id: 'dating',
      title: 'Dating & Romance',
      emoji: '💕',
      description: 'Find love and build romantic relationships',
      actions: [
        {
          id: 'find_love_dating_app',
          title: 'Use Dating App',
          description: 'Swipe through potential matches online',
          emoji: '📱',
          available: !hasPartner && character.age >= 18,
          cost: 20,
          reason: hasPartner ? 'Already in a relationship' : character.age < 18 ? 'Too young for dating apps' : null
        },
        {
          id: 'find_love_speed_dating',
          title: 'Speed Dating Event',
          description: 'Meet multiple people in one evening',
          emoji: '⚡',
          available: !hasPartner && character.age >= 21,
          cost: 50,
          reason: hasPartner ? 'Already in a relationship' : character.age < 21 ? 'Too young for speed dating' : null
        },
        {
          id: 'find_love_traditional',
          title: 'Meet Someone Naturally',
          description: 'Let fate bring someone into your life',
          emoji: '🌟',
          available: !hasPartner && character.age >= 16,
          reason: hasPartner ? 'Already in a relationship' : character.age < 16 ? 'Too young' : null
        },
        {
          id: 'casual_date',
          title: 'Coffee Date',
          description: 'Have a casual coffee date',
          emoji: '☕',
          available: hasPartner && character.wealth >= 25,
          cost: 25,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 25 ? 'Need $25' : null
        },
        {
          id: 'fancy_date',
          title: 'Fancy Restaurant',
          description: 'Dine at an upscale restaurant',
          emoji: '🍽️',
          available: hasPartner && character.wealth >= 100,
          cost: 100,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 100 ? 'Need $100' : null
        },
        {
          id: 'adventure_date',
          title: 'Adventure Date',
          description: 'Go on an exciting adventure together',
          emoji: '🎢',
          available: hasPartner && character.wealth >= 75,
          cost: 75,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 75 ? 'Need $75' : null
        }
      ]
    },
    {
      id: 'gifts',
      title: 'Gifts & Gestures',
      emoji: '🎁',
      description: 'Show your love through thoughtful gifts',
      actions: [
        {
          id: 'give_flowers',
          title: 'Bouquet of Flowers',
          description: 'Classic romantic gesture',
          emoji: '💐',
          available: hasPartner && character.wealth >= 30,
          cost: 30,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 30 ? 'Need $30' : null
        },
        {
          id: 'give_chocolate',
          title: 'Box of Chocolates',
          description: 'Sweet treat for your sweetheart',
          emoji: '🍫',
          available: hasPartner && character.wealth >= 20,
          cost: 20,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 20 ? 'Need $20' : null
        },
        {
          id: 'give_jewelry',
          title: 'Jewelry',
          description: 'Elegant jewelry to show you care',
          emoji: '💎',
          available: hasPartner && character.wealth >= 200,
          cost: 200,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 200 ? 'Need $200' : null
        },
        {
          id: 'surprise_getaway',
          title: 'Surprise Getaway',
          description: 'Plan a romantic weekend trip',
          emoji: '✈️',
          available: hasPartner && character.wealth >= 500,
          cost: 500,
          reason: !hasPartner ? 'Need a partner' : character.wealth < 500 ? 'Need $500' : null
        }
      ]
    },
    {
      id: 'intimacy',
      title: 'Intimacy & Connection',
      emoji: '💖',
      description: 'Deepen your emotional and physical bond',
      actions: [
        {
          id: 'deep_conversation',
          title: 'Heart-to-Heart Talk',
          description: 'Have a meaningful conversation',
          emoji: '💬',
          available: hasPartner,
          reason: !hasPartner ? 'Need a partner' : null
        },
        {
          id: 'intimate_protected',
          title: 'Be Intimate (Protected)',
          description: 'Physical intimacy with protection',
          emoji: '😘',
          available: hasPartner && character.age >= 16,
          reason: !hasPartner ? 'Need a partner' : character.age < 16 ? 'Too young' : null
        },
        {
          id: 'intimate_unprotected',
          title: 'Be Intimate (Unprotected)',
          description: 'Physical intimacy without protection',
          emoji: '💕',
          available: hasPartner && character.age >= 16,
          reason: !hasPartner ? 'Need a partner' : character.age < 16 ? 'Too young' : null
        },
        {
          id: 'move_in_together',
          title: 'Move In Together',
          description: 'Take the next step and live together',
          emoji: '🏠',
          available: hasLover && character.age >= 18,
          reason: !hasLover ? 'Need to be dating someone' : character.age < 18 ? 'Too young' : null
        }
      ]
    },
    {
      id: 'commitment',
      title: 'Marriage & Commitment',
      emoji: '💍',
      description: 'Take your relationship to the next level',
      actions: [
        {
          id: 'propose',
          title: 'Propose Marriage',
          description: 'Pop the question with a ring',
          emoji: '💍',
          available: hasLover && character.age >= 18 && character.wealth >= 500,
          cost: 500,
          reason: !hasLover ? 'Need a dating partner' : character.age < 18 ? 'Too young' : character.wealth < 500 ? 'Need $500 for ring' : null
        },
        {
          id: 'plan_wedding_small',
          title: 'Small Wedding',
          description: 'Intimate ceremony with close family',
          emoji: '💒',
          available: isEngaged && character.wealth >= 100,
          cost: 100,
          reason: !isEngaged ? 'Need to be engaged' : character.wealth < 100 ? 'Need $100' : null
        },
        {
          id: 'plan_wedding_large',
          title: 'Grand Wedding',
          description: 'Lavish celebration for everyone',
          emoji: '🎊',
          available: isEngaged && character.wealth >= 1000,
          cost: 1000,
          reason: !isEngaged ? 'Need to be engaged' : character.wealth < 1000 ? 'Need $1000' : null
        },
        {
          id: 'honeymoon',
          title: 'Go on Honeymoon',
          description: 'Romantic trip after marriage',
          emoji: '🏝️',
          available: isMarried && character.wealth >= 300,
          cost: 300,
          reason: !isMarried ? 'Need to be married' : character.wealth < 300 ? 'Need $300' : null
        }
      ]
    },
    {
      id: 'family',
      title: 'Family & Social',
      emoji: '👨‍👩‍👧‍👦',
      description: 'Build family connections and social networks',
      actions: [
        {
          id: 'try_for_baby',
          title: 'Try for a Baby',
          description: 'Start or expand your family',
          emoji: '👶',
          available: isMarried && character.age >= 18 && character.age <= 45,
          reason: !isMarried ? 'Need to be married' : character.age < 18 ? 'Too young' : character.age > 45 ? 'Too old' : null
        },
        {
          id: 'family_dinner',
          title: 'Host Family Dinner',
          description: 'Bring everyone together for a meal',
          emoji: '🍽️',
          available: character.familyMembers.length > 0 && character.wealth >= 50,
          cost: 50,
          reason: character.familyMembers.length === 0 ? 'No family members' : character.wealth < 50 ? 'Need $50' : null
        },
        {
          id: 'make_new_friends',
          title: 'Make New Friends',
          description: 'Expand your social circle',
          emoji: '👫',
          available: character.age >= 5,
          reason: character.age < 5 ? 'Too young' : null
        },
        {
          id: 'reconnect_family',
          title: 'Reconnect with Family',
          description: 'Reach out to distant relatives',
          emoji: '📞',
          available: character.familyMembers.length > 0,
          reason: character.familyMembers.length === 0 ? 'No family members' : null
        }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out translate-y-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory ? 
                relationshipCategories.find(c => c.id === selectedCategory)?.title : 
                'Relationships & Social'
              }
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Age: {character.age} | Status: {character.relationshipStatus || 'Single'} | ${character.wealth}
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
        <ScrollArea className="max-h-[calc(85vh-120px)]">
          <div className="p-6">
            {!selectedCategory ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm mb-4">Choose a category to explore relationship options:</p>
                {relationshipCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl text-left hover:from-pink-50 hover:to-purple-50 transition-all duration-200 flex items-center space-x-4 hover:shadow-lg hover:scale-[1.02] group"
                  >
                    <div className="text-3xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      {category.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{category.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {category.actions.length} {category.actions.length === 1 ? 'option' : 'options'} available
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
                {relationshipCategories
                  .find(c => c.id === selectedCategory)
                  ?.actions.map((action) => {
                    const canUse = action.available;
                    const canAfford = !action.cost || character.wealth >= action.cost;
                    const finallyAvailable = canUse && canAfford;
                    
                    return (
                      <div
                        key={action.id}
                        className={`p-5 rounded-2xl border-2 transition-all duration-200 ${
                          finallyAvailable
                            ? 'bg-white border-gray-200 hover:border-pink-300 hover:shadow-lg cursor-pointer hover:scale-[1.02]' 
                            : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                        }`}
                        onClick={() => finallyAvailable && onActivity('relationship', action.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`text-3xl ${finallyAvailable ? '' : 'grayscale'}`}>
                            {action.emoji}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold text-lg ${finallyAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
                              {action.title}
                            </h3>
                            <p className={`text-sm mt-1 ${finallyAvailable ? 'text-gray-600' : 'text-gray-400'}`}>
                              {action.description}
                            </p>
                            
                            {/* Cost display */}
                            {action.cost && finallyAvailable && (
                              <div className="mt-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                                Cost: ${action.cost}
                              </div>
                            )}
                            
                            {/* Requirements not met */}
                            {!finallyAvailable && action.reason && (
                              <div className="mt-2 text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full inline-block">
                                {action.reason}
                                {action.cost && character.wealth < action.cost && ` (Need $${action.cost})`}
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
        </ScrollArea>
      </div>
    </div>
  );
};
