
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Scale, AlertTriangle, Shield } from 'lucide-react';

interface LegalTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const LegalTab: React.FC<LegalTabProps> = ({ character, onCharacterUpdate }) => {
  const hasCleanRecord = !character.criminalRecord || 
    (character.criminalRecord.arrests === 0 && character.criminalRecord.convictions === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚖️ Legal Status</h1>
          <p className="text-gray-600">Your legal standing and criminal record</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Legal Standing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
              {hasCleanRecord ? (
                <>
                  <Shield className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-bold text-green-700">Clean Record</div>
                    <div className="text-sm text-gray-600">No criminal history</div>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                  <div>
                    <div className="font-bold text-red-700">Criminal Record</div>
                    <div className="text-sm text-gray-600">Has legal issues</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {character.criminalRecord && (
          <Card>
            <CardHeader>
              <CardTitle>Criminal Record</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{character.criminalRecord.arrests || 0}</div>
                  <div className="text-sm text-gray-600">Arrests</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{character.criminalRecord.convictions || 0}</div>
                  <div className="text-sm text-gray-600">Convictions</div>
                </div>
              </div>

              {character.criminalRecord.crimes && character.criminalRecord.crimes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Past Crimes</h4>
                  <div className="space-y-1">
                    {character.criminalRecord.crimes.map((crime, index) => (
                      <Badge key={index} variant="destructive" className="mr-2">
                        {crime}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {character.criminalRecord.currentlyIncarcerated && (
                <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-800">Currently Incarcerated</div>
                  <div className="text-sm text-red-600">
                    Time served: {character.criminalRecord.timeServed || 0} years
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
