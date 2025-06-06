
export interface Artist {
  id: string;
  name: string;
  genre: string;
  members: string[];
  fans: number;
  records: Record[];
  tours: any[];
  disbanded: boolean;
}

export interface Record {
  id: string;
  name: string;
  tracks: string[];
  productionTime: number;
  releaseDate: Date;
  sales: number;
  certified: boolean;
  inProduction: boolean;
  earnings: number;
}

export interface MusicCareer {
  artistName: string;
  genre: string;
  recordLabel: string | null;
  albumsSold: number;
  fanBase: number;
  reputation: number;
  currentAlbum: string | null;
  totalEarnings: number;
  awards: string[];
  lastRelease: string | null;
  isActive: boolean;
  level?: number;
  fans?: number;
  albums?: number;
  singles?: number;
  currentProject?: any;
  earnings?: number;
  artists?: Artist[];
  studioSlots?: number;
  hasMoreStudioTime?: boolean;
}

export interface Album {
  title: string;
  genre: string;
  releaseDate: Date;
  salesTarget: number;
  actualSales: number;
  criticalRating: number;
  publicRating: number;
  cost: number;
  earnings: number;
}

export interface RecordLabel {
  name: string;
  prestige: number;
  royaltyRate: number;
  advanceAmount: number;
  marketingBudget: number;
  requirements: {
    minFanBase: number;
    minReputation: number;
  };
}
