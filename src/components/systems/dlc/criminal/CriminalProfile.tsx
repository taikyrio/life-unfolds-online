
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skull } from 'lucide-react';
import { Character } from '../../../../types/character';

interface CriminalProfileProps {
  character: Character;
  getNotoriety: () => number;
  getCodingSkill: () => number;
}

export const CriminalProfile: React.FC<CriminalProfileProps> = ({
  character,
  getNotoriety,
  getCodingSkill
}) => {
  return (
    <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Skull className="h-5 w-5 text-red-600" />
          Criminal Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-semibold text-red-600">Notoriety</div>
            <div className="text-lg">{getNotoriety()}/100</div>
            <Progress value={getNotoriety()} className="h-2 mt-1" />
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-semibold text-blue-600">Coding</div>
            <div className="text-lg">{getCodingSkill()}/100</div>
            <Progress value={getCodingSkill()} className="h-2 mt-1" />
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <div className="font-semibold text-gray-600">Record</div>
            <div className="text-sm">{character.criminalRecord ? '⚠️ Yes' : '✅ Clean'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
