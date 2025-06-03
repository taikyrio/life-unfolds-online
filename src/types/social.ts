
export interface SocialMediaAccount {
  platform: 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'youtube';
  username: string;
  followers: number;
  verified: boolean;
  monetized: boolean;
  monthlyIncome: number;
  posts: SocialMediaPost[];
}

export interface SocialMediaPost {
  id: string;
  content: string;
  likes: number;
  shares: number;
  comments: number;
  datePosted: string;
  viral: boolean;
}

export interface RealEstateProperty {
  id: string;
  type: 'house' | 'apartment' | 'condo' | 'mansion' | 'commercial';
  address: string;
  purchasePrice: number;
  currentValue: number;
  monthlyPayment?: number;
  rentIncome?: number;
  owned: boolean;
  mortgage?: {
    remaining: number;
    monthlyPayment: number;
    interestRate: number;
  };
}
