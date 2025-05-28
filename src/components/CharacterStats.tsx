
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Character } from '../types/game';
import { getStatColor, getStatEmoji, getLifeStage, formatSalary, getMonthName } from '../utils/gameUtils';
import { FamilyMember } from './FamilyMember';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CharacterStatsProps {
  character: Character;
}

export const CharacterStats: React.FC<CharacterStatsProps> = ({ character }) => {
  const [activeSection, setActiveSection] = useState<'stats' | 'family' | 'info'>('stats');

  const mainStats = [
    { name: 'Health', value: character.health, key: 'health' },
    { name: 'Happiness', value: character.happiness, key: 'happiness' },
    { name: 'Smarts', value: character.smarts, key: 'smarts' },
    { name: 'Looks', value: character.looks, key: 'looks' },
  ];

  const secondaryStats = [
    { name: 'Wealth', value: Math.min(character.wealth, 100), key: 'wealth', display: `$${character.wealth}` },
    { name: 'Relationships', value: character.relationships, key: 'relationships' },
    { name: 'Fame', value: character.fame, key: 'fame' },
  ];

  const aliveFamilyMembers = character.familyMembers.filter(member => member.alive);
  const deceasedFamilyMembers = character.familyMembers.filter(member => !member.alive);

  return (
    <div className="space-y-4">
      <Card className="animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg font-bold text-game-text flex items-center gap-2">
            👤 {character.name}
          </CardTitle>
          
          {/* Mobile-optimized navigation tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeSection === 'stats' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('stats')}
              className="flex-1 text-xs h-8"
            >
              📊 Stats
            </Button>
            <Button
              variant={activeSection === 'family' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('family')}
              className="flex-1 text-xs h-8"
            >
              👨‍👩‍👧‍👦 Family
            </Button>
            <Button
              variant={activeSection === 'info' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('info')}
              className="flex-1 text-xs h-8"
            >
              ℹ️ Info
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {activeSection === 'stats' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Main Stats</h4>
                {mainStats.map((stat) => (
                  <div key={stat.key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-game-text flex items-center gap-2 text-xs sm:text-sm">
                        {getStatEmoji(stat.key, stat.value)} {stat.name}
                      </span>
                      <span className={`font-bold text-xs sm:text-sm ${getStatColor(stat.value)}`}>
                        {stat.value}
                      </span>
                    </div>
                    <Progress value={stat.value} className="h-1.5" />
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Life Stats</h4>
                {secondaryStats.map((stat) => (
                  <div key={stat.key} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-game-text flex items-center gap-2 text-xs sm:text-sm">
                        {getStatEmoji(stat.key, stat.value)} {stat.name}
                      </span>
                      <span className={`font-bold text-xs sm:text-sm ${getStatColor(stat.value)}`}>
                        {stat.display || stat.value}
                      </span>
                    </div>
                    <Progress value={stat.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'family' && (
            <div className="space-y-3">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {aliveFamilyMembers.length > 0 ? (
                    <>
                      <h4 className="font-semibold text-sm text-gray-700 sticky top-0 bg-white">Family ({aliveFamilyMembers.length})</h4>
                      {aliveFamilyMembers.map((member) => (
                        <FamilyMember key={member.id} member={member} className="animate-fade-in" />
                      ))}
                    </>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">No living family members</p>
                  )}
                  
                  {deceasedFamilyMembers.length > 0 && (
                    <>
                      <h4 className="font-semibold text-sm text-gray-700 mt-4 sticky top-0 bg-white">Deceased ({deceasedFamilyMembers.length})</h4>
                      {deceasedFamilyMembers.map((member) => (
                        <FamilyMember key={member.id} member={member} className="opacity-60" />
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}

          {activeSection === 'info' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">📍 Location</span>
                    <span className="font-medium">{character.birthplace}, {character.nationality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">🎂 Age</span>
                    <span className="font-medium">{getLifeStage(character.age)} - {character.age} ({character.year})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{character.zodiacSign.emoji} Zodiac</span>
                    <span className="font-medium">{character.zodiacSign.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">📅 Birthday</span>
                    <span className="font-medium">{getMonthName(character.birthMonth)} {character.birthDay}</span>
                  </div>
                  {character.education && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">🎓 Education</span>
                      <span className="font-medium">{character.education}</span>
                    </div>
                  )}
                  {character.job && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">💼 Career</span>
                      <span className="font-medium">{character.job}</span>
                    </div>
                  )}
                  {character.job && character.salary > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">💰 Salary</span>
                      <span className="font-medium">{formatSalary(character.salary)}</span>
                    </div>
                  )}
                  {character.relationshipStatus !== 'single' && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">💕 Relationship</span>
                      <span className="font-medium capitalize">{character.relationshipStatus}{character.partnerName ? ` - ${character.partnerName}` : ''}</span>
                    </div>
                  )}
                  {character.children.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">👶 Children</span>
                      <span className="font-medium">{character.children.length}</span>
                    </div>
                  )}
                  {character.criminalRecord && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">🚨 Criminal Record</span>
                      <span className="font-medium text-red-600">Yes</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-3">
                  <h5 className="font-semibold text-sm text-gray-700 mb-2">Birth Details</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight at birth:</span>
                      <span>{character.birthWeight.toFixed(1)} lbs</span>
                    </div>
                    {character.premature && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Born premature:</span>
                        <span className="text-orange-600">Yes</span>
                      </div>
                    )}
                    {character.birthComplications && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Birth complications:</span>
                        <span className="text-red-600">Yes</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-3">
                  <h5 className="font-semibold text-sm text-gray-700 mb-2">Zodiac Traits</h5>
                  <div className="flex flex-wrap gap-1">
                    {character.zodiacSign.traits.map((trait, index) => (
                      <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
