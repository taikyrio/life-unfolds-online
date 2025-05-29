
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Character } from '../../types/game';
import { Heart, Activity, Shield, Pill } from 'lucide-react';

interface HealthTabProps {
  character: Character;
  onHealthAction: (action: string, data?: any) => void;
}

export const HealthTab: React.FC<HealthTabProps> = ({ 
  character, 
  onHealthAction 
}) => {
  const getHealthStatus = (health: number) => {
    if (health >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (health >= 60) return { status: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (health >= 40) return { status: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (health >= 20) return { status: 'Poor', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { status: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const healthStatus = getHealthStatus(character.health);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-24">
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            🏥 Health Center
          </h1>
          <p className="text-gray-600">Manage your health and wellness</p>
        </div>

        {/* Health Overview */}
        <Card className={`mb-6 border-2 ${healthStatus.bgColor}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Health Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`font-bold text-lg ${healthStatus.color}`}>
                {healthStatus.status}
              </span>
              <Badge variant="secondary">{character.health}%</Badge>
            </div>
            <Progress value={character.health} className="h-3" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold">Age</div>
                <div className="text-gray-600">{character.age} years</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="font-semibold">Fitness</div>
                <div className="text-gray-600">{character.looks}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Actions */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Health Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full"
              onClick={() => onHealthAction('checkup')}
              disabled={character.wealth < 100}
            >
              <Shield className="h-4 w-4 mr-2" />
              Annual Checkup ($100k)
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onHealthAction('exercise')}
            >
              <Activity className="h-4 w-4 mr-2" />
              Exercise (Free)
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onHealthAction('diet')}
              disabled={character.wealth < 5}
            >
              <Heart className="h-4 w-4 mr-2" />
              Healthy Diet Plan ($5k)
            </Button>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">💡 Health Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Regular exercise improves both health and looks</p>
              <p>• Annual checkups can catch health issues early</p>
              <p>• Healthy diet plans boost overall wellness</p>
              <p>• Maintaining high happiness also improves health</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
