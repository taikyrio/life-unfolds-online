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
  const isInSchool = character.age < 18 || character.education === 'High School Student' || character.education === 'University Student' || character.education === 'Graduate Student';

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
            { id: 'play_toys', name: 'Play with Toys', description: 'Have fun and develop creativity', available: true, popularity: 5 },
            { id: 'watch_cartoons', name: 'Watch Cartoons', description: 'Entertainment time', available: true, popularity: 4 },
            { id: 'nap', name: 'Take a Nap', description: 'Rest and grow', available: true, popularity: 3 },
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
            { id: 'hang_friends', name: 'Hang Out with Friends', description: 'Build relationships and have fun', available: character.age >= 10, popularity: 5 },
            { id: 'school_dance', name: 'Go to School Dance', description: 'Have fun and socialize', available: character.age >= 14, popularity: 4 },
            { id: 'study_group', name: 'Join Study Group', description: 'Learn with peers', available: character.age >= 13, popularity: 3 },
            { id: 'make_friends', name: 'Try to Make New Friends', description: 'Expand your social circle', available: character.age >= 8, popularity: 4 },
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
            { id: 'dating_app', name: 'Use Dating App', description: 'Try to find romance online', available: character.age >= 18, popularity: 3 },
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
    <div className="pb-32 bg-gray-50 min-h-screen">
      <div className="px-4 pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-game-text mb-2">Activities Menu</h2>
          <p className="text-gray-600 text-sm">
            {isInSchool ? `School life activities for a ${lifeStage.toLowerCase()}` : `Life activities for a ${lifeStage.toLowerCase()}`}
          </p>
          <div className="text-xs text-gray-500 mt-1">
            Tap categories to expand • ⭐ = Popularity rating
          </div>
        </div>

        <div className="space-y-3">
          {activityCategories.map((category) => {
            const isExpanded = expandedCategories.includes(category.title);
            const availableActivities = category.activities.filter(activity => activity.available);

            return (
              <Card key={category.title} className="shadow-sm border border-gray-200 overflow-hidden">
                <CardHeader 
                  className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCategory(category.title)}
                >
                  <CardTitle className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color} text-white`}>
                        <category.icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {category.title}
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            {availableActivities.length}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 font-normal mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={20} className="text-gray-400 transition-transform" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-400 transition-transform" />
                    )}
                  </CardTitle>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {category.activities.map((activity) => (
                        <Button
                          key={activity.id}
                          onClick={() => onActivity(category.title.toLowerCase(), activity.id)}
                          disabled={!activity.available}
                          variant="outline"
                          className={`w-full h-auto p-3 text-left justify-start hover:bg-primary/5 hover:border-primary disabled:opacity-50 ${
                            category.title === 'Risky Activities' ? 'border-red-200 hover:border-red-400' : ''
                          }`}
                        >
                          <div className="w-full">
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-medium text-sm">{activity.name}</div>
                              <div className="flex items-center gap-1">
                                {getPopularityStars(activity.popularity)}
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">{activity.description}</div>
                            {!activity.available && (
                              <div className="text-xs text-red-500 mt-1">
                                Requirements not met
                              </div>
                            )}
                          </div>
                        </Button>
                      ))}

                      {availableActivities.length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No activities available in this category
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Home size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Quick Tips for Activities
                </p>
                <div className="text-xs text-blue-600 space-y-1 mt-1">
                  <div>• Activities affect your stats and relationships</div>
                  <div>• Some activities cost money or have requirements</div>
                  <div>• Risky activities can have serious consequences</div>
                  <div>• Popularity shows how much others enjoy the activity</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};