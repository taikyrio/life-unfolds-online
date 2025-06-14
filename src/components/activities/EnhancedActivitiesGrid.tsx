
import React from 'react';
import { Character } from '../../types/game';

interface Activity {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
  minAge: number;
  maxAge?: number;
  cost?: number;
  effects: {
    health?: number;
    happiness?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
    relationships?: number;
  };
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

interface EnhancedActivitiesGridProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const EnhancedActivitiesGrid: React.FC<EnhancedActivitiesGridProps> = ({ 
  character, 
  onActivity 
}) => {
  const activities: Activity[] = [
    // Physical Activities
    {
      id: 'gym',
      name: 'Hit the Gym',
      icon: '💪',
      description: 'Build muscle and improve fitness',
      category: 'Physical',
      minAge: 12,
      cost: 50,
      effects: { health: 15, looks: 8, wealth: -50 },
      rarity: 'common'
    },
    {
      id: 'yoga',
      name: 'Yoga Class',
      icon: '🧘',
      description: 'Find inner peace and flexibility',
      category: 'Physical',
      minAge: 8,
      cost: 30,
      effects: { health: 10, happiness: 12 },
      rarity: 'common'
    },
    {
      id: 'martial_arts',
      name: 'Martial Arts',
      icon: '🥋',
      description: 'Learn self-defense and discipline',
      category: 'Physical',
      minAge: 6,
      cost: 80,
      effects: { health: 12, smarts: 5, wealth: -80 },
      rarity: 'uncommon'
    },
    
    // Mental Activities
    {
      id: 'library',
      name: 'Study at Library',
      icon: '📚',
      description: 'Expand your knowledge',
      category: 'Mental',
      minAge: 5,
      effects: { smarts: 12, happiness: 5 },
      rarity: 'common'
    },
    {
      id: 'coding',
      name: 'Learn Coding',
      icon: '💻',
      description: 'Master programming skills',
      category: 'Mental',
      minAge: 10,
      effects: { smarts: 18, wealth: -100 },
      rarity: 'uncommon'
    },
    {
      id: 'chess_club',
      name: 'Chess Tournament',
      icon: '♟️',
      description: 'Strategic thinking competition',
      category: 'Mental',
      minAge: 8,
      effects: { smarts: 15, relationships: 8 },
      rarity: 'uncommon'
    },
    
    // Social Activities
    {
      id: 'party',
      name: 'House Party',
      icon: '🎉',
      description: 'Socialize and have fun',
      category: 'Social',
      minAge: 16,
      cost: 100,
      effects: { happiness: 20, relationships: 15, health: -5, wealth: -100 },
      rarity: 'common'
    },
    {
      id: 'volunteer',
      name: 'Volunteer Work',
      icon: '🤝',
      description: 'Help your community',
      category: 'Social',
      minAge: 14,
      effects: { happiness: 15, relationships: 10 },
      rarity: 'common'
    },
    {
      id: 'networking',
      name: 'Professional Networking',
      icon: '🤵',
      description: 'Build career connections',
      category: 'Social',
      minAge: 18,
      cost: 150,
      effects: { relationships: 20, wealth: -150 },
      rarity: 'rare'
    },
    
    // Creative Activities
    {
      id: 'music_lessons',
      name: 'Music Lessons',
      icon: '🎵',
      description: 'Learn an instrument',
      category: 'Creative',
      minAge: 6,
      cost: 120,
      effects: { happiness: 18, smarts: 8, wealth: -120 },
      rarity: 'uncommon'
    },
    {
      id: 'art_class',
      name: 'Art Workshop',
      icon: '🎨',
      description: 'Express your creativity',
      category: 'Creative',
      minAge: 5,
      cost: 80,
      effects: { happiness: 15, looks: 5, wealth: -80 },
      rarity: 'common'
    },
    {
      id: 'writing',
      name: 'Creative Writing',
      icon: '✍️',
      description: 'Craft stories and poems',
      category: 'Creative',
      minAge: 8,
      effects: { smarts: 10, happiness: 12 },
      rarity: 'common'
    },
    
    // Adventure Activities
    {
      id: 'travel',
      name: 'Solo Travel',
      icon: '✈️',
      description: 'Explore the world',
      category: 'Adventure',
      minAge: 18,
      cost: 500,
      effects: { happiness: 25, smarts: 8, wealth: -500 },
      rarity: 'rare'
    },
    {
      id: 'skydiving',
      name: 'Skydiving',
      icon: '🪂',
      description: 'Feel the ultimate rush',
      category: 'Adventure',
      minAge: 18,
      cost: 300,
      effects: { happiness: 30, health: -10, wealth: -300 },
      rarity: 'legendary'
    },
    {
      id: 'hiking',
      name: 'Mountain Hiking',
      icon: '🏔️',
      description: 'Connect with nature',
      category: 'Adventure',
      minAge: 12,
      effects: { health: 12, happiness: 15 },
      rarity: 'common'
    }
  ];

  const getAvailableActivities = () => {
    return activities.filter(activity => {
      const meetsAge = character.age >= activity.minAge && (!activity.maxAge || character.age <= activity.maxAge);
      const canAfford = !activity.cost || character.wealth >= activity.cost;
      return meetsAge && canAfford;
    });
  };

  const getRarityColor = (rarity: Activity['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-200 bg-gray-50';
      case 'uncommon': return 'border-green-200 bg-green-50';
      case 'rare': return 'border-blue-200 bg-blue-50';
      case 'legendary': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getRarityGlow = (rarity: Activity['rarity']) => {
    switch (rarity) {
      case 'uncommon': return 'shadow-green-200';
      case 'rare': return 'shadow-blue-200';
      case 'legendary': return 'shadow-purple-300';
      default: return '';
    }
  };

  const formatEffects = (effects: Activity['effects']) => {
    const effectsList = [];
    if (effects.health) effectsList.push(`❤️ ${effects.health > 0 ? '+' : ''}${effects.health}`);
    if (effects.happiness) effectsList.push(`😊 ${effects.happiness > 0 ? '+' : ''}${effects.happiness}`);
    if (effects.smarts) effectsList.push(`🧠 ${effects.smarts > 0 ? '+' : ''}${effects.smarts}`);
    if (effects.looks) effectsList.push(`✨ ${effects.looks > 0 ? '+' : ''}${effects.looks}`);
    if (effects.wealth) effectsList.push(`💰 ${effects.wealth > 0 ? '+' : ''}${effects.wealth}`);
    if (effects.relationships) effectsList.push(`👥 ${effects.relationships > 0 ? '+' : ''}${effects.relationships}`);
    return effectsList;
  };

  const availableActivities = getAvailableActivities();
  const categorizedActivities = availableActivities.reduce((acc, activity) => {
    if (!acc[activity.category]) acc[activity.category] = [];
    acc[activity.category].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  if (availableActivities.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">👶</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">Too Young for Activities!</h3>
        <p className="text-gray-500">Wait until you're older to unlock more activities</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(categorizedActivities).map(([category, categoryActivities]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
            {category} Activities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categoryActivities.map((activity) => {
              const effects = formatEffects(activity.effects);
              return (
                <button
                  key={activity.id}
                  onClick={() => onActivity('enhanced_activity', activity.id)}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 hover:scale-105 active:scale-95 text-left ${getRarityColor(activity.rarity)} hover:shadow-lg ${getRarityGlow(activity.rarity)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{activity.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{activity.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      
                      {activity.cost && (
                        <div className="text-xs text-red-600 font-medium mb-2">
                          Cost: ${activity.cost}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {effects.map((effect, index) => (
                          <span key={index} className="text-xs bg-white/70 px-2 py-1 rounded-full">
                            {effect}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          activity.rarity === 'common' ? 'bg-gray-200 text-gray-700' :
                          activity.rarity === 'uncommon' ? 'bg-green-200 text-green-700' :
                          activity.rarity === 'rare' ? 'bg-blue-200 text-blue-700' :
                          'bg-purple-200 text-purple-700'
                        }`}>
                          {activity.rarity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
