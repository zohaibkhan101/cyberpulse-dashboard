import type { 
  TrendKeyword, 
  TimelineData, 
  NewsItem, 
  SentimentOverview, 
  PlatformBreakdown, 
  DashboardStats,
  Entity 
} from '@/types/dashboard';

export const mockKeywords: TrendKeyword[] = [
  { id: '1', keyword: 'AI Regulation', score: 98.5, growth: 340, platforms: ['twitter', 'reddit', 'news'], sentiment: 0.2, mentions: 12450, velocity: 85 },
  { id: '2', keyword: 'Climate Summit', score: 87.2, growth: 156, platforms: ['twitter', 'news', 'youtube'], sentiment: 0.5, mentions: 8920, velocity: 72 },
  { id: '3', keyword: 'Quantum Computing', score: 82.1, growth: 89, platforms: ['reddit', 'youtube', 'news'], sentiment: 0.7, mentions: 6780, velocity: 65 },
  { id: '4', keyword: 'Cybersecurity', score: 79.8, growth: 67, platforms: ['twitter', 'reddit', 'news'], sentiment: -0.1, mentions: 5430, velocity: 58 },
  { id: '5', keyword: 'Space Exploration', score: 75.4, growth: 123, platforms: ['twitter', 'youtube', 'reddit'], sentiment: 0.8, mentions: 4890, velocity: 62 },
  { id: '6', keyword: 'Blockchain', score: 71.2, growth: 45, platforms: ['twitter', 'reddit'], sentiment: 0.1, mentions: 4210, velocity: 48 },
  { id: '7', keyword: 'Electric Vehicles', score: 68.9, growth: 78, platforms: ['twitter', 'news', 'youtube'], sentiment: 0.6, mentions: 3890, velocity: 55 },
  { id: '8', keyword: 'Renewable Energy', score: 65.3, growth: 92, platforms: ['news', 'reddit'], sentiment: 0.7, mentions: 3450, velocity: 52 },
  { id: '9', keyword: 'Data Privacy', score: 62.1, growth: 34, platforms: ['twitter', 'reddit', 'news'], sentiment: -0.3, mentions: 2980, velocity: 41 },
  { id: '10', keyword: 'Machine Learning', score: 58.7, growth: 56, platforms: ['reddit', 'youtube'], sentiment: 0.5, mentions: 2650, velocity: 46 },
  { id: '11', keyword: '5G Networks', score: 54.2, growth: 28, platforms: ['twitter', 'news'], sentiment: 0.3, mentions: 2340, velocity: 38 },
  { id: '12', keyword: 'Metaverse', score: 51.8, growth: -12, platforms: ['twitter', 'youtube', 'reddit'], sentiment: -0.1, mentions: 2120, velocity: 32 },
  { id: '13', keyword: 'Healthcare AI', score: 48.5, growth: 67, platforms: ['news', 'reddit'], sentiment: 0.6, mentions: 1890, velocity: 44 },
  { id: '14', keyword: 'Autonomous Vehicles', score: 45.2, growth: 41, platforms: ['twitter', 'youtube', 'news'], sentiment: 0.4, mentions: 1670, velocity: 39 },
  { id: '15', keyword: 'Cloud Computing', score: 42.8, growth: 23, platforms: ['reddit', 'news'], sentiment: 0.5, mentions: 1450, velocity: 35 },
  { id: '16', keyword: 'IoT Security', score: 39.4, growth: 55, platforms: ['twitter', 'reddit'], sentiment: -0.2, mentions: 1280, velocity: 42 },
  { id: '17', keyword: 'Green Tech', score: 36.1, growth: 88, platforms: ['news', 'youtube'], sentiment: 0.8, mentions: 1120, velocity: 48 },
  { id: '18', keyword: 'Digital Currency', score: 33.7, growth: -8, platforms: ['twitter', 'reddit', 'news'], sentiment: 0.0, mentions: 980, velocity: 28 },
  { id: '19', keyword: 'AR/VR', score: 30.4, growth: 34, platforms: ['youtube', 'reddit'], sentiment: 0.4, mentions: 850, velocity: 33 },
  { id: '20', keyword: 'Edge Computing', score: 27.8, growth: 45, platforms: ['reddit', 'news'], sentiment: 0.5, mentions: 720, velocity: 36 },
];

