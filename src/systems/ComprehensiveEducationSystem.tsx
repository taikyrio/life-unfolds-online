
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Character } from '../types/game';
import { educationStages, getAvailableSchools, getGradeFromGPA, universityMajors } from '../data/educationData';
import { GraduationCap, School, Trophy, Target, DollarSign, Star } from 'lucide-react';

interface ComprehensiveEducationSystemProps {
  character: Character;
  onEducationAction: (action: string, data?: any) => void;
}

export const ComprehensiveEducationSystem: React.FC<ComprehensiveEducationSystemProps> = ({ 
  character, 
  onEducationAction 
}) => {
  const [selectedMajor, setSelectedMajor] = useState('');
  
  const currentStageData = character.education?.currentStage 
    ? educationStages.find(s => s.id === character.education?.currentStage)
    : null;

  const currentSchoolData = currentStageData && currentStageData.schools && character.education?.currentSchool
    ? currentStageData.schools.find(s => s.id === character.education?.currentSchool)
    : null;

  const getAvailableStagesForAge = () => {
    return educationStages.filter(stage => {
      const ageEligible = character.age >= stage.minAge && character.age <= stage.maxAge;
      const notCompleted = !character.education?.completedStages?.includes(stage.id);
      const notCurrentlyEnrolled = character.education?.currentStage !== stage.id;
      
      // For mandatory ages (6-16), only show if not already in required school
      if (character.age >= 6 && character.age <= 16) {
        // Only show if this is optional enrollment (like switching to private school)
        return ageEligible && notCompleted && notCurrentlyEnrolled && !stage.autoEnroll;
      }
      
      // For post-16, show all eligible stages
      return ageEligible && notCompleted && notCurrentlyEnrolled;
    });
  };

  const getProgressPercentage = () => {
    if (!currentStageData || !character.education?.currentYear) return 0;
    return (character.education.currentYear / currentStageData.duration) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Current Education Status */}
      {character.education?.currentStage && currentStageData && currentSchoolData ? (
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <School className="h-6 w-6" />
              Currently Studying
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">{currentStageData.name}</span>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  Year {character.education.currentYear}/{currentStageData.duration}
                </Badge>
              </div>
              <Progress value={getProgressPercentage()} className="h-3 mb-2" />
              <div className="text-sm text-gray-600">
                🏫 {currentSchoolData.name} ({currentSchoolData.type})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg">
                <div className="text-sm text-gray-500">Current GPA</div>
                <div className="text-2xl font-bold text-blue-600">
                  {character.education.gpa.toFixed(2)} ({getGradeFromGPA(character.education.gpa)})
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="text-sm text-gray-500">School Quality</div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">{currentSchoolData.quality}/10</span>
                </div>
              </div>
            </div>

            {character.education.major && (
              <div className="bg-white p-3 rounded-lg">
                <div className="text-sm text-gray-500">Major</div>
                <div className="font-semibold text-purple-600">{character.education.major}</div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                onClick={() => onEducationAction('study_harder')}
                className="bg-green-600 hover:bg-green-700"
              >
                📚 Study Harder
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEducationAction('skip_school')}
              >
                🎮 Skip School
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEducationAction('get_tutoring')}
                disabled={character.wealth < 50}
              >
                👨‍🏫 Get Tutoring ($50k)
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEducationAction('take_test')}
              >
                📝 Take Standardized Test
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => onEducationAction('drop_out')}
                disabled={character.age < 17}
                title={character.age < 17 ? "Cannot drop out before age 17 - education is mandatory!" : "Drop out of school"}
              >
                🚪 Drop Out {character.age < 17 && "(Age 17+)"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-gray-200">
          <CardContent className="p-6 text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">Not currently enrolled in education</p>
          </CardContent>
        </Card>
      )}

      {/* Major Selection for University */}
      {character.education?.currentStage === 'university' && !character.education.major && (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">Choose Your Major</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedMajor} onValueChange={setSelectedMajor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a major" />
              </SelectTrigger>
              <SelectContent>
                {universityMajors.map(major => (
                  <SelectItem key={major} value={major}>{major}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => onEducationAction('choose_major', { major: selectedMajor })}
              disabled={!selectedMajor}
              className="w-full"
            >
              Declare Major
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Education History */}
      {character.education?.completedStages && character.education.completedStages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold-500" />
              Education Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {character.education?.completedStages?.map((stageId: string, index: number) => {
                const stage = educationStages.find(s => s.id === stageId);
                return (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 mr-2 mb-2">
                    🎓 {stage?.name || stageId}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements */}
      {character.education?.achievements && character.education.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Academic Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {character.education?.achievements?.map((achievement: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 mr-2 mb-2">
                  🏆 {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Scores */}
      {character.education?.testScores && character.education.testScores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Standardized Test Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {character.education?.testScores?.map((score: number, index: number) => (
                <Badge key={index} variant="outline" className="text-blue-600">
                  📊 {score}
                </Badge>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Highest Score: {character.education?.testScores?.length ? Math.max(...character.education.testScores) : 'N/A'}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Education Options */}
      {getAvailableStagesForAge().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              Available Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getAvailableStagesForAge().map(stage => {
              const availableSchools = getAvailableSchools(stage.id, character);
              return (
                <div key={stage.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">{stage.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Ages {stage.minAge}-{stage.maxAge} • {stage.duration} years
                  </p>
                  
                  <div className="space-y-2">
                    {availableSchools.map(school => (
                      <div key={school.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{school.name}</div>
                          <div className="text-xs text-gray-500">
                            {school.type} • Quality: {school.quality}/10 • {school.reputation}
                          </div>
                        </div>
                        <div className="text-right">
                          {school.cost > 0 && (
                            <div className="text-sm text-green-600 flex items-center">
                              <DollarSign className="h-3 w-3" />
                              {school.cost}k/year
                            </div>
                          )}
                          <Button
                            size="sm"
                            onClick={() => onEducationAction('enroll', { 
                              stageId: stage.id, 
                              schoolId: school.id 
                            })}
                            disabled={character.wealth < school.cost * 10}
                            className="mt-1"
                          >
                            Enroll
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
