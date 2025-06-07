
export interface Artist {
  id: string;
  name: string;
  genre: string;
  members: number;
  fans: number;
  records: Record[];
  tours: any[];
  disbanded: boolean;
}

export interface Record {
  id: string;
  name: string;
  tracks: number;
  productionTime: number;
  releaseDate: Date;
  sales: number;
  certified: boolean;
  inProduction: boolean;
  earnings: number;
}

export interface MusicCareer {
  level: number;
  fans: number;
  albums: number;
  singles: number;
  reputation: number;
  currentProject: string | null;
  lastRelease: string | null;
  earnings: number;
  artists: Artist[];
  studioSlots: number;
  hasMoreStudioTime: boolean;
  artistName: string;
  genre: string;
  recordLabel: string;
  albumsSold: number;
  tourRevenue: number;
  fanBase: number;
  currentAlbum: string | null;
  totalEarnings: number;
  awards: string[];
  isActive: boolean;
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
