
import React from 'react';
import { Character } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { personalityEvolutionSystem } from '../systems/personalityEvolutionSystem';
import { skillTreeSystem } from '../systems/skillTreeSystem';

interface PersonalitySkillsPanelProps {
  character: Character;
}

export const PersonalitySkillsPanel: React.FC<PersonalitySkillsPanelProps> = ({ character }) => {
  const personalityDescription = personalityEvolutionSystem.getPersonalityDescription(character);
  const availableSkills = skillTreeSystem.getAvailableSkills(character);
  const topSkills = availableSkills
    .filter(skill => skill.level > 0)
    .sort((a, b) => b.level - a.level)
    .slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Personality Panel */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            🧠 Personality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">You are:</span> {personalityDescription}
              </p>
            </div>
            
            {character.personalityTraits && (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(character.personalityTraits)
                  .filter(([_, value]) => value > 60)
                  .slice(0, 6)
                  .map(([trait, value]) => (
                    <div key={trait} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      <span className="text-xs font-medium capitalize">
                        {trait.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {Math.round(value)}
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skills Panel */}
      <Card className="glass-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            ⭐ Skills
            <Badge variant="secondary" className="ml-auto">
              {topSkills.length} developed
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topSkills.length > 0 ? (
            <div className="space-y-3">
              {topSkills.map((skill) => (
                <div key={skill.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.emoji}</span>
                      <span className="font-medium text-sm">{skill.name}</span>
                    </div>
                    <Badge variant="outline">Level {skill.level}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {skill.description}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress to Level {skill.level + 1}</span>
                      <span>{skill.experience}/{skill.experienceToNext}</span>
                    </div>
                    <Progress 
                      value={(skill.experience / skill.experienceToNext) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">🌱</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                No skills developed yet
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Participate in activities to develop skills!
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
