
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Character } from '../../types/game';
import { GraduationCap, Clock, DollarSign, Users } from 'lucide-react';

interface EducationSystemProps {
  character: Character;
  onEducationAction: (action: string, data?: any) => void;
}

export const EducationSystem: React.FC<EducationSystemProps> = ({ 
  character, 
  onEducationAction 
}) => {
  const educationLevels = [
    { id: 'elementary', name: 'Elementary School', minAge: 5, maxAge: 11, duration: 6, cost: 0 },
    { id: 'middle', name: 'Middle School', minAge: 11, maxAge: 14, duration: 3, cost: 0 },
    { id: 'high', name: 'High School', minAge: 14, maxAge: 18, duration: 4, cost: 0 },
    { id: 'college', name: 'Community College', minAge: 18, maxAge: 25, duration: 2, cost: 20 },
    { id: 'university', name: 'University', minAge: 18, maxAge: 30, duration: 4, cost: 40 },
    { id: 'graduate', name: 'Graduate School', minAge: 22, maxAge: 35, duration: 2, cost: 60 },
    { id: 'medical', name: 'Medical School', minAge: 22, maxAge: 30, duration: 4, cost: 100 },
    { id: 'law', name: 'Law School', minAge: 22, maxAge: 30, duration: 3, cost: 80 }
  ];

  const getEligibleEducation = () => {
    return educationLevels.filter(level => {
      const meetsAge = character.age >= level.minAge && character.age <= level.maxAge;
      const canAfford = character.wealth >= level.cost;
      const notCompleted = !character.education.completedStages.includes(level.name.split(' ')[0]);
      return meetsAge && canAfford && notCompleted;
    });
  };

  const getCurrentEducationProgress = () => {
    if (!character.currentEducation) return null;
    const level = educationLevels.find(l => l.id === character.currentEducation!.level);
    if (!level) return null;
    return (character.currentEducation.currentYear / level.duration) * 100;
  };

  return (
    <div className="space-y-4">
      {/* Current Education Status */}
      {character.currentEducation ? (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Currently Studying
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{character.currentEducation.level}</span>
                <span className="text-sm text-gray-600">
                  Year {character.currentEducation.currentYear}
                </span>
              </div>
              <Progress value={getCurrentEducationProgress() || 0} className="h-2" />
            </div>
            <div className="text-sm text-gray-600">
              <div>🏫 {character.currentEducation.institution}</div>
              <div>📊 GPA: {character.currentEducation.gpa.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 text-center text-gray-500">
            <GraduationCap className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Not currently enrolled in education</p>
          </CardContent>
        </Card>
      )}

      {/* Education History */}
      {character.education.completedStages.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Education Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {character.education.completedStages.map((edu, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  🎓 {edu}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Education Options */}
      {getEligibleEducation().length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getEligibleEducation().map(level => (
              <div key={level.id} className="border rounded-lg p-3 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{level.name}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {level.duration} years
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${level.cost}k
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onEducationAction('enroll', { levelId: level.id })}
                    disabled={character.wealth < level.cost}
                  >
                    Enroll
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