export const mockTimeline: TimelineData[] = Array.from({ length: 24 }, (_, i) => {
  const hour = new Date();
  hour.setHours(hour.getHours() - (23 - i));
  return {
    hour: hour.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
    'AI Regulation': Math.floor(Math.random() * 500 + 200 + i * 15),
    'Climate Summit': Math.floor(Math.random() * 400 + 150 + i * 10),
    'Quantum Computing': Math.floor(Math.random() * 300 + 100 + i * 8),
    'Cybersecurity': Math.floor(Math.random() * 250 + 80 + i * 6),
    'Space Exploration': Math.floor(Math.random() * 200 + 60 + i * 5),
  };
});

export const mockNews: NewsItem[] = [
  { id: '1', title: 'Breaking: Major AI Regulation Framework Announced by EU Parliament', source: 'TechCrunch', url: 'https://example.com', publishedAt: '2h ago', sentiment: 0.3, relevanceScore: 98 },
  { id: '2', title: 'Climate Summit 2024: World Leaders Commit to Net Zero by 2040', source: 'Reuters', url: 'https://example.com', publishedAt: '3h ago', sentiment: 0.7, relevanceScore: 95 },
  { id: '3', title: 'Quantum Computing Breakthrough: New Chip Achieves 1000 Qubit Milestone', source: 'MIT Technology Review', url: 'https://example.com', publishedAt: '4h ago', sentiment: 0.9, relevanceScore: 92 },
  { id: '4', title: 'Major Cybersecurity Incident Affects Fortune 500 Companies', source: 'The Verge', url: 'https://example.com', publishedAt: '5h ago', sentiment: -0.6, relevanceScore: 89 },
  { id: '5', title: 'SpaceX Announces New Mission to Mars with Human Crew', source: 'Space.com', url: 'https://example.com', publishedAt: '6h ago', sentiment: 0.8, relevanceScore: 87 },
  { id: '6', title: 'Electric Vehicle Sales Surge 45% in Q4 2024', source: 'Bloomberg', url: 'https://example.com', publishedAt: '7h ago', sentiment: 0.6, relevanceScore: 84 },
  { id: '7', title: 'New Data Privacy Laws Take Effect Across Multiple Countries', source: 'Wired', url: 'https://example.com', publishedAt: '8h ago', sentiment: 0.2, relevanceScore: 81 },
  { id: '8', title: 'Renewable Energy Now Powers 40% of Global Electricity', source: 'The Guardian', url: 'https://example.com', publishedAt: '9h ago', sentiment: 0.8, relevanceScore: 78 },
  { id: '9', title: 'Machine Learning Model Predicts Climate Patterns with 99% Accuracy', source: 'Nature', url: 'https://example.com', publishedAt: '10h ago', sentiment: 0.7, relevanceScore: 75 },
  { id: '10', title: 'Healthcare AI Diagnostic Tool Receives FDA Approval', source: 'STAT News', url: 'https://example.com', publishedAt: '11h ago', sentiment: 0.8, relevanceScore: 72 },
];

export const mockSentiment: SentimentOverview = {
  positive: 52,
  neutral: 31,
  negative: 17,
};

export const mockPlatformBreakdown: PlatformBreakdown[] = [
  { keyword: 'AI Regulation', twitter: 4500, reddit: 3200, youtube: 1800, news: 2950 },
  { keyword: 'Climate Summit', twitter: 3800, reddit: 1900, youtube: 2100, news: 1120 },
  { keyword: 'Quantum Computing', twitter: 1200, reddit: 2800, youtube: 1600, news: 1180 },
  { keyword: 'Cybersecurity', twitter: 2400, reddit: 1800, youtube: 450, news: 780 },
  { keyword: 'Space Exploration', twitter: 2100, reddit: 1400, youtube: 980, news: 410 },
];

export const mockStats: DashboardStats = {
  totalItems: 48750,
  activeTrends: 156,
  avgSentiment: 0.42,
  platformsActive: 4,
};

export const mockEntities: Entity[] = [
  { id: '1', name: 'Elon Musk', type: 'person', mentions: 3240, sentiment: 0.1 },
  { id: '2', name: 'OpenAI', type: 'organization', mentions: 2890, sentiment: 0.6 },
  { id: '3', name: 'European Union', type: 'organization', mentions: 2450, sentiment: 0.3 },
  { id: '4', name: 'United States', type: 'location', mentions: 2180, sentiment: 0.2 },
  { id: '5', name: 'Google', type: 'organization', mentions: 1920, sentiment: 0.5 },
];
