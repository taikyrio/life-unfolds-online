
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
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-game-text mb-2">Education</h2>
        <p className="text-gray-600">Your academic journey</p>
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
                  <span>{educationInfo.institution}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Year:</span>
                  <span>{educationInfo.currentYear} of {educationInfo.totalYears}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">GPA:</span>
                  <span>{educationInfo.gpa}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleStudyHard} variant="outline">
                    Study Hard
                  </Button>
                  <Button onClick={handleDropOut} variant="destructive">
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
            <div className="grid gap-4">
              {availableDegrees.map((degree) => (
                <div key={degree.id} className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{degree.name}</h3>
                    <p className="text-sm text-gray-600">{degree.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>Duration: {degree.duration} years</span>
                      <span>Min Age: {degree.minAge}</span>
                      <span>Cost: ${degree.cost}k/year</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEnrollment(degree.id)}
                    disabled={character.age < degree.minAge}
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
            <div className="grid gap-3">
              {classmates.map((classmate) => (
                <div key={classmate.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{classmate.name}</span>
                    <div className="text-sm text-gray-600">
                      Age: {classmate.age} • Relationship: {classmate.relationshipStatus}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleInteractWithClassmate(classmate)}
                    variant="outline"
                    size="sm"
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
  );
};
