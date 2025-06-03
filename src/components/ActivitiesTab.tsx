import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { BookOpen, Dumbbell, Users, Briefcase, Gavel, GraduationCap, Home, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { getLifeStage } from '../utils/gameUtils';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const lifeStage = getLifeStage(character.age);

  // Ensure education is always an array and check for school status
  const characterEducation = Array.isArray(character.education) ? character.education : [];
  const isInSchool = character.age < 18 || 
    characterEducation.some(ed => ed.includes('High School Student')) || 
    characterEducation.some(ed => ed.includes('University Student')) || 
    characterEducation.some(ed => ed.includes('Graduate Student'));

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle) 
        ? prev.filter(cat => cat !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  // Get stage-appropriate activities
  const getStageActivities = () => {
    if (character.age < 6) {
      return [
        {
          title: 'Early Learning',
          icon: BookOpen,
          color: 'bg-blue-500',
          description: 'Develop your early skills',
          activities: [
            { id: 'play_toys', name: 'Play with Toys', description: 'Have fun and develop creativity', available: character.age >= 1, popularity: 5 },
            { id: 'watch_cartoons', name: 'Watch Cartoons', description: 'Entertainment time', available: character.age >= 1, popularity: 4 },
            { id: 'nap', name: 'Take a Nap', description: 'Rest and grow', available: character.age >= 1, popularity: 3 },
            { id: 'crawl_explore', name: 'Crawl Around', description: 'Explore your surroundings', available: character.age >= 1 && character.age <= 2, popularity: 4 },
            { id: 'babble_talk', name: 'Try to Talk', description: 'Practice making sounds and words', available: character.age >= 1, popularity: 4 },
            { id: 'peek_a_boo', name: 'Play Peek-a-Boo', description: 'Giggle and have fun with family', available: character.age >= 1, popularity: 5 },
            { id: 'stack_blocks', name: 'Stack Blocks', description: 'Build towers and knock them down', available: character.age >= 2, popularity: 4 },
            { id: 'finger_paint', name: 'Finger Paint', description: 'Get messy and create art', available: character.age >= 2, popularity: 4 },
            { id: 'listen_stories', name: 'Listen to Stories', description: 'Enjoy bedtime stories', available: character.age >= 1, popularity: 4 },
          ]
        }
      ];
    }

    if (isInSchool) {
      return [
        {
          title: 'School Activities',
          icon: GraduationCap,
          color: 'bg-blue-500',
          description: 'Academic and school-related activities',
          activities: [
            { id: 'study_harder', name: 'Study Harder', description: 'Improve your grades and smarts', available: character.age >= 6, popularity: 5 },
            { id: 'join_club', name: 'Join School Club', description: 'Make friends and learn new skills', available: character.age >= 13, popularity: 4 },
            { id: 'sports_team', name: 'Join Sports Team', description: 'Stay fit and build teamwork', available: character.age >= 13, popularity: 5 },
            { id: 'school_play', name: 'Audition for School Play', description: 'Express your creativity', available: character.age >= 10, popularity: 3 },
            { id: 'tutoring', name: 'Get Tutoring', description: 'Extra help with studies (costs money)', available: character.age >= 8 && character.wealth >= 50, popularity: 2 },
          ]
        },
        {
          title: 'Social Life',
          icon: Users,
          color: 'bg-purple-500',
          description: 'Build friendships and social connections',
          activities: [
            { id: 'hang_friends', name: 'Hang Out with Friends', description: 'Build relationships and have fun', available: character.age >= 6, popularity: 5 },
            { id: 'school_dance', name: 'Go to School Dance', description: 'Have fun and socialize', available: character.age >= 14, popularity: 4 },
            { id: 'study_group', name: 'Join Study Group', description: 'Learn with peers', available: character.age >= 10, popularity: 3 },
            { id: 'make_friends', name: 'Try to Make New Friends', description: 'Expand your social circle', available: character.age >= 5, popularity: 4 },
            { id: 'playground', name: 'Play at Playground', description: 'Have fun with other kids', available: character.age >= 3 && character.age <= 12, popularity: 5 },
            { id: 'birthday_party', name: 'Attend Birthday Party', description: 'Celebrate with friends', available: character.age >= 4, popularity: 4 },
          ]
        }
      ];
    } else {
      // Adult activities
      const categories = [
        {
          title: 'Career & Work',
          icon: Briefcase,
          color: 'bg-orange-500',
          description: 'Professional development and work activities',
          activities: [
            { id: 'work_harder', name: 'Work Harder', description: 'Impress your boss and improve performance', available: !!character.job, popularity: 3 },
            { id: 'ask_promotion', name: 'Ask for Promotion', description: 'Request advancement and raise', available: !!character.job, popularity: 4 },
            { id: 'job_search', name: 'Look for New Job', description: 'Find better opportunities', available: character.age >= 18, popularity: 3 },
            { id: 'freelance', name: 'Take Freelance Work', description: 'Earn extra income on the side', available: character.age >= 18, popularity: 3 },
            { id: 'night_school', name: 'Attend Night School', description: 'Improve your education (costs money)', available: character.age >= 18 && character.wealth >= 100, popularity: 2 },
            { id: 'networking', name: 'Professional Networking', description: 'Build career connections', available: character.age >= 22, popularity: 3 },
          ]
        },
        {
          title: 'Health & Fitness',
          icon: Dumbbell,
          color: 'bg-green-500',
          description: 'Physical and mental wellness activities',
          activities: [
            { id: 'gym', name: 'Go to Gym', description: 'Improve health, fitness, and looks', available: character.age >= 16, popularity: 4 },
            { id: 'doctor', name: 'Visit Doctor', description: 'Get a health checkup', available: true, popularity: 2 },
            { id: 'meditation', name: 'Practice Meditation', description: 'Reduce stress and find inner peace', available: character.age >= 16, popularity: 3 },
            { id: 'diet', name: 'Start a Diet', description: 'Improve your health and appearance', available: character.age >= 18, popularity: 3 },
            { id: 'yoga', name: 'Take Yoga Classes', description: 'Improve flexibility and mindfulness', available: character.age >= 16, popularity: 3 },
            { id: 'therapy', name: 'See a Therapist', description: 'Work on mental health (costs money)', available: character.age >= 18 && character.wealth >= 80, popularity: 2 },
          ]
        },
        {
          title: 'Social & Entertainment',
          icon: Users,
          color: 'bg-purple-500',
          description: 'Fun activities and social experiences',
          activities: [
            { id: 'party', name: 'Go to Party', description: 'Have fun but watch out for trouble', available: character.age >= 18, popularity: 4 },
            { id: 'vacation', name: 'Take a Vacation', description: 'Relax and recharge (expensive)', available: character.age >= 18 && character.wealth >= 200, popularity: 5 },
            { id: 'volunteer', name: 'Volunteer Work', description: 'Help others and feel good about yourself', available: character.age >= 16, popularity: 3 },
            { id: 'hobby', name: 'Pursue a Hobby', description: 'Learn something new and interesting', available: character.age >= 16, popularity: 4 },
            { id: 'find_love', name: 'Find Love', description: 'Look for someone special to date', available: character.age >= 16 && character.relationshipStatus === 'single', popularity: 4 },
            { id: 'dating_app', name: 'Use Dating App', description: 'Try to find romance online', available: character.age >= 18 && character.relationshipStatus === 'single', popularity: 3 },
            { id: 'social_media', name: 'Social Media', description: 'Build your online presence', available: character.age >= 13, popularity: 4 },
          ]
        }
      ];

      // Add risky activities category for adults
      if (character.age >= 18) {
        categories.push({
          title: 'Risky Activities',
          icon: Gavel,
          color: 'bg-red-500',
          description: '⚠️ Dangerous activities with potential consequences',
          activities: [
            { id: 'gamble', name: 'Gamble', description: 'Risk money for big rewards (requires money)', available: character.wealth >= 50, popularity: 2 },
            { id: 'street_race', name: 'Street Racing', description: 'Fast cars and high stakes (very dangerous)', available: true, popularity: 2 },
            { id: 'shoplift', name: 'Shoplift', description: 'Steal small items (illegal!)', available: true, popularity: 1 },
            { id: 'bar_fight', name: 'Start Bar Fight', description: 'Get into trouble at a bar (very risky)', available: character.age >= 21, popularity: 1 },
          ]
        });
      }

      // Add relationship activities for people in relationships
      if (character.relationshipStatus !== 'single') {
        const partner = character.familyMembers.find(m => m.relationship === 'lover' && m.alive);
        categories.push({
          title: 'Relationship',
          icon: Users,
          color: 'bg-pink-500',
          description: `Activities with your ${character.relationshipStatus === 'dating' ? 'partner' : character.relationshipStatus === 'engaged' ? 'fiancé' : 'spouse'}`,
          activities: [
            { id: 'date_night', name: 'Go on Date', description: 'Spend quality time together', available: true, popularity: 5 },
            { id: 'give_gift_flowers', name: 'Give Flowers', description: 'Give beautiful flowers ($25k)', available: character.wealth >= 25, popularity: 4 },
            { id: 'give_gift_jewelry', name: 'Give Jewelry', description: 'Give jewelry ($150k)', available: character.wealth >= 150, popularity: 5 },
            { id: 'give_gift_expensive', name: 'Expensive Gift', description: 'Give luxury gift ($500k)', available: character.wealth >= 500, popularity: 5 },
            { id: 'intimate_protected', name: 'Be Intimate (Protected)', description: '💕 Physical intimacy (20% pregnancy chance)', available: character.age >= 18, popularity: 5 },
            { id: 'intimate_unprotected', name: 'Be Intimate (Unprotected)', description: '💕 Physical intimacy (60% pregnancy chance)', available: character.age >= 18, popularity: 4 },
            { id: 'propose', name: 'Propose Marriage', description: 'Pop the question! 💍', available: character.relationshipStatus === 'dating' && character.age >= 18, popularity: 5 },
            { id: 'plan_wedding', name: 'Plan Wedding', description: 'Get married! 💒', available: character.relationshipStatus === 'engaged', popularity: 5 },
            { id: 'compliment_partner', name: 'Compliment Partner', description: 'Say something sweet', available: true, popularity: 4 },
          ]
        });
      }

      // Add pregnancy activities
      if (character.isPregnant) {
        categories.push({
          title: 'Pregnancy',
          icon: Users,
          color: 'bg-yellow-500',
          description: '🤰 Preparing for your baby',
          activities: [
            { id: 'prenatal_care', name: 'Prenatal Checkup', description: 'Visit the doctor for baby\'s health', available: character.wealth >= 50, popularity: 5 },
            { id: 'baby_shopping', name: 'Buy Baby Items', description: 'Shop for baby supplies', available: character.wealth >= 100, popularity: 4 },
            { id: 'parenting_class', name: 'Parenting Classes', description: 'Learn how to be a good parent', available: character.wealth >= 75, popularity: 3 },
          ]
        });
      }

      return categories;
    }
  };

  const activityCategories = getStageActivities();

  const getPopularityStars = (popularity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={12} 
        className={i < popularity ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
      />
    ));
  };

  return (
    <div className="space-y-4">
      {/* Mobile-optimized Header */}
      <div className="mobile-card text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Activities</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {isInSchool ? `School life for a ${lifeStage.toLowerCase()}` : `Life activities for a ${lifeStage.toLowerCase()}`}
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Tap categories to expand
        </div>
      </div>

      {/* Mobile-first Activity Categories */}
      <div className="space-y-3">
        {activityCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.title);
          const availableActivities = category.activities.filter(activity => activity.available);

          return (
            <div key={category.title} className="mobile-card overflow-hidden">
              {/* Category Header */}
              <button 
                className="w-full p-4 touch-feedback"
                onClick={() => toggleCategory(category.title)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${category.color} text-white apple-shadow-sm`}>
                      <category.icon size={20} />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{category.title}</span>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                          {availableActivities.length}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {isExpanded ? (
                      <ChevronDown size={20} className="transition-transform" />
                    ) : (
                      <ChevronRight size={20} className="transition-transform" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Activities */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                  {category.activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => onActivity(activity.id, activity.id)}
                      disabled={!activity.available}
                      className={`mobile-button text-left ${
                        activity.available 
                          ? 'bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30' 
                          : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                      } ${category.title === 'Risky Activities' ? 'border-red-200 dark:border-red-800' : ''}`}
                    >
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-sm text-gray-900 dark:text-white">{activity.name}</div>
                          <div className="flex items-center gap-1">
                            {getPopularityStars(activity.popularity)}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{activity.description}</div>
                        {!activity.available && (
                          <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                            Requirements not met
                          </div>
                        )}
                      </div>
                    </button>
                  ))}

                  {availableActivities.length === 0 && (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                      No activities available in this category
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile-optimized Quick Tips */}
      <div className="mobile-card bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-500 rounded-2xl text-white flex-shrink-0">
            <Home size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Activity Tips
            </p>
            <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
              <div>• Activities affect your stats and relationships</div>
              <div>• Some activities cost money or have requirements</div>
              <div>• Risky activities can have serious consequences</div>
              <div>• Popularity shows how much others enjoy the activity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
