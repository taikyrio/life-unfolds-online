
import React from 'react';
import { Character } from '../../types/game';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, Heart, MessageCircle, Share } from 'lucide-react';

interface SocialMediaTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
}

export const SocialMediaTab: React.FC<SocialMediaTabProps> = ({ character, onCharacterUpdate }) => {
  const totalFollowers = character.socialMediaAccounts?.reduce((total, account) => 
    total + (account.followers || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 pb-20">
      <div className="px-3 py-4 space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📱 Social Media</h1>
          <p className="text-gray-600">Build your online presence</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Social Media Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalFollowers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Followers</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{character.socialMediaAccounts?.length || 0}</div>
                <div className="text-sm text-gray-600">Active Accounts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {character.socialMediaAccounts && character.socialMediaAccounts.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Your Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {character.socialMediaAccounts.map((account, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium capitalize">{account.platform}</div>
                    <Badge variant="secondary">@{account.username}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {account.followers?.toLocaleString() || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {account.engagement || 0}%
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {account.posts?.length || 0}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-gray-500 mb-4">No social media accounts</div>
              <p className="text-sm text-gray-400">Create accounts to start building your online presence</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
