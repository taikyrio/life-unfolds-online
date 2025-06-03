
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Character } from '../../types/game';
import { advancedLifePaths, getEligiblePaths } from '../../systems/advancedLifePaths';
import { dynamicRelationshipManager } from '../../systems/dynamicRelationshipSystem';
import { worldBuildingManager, geographicRegions } from '../../systems/worldBuildingSystem';
import { 
  Globe, 
  Users, 
  Briefcase, 
  Heart, 
  Zap, 
  TrendingUp, 
  MapPin,
  Shield,
  Star,
  AlertTriangle
} from 'lucide-react';

interface WorldSystemsHubProps {
  character: Character;
  onAction: (action: string, data?: any) => void;
}

export const WorldSystemsHub: React.FC<WorldSystemsHubProps> = ({ 
  character, 
  onAction 
}) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showMarriageProposal, setShowMarriageProposal] = useState(false);
  
  const eligiblePaths = getEligiblePaths(character);
  const worldState = worldBuildingManager.getWorldState();
  const economicSystem = worldBuildingManager.getEconomicSystem();
  const activeEvents = worldBuildingManager.getActiveEvents();

  const handleJoinAdvancedPath = (pathId: string) => {
    onAction('join_advanced_path', { pathId });
  };

  const handleMarriageProposal = (partnerId: string) => {
    const proposal = dynamicRelationshipManager.initiateMarriageProposal(character, partnerId);
    onAction('marriage_proposal', proposal);
  };

  const handleWorldEvent = (eventType: string, eventData: any) => {
    onAction('world_event', { type: eventType, data: eventData });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌍 World Systems</h1>
        <p className="text-gray-600">Advanced life paths, relationships, and global events</p>
      </div>

      <Tabs defaultValue="paths" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="paths" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Life Paths
          </TabsTrigger>
          <TabsTrigger value="relationships" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Relationships
          </TabsTrigger>
          <TabsTrigger value="world" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            World State
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Global Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="paths" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Advanced Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advancedLifePaths.map(path => {
                  const isEligible = eligiblePaths.includes(path);
                  const isCurrentPath = character.job?.includes(path.name);
                  
                  return (
                    <Card key={path.id} className={`${isEligible ? 'border-green-200' : 'border-gray-200'} ${isCurrentPath ? 'bg-blue-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              <span>{path.icon}</span>
                              {path.name}
                            </h3>
                            <p className="text-sm text-gray-600">{path.description}</p>
                          </div>
                          <Badge className={isEligible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {path.category}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-xs text-gray-500">Requirements:</div>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {path.requirements.age && (
                              <Badge variant="outline">Age {path.requirements.age}+</Badge>
                            )}
                            {path.requirements.education && (
                              <Badge variant="outline">{path.requirements.education}</Badge>
                            )}
                            {path.requirements.stats && Object.entries(path.requirements.stats).map(([stat, value]) => (
                              <Badge key={stat} variant="outline">
                                {stat}: {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-xs text-gray-500">Career Stages:</div>
                          <div className="space-y-1">
                            {path.stages.slice(0, 3).map(stage => (
                              <div key={stage.id} className="text-xs flex justify-between">
                                <span>{stage.name}</span>
                                <span className="text-green-600">${stage.salary}k</span>
                              </div>
                            ))}
                            {path.stages.length > 3 && (
                              <div className="text-xs text-gray-400">
                                +{path.stages.length - 3} more stages
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleJoinAdvancedPath(path.id)}
                          disabled={!isEligible || isCurrentPath}
                          className="w-full"
                          variant={isEligible ? "default" : "secondary"}
                        >
                          {isCurrentPath ? 'Current Path' : isEligible ? 'Join Path' : 'Requirements Not Met'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Marriage & Family
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Relationship Status</h3>
                  <div className="text-sm text-gray-600">
                    {character.familyMembers.find(m => m.relationship === 'spouse') ? 
                      'Married' : 'Single'
                    }
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Family Statistics</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Children: {character.familyMembers.filter(m => m.relationship === 'child').length}</div>
                    <div>Siblings: {character.familyMembers.filter(m => m.relationship === 'sibling').length}</div>
                    <div>Parents: {character.familyMembers.filter(m => ['father', 'mother'].includes(m.relationship)).length}</div>
                    <div>Friends: {character.familyMembers.filter(m => m.relationship === 'friend').length}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Relationship Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline" onClick={() => setShowMarriageProposal(true)}>
                      💍 Propose Marriage
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onAction('plan_wedding')}>
                      💒 Plan Wedding
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onAction('start_divorce')}>
                      💔 Divorce
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onAction('have_children')}>
                      👶 Have Children
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Extended Family
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => onAction('generate_extended_family')}
                  variant="outline" 
                  className="w-full"
                >
                  🌳 Generate Family Tree
                </Button>
                
                <div className="space-y-2 text-sm">
                  <div className="font-medium">Family Connections</div>
                  <div className="space-y-1">
                    <div>Grandparents: Not yet generated</div>
                    <div>Aunts & Uncles: Not yet generated</div>
                    <div>Cousins: Not yet generated</div>
                    <div>Extended Family: Not yet generated</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-medium">Social Features</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      📱 Social Media
                    </Button>
                    <Button size="sm" variant="outline">
                      🎉 Family Reunion
                    </Button>
                    <Button size="sm" variant="outline">
                      💌 Send Letters
                    </Button>
                    <Button size="sm" variant="outline">
                      🎁 Send Gifts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="world" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  World Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Year:</span>
                    <span className="font-medium">{worldState.currentYear}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Population:</span>
                    <span className="font-medium">{(worldState.worldPopulation / 1e9).toFixed(1)}B</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Technology Level:</span>
                    <span className="font-medium">{worldState.technologicalLevel}/100</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">Global Peace Index</div>
                  <Progress value={worldState.globalPeaceIndex} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">Environmental Health</div>
                  <Progress value={worldState.environmentalHealth} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Global Economy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Index:</span>
                    <span className="font-medium text-green-600">{economicSystem.stockMarketIndex.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Inflation:</span>
                    <span className="font-medium">{economicSystem.inflationRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Unemployment:</span>
                    <span className="font-medium">{economicSystem.unemployment}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Economic Cycle:</span>
                    <span className="font-medium capitalize">{economicSystem.economicCycle}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Major Powers</div>
                  <div className="flex flex-wrap gap-1">
                    {worldState.majorPowers.map(country => (
                      <Badge key={country} variant="outline" className="text-xs">
                        {country.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  Geographic Regions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {geographicRegions.slice(0, 3).map(region => (
                  <div key={region.id} className="space-y-1">
                    <div className="font-medium text-sm">{region.name}</div>
                    <div className="text-xs text-gray-600">
                      {region.countries.length} countries
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Stability:</span>
                      <span>{region.characteristics.politicalStability}/100</span>
                    </div>
                  </div>
                ))}
                
                <Button size="sm" variant="outline" className="w-full mt-3">
                  🗺️ Explore Regions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Active Global Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 mb-3">
                  Major events affecting the world
                </div>
                
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-1">🌊 Global Climate Summit</div>
                    <div className="text-xs text-gray-600 mb-2">
                      International leaders meeting to discuss climate policy
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Impact: Environmental</span>
                      <span>Duration: 3 months</span>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-1">📈 Tech Market Boom</div>
                    <div className="text-xs text-gray-600 mb-2">
                      Artificial intelligence stocks surge globally
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Impact: Economic</span>
                      <span>Duration: 6 months</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  📰 View All Events
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Event Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 mb-3">
                  Generate random world events
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWorldEvent('political', {})}
                  >
                    🏛️ Political
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWorldEvent('economic', {})}
                  >
                    💰 Economic
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWorldEvent('natural', {})}
                  >
                    🌪️ Natural
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWorldEvent('cultural', {})}
                  >
                    🎭 Cultural
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWorldEvent('technological', {})}
                  >
                    🔬 Tech
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleWorldEvent('random', {})}
                  >
                    🎲 Random
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs font-medium mb-1">Next Scheduled Event:</div>
                  <div className="text-xs text-gray-600">
                    International Trade Conference in 2 months
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorldSystemsHub;
