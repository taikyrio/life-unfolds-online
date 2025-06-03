
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Character } from '../../types/game';
import { reputationManager } from '../../systems/reputationSystem';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  TrendingUp, 
  Camera, 
  Video,
  Users,
  DollarSign,
  Zap,
  Star
} from 'lucide-react';

interface SocialMediaHubProps {
  character: Character;
  onAction: (action: string, data?: any) => void;
}

interface SocialPost {
  id: string;
  platform: 'instagram' | 'twitter' | 'youtube' | 'tiktok';
  content: string;
  type: 'text' | 'image' | 'video' | 'story';
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement: number;
  timestamp: Date;
  viral: boolean;
}

interface SocialPlatform {
  name: string;
  followers: number;
  verified: boolean;
  engagement: number;
  monetized: boolean;
  recentGrowth: number;
}

export const SocialMediaHub: React.FC<SocialMediaHubProps> = ({ 
  character, 
  onAction 
}) => {
  const [platforms, setPlatforms] = useState<{ [key: string]: SocialPlatform }>({
    instagram: { name: 'Instagram', followers: 0, verified: false, engagement: 0, monetized: false, recentGrowth: 0 },
    twitter: { name: 'Twitter', followers: 0, verified: false, engagement: 0, monetized: false, recentGrowth: 0 },
    youtube: { name: 'YouTube', followers: 0, verified: false, engagement: 0, monetized: false, recentGrowth: 0 },
    tiktok: { name: 'TikTok', followers: 0, verified: false, engagement: 0, monetized: false, recentGrowth: 0 }
  });
  
  const [recentPosts, setRecentPosts] = useState<SocialPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [postType, setPostType] = useState<'text' | 'image' | 'video'>('text');

  const createPost = () => {
    if (!newPostContent.trim()) return;

    const platform = platforms[selectedPlatform];
    const baseReach = Math.min(platform.followers, 1000);
    const viralChance = (character.looks + character.smarts + Math.random() * 50) / 200;
    const isViral = viralChance > 0.8;
    
    const post: SocialPost = {
      id: `post_${Date.now()}`,
      platform: selectedPlatform as any,
      content: newPostContent,
      type: postType,
      likes: Math.floor(baseReach * (0.1 + Math.random() * 0.4)),
      comments: Math.floor(baseReach * (0.02 + Math.random() * 0.08)),
      shares: Math.floor(baseReach * (0.01 + Math.random() * 0.05)),
      reach: isViral ? baseReach * (5 + Math.random() * 15) : baseReach,
      engagement: 0,
      timestamp: new Date(),
      viral: isViral
    };

    post.engagement = ((post.likes + post.comments * 2 + post.shares * 3) / post.reach) * 100;

    setRecentPosts(prev => [post, ...prev.slice(0, 9)]);
    setNewPostContent('');

    // Update platform stats
    const followerGrowth = isViral ? Math.floor(post.reach * 0.1) : Math.floor(post.reach * 0.02);
    const updatedPlatforms = { ...platforms };
    updatedPlatforms[selectedPlatform].followers += followerGrowth;
    updatedPlatforms[selectedPlatform].recentGrowth = followerGrowth;
    updatedPlatforms[selectedPlatform].engagement = 
      (updatedPlatforms[selectedPlatform].engagement + post.engagement) / 2;
    
    setPlatforms(updatedPlatforms);

    // Character effects
    const fameGain = isViral ? 15 : 5;
    const happinessGain = post.engagement > 5 ? 10 : 3;
    const moneyEarned = platform.monetized ? Math.floor(post.reach * 0.01) : 0;

    // Add reputation event
    if (isViral) {
      reputationManager.addReputationEvent({
        type: 'positive',
        category: 'public',
        title: 'Viral Social Media Post',
        description: `Your post "${newPostContent.substring(0, 50)}..." went viral!`,
        impact: 20,
        witnesses: post.reach,
        mediaAttention: post.reach > 100000 ? 'national' : 'local',
        decayRate: 0.02
      });
    }

    onAction('social_media_post', {
      fame: fameGain,
      happiness: happinessGain,
      money: moneyEarned,
      viral: isViral,
      platform: selectedPlatform,
      engagement: post.engagement
    });
  };

  const collaborateWithInfluencer = () => {
    const cost = 500;
    if (character.wealth < cost) return;

    const followerGain = 1000 + Math.floor(Math.random() * 5000);
    const selectedPlatformData = platforms[selectedPlatform];
    
    const updatedPlatforms = { ...platforms };
    updatedPlatforms[selectedPlatform].followers += followerGain;
    updatedPlatforms[selectedPlatform].recentGrowth = followerGain;
    
    setPlatforms(updatedPlatforms);

    onAction('influencer_collaboration', {
      cost: -cost,
      fame: 10,
      followers: followerGain,
      platform: selectedPlatform
    });
  };

  const applyForVerification = () => {
    const platformData = platforms[selectedPlatform];
    const verificationCost = 1000;
    
    if (character.wealth < verificationCost || platformData.followers < 10000) return;

    const successChance = Math.min(0.9, (platformData.followers / 100000) + (character.fame / 200));
    const success = Math.random() < successChance;

    if (success) {
      const updatedPlatforms = { ...platforms };
      updatedPlatforms[selectedPlatform].verified = true;
      setPlatforms(updatedPlatforms);

      onAction('verification_success', {
        cost: -verificationCost,
        fame: 20,
        happiness: 15,
        platform: selectedPlatform
      });
    } else {
      onAction('verification_failed', {
        cost: -verificationCost,
        happiness: -5
      });
    }
  };

  const monetizePlatform = () => {
    const platformData = platforms[selectedPlatform];
    
    if (platformData.followers < 1000 || platformData.monetized) return;

    const updatedPlatforms = { ...platforms };
    updatedPlatforms[selectedPlatform].monetized = true;
    setPlatforms(updatedPlatforms);

    onAction('platform_monetized', {
      platform: selectedPlatform,
      happiness: 20,
      income: Math.floor(platformData.followers * 0.01)
    });
  };

  const getTotalFollowers = () => {
    return Object.values(platforms).reduce((total, platform) => total + platform.followers, 0);
  };

  const getAverageEngagement = () => {
    const engagements = Object.values(platforms).map(p => p.engagement).filter(e => e > 0);
    return engagements.length > 0 ? engagements.reduce((a, b) => a + b, 0) / engagements.length : 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📱 Social Media Empire</h1>
        <p className="text-gray-600">Build your online presence and influence</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{getTotalFollowers().toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Followers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{getAverageEngagement().toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {Object.values(platforms).filter(p => p.verified).length}
            </div>
            <div className="text-sm text-gray-600">Verified Accounts</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">
              {Object.values(platforms).filter(p => p.monetized).length}
            </div>
            <div className="text-sm text-gray-600">Monetized Platforms</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="platforms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="create">Create Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(platforms).map(([key, platform]) => (
              <Card key={key} className={`${platform.verified ? 'border-blue-300 bg-blue-50' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {platform.name}
                      {platform.verified && <Badge className="bg-blue-500">✓ Verified</Badge>}
                      {platform.monetized && <Badge className="bg-green-500">💰 Monetized</Badge>}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Followers:</span>
                    <span className="font-semibold">{platform.followers.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Engagement:</span>
                    <span className="font-semibold">{platform.engagement.toFixed(1)}%</span>
                  </div>
                  
                  {platform.recentGrowth > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Recent Growth:</span>
                      <span>+{platform.recentGrowth.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {!platform.verified && platform.followers >= 10000 && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSelectedPlatform(key);
                          applyForVerification();
                        }}
                      >
                        Apply for Verification ($1,000)
                      </Button>
                    )}
                    
                    {!platform.monetized && platform.followers >= 1000 && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setSelectedPlatform(key);
                          monetizePlatform();
                        }}
                      >
                        Enable Monetization
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <select 
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {Object.entries(platforms).map(([key, platform]) => (
                      <option key={key} value={key}>{platform.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <select 
                    value={postType}
                    onChange={(e) => setPostType(e.target.value as any)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="text">Text Post</option>
                    <option value="image">Image Post</option>
                    <option value="video">Video Post</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={createPost} disabled={!newPostContent.trim()}>
                  <Camera className="h-4 w-4 mr-2" />
                  Post Content
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={collaborateWithInfluencer}
                  disabled={character.wealth < 500}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Collaborate ($500)
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {recentPosts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No posts yet. Create your first post!</p>
              ) : (
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className={`p-4 border rounded-lg ${post.viral ? 'border-orange-300 bg-orange-50' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge>{post.platform}</Badge>
                          <Badge variant="outline">{post.type}</Badge>
                          {post.viral && <Badge className="bg-orange-500">🔥 VIRAL</Badge>}
                        </div>
                        <span className="text-xs text-gray-500">
                          {post.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{post.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span>{post.comments.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="h-4 w-4 text-green-500" />
                          <span>{post.shares.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-purple-500" />
                          <span>{post.engagement.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Reach: {post.reach.toLocaleString()}</span>
                          <span>Engagement: {post.engagement.toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.min(100, post.engagement * 2)} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaHub;
