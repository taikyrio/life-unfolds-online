
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { MetaProgressionState, Achievement, ChallengeMode } from '../types/metaProgression';
import { Trophy, Star, Target, Award, Zap } from 'lucide-react';

interface MetaProgressionPanelProps {
  metaState: MetaProgressionState;
  onSelectChallenge: (challengeId: string) => void;
}

export const MetaProgressionPanel: React.FC<MetaProgressionPanelProps> = ({
  metaState,
  onSelectChallenge
}) => {
  const [selectedTab, setSelectedTab] = useState('achievements');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-600';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-400';
      case 'platinum': return 'bg-blue-400';
      case 'legendary': return 'bg-purple-500';
      default: return 'bg-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'normal': return 'bg-blue-500';
      case 'hard': return 'bg-orange-500';
      case 'extreme': return 'bg-red-500';
      case 'nightmare': return 'bg-purple-600';
      default: return 'bg-gray-500';
    }
  };

  const unlockedAchievements = metaState.achievements.filter(a => a.unlocked);
  const totalKarma = metaState.lifeKarma.totalKarma;
  const generation = metaState.legacy.generation;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Meta Progression</h2>
        <p className="text-muted-foreground">Track your journey across multiple lives</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{totalKarma}</div>
            <div className="text-sm text-muted-foreground">Total Karma</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{generation}</div>
            <div className="text-sm text-muted-foreground">Generation</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{metaState.totalLifetimePlays}</div>
            <div className="text-sm text-muted-foreground">Lives Played</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="karma">Karma</TabsTrigger>
          <TabsTrigger value="legacy">Legacy</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metaState.achievements.map(achievement => (
              <Card key={achievement.id} className={`${achievement.unlocked ? 'border-green-500 bg-green-50' : 'opacity-60'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{achievement.emoji}</span>
                      <div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <Badge className={`text-xs ${getTierColor(achievement.tier)} text-white`}>
                          {achievement.tier}
                        </Badge>
                      </div>
                    </div>
                    {achievement.unlocked && <Award className="w-6 h-6 text-yellow-500" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  {achievement.unlocked && achievement.dateUnlocked && (
                    <p className="text-xs text-green-600">
                      Unlocked: {new Date(achievement.dateUnlocked).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="karma" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Karma Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(metaState.lifeKarma.karmaByCategory).map(([category, amount]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize">{category}</span>
                    <span className="font-semibold">{amount}</span>
                  </div>
                  <Progress value={(amount / Math.max(1, totalKarma)) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Karma Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {metaState.lifeKarma.karmaHistory.slice(-10).reverse().map(event => (
                  <div key={event.id} className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <div>
                      <p className="text-sm">{event.description}</p>
                      <p className="text-xs text-muted-foreground">Age {event.age} • {event.category}</p>
                    </div>
                    <Badge variant={event.amount > 0 ? 'default' : 'destructive'}>
                      {event.amount > 0 ? '+' : ''}{event.amount}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Family Legacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Generation</span>
                  <div className="text-2xl font-bold">{metaState.legacy.generation}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Family Reputation</span>
                  <div className="text-2xl font-bold">{metaState.legacy.familyReputation}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Unlocked Features</h4>
                <div className="flex flex-wrap gap-2">
                  {metaState.legacy.unlockedFeatures.map(feature => (
                    <Badge key={feature} variant="outline">{feature.replace('_', ' ')}</Badge>
                  ))}
                  {metaState.legacy.unlockedFeatures.length === 0 && (
                    <p className="text-sm text-muted-foreground">No features unlocked yet</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Starting Bonuses</h4>
                <div className="space-y-2">
                  {metaState.legacy.startingBonuses.map(bonus => (
                    <div key={bonus.id} className="p-2 rounded bg-muted/50">
                      <div className="font-medium">{bonus.name}</div>
                      <div className="text-sm text-muted-foreground">{bonus.description}</div>
                    </div>
                  ))}
                  {metaState.legacy.startingBonuses.length === 0 && (
                    <p className="text-sm text-muted-foreground">No bonuses unlocked yet</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metaState.challengeModes.map(challenge => (
              <Card key={challenge.id} className={`${!challenge.unlocked ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{challenge.emoji}</span>
                      <div>
                        <CardTitle className="text-lg">{challenge.name}</CardTitle>
                        <Badge className={`text-xs ${getDifficultyColor(challenge.difficulty)} text-white`}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Goals:</h5>
                    {challenge.goals.map(goal => (
                      <div key={goal.id} className="text-xs text-muted-foreground">
                        • {goal.description}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h5 className="font-semibold text-sm mb-1">Modifiers:</h5>
                    {challenge.modifiers.map((modifier, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        • {modifier.description}
                      </div>
                    ))}
                  </div>

                  {challenge.unlocked && (
                    <Button 
                      className="w-full" 
                      onClick={() => onSelectChallenge(challenge.id)}
                    >
                      Start Challenge
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
