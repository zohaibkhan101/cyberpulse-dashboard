export interface TrendKeyword {
  id: string;
  keyword: string;
  score: number;
  growth: number;
  platforms: Platform[];
  sentiment: number;
  mentions: number;
  velocity: number;
}

export type Platform = 'twitter' | 'reddit' | 'youtube' | 'news';

export interface TimelineData {
  hour: string;
  [key: string]: string | number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  sentiment: number;
  relevanceScore: number;
}

export interface SentimentOverview {
  positive: number;
  neutral: number;
  negative: number;
}

export interface PlatformBreakdown {
  keyword: string;
  twitter: number;
  reddit: number;
  youtube: number;
  news: number;
}

export interface DashboardStats {
  totalItems: number;
  activeTrends: number;
  avgSentiment: number;
  platformsActive: number;
}

export interface Entity {
  id: string;
  name: string;
  type: 'person' | 'organization' | 'location';
  mentions: number;
  sentiment: number;
}
