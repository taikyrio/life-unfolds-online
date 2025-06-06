
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Character } from '../../types/game';
import { 
  Globe, 
  Settings, 
  BarChart3, 
  Users, 
  Calendar,
  TrendingUp,
  AlertCircle,
  Info
} from 'lucide-react';

interface WorldSystemsHubProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const WorldSystemsHub: React.FC<WorldSystemsHubProps> = ({ 
  character, 
  onCharacterUpdate 
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const renderValue = (key: string, value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return `${value.length} items`;
    if (typeof value === 'object') {
      if (key === 'personalityTraits') return 'View Details';
      if (key === 'criminalRecord') return 'View Record';
      if (key === 'jobPerformance') return 'View Performance';
      if (key === 'familyMembers') return `${value.length || 0} members`;
      return 'Complex Object';
    }
    return String(value);
  };

  const characterData = Object.entries(character).filter(([key, value]) => 
    key !== 'id' && value !== undefined && value !== null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
            🌍 World Systems
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Character Data & System Information
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-xs">
              <BarChart3 className="w-3 h-3 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" className="text-xs">
              <Info className="w-3 h-3 mr-1" />
              Details
            </TabsTrigger>
            <TabsTrigger value="systems" className="text-xs">
              <Settings className="w-3 h-3 mr-1" />
              Systems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Character Overview */}
            <Card className="glass border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Character Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{character.age}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Age</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600">${character.wealth}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Wealth</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{character.health}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Health</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">{character.happiness}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Happiness</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {/* Character Data Table */}
            <Card className="glass border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Character Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {characterData.map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 text-right max-w-32 truncate">
                        {renderValue(key, value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="systems" className="space-y-4">
            {/* System Status */}
            <Card className="glass border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium">Game Engine</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm font-medium">Event System</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Running
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-sm font-medium">Relationship Engine</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
