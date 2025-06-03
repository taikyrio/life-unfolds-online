
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  personalityTypes, 
  mentalHealthConditions, 
  determinePersonalityType,
  seekMentalHealthTreatment 
} from '../../systems/psychologySystem';
import { useToast } from '@/hooks/use-toast';

interface PsychologyTabProps {
  character: Character;
  onPsychologyAction: (action: string, data: any) => void;
}

export const PsychologyTab: React.FC<PsychologyTabProps> = ({ character, onPsychologyAction }) => {
  const { toast } = useToast();

  const personalityType = personalityTypes.find(p => p.id === character.personalityType) || 
                         determinePersonalityType(character);

  const handlePersonalityTest = () => {
    const newPersonality = determinePersonalityType(character);
    onPsychologyAction('personality_test', { personality: newPersonality });
    
    toast({
      title: "Personality Assessment Complete",
      description: `You are ${newPersonality.name}!`,
    });
  };

  const handleTherapy = (conditionId: string, treatmentId: string) => {
    const condition = mentalHealthConditions.find(c => c.id === conditionId);
    const treatment = condition?.treatments.find(t => t.id === treatmentId);
    
    if (!condition || !treatment) return;

    const result = seekMentalHealthTreatment(character, condition, treatment);
    onPsychologyAction('seek_treatment', { condition, treatment, result });
    
    toast({
      title: result.success ? "Treatment Started" : "Treatment Unavailable",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });
  };

  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧠 Personality Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{personalityType.name}</h3>
                <p className="text-sm text-gray-600">{personalityType.description}</p>
              </div>
              <Button onClick={handlePersonalityTest} variant="outline" size="sm">
                Retake Test
              </Button>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Personality Traits</p>
              <div className="space-y-2">
                {personalityType.traits.map(trait => (
                  <div key={trait.name} className="flex items-center gap-2">
                    <span className="text-sm w-20">{trait.name}</span>
                    <Progress value={Math.abs(trait.value)} className="flex-1" />
                    <span className="text-xs w-8">{trait.value > 0 ? '+' : ''}{trait.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Strengths</p>
                <div className="space-y-1">
                  {personalityType.strengths.map(strength => (
                    <Badge key={strength} variant="default" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Areas for Growth</p>
                <div className="space-y-1">
                  {personalityType.weaknesses.map(weakness => (
                    <Badge key={weakness} variant="secondary" className="text-xs">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💭 Mental Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Mental Wellness</p>
                <Progress value={character.happiness} className="mt-1" />
                <p className="text-xs mt-1">{character.happiness}/100</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stress Level</p>
                <Progress value={100 - character.health} className="mt-1" />
                <p className="text-xs mt-1">{100 - character.health}/100</p>
              </div>
            </div>
            
            {character.mentalHealthConditions && character.mentalHealthConditions.length > 0 ? (
              <div>
                <p className="text-sm font-medium mb-2">Current Conditions</p>
                <div className="space-y-3">
                  {character.mentalHealthConditions.map(conditionId => {
                    const condition = mentalHealthConditions.find(c => c.id === conditionId);
                    if (!condition) return null;
                    
                    return (
                      <div key={conditionId} className="p-3 border rounded-lg bg-yellow-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{condition.name}</h4>
                          <Badge variant="destructive">{condition.severity}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Treatment Options:</p>
                          {condition.treatments.map(treatment => (
                            <Button
                              key={treatment.id}
                              onClick={() => handleTherapy(conditionId, treatment.id)}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start text-left"
                              disabled={character.wealth < treatment.cost}
                            >
                              <div>
                                <div className="font-medium">{treatment.name}</div>
                                <div className="text-xs">
                                  Cost: ${treatment.cost}k | Effectiveness: {treatment.effectiveness}%
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-gray-600">No current mental health concerns</p>
                <p className="text-xs text-gray-500 mt-1">Maintain good habits for mental wellness</p>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">Wellness Activities</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => onPsychologyAction('meditation', {})}
                  variant="outline"
                  size="sm"
                >
                  🧘 Meditation
                </Button>
                <Button
                  onClick={() => onPsychologyAction('journaling', {})}
                  variant="outline"
                  size="sm"
                >
                  📔 Journaling
                </Button>
                <Button
                  onClick={() => onPsychologyAction('support_group', {})}
                  variant="outline"
                  size="sm"
                  disabled={character.wealth < 10}
                >
                  👥 Support Group ($10k)
                </Button>
                <Button
                  onClick={() => onPsychologyAction('mindfulness', {})}
                  variant="outline"
                  size="sm"
                >
                  🌱 Mindfulness
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
