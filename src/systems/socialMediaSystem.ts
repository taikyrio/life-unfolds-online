
import { Character, SocialMediaAccount, SocialMediaPost } from '../types/game';

export interface SocialMediaPlatform {
  id: 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube';
  name: string;
  description: string;
  minAge: number;
  monetizationThreshold: number;
  viralityMultiplier: number;
  baseGrowthRate: number;
}

export interface PostTemplate {
  id: string;
  category: 'lifestyle' | 'career' | 'travel' | 'food' | 'fitness' | 'meme' | 'personal';
  content: string;
  engagementMultiplier: number;
  viralPotential: number;
}

export const socialMediaPlatforms: SocialMediaPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Photo and video sharing platform',
    minAge: 13,
    monetizationThreshold: 10000,
    viralityMultiplier: 1.2,
    baseGrowthRate: 0.05
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Short-form video content',
    minAge: 13,
    monetizationThreshold: 1000,
    viralityMultiplier: 2.0,
    baseGrowthRate: 0.15
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Video content creation',
    minAge: 13,
    monetizationThreshold: 1000,
    viralityMultiplier: 1.5,
    baseGrowthRate: 0.03
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Microblogging and news',
    minAge: 13,
    monetizationThreshold: 5000,
    viralityMultiplier: 1.8,
    baseGrowthRate: 0.04
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Social networking',
    minAge: 13,
    monetizationThreshold: 10000,
    viralityMultiplier: 0.8,
    baseGrowthRate: 0.02
  }
];

export const postTemplates: PostTemplate[] = [
  {
    id: 'daily_life',
    category: 'lifestyle',
    content: 'Just another day in the life! #blessed',
    engagementMultiplier: 1.0,
    viralPotential: 0.1
  },
  {
    id: 'work_achievement',
    category: 'career',
    content: 'Big promotion at work! Dreams do come true! 🎉',
    engagementMultiplier: 1.3,
    viralPotential: 0.2
  },
  {
    id: 'vacation_post',
    category: 'travel',
    content: 'Paradise found! Nothing beats this view 🏖️',
    engagementMultiplier: 1.5,
    viralPotential: 0.3
  },
  {
    id: 'food_pic',
    category: 'food',
    content: 'This meal is absolutely incredible! 😋',
    engagementMultiplier: 1.1,
    viralPotential: 0.15
  },
  {
    id: 'workout_post',
    category: 'fitness',
    content: 'Crushed that workout! No pain, no gain 💪',
    engagementMultiplier: 1.2,
    viralPotential: 0.2
  },
  {
    id: 'funny_meme',
    category: 'meme',
    content: 'When life gives you lemons... make content! 😂',
    engagementMultiplier: 1.8,
    viralPotential: 0.6
  },
  {
    id: 'deep_thoughts',
    category: 'personal',
    content: 'Sometimes you need to slow down and appreciate life...',
    engagementMultiplier: 1.4,
    viralPotential: 0.4
  }
];

export const createSocialMediaAccount = (
  platform: SocialMediaPlatform,
  character: Character
): SocialMediaAccount => {
  const baseUsername = character.name.toLowerCase().replace(/\s+/g, '');
  const randomSuffix = Math.floor(Math.random() * 9999);
  
  return {
    platform: platform.id,
    username: `${baseUsername}${randomSuffix}`,
    followers: Math.floor(Math.random() * 50) + 10, // Start with 10-60 followers
    verified: false,
    monetized: false,
    monthlyIncome: 0,
    posts: []
  };
};

export const createPost = (
  account: SocialMediaAccount,
  template: PostTemplate,
  character: Character
): SocialMediaPost => {
  const platform = socialMediaPlatforms.find(p => p.id === account.platform)!;
  
  // Calculate engagement based on various factors
  const baseEngagement = account.followers * 0.05; // 5% base engagement rate
  const looksFactor = character.looks / 100;
  const fameFactor = character.fame / 100;
  
  const totalEngagement = Math.floor(
    baseEngagement * 
    template.engagementMultiplier * 
    (1 + looksFactor + fameFactor) *
    platform.viralityMultiplier
  );
  
  const likes = Math.floor(totalEngagement * 0.7);
  const shares = Math.floor(totalEngagement * 0.1);
  const comments = Math.floor(totalEngagement * 0.2);
  
  // Check for viral potential
  const viral = Math.random() < template.viralPotential * (1 + fameFactor);
  
  return {
    id: `post_${Date.now()}`,
    content: template.content,
    likes: viral ? likes * 10 : likes,
    shares: viral ? shares * 15 : shares,
    comments: viral ? comments * 8 : comments,
    datePosted: new Date().toISOString(),
    viral
  };
};

export const processMonthlyGrowth = (account: SocialMediaAccount, character: Character): SocialMediaAccount => {
  const platform = socialMediaPlatforms.find(p => p.id === account.platform)!;
  
  // Calculate growth based on activity and stats
  const baseGrowth = account.followers * platform.baseGrowthRate;
  const activityBonus = account.posts.length > 10 ? 1.5 : 1.0;
  const statsBonus = (character.looks + character.fame) / 200;
  
  const newFollowers = Math.floor(baseGrowth * activityBonus * (1 + statsBonus));
  const updatedFollowers = account.followers + newFollowers;
  
  // Check monetization eligibility
  const canMonetize = updatedFollowers >= platform.monetizationThreshold;
  const monthlyIncome = canMonetize ? Math.floor(updatedFollowers * 0.001) : 0;
  
  return {
    ...account,
    followers: updatedFollowers,
    monetized: canMonetize,
    monthlyIncome
  };
};

export const getAvailablePlatforms = (character: Character): SocialMediaPlatform[] => {
  return socialMediaPlatforms.filter(platform => character.age >= platform.minAge);
};

export const calculateSocialMediaIncome = (accounts: SocialMediaAccount[]): number => {
  return accounts.reduce((total, account) => total + account.monthlyIncome, 0);
};

export const getInfluencerStatus = (totalFollowers: number): string => {
  if (totalFollowers < 1000) return 'Beginner';
  if (totalFollowers < 10000) return 'Micro-Influencer';
  if (totalFollowers < 100000) return 'Influencer';
  if (totalFollowers < 1000000) return 'Major Influencer';
  return 'Celebrity';
};
