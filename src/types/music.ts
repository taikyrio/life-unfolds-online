
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
  lastRelease: Date;
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
