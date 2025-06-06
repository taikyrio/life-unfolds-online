
import React, { useState } from 'react';
import { Character } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const generateRandomName = () => {
  const names = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Quinn'];
  return names[Math.floor(Math.random() * names.length)];
};

interface SocialMediaHubProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const SocialMediaHub: React.FC<SocialMediaHubProps> = ({
  character,
  onCharacterUpdate
}) => {
  const [platform, setPlatform] = useState<string>('profile');
  const [postText, setPostText] = useState<string>('');
  const [followers, setFollowers] = useState<number>(100);
  const [reputation, setReputation] = useState<number>(50);

  const handlePost = () => {
    if (postText.trim() !== '') {
      // Simulate posting logic
      setPostText('');
      setReputation(reputation + Math.floor(Math.random() * 5) - 2);
      setFollowers(followers + Math.floor(Math.random() * 10) - 5);
    }
  };

  const handleUpdateProfile = () => {
    const newName = generateRandomName();
    onCharacterUpdate({ ...character, name: newName });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Social Media Hub</h2>
        <Badge variant="outline">Influence: {reputation}</Badge>
      </div>

      <Tabs value={platform} onValueChange={setPlatform}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{character.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Followers:</span>
                  <span>{followers}</span>
                </div>
                <Progress value={followers / 10} className="h-2" />
                <Button onClick={handleUpdateProfile} variant="outline">
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's on your mind?"
                className="mb-2"
              />
              <Button onClick={handlePost} variant="outline">
                Post
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Now</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No trending topics available.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

