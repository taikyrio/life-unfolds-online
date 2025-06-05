
import React, { useState } from 'react';
import { Character } from '../types/game';
import { ChevronRight, X, Lock, Star, Sparkles } from 'lucide-react';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

interface Activity {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  minAge: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  category?: string;
}

interface ActivityCategory {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  activities: Activity[];
  unlockAge: number;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Enhanced activity categories with Apple-style design
  const getActivityCategories = (): ActivityCategory[] => {
    const categories: ActivityCategory[] = [
      {
        id: 'mind_body',
        title: 'Mind & Body',
        description: 'Develop yourself physically and mentally',
        emoji: '🧠',
        gradient: 'from-blue-500 to-purple-600',
        unlockAge: 1,
        activities: [
          { id: 'play_toys', name: 'Play with Toys', emoji: '🧸', description: 'Have fun with toys and develop creativity', minAge: 1, maxAge: 8 },
          { id: 'watch_cartoons', name: 'Watch Cartoons', emoji: '📺', description: 'Enjoy animated shows', minAge: 2, maxAge: 12 },
          { id: 'read_books', name: 'Read Books', emoji: '📚', description: 'Expand your knowledge and imagination', minAge: 4 },
          { id: 'study_harder', name: 'Study Extra', emoji: '📖', description: 'Put in extra effort at school', minAge: 6 },
          { id: 'meditation', name: 'Meditate', emoji: '🧘', description: 'Find inner peace and reduce stress', minAge: 10 },
          { id: 'gym', name: 'Go to Gym', emoji: '🏋️', description: 'Build strength and stay healthy', minAge: 14, minWealth: 30 },
          { id: 'yoga', name: 'Practice Yoga', emoji: '🤸', description: 'Improve flexibility and mindfulness', minAge: 12 },
          { id: 'martial_arts', name: 'Learn Martial Arts', emoji: '🥋', description: 'Master self-defense techniques', minAge: 6, minWealth: 50 },
          { id: 'therapy', name: 'Go to Therapy', emoji: '🛋️', description: 'Work on mental health', minAge: 16, minWealth: 100 },
          { id: 'plastic_surgery', name: 'Plastic Surgery', emoji: '💉', description: 'Enhance your appearance', minAge: 18, minWealth: 5000, difficulty: 'medium' }
        ]
      },
      {
        id: 'social',
        title: 'Social Life',
        description: 'Connect with friends and family',
        emoji: '👥',
        gradient: 'from-pink-500 to-rose-600',
        unlockAge: 3,
        activities: [
          { id: 'peek_a_boo', name: 'Play Peek-a-Boo', emoji: '👶', description: 'Simple fun with family', minAge: 1, maxAge: 4 },
          { id: 'playground', name: 'Go to Playground', emoji: '🛝', description: 'Play with other children', minAge: 3, maxAge: 12 },
          { id: 'make_friends', name: 'Make Friends', emoji: '🤝', description: 'Build new friendships', minAge: 5 },
          { id: 'hang_friends', name: 'Hang with Friends', emoji: '🎈', description: 'Spend quality time together', minAge: 6 },
          { id: 'join_club', name: 'Join School Club', emoji: '🎭', description: 'Participate in extracurricular activities', minAge: 13 },
          { id: 'volunteer', name: 'Volunteer', emoji: '🤲', description: 'Help your community', minAge: 14 },
          { id: 'party', name: 'Go to Party', emoji: '🎉', description: 'Have fun but watch your health', minAge: 16 },
          { id: 'networking', name: 'Network', emoji: '🤵', description: 'Build professional connections', minAge: 18, minWealth: 100 }
        ]
      },
      {
        id: 'romance',
        title: 'Love & Romance',
        description: 'Find love and build relationships',
        emoji: '💕',
        gradient: 'from-red-500 to-pink-600',
        unlockAge: 13,
        activities: [
          { id: 'ask_out', name: 'Ask Someone Out', emoji: '🌹', description: 'Take the first step in romance', minAge: 13 },
          { id: 'school_dance', name: 'School Dance', emoji: '💃', description: 'Dance the night away', minAge: 14 },
          { id: 'find_love', name: 'Find Love', emoji: '💖', description: 'Look for your soulmate', minAge: 16 },
          { id: 'date_night', name: 'Date Night', emoji: '🍽️', description: 'Romantic evening out', minAge: 16, minWealth: 50, requiresPartner: true },
          { id: 'hookup', name: 'Hook Up', emoji: '😘', description: 'Casual romantic encounter', minAge: 18 },
          { id: 'propose', name: 'Propose', emoji: '💍', description: 'Pop the question', minAge: 18, minWealth: 1000, requiresPartner: true },
          { id: 'honeymoon', name: 'Honeymoon', emoji: '🏝️', description: 'Romantic getaway', minAge: 18, minWealth: 2000, requiresPartner: true }
        ]
      },
      {
        id: 'entertainment',
        title: 'Entertainment',
        description: 'Have fun and relax',
        emoji: '🎮',
        gradient: 'from-green-500 to-teal-600',
        unlockAge: 5,
        activities: [
          { id: 'movie', name: 'Watch Movie', emoji: '🎬', description: 'Enjoy the latest films', minAge: 5, minWealth: 15 },
          { id: 'video_games', name: 'Play Video Games', emoji: '🎮', description: 'Gaming session', minAge: 6, minWealth: 20 },
          { id: 'amusement_park', name: 'Amusement Park', emoji: '🎢', description: 'Thrilling rides and fun', minAge: 8, minWealth: 75 },
          { id: 'concert', name: 'Go to Concert', emoji: '🎵', description: 'Live music experience', minAge: 12, minWealth: 50 },
          { id: 'shopping', name: 'Go Shopping', emoji: '🛍️', description: 'Retail therapy', minAge: 12, minWealth: 100 },
          { id: 'spa_day', name: 'Spa Day', emoji: '🧖', description: 'Relax and pamper yourself', minAge: 16, minWealth: 200 },
          { id: 'vacation', name: 'Take Vacation', emoji: '✈️', description: 'Travel to new places', minAge: 18, minWealth: 1000 }
        ]
      },
      {
        id: 'sports',
        title: 'Sports & Fitness',
        description: 'Stay active and competitive',
        emoji: '⚽',
        gradient: 'from-orange-500 to-red-600',
        unlockAge: 6,
        activities: [
          { id: 'sports_team', name: 'Join Sports Team', emoji: '🏆', description: 'Compete with your school team', minAge: 6 },
          { id: 'swimming', name: 'Go Swimming', emoji: '🏊', description: 'Great cardio workout', minAge: 8, minWealth: 25 },
          { id: 'running', name: 'Go Running', emoji: '🏃', description: 'Build endurance', minAge: 10 },
          { id: 'cycling', name: 'Go Cycling', emoji: '🚴', description: 'Explore on two wheels', minAge: 12, minWealth: 50 },
          { id: 'rock_climbing', name: 'Rock Climbing', emoji: '🧗', description: 'Challenge yourself vertically', minAge: 14, minWealth: 100 },
          { id: 'skydiving', name: 'Skydiving', emoji: '🪂', description: 'Ultimate adrenaline rush', minAge: 18, minWealth: 500, difficulty: 'extreme' }
        ]
      },
      {
        id: 'creative',
        title: 'Creative Arts',
        description: 'Express your artistic side',
        emoji: '🎨',
        gradient: 'from-purple-500 to-indigo-600',
        unlockAge: 4,
        activities: [
          { id: 'drawing', name: 'Draw Pictures', emoji: '🖍️', description: 'Create beautiful artwork', minAge: 4 },
          { id: 'music_lessons', name: 'Music Lessons', emoji: '🎹', description: 'Learn to play instruments', minAge: 6, minWealth: 50 },
          { id: 'dance_class', name: 'Dance Class', emoji: '💃', description: 'Learn choreography', minAge: 6, minWealth: 40 },
          { id: 'painting', name: 'Painting', emoji: '🎨', description: 'Express yourself with colors', minAge: 8, minWealth: 30 },
          { id: 'photography', name: 'Photography', emoji: '📸', description: 'Capture beautiful moments', minAge: 12, minWealth: 200 },
          { id: 'writing', name: 'Creative Writing', emoji: '✍️', description: 'Tell your stories', minAge: 10 },
          { id: 'acting', name: 'Acting Classes', emoji: '🎭', description: 'Develop dramatic skills', minAge: 12, minWealth: 75 }
        ]
      },
      {
        id: 'technology',
        title: 'Technology',
        description: 'Explore the digital world',
        emoji: '💻',
        gradient: 'from-cyan-500 to-blue-600',
        unlockAge: 8,
        activities: [
          { id: 'coding_practice', name: 'Learn Coding', emoji: '👨‍💻', description: 'Master programming skills', minAge: 8 },
          { id: 'app_development', name: 'Develop Apps', emoji: '📱', description: 'Create mobile applications', minAge: 14 },
          { id: 'website_design', name: 'Web Design', emoji: '🌐', description: 'Build websites', minAge: 12 },
          { id: 'gaming_stream', name: 'Stream Gaming', emoji: '📺', description: 'Share your gaming with the world', minAge: 16, minWealth: 500 },
          { id: 'tech_startup', name: 'Start Tech Company', emoji: '🚀', description: 'Launch your own business', minAge: 18, minWealth: 10000, difficulty: 'extreme' }
        ]
      },
      {
        id: 'adult_entertainment',
        title: 'Adult Entertainment',
        description: 'Adult-only activities',
        emoji: '🍸',
        gradient: 'from-amber-500 to-orange-600',
        unlockAge: 21,
        activities: [
          { id: 'bar', name: 'Go to Bar', emoji: '🍺', description: 'Enjoy drinks with friends', minAge: 21, minWealth: 50 },
          { id: 'casino', name: 'Visit Casino', emoji: '🎰', description: 'Try your luck gambling', minAge: 21, minWealth: 100 },
          { id: 'nightclub', name: 'Nightclub', emoji: '🕺', description: 'Dance the night away', minAge: 21, minWealth: 75 },
          { id: 'wine_tasting', name: 'Wine Tasting', emoji: '🍷', description: 'Sophisticated evening', minAge: 21, minWealth: 150 }
        ]
      },
      {
        id: 'crime',
        title: 'Criminal Activities',
        description: 'Live dangerously (high risk)',
        emoji: '😈',
        gradient: 'from-red-600 to-gray-800',
        unlockAge: 12,
        activities: [
          { id: 'pickpocket', name: 'Pickpocket', emoji: '👛', description: 'Steal from unsuspecting victims', minAge: 12, difficulty: 'easy' },
          { id: 'shoplift', name: 'Shoplift', emoji: '🛒', description: 'Take items without paying', minAge: 14, difficulty: 'easy' },
          { id: 'vandalism', name: 'Vandalism', emoji: '🎨', description: 'Damage public property', minAge: 14, difficulty: 'easy' },
          { id: 'car_theft', name: 'Steal Car', emoji: '🚗', description: 'Take someone else\'s vehicle', minAge: 16, difficulty: 'medium' },
          { id: 'burglary', name: 'Burglary', emoji: '🏠', description: 'Break into homes', minAge: 16, difficulty: 'medium' },
          { id: 'drug_dealing', name: 'Deal Drugs', emoji: '💊', description: 'Sell illegal substances', minAge: 18, difficulty: 'hard' },
          { id: 'bank_robbery', name: 'Rob Bank', emoji: '🏦', description: 'High-stakes heist', minAge: 21, difficulty: 'extreme' },
          { id: 'murder', name: 'Commit Murder', emoji: '🔪', description: 'The ultimate crime', minAge: 18, difficulty: 'extreme' }
        ]
      }
    ];

    // Filter categories based on character age
    return categories.filter(category => character.age >= category.unlockAge);
  };

