

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

