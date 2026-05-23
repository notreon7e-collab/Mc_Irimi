export type View = 'HOME' | 'MARKETPLACE' | 'SELL' | 'DETAILS' | 'SUPPORT';

export interface AccountStats {
  winRate: number;
  heroesCount: number;
  skinsCount: number;
  maxEmblems: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  rank: string;
  stats: AccountStats;
  isVerified: boolean;
  featuredImageUrl: string;
  galleryUrls: string[];
  description: string;
  rareSkins: string[];
  rating?: number;
  reviews?: Review[];
  sellerPhone?: string;
  sellerWhatsapp?: string;
}
