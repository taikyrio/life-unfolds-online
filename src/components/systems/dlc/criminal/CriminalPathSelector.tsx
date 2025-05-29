
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { criminalPaths } from './criminalPathsData';

interface CriminalPathSelectorProps {
  onSelectPath: (pathId: string) => void;
}

export const CriminalPathSelector: React.FC<CriminalPathSelectorProps> = ({
  onSelectPath
}) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-bold text-center mb-4">Choose Your Criminal Path</h2>
      {Object.values(criminalPaths).map((path) => (
        <Card key={path.id} className="cursor-pointer hover:shadow-lg transition-all">
          <CardContent className="p-6" onClick={() => onSelectPath(path.id)}>
            <div className={`bg-gradient-to-r ${path.color} text-white rounded-lg p-4 mb-4`}>
              <div className="flex items-center gap-3">
                <path.icon className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">{path.name}</h3>
                  <p className="text-gray-100">{path.description}</p>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {path.careers.length} career levels available
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
