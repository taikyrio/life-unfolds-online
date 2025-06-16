
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Heart, Users, Briefcase, GraduationCap } from 'lucide-react';

interface RelationshipDiscoveryProps {
  characterAge: number;
  onDiscoverAction: (actionType: string) => void;
}

export const RelationshipDiscovery: React.FC<RelationshipDiscoveryProps> = ({
  characterAge,
  onDiscoverAction
}) => {
  const getAvailableDiscoveryMethods = () => {
    const methods = [];

    // Always available
    methods.push({
      id: 'social_media',
      title: 'Social Media',
      description: 'Connect with people online',
      icon: Users,
      minAge: 13,
      emoji: '📱'
    });

    methods.push({
      id: 'neighborhood',
      title: 'Meet Neighbors',
      description: 'Get to know people in your area',
      icon: Users,
      minAge: 8,
      emoji: '🏘️'
    });

    // Age-specific methods
    if (characterAge >= 16) {
      methods.push({
        id: 'dating_app',
        title: 'Dating App',
        description: 'Find romantic connections',
        icon: Heart,
        minAge: 16,
        emoji: '💕'
      });
    }

    if (characterAge >= 18) {
      methods.push({
        id: 'workplace',
        title: 'Work Networking',
        description: 'Meet colleagues and professionals',
        icon: Briefcase,
        minAge: 18,
        emoji: '💼'
      });
    }

    if (characterAge >= 5 && characterAge <= 22) {
      methods.push({
        id: 'school',
        title: 'School Friends',
        description: 'Connect with classmates',
        icon: GraduationCap,
        minAge: 5,
        emoji: '🎓'
      });
    }

    return methods.filter(method => characterAge >= method.minAge);
  };

  const discoveryMethods = getAvailableDiscoveryMethods();

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10 mb-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Search className="w-5 h-5 text-white" />
          <h3 className="text-white font-semibold">Meet New People</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {discoveryMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Button
                key={method.id}
                onClick={() => onDiscoverAction(method.id)}
                variant="outline"
                className="bg-white/5 hover:bg-white/15 text-white border-white/20 justify-start p-3 h-auto transition-all duration-200"
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="text-xl">{method.emoji}</div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{method.title}</div>
                    <div className="text-xs text-white/60">{method.description}</div>
                  </div>
                  <Icon className="w-4 h-4 text-white/60" />
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
