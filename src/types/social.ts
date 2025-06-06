
export interface SocialMediaAccount {
  platform: string;
  followers: number;
  verified: boolean;
  username: string;
  posts: any[];
  monthlyIncome: number;
  monetized: boolean;
}

export interface RealEstateProperty {
  id: string;
  type: string;
  value: number;
  location: string;
  address: string;
  currentValue: number;
  owned: boolean;
}
