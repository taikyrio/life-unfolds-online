
import React, { useState } from 'react';
import { FamilyMember } from '../../../types/game';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, MessageCircle, Gift, Phone, Coffee, 
  Users, Calendar, Smile, Frown, Meh,
  ChevronDown, ChevronUp, Star
} from 'lucide-react';

interface InteractiveRelationshipCardProps {
  member: FamilyMember;
  onAction: (actionId: string, memberId: string) => void;
  characterAge: number;
}

export const InteractiveRelationshipCard: React.FC<InteractiveRelationshipCardProps> = ({
  member,
  onAction,
  characterAge
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastActionTime, setLastActionTime] = useState<number | null>(null);

  const getRelationshipEmoji = (relationship: string) => {
    const emojiMap: Record<string, string> = {
      father: '👨‍🦳', mother: '👩‍🦳', sibling: '👫', child: '👶',
      spouse: '💍', lover: '💕', friend: '👥', bestfriend: '🤝',
      grandparent: '👴', cousin: '👨‍👩‍👧', coworker: '💼'
    };
    return emojiMap[relationship] || '👤';
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, React.ReactNode> = {
      happy: <Smile className="w-4 h-4 text-green-400" />,
      sad: <Frown className="w-4 h-4 text-red-400" />,
      neutral: <Meh className="w-4 h-4 text-gray-400" />
    };
    return moodMap[mood] || <Meh className="w-4 h-4 text-gray-400" />;
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return 'from-green-500 to-green-600';
    if (quality >= 60) return 'from-blue-500 to-blue-600';
    if (quality >= 40) return 'from-yellow-500 to-yellow-600';
    if (quality >= 20) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getAvailableActions = () => {
    const baseActions = [
      { id: 'compliment', label: 'Compliment', icon: Heart, cost: 0 },
      { id: 'spend_time', label: 'Spend Time', icon: Coffee, cost: 20 },
      { id: 'chat', label: 'Chat', icon: MessageCircle, cost: 0 }
    ];

    const relationshipActions = [];

    // Add relationship-specific actions
    if (member.relationship === 'lover') {
      relationshipActions.push(
        { id: 'date_night', label: 'Date Night', icon: Heart, cost: 50 },
        { id: 'propose', label: 'Propose', icon: Star, cost: 500 }
      );
    }

    if (['spouse', 'lover'].includes(member.relationship)) {
      relationshipActions.push(
        { id: 'romantic_gesture', label: 'Romantic Gesture', icon: Gift, cost: 100 }
      );
    }

    if (['friend', 'bestfriend'].includes(member.relationship)) {
      relationshipActions.push(
        { id: 'hang_out', label: 'Hang Out', icon: Users, cost: 30 }
      );
    }

    if (['father', 'mother', 'grandparent'].includes(member.relationship)) {
      relationshipActions.push(
        { id: 'ask_for_money', label: 'Ask for Money', icon: Gift, cost: 0 }
      );
    }

    return [...baseActions, ...relationshipActions];
  };

  const handleAction = (actionId: string) => {
    onAction(actionId, member.id);
    setLastActionTime(Date.now());
    
    // Add visual feedback with haptic-like delay
    setTimeout(() => setLastActionTime(null), 1000);
  };

  const relationshipQuality = member.relationshipQuality || 50;
  const availableActions = getAvailableActions();

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl transition-all duration-300 hover:bg-black/30 hover:scale-[1.01] overflow-hidden">
      {/* Main Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getRelationshipEmoji(member.relationship)}</div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">{member.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm capitalize">{member.relationship}</span>
                {member.age && (
                  <Badge variant="secondary" className="text-xs">
                    Age {member.age}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getMoodEmoji(member.currentMood || 'neutral')}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>
        </div>

        {/* Relationship Quality Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/70 text-xs font-medium">Relationship</span>
            <span className="text-white text-xs font-bold">{relationshipQuality}/100</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getQualityColor(relationshipQuality)} transition-all duration-500 ${lastActionTime ? 'animate-pulse' : ''}`}
              style={{ width: `${relationshipQuality}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          {availableActions.slice(0, 3).map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white border-0 py-2 text-xs transition-all duration-200"
                disabled={lastActionTime !== null}
              >
                <Icon size={14} className="mr-1" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Expanded Actions Panel */}
      {isExpanded && (
        <div className="border-t border-white/10 bg-black/10 p-4 animate-accordion-down">
          <h4 className="text-white font-medium mb-3 text-sm">More Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableActions.slice(3).map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  variant="outline"
                  className="bg-white/5 hover:bg-white/15 text-white border-white/20 text-xs py-2 transition-all duration-200"
                  disabled={lastActionTime !== null}
                >
                  <Icon size={14} className="mr-1" />
                  <span>{action.label}</span>
                  {action.cost > 0 && (
                    <span className="ml-1 text-yellow-400">${action.cost}</span>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Relationship Stats */}
          {member.relationshipStats && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <h5 className="text-white/80 font-medium mb-2 text-xs">Relationship Details</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Trust:</span>
                  <span className="text-white">{member.relationshipStats.trust}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Communication:</span>
                  <span className="text-white">{member.relationshipStats.communication}/100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
