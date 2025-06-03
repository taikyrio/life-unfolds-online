
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { socialMediaPlatforms, postTemplates, createSocialMediaAccount, createPost, getAvailablePlatforms, getInfluencerStatus } from '../../systems/socialMediaSystem';

interface SocialMediaTabProps {
  character: Character;
  onSocialMediaAction: (action: string, data: any) => void;
}

export const SocialMediaTab: React.FC<SocialMediaTabProps> = ({ character, onSocialMediaAction }) => {
  const [selectedTab, setSelectedTab] = useState('accounts');
  
  const availablePlatforms = getAvailablePlatforms(character);
  const totalFollowers = character.socialMediaAccounts?.reduce((sum, acc) => sum + acc.followers, 0) || 0;
  const influencerStatus = getInfluencerStatus(totalFollowers);

  const handleCreateAccount = (platform: any) => {
    const newAccount = createSocialMediaAccount(platform, character);
    onSocialMediaAction('create_account', { account: newAccount });
  };

  const handleCreatePost = (accountId: string, template: any) => {
    const account = character.socialMediaAccounts?.find(acc => acc.platform === accountId);
    if (account) {
      const newPost = createPost(account, template, character);
      onSocialMediaAction('create_post', { accountId, post: newPost });
    }
  };

  return (
    <div className="p-4 max-h-screen overflow-y-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 Social Media Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Followers</p>
              <p className="font-medium text-lg">{totalFollowers.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant="outline">{influencerStatus}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Accounts</p>
              <p className="font-medium">{character.socialMediaAccounts?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="font-medium text-green-600">
                ${character.socialMediaAccounts?.reduce((sum, acc) => sum + acc.monthlyIncome, 0) || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="post">Post Content</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          {character.socialMediaAccounts && character.socialMediaAccounts.length > 0 ? (
            character.socialMediaAccounts.map((account) => (
              <Card key={account.platform}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {account.platform === 'instagram' && '📸'}
                    {account.platform === 'tiktok' && '🎵'}
                    {account.platform === 'youtube' && '📺'}
                    {account.platform === 'twitter' && '🐦'}
                    {account.platform === 'facebook' && '👥'}
                    {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                    {account.verified && <Badge variant="default">✓ Verified</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Username</p>
                      <p className="font-medium">@{account.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Followers</p>
                      <p className="font-medium">{account.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Posts</p>
                      <p className="font-medium">{account.posts.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Income</p>
                      <p className="font-medium text-green-600">${account.monthlyIncome}</p>
                    </div>
                  </div>
                  {account.monetized && (
                    <Badge variant="default" className="mt-2">💰 Monetized</Badge>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">No social media accounts yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <h3 className="font-medium mb-2">Available Platforms</h3>
          {availablePlatforms.map((platform) => {
            const hasAccount = character.socialMediaAccounts?.some(acc => acc.platform === platform.id);
            return (
              <Card key={platform.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {platform.id === 'instagram' && '📸'}
                    {platform.id === 'tiktok' && '🎵'}
                    {platform.id === 'youtube' && '📺'}
                    {platform.id === 'twitter' && '🐦'}
                    {platform.id === 'facebook' && '👥'}
                    {platform.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{platform.description}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    Monetization at {platform.monetizationThreshold.toLocaleString()} followers
                  </p>
                  <Button 
                    onClick={() => handleCreateAccount(platform)}
                    disabled={hasAccount}
                    className="w-full"
                  >
                    {hasAccount ? 'Account Created' : 'Create Account'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="post" className="space-y-4">
          {character.socialMediaAccounts && character.socialMediaAccounts.length > 0 ? (
            <>
              <h3 className="font-medium mb-2">Create Content</h3>
              {postTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.category.charAt(0).toUpperCase() + template.category.slice(1)} Post</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3 italic">"{template.content}"</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className="text-xs text-gray-600">Engagement</p>
                        <p className="text-sm">{template.engagementMultiplier}x</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Viral Potential</p>
                        <p className="text-sm">{(template.viralPotential * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {character.socialMediaAccounts.map((account) => (
                        <Button
                          key={account.platform}
                          onClick={() => handleCreatePost(account.platform, template)}
                          variant="outline"
                          className="w-full"
                        >
                          Post to {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-600">Create social media accounts first!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
