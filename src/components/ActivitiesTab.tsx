
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { BookOpen, Dumbbell, Users, Briefcase, Gavel, GraduationCap, Home } from 'lucide-react';
import { getLifeStage } from '../utils/gameUtils';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const lifeStage = getLifeStage(character.age);
  const isInSchool = character.age < 18 || character.education === 'High School Student' || character.education === 'University Student' || character.education === 'Graduate Student';
  
  // Get stage-appropriate activities
  const getStageActivities = () => {
    if (character.age < 6) {
      return [
        {
          title: 'Early Learning',
          icon: BookOpen,
          color: 'bg-blue-500',
          activities: [
            { id: 'play_toys', name: 'Play with Toys', description: 'Have fun and develop creativity', available: true },
            { id: 'watch_cartoons', name: 'Watch Cartoons', description: 'Entertainment time', available: true },
            { id: 'nap', name: 'Take a Nap', description: 'Rest and grow', available: true },
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
          activities: [
            { id: 'study_harder', name: 'Study Harder', description: 'Improve your grades', available: character.age >= 6 },
            { id: 'join_club', name: 'Join School Club', description: 'Make friends and learn new skills', available: character.age >= 13 },
            { id: 'sports_team', name: 'Join Sports Team', description: 'Stay fit and build teamwork', available: character.age >= 13 },
            { id: 'school_play', name: 'Audition for School Play', description: 'Express your creativity', available: character.age >= 10 },
            { id: 'tutoring', name: 'Get Tutoring', description: 'Extra help with studies', available: character.age >= 8 && character.wealth >= 50 },
          ]
        },
        {
          title: 'Social Life',
          icon: Users,
          color: 'bg-purple-500',
          activities: [
            { id: 'hang_friends', name: 'Hang Out with Friends', description: 'Build relationships', available: character.age >= 10 },
            { id: 'school_dance', name: 'Go to School Dance', description: 'Have fun and socialize', available: character.age >= 14 },
            { id: 'study_group', name: 'Join Study Group', description: 'Learn with peers', available: character.age >= 13 },
          ]
        }
      ];
    } else {
      // Adult activities
      const categories = [
        {
          title: 'Career',
          icon: Briefcase,
          color: 'bg-orange-500',
          activities: [
            { id: 'work_harder', name: 'Work Harder', description: 'Impress your boss', available: !!character.job },
            { id: 'ask_promotion', name: 'Ask for Promotion', description: 'Request advancement', available: !!character.job },
            { id: 'job_search', name: 'Look for New Job', description: 'Find better opportunities', available: character.age >= 18 },
            { id: 'freelance', name: 'Take Freelance Work', description: 'Earn extra income', available: character.age >= 18 },
            { id: 'night_school', name: 'Attend Night School', description: 'Improve your education', available: character.age >= 18 && character.wealth >= 100 },
          ]
        },
        {
          title: 'Health & Fitness',
          icon: Dumbbell,
          color: 'bg-green-500',
          activities: [
            { id: 'gym', name: 'Go to Gym', description: 'Improve health and looks', available: character.age >= 16 },
            { id: 'doctor', name: 'Visit Doctor', description: 'Get a health checkup', available: true },
            { id: 'meditation', name: 'Practice Meditation', description: 'Reduce stress and find peace', available: character.age >= 16 },
            { id: 'diet', name: 'Start a Diet', description: 'Improve your health', available: character.age >= 18 },
          ]
        },
        {
          title: 'Social & Entertainment',
          icon: Users,
          color: 'bg-purple-500',
          activities: [
            { id: 'party', name: 'Go to Party', description: 'Have fun but watch out for trouble', available: character.age >= 18 },
            { id: 'vacation', name: 'Take a Vacation', description: 'Relax and recharge', available: character.age >= 18 && character.wealth >= 200 },
            { id: 'volunteer', name: 'Volunteer Work', description: 'Help others and feel good', available: character.age >= 16 },
            { id: 'hobby', name: 'Pursue a Hobby', description: 'Learn something new', available: character.age >= 16 },
          ]
        }
      ];

      // Add crime category for adults
      if (character.age >= 18) {
        categories.push({
          title: 'Risky Activities',
          icon: Gavel,
          color: 'bg-red-500',
          activities: [
            { id: 'gamble', name: 'Gamble', description: 'Risk it all for big rewards', available: character.wealth >= 50 },
            { id: 'street_race', name: 'Street Racing', description: 'Fast and dangerous', available: true },
            { id: 'shoplift', name: 'Shoplift', description: 'Steal small items (risky!)', available: true },
          ]
        });
      }

      return categories;
    }
  };

  const activityCategories = getStageActivities();

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <div className="px-4 pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-game-text mb-2">Activities</h2>
          <p className="text-gray-600">
            {isInSchool ? `School activities for a ${lifeStage.toLowerCase()}` : `Life activities for a ${lifeStage.toLowerCase()}`}
          </p>
        </div>

        <div className="space-y-4">
          {activityCategories.map((category) => (
            <Card key={category.title} className="shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className={`p-2 rounded-lg ${category.color} text-white`}>
                    <category.icon size={20} />
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {category.activities.map((activity) => (
                    <Button
                      key={activity.id}
                      onClick={() => onActivity(category.title.toLowerCase(), activity.id)}
                      disabled={!activity.available}
                      variant="outline"
                      className="h-auto p-4 text-left justify-start hover:bg-primary/5 hover:border-primary disabled:opacity-50"
                    >
                      <div className="w-full">
                        <div className="font-medium text-sm">{activity.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{activity.description}</div>
                        {!activity.available && (
                          <div className="text-xs text-red-500 mt-1">Not available</div>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Home size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Activities will return you to your Life page
                </p>
                <p className="text-xs text-blue-600">
                  Your choices will be reflected in your life journal
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