  const activityCategories = getActivityCategories();

  // Check if activity is available to character
  const isActivityAvailable = (activity: Activity): boolean => {
    if (character.age < activity.minAge) return false;
    if (activity.maxAge && character.age > activity.maxAge) return false;
    if (activity.minWealth && character.wealth < activity.minWealth) return false;
    if (activity.requiresPartner) {
      const hasPartner = character.familyMembers.some(member => 
        (member.relationship === 'lover' || member.relationship === 'spouse') && member.alive
      );
      if (!hasPartner) return false;
    }
    return true;
  };

  // Get requirement text for locked activities
  const getRequirementText = (activity: Activity): string => {
    if (character.age < activity.minAge) return `Requires age ${activity.minAge}+`;
    if (activity.maxAge && character.age > activity.maxAge) return `Too old (max age ${activity.maxAge})`;
    if (activity.minWealth && character.wealth < activity.minWealth) return `Requires $${activity.minWealth.toLocaleString()}`;
    if (activity.requiresPartner) return 'Requires partner';
    return '';
  };

  // Handle activity selection with logging
  const handleActivitySelect = (activity: Activity) => {
    // Call the original activity handler with the correct format
    onActivity(activity.id, null);
  };

  if (selectedCategory) {
    const category = activityCategories.find(c => c.id === selectedCategory);
    if (!category) return null;

    const availableActivities = category.activities.filter(activity => 
      character.age >= activity.minAge && (!activity.maxAge || character.age <= activity.maxAge)
    );

    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Apple-style Header */}
        <div className={`bg-gradient-to-r ${category.gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center justify-between">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight size={16} className="rotate-180" />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="text-3xl mb-1">{category.emoji}</div>
              <h2 className="text-xl font-bold">{category.title}</h2>
              <p className="text-white/80 text-sm">{category.description}</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 gap-4">
            {availableActivities.map((activity) => {
              const available = isActivityAvailable(activity);
              const requirementText = getRequirementText(activity);
              
              return (
                <button
                  key={activity.id}
                  onClick={() => available && handleActivitySelect(activity)}
                  disabled={!available}
                  className={`group relative p-5 rounded-2xl border transition-all duration-300 text-left ${
                    available 
                      ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]' 
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl p-3 rounded-xl ${available ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {activity.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold ${available ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                          {activity.name}
                        </h3>
                        {activity.difficulty === 'extreme' && <Sparkles size={16} className="text-red-500" />}
                        {activity.difficulty === 'hard' && <Star size={16} className="text-orange-500" />}
                        {!available && <Lock size={16} className="text-gray-400" />}
                      </div>
                      <p className={`text-sm mt-1 ${available ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                        {activity.description}
                      </p>
                      {!available && (
                        <p className="text-xs text-red-500 mt-1 font-medium">
                          {requirementText}
                        </p>
                      )}
                      {activity.minWealth && available && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Cost: ${activity.minWealth.toLocaleString()}
                        </p>
                      )}
                    </div>
                    {available && (
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Apple-style Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl mb-2">🎯</div>
          <h2 className="text-2xl font-bold">Activities</h2>
          <p className="text-white/80">Choose what to do with your time</p>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1">
              🎂 Age {character.age}
            </span>
            <span className="flex items-center gap-1">
              💰 ${character.wealth.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activityCategories.map((category) => {
            const availableCount = category.activities.filter(activity => 
              character.age >= activity.minAge && (!activity.maxAge || character.age <= activity.maxAge)
            ).length;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group relative p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 text-left hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                      {category.emoji}
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {availableCount} {availableCount === 1 ? 'activity' : 'activities'}
                    </span>
                    {character.age < category.unlockAge && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <Lock size={12} />
                        Age {category.unlockAge}+
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
