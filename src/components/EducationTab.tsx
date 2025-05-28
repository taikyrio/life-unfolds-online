import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Character } from '../types/game';
import { getEducationInfo, getAvailableDegrees, getClassmates } from '../utils/educationUtils';

interface EducationTabProps {
  character: Character;
  onEducationAction: (action: string, data?: any) => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({ character, onEducationAction }) => {
  const [selectedDegree, setSelectedDegree] = useState<string>('');
  
  const educationInfo = getEducationInfo(character);
  const availableDegrees = getAvailableDegrees(character);
  const classmates = getClassmates(character);

  const handleEnrollment = (degreeType: string) => {
    onEducationAction('enroll', { degreeType });
  };

  const handleDropOut = () => {
    onEducationAction('dropout');
  };

  const handleStudyHard = () => {
    onEducationAction('study_hard');
  };

  const handleInteractWithClassmate = (classmate: any) => {
    onEducationAction('interact_classmate', { classmate });
  };

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <div className="p-4 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-game-text mb-2">Education</h2>
          <p className="text-gray-600 text-sm">Your academic journey</p>
        </div>

        {/* Current Education Status */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Current Education Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Level:</span>
                <Badge variant="secondary">{educationInfo.currentLevel}</Badge>
              </div>
              {educationInfo.isEnrolled && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Institution:</span>
                    <span className="text-right">{educationInfo.institution}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Year:</span>
                    <span>{educationInfo.currentYear} of {educationInfo.totalYears}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">GPA:</span>
                    <span>{educationInfo.gpa.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={handleStudyHard} 
                      variant="outline"
                      className="flex-1 touch-feedback"
                    >
                      Study Hard
                    </Button>
                    <Button 
                      onClick={handleDropOut} 
                      variant="destructive"
                      className="flex-1 touch-feedback"
                    >
                      Drop Out
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Education Options */}
        {!educationInfo.isEnrolled && availableDegrees.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Education Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDegrees.map((degree) => (
                  <div 
                    key={degree.id} 
                    className="flex flex-col gap-3 p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div>
                      <h3 className="font-semibold text-base">{degree.name}</h3>
                      <p className="text-sm text-gray-600">{degree.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        Duration: {degree.duration} years
                      </span>
                      <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                        Min Age: {degree.minAge}
                      </span>
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        Cost: ${degree.cost}k/year
                      </span>
                    </div>
                    <Button
                      onClick={() => handleEnrollment(degree.id)}
                      disabled={character.age < degree.minAge}
                      className="w-full mt-2 touch-feedback"
                    >
                      Enroll
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Classmates */}
        {educationInfo.isEnrolled && classmates.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classmates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classmates.map((classmate) => (
                  <div 
                    key={classmate.id} 
                    className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div>
                      <span className="font-medium">{classmate.name}</span>
                      <div className="text-sm text-gray-600">
                        Age: {classmate.age} • {classmate.relationshipStatus}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleInteractWithClassmate(classmate)}
                      variant="outline"
                      size="sm"
                      className="touch-feedback"
                    >
                      Interact
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};