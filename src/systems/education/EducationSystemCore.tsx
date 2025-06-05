
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Character } from '../../types/game';
import { educationStages } from '../../data/education/educationStages';
import { universityMajors, getMajorById } from '../../data/education/universityMajors';
import { graduateSchools, getAvailableGraduateSchools } from '../../data/education/graduateSchools';
import { schoolClubs, getClubsForStage } from '../../data/education/schoolClubs';
import { schoolCliques, getCliquesForStage } from '../../data/education/schoolCliques';
import { GraduationCap, Clock, DollarSign, Users, Trophy, Star } from 'lucide-react';

interface EducationSystemCoreProps {
  character: Character;
  onEducationAction: (action: string, data?: any) => void;
}

export const EducationSystemCore: React.FC<EducationSystemCoreProps> = ({ 
  character, 
  onEducationAction 
}) => {
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedSchool, setSelectedSchool] = useState<string>('');

  const currentEducation = character.education;
  const currentStage = currentEducation?.currentStage;
  const currentStageData = currentStage ? educationStages.find(s => s.id === currentStage) : null;

  const getEducationProgress = () => {
    if (!currentEducation?.currentYear || !currentStageData) return 0;
    return (currentEducation.currentYear / currentStageData.duration) * 100;
  };

  const getAvailableStages = () => {
    return educationStages.filter(stage => {
      // Age requirements
      if (character.age < stage.minAge || character.age > stage.maxAge) return false;
      
      // Already completed
      if (currentEducation?.completedStages?.includes(stage.id)) return false;
      
      // Currently enrolled
      if (currentEducation?.currentStage === stage.id) return false;
      
      // Requirements check
      if (stage.requirements?.completedStages) {
        for (const req of stage.requirements.completedStages) {
          if (!currentEducation?.completedStages?.includes(req)) return false;
        }
      }
      
      if (stage.requirements?.minGPA && (currentEducation?.gpa || 0) < stage.requirements.minGPA) return false;
      
      return true;
    });
  };

  const getGPAGrade = (gpa: number): string => {
    if (gpa >= 3.7) return 'A';
    if (gpa >= 3.3) return 'A-';
    if (gpa >= 3.0) return 'B+';
    if (gpa >= 2.7) return 'B';
    if (gpa >= 2.3) return 'B-';
    if (gpa >= 2.0) return 'C+';
    if (gpa >= 1.7) return 'C';
    if (gpa >= 1.3) return 'C-';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      {/* Current Education Status */}
      {currentEducation?.currentStage ? (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Currently Enrolled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-lg">{currentStageData?.name}</span>
                <Badge variant="secondary">
                  Year {currentEducation.currentYear}/{currentStageData?.duration}
                </Badge>
              </div>
              <Progress value={getEducationProgress()} className="h-3 mb-2" />
              <div className="text-sm text-gray-600">
                Progress: {Math.round(getEducationProgress())}%
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">School:</span>
                <div>{currentEducation.currentSchool?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
              </div>
              <div>
                <span className="font-medium">GPA:</span>
                <div>{currentEducation.gpa?.toFixed(2)} ({getGPAGrade(currentEducation.gpa || 0)})</div>
              </div>
              {currentEducation.major && (
                <div className="col-span-2">
                  <span className="font-medium">Major:</span>
                  <div>{getMajorById(currentEducation.major)?.name}</div>
                </div>
              )}
            </div>

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
                😴 Skip School
              </Button>
              {character.age >= (currentStageData?.dropoutAge || 18) && (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onEducationAction('drop_out')}
                >
                  🚪 Drop Out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg">Not currently enrolled in education</p>
            <p className="text-sm">Choose from available options below</p>
          </CardContent>
        </Card>
      )}

      {/* Available Education Options */}
      {getAvailableStages().length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Available Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getAvailableStages().map(stage => {
              const affordableSchools = stage.schools.filter(school => 
                character.wealth >= school.cost * 10 &&
                (!school.requirements?.minGPA || (currentEducation?.gpa || 0) >= school.requirements.minGPA) &&
                (!school.requirements?.minSmarts || character.smarts >= school.requirements.minSmarts) &&
                (!school.requirements?.minWealth || character.wealth >= school.requirements.minWealth)
              );

              return (
                <div key={stage.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{stage.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {stage.duration} years
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Ages {stage.minAge}-{stage.maxAge}
                        </span>
                        {stage.isMandatory && (
                          <Badge variant="destructive" className="text-xs">
                            Mandatory
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {affordableSchools.length > 0 ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Choose School:</label>
                      <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a school" />
                        </SelectTrigger>
                        <SelectContent>
                          {affordableSchools.map(school => (
                            <SelectItem key={school.id} value={school.id}>
                              <div className="flex justify-between items-center w-full">
                                <span>{school.name}</span>
                                <span className="text-sm text-gray-500 ml-4">
                                  ${school.cost * 10}k
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {stage.id === 'university' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Choose Major:</label>
                          <Select value={selectedMajor} onValueChange={setSelectedMajor}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a major" />
                            </SelectTrigger>
                            <SelectContent>
                              {universityMajors.map(major => (
                                <SelectItem key={major.id} value={major.id}>
                                  {major.name} ({major.category})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <Button
                        onClick={() => onEducationAction('enroll', { 
                          stageId: stage.id, 
                          schoolId: selectedSchool,
                          major: stage.id === 'university' ? selectedMajor : undefined
                        })}
                        disabled={!selectedSchool || (stage.id === 'university' && !selectedMajor)}
                        className="w-full"
                      >
                        Enroll in {stage.name}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p>No affordable schools available</p>
                      <p className="text-sm">Improve your stats or save more money</p>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Graduate School Options */}
      {currentEducation?.major && currentEducation?.completedStages?.includes('university') && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Graduate School Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getAvailableGraduateSchools(currentEducation.major).map(school => {
              const canAfford = character.wealth >= school.cost * 10;
              const meetsRequirements = 
                (currentEducation.gpa || 0) >= school.requirements.minGPA &&
                character.smarts >= school.requirements.minSmarts;

              return (
                <div key={school.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{school.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {school.duration} years
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${school.cost * 10}k
                        </span>
                        <Badge variant="outline">
                          {school.acceptanceRate}% acceptance
                        </Badge>
                      </div>
                    </div>
                    {school.careerTitle && (
                      <Badge variant="secondary">
                        → {school.careerTitle}
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    Requirements: {school.requirements.minGPA} GPA, {school.requirements.minSmarts} Smarts
                  </div>

                  <Button
                    onClick={() => onEducationAction('apply_graduate', { schoolId: school.id })}
                    disabled={!canAfford || !meetsRequirements}
                    className="w-full"
                  >
                    {!canAfford ? 'Cannot Afford' : !meetsRequirements ? 'Requirements Not Met' : `Apply to ${school.name}`}
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Education History */}
      {currentEducation?.completedStages && currentEducation.completedStages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Education History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentEducation.completedStages.map((stageId, index) => {
                const stage = educationStages.find(s => s.id === stageId);
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      🎓 {stage?.name || stageId}
                    </Badge>
                  </div>
                );
              })}
            </div>
            
            {currentEducation.achievements && currentEducation.achievements.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Achievements</h4>
                <div className="space-y-1">
                  {currentEducation.achievements.map((achievement, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1">
                      🏆 {achievement}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* School Social Life */}
      {currentEducation?.currentStage && (
        <Card>
          <CardHeader>
            <CardTitle>School Social Life</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Clubs */}
            <div>
              <h4 className="font-medium mb-2">Available Clubs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getClubsForStage(currentEducation.currentStage).slice(0, 6).map(club => (
                  <Button
                    key={club.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onEducationAction('join_club', { clubId: club.id })}
                    disabled={currentEducation.clubs?.includes(club.id)}
                    className="justify-start text-left"
                  >
                    {currentEducation.clubs?.includes(club.id) ? '✅' : '➕'} {club.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Cliques */}
            <div>
              <h4 className="font-medium mb-2">Social Groups</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getCliquesForStage(currentEducation.currentStage).slice(0, 4).map(clique => (
                  <Button
                    key={clique.id}
                    variant="outline"
                    size="sm"
                    onClick={() => onEducationAction('join_clique', { cliqueId: clique.id })}
                    disabled={currentEducation.clique === clique.id}
                    className="justify-start text-left"
                  >
                    {currentEducation.clique === clique.id ? '👥' : '🤝'} {clique.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
