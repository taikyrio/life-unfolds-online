
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Vote, Users, TrendingUp } from 'lucide-react';

interface PoliticsTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const PoliticsTab: React.FC<PoliticsTabProps> = ({ character, onCharacterUpdate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🗳️ Political Influence</h1>
          <p className="text-gray-600">Your voice in the political arena</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Political Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{character.politicalInfluence || 0}</div>
                <div className="text-sm text-gray-600">Political Influence</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{character.environmentalAwareness || 0}</div>
                <div className="text-sm text-gray-600">Environmental Awareness</div>
              </div>
            </div>

            {character.politicalAffiliation && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Political Affiliation
                </h4>
                <Badge variant="secondary">{character.politicalAffiliation}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Political Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-gray-500 mb-4">No political activities yet</div>
              <p className="text-sm text-gray-400">Engage in politics to build your influence</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
