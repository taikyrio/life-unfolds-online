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

  const getRarityStyles = (rarity: Activity['rarity']) => {
    switch (rarity) {
      case 'common': 
        return {
          card: 'bg-slate-900/90 border-slate-700/50 hover:border-slate-600/70',
          glow: 'hover:shadow-slate-500/20',
          badge: 'bg-slate-700/60 text-slate-300 border-slate-600/50'
        };
      case 'uncommon': 
        return {
          card: 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-400/50',
          glow: 'hover:shadow-emerald-500/25 hover:shadow-lg',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        };
      case 'rare': 
        return {
          card: 'bg-slate-900/90 border-blue-500/40 hover:border-blue-400/60',
          glow: 'hover:shadow-blue-500/30 hover:shadow-xl',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-400/40'
        };
      case 'legendary': 
        return {
          card: 'bg-slate-900/90 border-purple-500/50 hover:border-purple-400/70',
          glow: 'hover:shadow-purple-500/40 hover:shadow-2xl',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-400/50'
        };
      default: 
        return {
          card: 'bg-slate-900/90 border-slate-700/50',
          glow: '',
          badge: 'bg-slate-700/60 text-slate-300'
        };
    }
  };

  const formatEffects = (effects: Activity['effects']) => {
    const effectsList = [];
    if (effects.health) effectsList.push({ icon: '❤️', value: effects.health, color: 'text-red-400' });
    if (effects.happiness) effectsList.push({ icon: '😊', value: effects.happiness, color: 'text-yellow-400' });
    if (effects.smarts) effectsList.push({ icon: '🧠', value: effects.smarts, color: 'text-blue-400' });
    if (effects.looks) effectsList.push({ icon: '✨', value: effects.looks, color: 'text-pink-400' });
    if (effects.wealth) effectsList.push({ icon: '💰', value: effects.wealth, color: effects.wealth > 0 ? 'text-green-400' : 'text-red-400' });
    if (effects.relationships) effectsList.push({ icon: '👥', value: effects.relationships, color: 'text-purple-400' });
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
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="text-6xl md:text-8xl mb-6 animate-bounce">👶</div>
        <div className="glass-card rounded-3xl p-8 max-w-md">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Too Young for Activities!</h3>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Wait until you're older to unlock amazing activities and shape your destiny
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {Object.entries(categorizedActivities).map(([category, categoryActivities]) => (
        <div key={category} className="space-y-6">
          {/* Category Header with iOS 16 style */}
          <div className="flex items-center space-x-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            <div className="glass-card px-6 py-3 rounded-2xl border border-slate-700/50">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {category} Activities
              </h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
            {categoryActivities.map((activity) => {
              const effects = formatEffects(activity.effects);
              const rarityStyles = getRarityStyles(activity.rarity);
              
              return (
                <button
                  key={activity.id}
                  onClick={() => onActivity('enhanced_activity', activity.id)}
                  className={`group relative p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-left overflow-hidden ${rarityStyles.card} ${rarityStyles.glow}`}
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl md:text-4xl p-3 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-lg md:text-xl mb-1 tracking-tight group-hover:text-blue-300 transition-colors">
                            {activity.name}
                          </h4>
                          <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-2">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cost */}
                    {activity.cost && (
                      <div className="mb-4">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-medium">
                          💳 Cost: ${activity.cost.toLocaleString()}
                        </div>
                      </div>
                    )}

                    {/* Effects */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {effects.map((effect, index) => (
                        <div key={index} className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/30">
                          <span className="text-lg">{effect.icon}</span>
                          <span className={`text-sm font-bold ${effect.color}`}>
                            {effect.value > 0 ? '+' : ''}{effect.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Rarity Badge */}
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-sm ${rarityStyles.badge}`}>
                        {activity.rarity.toUpperCase()}
                      </span>
                      
                      {/* Hover Arrow */}
                      <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                          <span className="text-blue-300 text-sm">→</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle animated border on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
