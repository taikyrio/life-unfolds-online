
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Character } from '../../types/game';
import { Badge } from '../ui/badge';
import { 
  Heart, Users, MessageCircle, Gift, 
  Calendar, Phone, Mail, Coffee,
  Star, TrendingUp, AlertCircle
} from 'lucide-react';

interface EnhancedRelationshipsMenuProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const EnhancedRelationshipsMenu: React.FC<EnhancedRelationshipsMenuProps> = ({
  character,
  onCharacterUpdate,
  onEvent
}) => {
  const [selectedTab, setSelectedTab] = useState('family');

  const relationships = character.relationships || [];
  const familyMembers = relationships.filter(r => r.type === 'family');
  const friends = relationships.filter(r => r.type === 'friend');
  const romantic = relationships.filter(r => r.type === 'romantic');

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          💝 Relationships
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Manage your social connections
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <Button
          variant={selectedTab === 'family' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedTab('family')}
          className="text-xs"
        >
          👨‍👩‍👧‍👦 Family
        </Button>
        <Button
          variant={selectedTab === 'friends' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedTab('friends')}
          className="text-xs"
        >
          👥 Friends
        </Button>
        <Button
          variant={selectedTab === 'romantic' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedTab('romantic')}
          className="text-xs"
        >
          💕 Romance
        </Button>
      </div>

      <div className="space-y-3">
        {selectedTab === 'family' && (
          <>
            {familyMembers.length > 0 ? (
              familyMembers.map((member) => (
                <Card key={member.id} className="glass border-white/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👨‍👩‍👧‍👦</span>
                        <div>
                          <h3 className="font-medium text-sm">{member.name}</h3>
                          <p className="text-xs text-gray-600 capitalize">{member.type}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        ❤️ {member.relationshipLevel || 50}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                  <p className="text-sm text-gray-500">No family members yet</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {selectedTab === 'friends' && (
          <>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <Card key={friend.id} className="glass border-white/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👥</span>
                        <div>
                          <h3 className="font-medium text-sm">{friend.name}</h3>
                          <p className="text-xs text-gray-600">Friend</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        🤝 {friend.relationshipLevel || 50}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="text-sm text-gray-500">No friends yet</p>
                  <p className="text-xs text-gray-400 mt-1">Go out and socialize!</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {selectedTab === 'romantic' && (
          <>
            {romantic.length > 0 ? (
              romantic.map((partner) => (
                <Card key={partner.id} className="glass border-white/20">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💕</span>
                        <div>
                          <h3 className="font-medium text-sm">{partner.name}</h3>
                          <p className="text-xs text-gray-600">Partner</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        💖 {partner.relationshipLevel || 50}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="glass border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">💕</div>
                  <p className="text-sm text-gray-500">Single</p>
                  <p className="text-xs text-gray-400 mt-1">Find love through activities!</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};
