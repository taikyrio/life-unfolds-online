
export interface Artist {
  id: string;
  name: string;
  genre: string;
  members: number;
  fans: number;
  records: Record[];
  tours: Tour[];
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

export interface Tour {
  id: string;
  name: string;
  year: number;
  earnings: number;
  fansGained: number;
}

export interface MusicCareer {
  level: number;
  fans: number;
  albums: number;
  singles: number;
  reputation: number;
  currentProject: string | null;
  lastRelease: Date | null;
  earnings: number;
  artists: Artist[];
  studioSlots: number;
  hasMoreStudioTime: boolean;
}
