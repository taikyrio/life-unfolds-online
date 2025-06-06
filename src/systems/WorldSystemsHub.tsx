
import React, { useState } from 'react';
import { Character } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';

interface WorldSystemsHubProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const WorldSystemsHub: React.FC<WorldSystemsHubProps> = ({
  character,
  onCharacterUpdate
}) => {
  const [selectedSystem, setSelectedSystem] = useState<string>('overview');

  const renderSystemContent = () => {
    switch (selectedSystem) {
      case 'overview':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>World Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Population:</span>
                    <span>7.8B</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Economy:</span>
                    <Badge variant="secondary">Stable</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <div>System not implemented</div>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">World Systems</h2>
        <Badge variant="outline">Global Simulation</Badge>
      </div>

      <Tabs value={selectedSystem} onValueChange={setSelectedSystem}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="politics">Politics</TabsTrigger>
          <TabsTrigger value="economy">Economy</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedSystem} className="mt-4">
          {renderSystemContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
