
export interface CareerLevel {
  id: string;
  title: string;
  salary: number;
  requirements: {
    experience?: number;
    age?: number;
    stats?: Record<string, number>;
  };
  promotionChance: number;
}

export interface Career {
  id: string;
  name: string;
  category: string;
  description: string;
  requirements: {
    education?: string;
    age?: number;
    stats?: Record<string, number>;
  };
  levels: CareerLevel[];
  benefits?: {
    health?: number;
    happiness?: number;
    relationships?: number;
  };
}
