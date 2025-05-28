
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { BookOpen, Dumbbell, Users, Briefcase, Gavel } from 'lucide-react';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  const activityCategories = [
    {
      title: 'Education',
      icon: BookOpen,
      color: 'bg-blue-500',
      activities: [
        { id: 'study', name: 'Study Harder', description: 'Improve your smarts', available: character.age >= 6 },
        { id: 'library', name: 'Visit Library', description: 'Read books to gain knowledge', available: character.age >= 6 },
        { id: 'tutor', name: 'Get a Tutor', description: 'Expensive but effective', available: character.age >= 8 && character.wealth >= 100 },
      ]
    },
    {
      title: 'Health & Fitness',
      icon: Dumbbell,
      color: 'bg-green-500',
      activities: [
        { id: 'gym', name: 'Go to Gym', description: 'Improve health and looks', available: character.age >= 16 },
        { id: 'doctor', name: 'Visit Doctor', description: 'Get a checkup', available: true },
        { id: 'meditation', name: 'Meditate', description: 'Improve happiness and reduce stress', available: character.age >= 13 },
      ]
    },
    {
      title: 'Social',
      icon: Users,
      color: 'bg-purple-500',
      activities: [
        { id: 'party', name: 'Go to Party', description: 'Have fun but risk consequences', available: character.age >= 16 },
        { id: 'club', name: 'Join Club', description: 'Make friends and improve relationships', available: character.age >= 13 },
        { id: 'date', name: 'Go on Date', description: 'Find love', available: character.age >= 16 && character.relationshipStatus === 'single' },
      ]
    },
    {
      title: 'Work',
      icon: Briefcase,
      color: 'bg-orange-500',
      activities: [
        { id: 'work_harder', name: 'Work Harder', description: 'Impress your boss', available: !!character.job },
        { id: 'ask_promotion', name: 'Ask for Promotion', description: 'Request a raise or promotion', available: !!character.job },
        { id: 'job_search', name: 'Look for Job', description: 'Find new employment', available: character.age >= 16 },
      ]
    },
    {
      title: 'Crime',
      icon: Gavel,
      color: 'bg-red-500',
      activities: [
        { id: 'shoplift', name: 'Shoplift', description: 'Steal small items', available: character.age >= 13 },
        { id: 'pickpocket', name: 'Pickpocket', description: 'Steal from strangers', available: character.age >= 16 },
        { id: 'burglary', name: 'Burglary', description: 'Break into houses', available: character.age >= 18 },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-game-text mb-2">Activities</h2>
        <p className="text-gray-600">Choose how to spend your time</p>
      </div>

      <div className="grid gap-4">
        {activityCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <category.icon size={20} />
                </div>
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {category.activities.map((activity) => (
                  <Button
                    key={activity.id}
                    onClick={() => onActivity(category.title.toLowerCase(), activity.id)}
                    disabled={!activity.available}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start hover:bg-primary/5 hover:border-primary"
                  >
                    <div>
                      <div className="font-medium">{activity.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{activity.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
