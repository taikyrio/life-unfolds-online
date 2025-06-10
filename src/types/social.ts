export interface SocialMediaAccount {
  platform: 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube';
  username: string;
  followers: number;
  verified: boolean;
  posts: SocialMediaPost[];
  monthlyIncome: number;
  monetized: boolean;
  engagement?: number;
}

export interface SocialMediaPost {
  id: string;
  platform: string;
  content: string;
  likes: number;
  shares: number;
  comments: number;
  timestamp: string;
  datePosted: string;
  type: 'text' | 'image' | 'video';
}

export interface RealEstateProperty {
  id: string;
  type: 'house' | 'apartment' | 'condo' | 'mansion' | 'commercial';
  address: string;
  purchasePrice: number;
  currentValue: number;
  monthlyPayment: number;
  owned: boolean;
  mortgage?: {
    remaining: number;
    monthlyPayment: number;
    interestRate: number;
  };
}
