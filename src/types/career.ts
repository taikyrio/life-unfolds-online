
export interface CareerLevel {
  id: string;
  level: number;
  title: string;
  salary: number;
  description: string;
  requirements: {
    yearsExperience?: number;
    performance?: number;
    minStats?: {
      smarts?: number;
      relationships?: number;
      looks?: number;
      health?: number;
    };
  };
  responsibilities: string[];
  benefits: string[];
  promotionChance: number;
  promotionRequirements?: {
    yearsExperience: number;
    performance: number;
    minStats?: {
      smarts?: number;
      relationships?: number;
      looks?: number;
      health?: number;
    };
  };
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: string;
  levels: CareerLevel[];
  requirements: {
    education?: string[];
    minAge?: number;
    minStats?: {
      smarts?: number;
      looks?: number;
      relationships?: number;
      health?: number;
    };
  };
}

export interface Career {
  id: string;
  name: string;
  description: string;
  salary: number;
  category?: string;
  levels?: CareerLevel[];
  requirements?: {
    education?: string;
    minAge?: number;
    minStats?: {
      smarts?: number;
      looks?: number;
      relationships?: number;
      health?: number;
    };
  };
}

export interface MusicArtist {
  id: string;
  name: string;
  genre: string;
  members: number;
  fans: number;
  records: MusicRecord[];
  totalRecordsSold: number;
  totalEarnings: number;
  isActive: boolean;
}

export interface MusicRecord {
  id: string;
  name: string;
  tracks: number;
  productionTime: number;
  releaseDate: string;
  salesTarget: number;
  actualSales: number;
  certified: boolean;
}

export interface Tour {
  id: string;
  name: string;
  artistId: string;
  venues: number;
  earnings: number;
  fanGain: number;
  year: number;
}
