
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Character } from '../types/character';
import { AdvancedCareerPath, getEligiblePaths } from '../systems/advancedLifePaths';
import { Star, Trophy, Target } from 'lucide-react';

interface AdvancedLifePathsPanelProps {
  character: Character;
  onSelectPath: (pathId: string) => void;
}

export const AdvancedLifePathsPanel: React.FC<AdvancedLifePathsPanelProps> = ({
  character,
  onSelectPath
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const eligiblePaths = getEligiblePaths(character);
  const categories = ['all', 'military', 'entertainment', 'sports', 'entrepreneurship'];

  const filteredPaths = selectedCategory === 'all' 
    ? eligiblePaths 
    : eligiblePaths.filter(path => path.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'military': return '🪖';
      case 'entertainment': return '🎬';
      case 'sports': return '⚽';
      case 'entrepreneurship': return '💼';
      default: return '🌟';
    }
  };

  const getRequirementStatus = (path: AdvancedCareerPath) => {
    const req = path.requirements;
    const meetsAge = !req.age || character.age >= req.age;
    const meetsStats = !req.stats || Object.entries(req.stats).every(([stat, value]) => 
      character[stat as keyof Character] >= value);
    
    return { meetsAge, meetsStats, eligible: meetsAge && meetsStats };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Advanced Life Paths</h2>
        <p className="text-muted-foreground">Specialized career tracks with unique progression systems</p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryIcon(category)} {category === 'all' ? 'All' : category}
          </Button>
        ))}
      </div>

      {/* Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPaths.map(path => {
          const status = getRequirementStatus(path);
          
          return (
            <Card key={path.id} className={`${status.eligible ? 'border-green-500' : 'opacity-70'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{path.icon}</span>
                    <div>
                      <CardTitle className="text-xl">{path.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {path.category}
                      </Badge>
                    </div>
                  </div>
                  {status.eligible && <Star className="w-6 h-6 text-yellow-500" />}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{path.description}</p>
                
                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Requirements:</h4>
                  {path.requirements.age && (
                    <div className="flex justify-between text-xs">
                      <span>Minimum Age:</span>
                      <span className={status.meetsAge ? 'text-green-600' : 'text-red-600'}>
                        {path.requirements.age} {status.meetsAge ? '✓' : '✗'}
                      </span>
                    </div>
                  )}
                  {path.requirements.stats && Object.entries(path.requirements.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between text-xs">
                      <span>{stat}:</span>
                      <span className={character[stat as keyof Character] >= value ? 'text-green-600' : 'text-red-600'}>
                        {value}+ {character[stat as keyof Character] >= value ? '✓' : '✗'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Career Stages Preview */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Career Progression:</h4>
                  <div className="space-y-1">
                    {path.stages.slice(0, 3).map((stage, index) => (
                      <div key={stage.id} className="flex items-center gap-2 text-xs">
                        <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span>{stage.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          ${stage.salary}k
                        </Badge>
                      </div>
                    ))}
                    {path.stages.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{path.stages.length - 3} more stages...
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Special Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.unlocks.slice(0, 3).map(unlock => (
                      <Badge key={unlock} variant="outline" className="text-xs">
                        {unlock.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  disabled={!status.eligible}
                  onClick={() => onSelectPath(path.id)}
                >
                  {status.eligible ? 'Begin Path' : 'Requirements Not Met'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredPaths.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Paths Available</h3>
          <p className="text-muted-foreground">
            {selectedCategory === 'all' 
              ? "You don't meet the requirements for any advanced paths yet. Keep developing your character!"
              : `No ${selectedCategory} paths available. Try a different category or improve your stats.`
            }
          </p>
        </div>
      )}
    </div>
  );
};
