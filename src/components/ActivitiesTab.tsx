
import React, { useState } from 'react';
import { Character } from '../types/game';
import { ChevronRight, X } from 'lucide-react';
import { getLifeStage } from '../utils/gameUtils';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const lifeStage = getLifeStage(character.age);

  // Ensure education is always an array and check for school status
  const characterEducation = Array.isArray(character.education) ? character.education : [];
  const isInSchool = character.age < 18 || 
    characterEducation.some(ed => ed.includes('High School Student')) || 
    characterEducation.some(ed => ed.includes('University Student')) || 
    characterEducation.some(ed => ed.includes('Graduate Student'));

  // Get stage-appropriate activities in BitLife style
  const getStageActivities = () => {
    if (character.age < 6) {
      return [
        {
          id: 'mind_body',
          title: 'Mind & Body',
          description: 'Work on self-improvement',
          emoji: '🧠',
          activities: [
            { id: 'play_toys', name: 'Play with Toys', emoji: '🧸', available: character.age >= 1 },
            { id: 'watch_cartoons', name: 'Watch Cartoons', emoji: '📺', available: character.age >= 1 },
            { id: 'nap', name: 'Take a Nap', emoji: '😴', available: character.age >= 1 },
            { id: 'peek_a_boo', name: 'Play Peek-a-Boo', emoji: '👶', available: character.age >= 1 },
          ]
        }
      ];
    }

    if (isInSchool) {
      return [
        {
          id: 'love',
          title: 'Love',
          description: 'Find someone to love',
          emoji: '❤️',
          activities: [
            { id: 'find_love', name: 'Find Love', emoji: '💕', available: character.age >= 14 },
            { id: 'school_dance', name: 'School Dance', emoji: '💃', available: character.age >= 14 },
            { id: 'ask_out', name: 'Ask Someone Out', emoji: '🌹', available: character.age >= 13 },
          ]
        },
        {
          id: 'mind_body',
          title: 'Mind & Body',
          description: 'Work on self-improvement',
          emoji: '🧠',
          activities: [
            { id: 'study_harder', name: 'Study Harder', emoji: '📖', available: character.age >= 6 },
            { id: 'gym', name: 'Go to Gym', emoji: '🏋️', available: character.age >= 14 },
            { id: 'meditation', name: 'Meditate', emoji: '🧘', available: character.age >= 10 },
            { id: 'sports_team', name: 'Join Sports Team', emoji: '⚽', available: character.age >= 13 },
          ]
        },
        {
          id: 'social',
          title: 'Social',
          description: 'Hang out with friends',
          emoji: '👥',
          activities: [
            { id: 'hang_friends', name: 'Hang Out with Friends', emoji: '🎈', available: character.age >= 6 },
            { id: 'make_friends', name: 'Make New Friends', emoji: '🤝', available: character.age >= 5 },
            { id: 'join_club', name: 'Join School Club', emoji: '🎭', available: character.age >= 13 },
            { id: 'playground', name: 'Go to Playground', emoji: '🛝', available: character.age >= 3 && character.age <= 12 },
          ]
        }
      ];
    } else {
      // Adult activities in BitLife style
      const categories = [
        {
          id: 'love',
          title: 'Love',
          description: 'Find someone to love',
          emoji: '❤️',
          activities: [
            { id: 'find_love', name: 'Find Love', emoji: '💕', available: character.age >= 18 },
            { id: 'date_night', name: 'Date Night', emoji: '🌹', available: character.age >= 18 },
            { id: 'hookup', name: 'Hook Up', emoji: '😘', available: character.age >= 18 },
            { id: 'propose', name: 'Propose', emoji: '💍', available: character.age >= 18 },
          ]
        },
        {
          id: 'mind_body',
          title: 'Mind & Body',
          description: 'Work on self-improvement',
          emoji: '🧠',
          activities: [
            { id: 'gym', name: 'Go to Gym', emoji: '🏋️', available: character.age >= 16 },
            { id: 'doctor', name: 'Visit Doctor', emoji: '👩‍⚕️', available: true },
            { id: 'meditation', name: 'Meditate', emoji: '🧘', available: character.age >= 16 },
            { id: 'therapy', name: 'Go to Therapy', emoji: '🛋️', available: character.age >= 18 },
          ]
        },
        {
          id: 'movie_theater',
          title: 'Movie Theater',
          description: 'Go to the movies',
          emoji: '🎭',
          activities: [
            { id: 'movie', name: 'Watch Movie', emoji: '🎬', available: character.wealth >= 15 },
            { id: 'movie_date', name: 'Movie Date', emoji: '🍿', available: character.wealth >= 30 },
          ]
        }
      ];

      // Add casino for adults 21+
      if (character.age >= 21) {
        categories.push({
          id: 'casino',
          title: 'Casino',
          description: 'Visit the casino',
          emoji: '♠️',
          activities: [
            { id: 'slots', name: 'Play Slots', emoji: '🎰', available: character.wealth >= 50 },
            { id: 'blackjack', name: 'Play Blackjack', emoji: '🃏', available: character.wealth >= 100 },
            { id: 'poker', name: 'Play Poker', emoji: '🂡', available: character.wealth >= 200 },
          ]
        });
      }

      // Add crime category
      if (character.age >= 16) {
        categories.push({
          id: 'crime',
          title: 'Crime',
          description: 'Commit a crime',
          emoji: '😈',
          activities: [
            { id: 'pickpocket', name: 'Pickpocket', emoji: '👛', available: true },
            { id: 'shoplift', name: 'Shoplift', emoji: '🛍️', available: true },
            { id: 'burglary', name: 'Burglary', emoji: '🏠', available: character.age >= 18 },
            { id: 'bank_robbery', name: 'Bank Robbery', emoji: '🏦', available: character.age >= 21 },
          ]
        });
      }

      return categories;
    }
  };

  const activityCategories = getStageActivities();

  if (selectedCategory) {
    const category = activityCategories.find(c => c.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="h-full flex flex-col bg-gray-100">
        {/* BitLife Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-white hover:bg-blue-700 rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold uppercase tracking-wide">
            {category.title.toUpperCase()}
          </h2>
          <div className="w-8" />
        </div>

        {/* Activities List */}
        <div className="flex-1 bg-white">
          {category.activities.map((activity, index) => (
            <div key={activity.id}>
              <button
                onClick={() => activity.available && onActivity(activity.id, activity.id)}
                disabled={!activity.available}
                className={`w-full px-4 py-4 flex items-center justify-between text-left transition-colors ${
                  activity.available 
                    ? 'hover:bg-gray-50 active:bg-gray-100' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{activity.emoji}</div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.name}</div>
                  </div>
                </div>
                {activity.available && <ChevronRight size={20} className="text-gray-400" />}
              </button>
              {index < category.activities.length - 1 && (
                <div className="border-b border-gray-200 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* BitLife Header */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <h2 className="text-lg font-bold uppercase tracking-wide">Activities</h2>
      </div>

      {/* Popular Section */}
      <div className="bg-gray-500 text-white px-4 py-2 flex items-center justify-center">
        <span className="font-medium">❤️ Popular</span>
      </div>

      {/* Activities List */}
      <div className="flex-1 bg-white">
        {activityCategories.slice(0, 4).map((category, index) => (
          <div key={category.id}>
            <button
              onClick={() => setSelectedCategory(category.id)}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{category.emoji}</div>
                <div>
                  <div className="font-medium text-blue-600 text-lg">{category.title}</div>
                  <div className="text-gray-600 text-sm">{category.description}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
            {index < 3 && <div className="border-b border-gray-200 mx-4" />}
          </div>
        ))}

        {/* All Section */}
        {activityCategories.length > 4 && (
          <>
            <div className="bg-gray-500 text-white px-4 py-2 text-center mt-4">
              <span className="font-medium">All</span>
            </div>

            {activityCategories.slice(4).map((category, index) => (
              <div key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{category.emoji}</div>
                    <div>
                      <div className="font-medium text-blue-600 text-lg">{category.title}</div>
                      <div className="text-gray-600 text-sm">{category.description}</div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
                {index < activityCategories.slice(4).length - 1 && (
                  <div className="border-b border-gray-200 mx-4" />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
