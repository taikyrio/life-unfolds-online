
export interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements?: {
    minAge?: number;
    maxAge?: number;
    minWealth?: number;
  };
}

export interface ActivityOption {
  id: string;
  title: string;
  description: string;
  emoji: string;
  minAge?: number;
  maxAge?: number;
  minWealth?: number;
  requiresPartner?: boolean;
}

export interface ActivityCategory {
  id: string;
  title: string;
  emoji: string;
  activities: ActivityOption[];
}
