import { useState, useEffect, useCallback } from 'react';
import { Database, TrendingUp, Heart, Layers } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrendingTicker } from '@/components/dashboard/TrendingTicker';
import { SentimentGauge } from '@/components/dashboard/SentimentGauge';
import { TweetsSentimentGauge } from '@/components/dashboard/TweetsSentimentGauge';
import { KeywordsList } from '@/components/dashboard/KeywordsList';
import { PlatformBreakdownChart } from '@/components/dashboard/PlatformBreakdownChart';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { TopNegativeTweetsFeed } from '@/components/dashboard/TopNegativeTweetsFeed';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { api } from '@/services/api';
import type {
  TrendKeyword,
  TimelineData,
  NewsItem,
  SentimentOverview,
  PlatformBreakdown,
  DashboardStats
} from '@/types/dashboard';

const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

const Index = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [platforms, setPlatforms] = useState(['twitter', 'reddit', 'youtube', 'news']);

  // State for data
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    activeTrends: 0,
    avgSentiment: 0,
    platformsActive: 0
  });
  const [keywords, setKeywords] = useState<TrendKeyword[]>([]);
  const [timeline, setTimeline] = useState<TimelineData[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [sentiment, setSentiment] = useState<SentimentOverview>({ positive: 0, neutral: 0, negative: 0 });
  const [platformData, setPlatformData] = useState<PlatformBreakdown[]>([]);

  const fetchData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const [
        statsData,
        trendsData,
        timelineData,
        newsData,
        sentimentData,
        platformData
      ] = await Promise.all([
        api.getStats(),
        api.getTrends(),
        api.getTimeline(),
        api.getTopNews(),
        api.getSentiment(),
        api.getPlatformBreakdown()
      ]);

      setStats(statsData);
      setKeywords(trendsData);
      setTimeline(timelineData);
      setNews(newsData);
      setSentiment(sentimentData);
      setPlatformData(platformData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-background bg-cyber-grid">
      {/* Overlay scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent h-[2px] animate-scan" />
      </div>

      <div className="container mx-auto px-4 pb-8">
        {/* Header */}
        <Header
          lastUpdate={lastUpdate}
          onRefresh={fetchData}
          isRefreshing={isRefreshing}
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Items Analyzed"
            value={stats.totalItems}
            subtitle="across all platforms"
            icon={Database}
            trend={12} // hardcoded trend for now, or calc from prev stats
            variant="primary"
          />
          <StatCard
            title="Active Trends"
            value={stats.activeTrends}
            subtitle="in the last 24h"
            icon={TrendingUp}
            trend={8}
            variant="secondary"
          />
          <StatCard
            title="Avg Sentiment"
            value={`${(stats.avgSentiment * 100).toFixed(0)}%`}
            subtitle="positive overall"
            icon={Heart}
            variant="success"
          />
          <StatCard
            title="Platforms Active"
            value={stats.platformsActive}
            subtitle="data sources connected"
            icon={Layers}
            variant="default"
          />
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            platforms={platforms}
            onPlatformsChange={setPlatforms}
          />
        </div>

        {/* Trending Ticker + Sentiment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <TrendingTicker trends={keywords} />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SentimentGauge sentiment={sentiment} />
            <TweetsSentimentGauge sentiment={sentiment} />
          </div>
        </div>

        {/* Keywords + Platform Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <KeywordsList keywords={keywords} />
          <PlatformBreakdownChart data={platformData} />
        </div>

        {/* News Feed */}
        <div className="mb-6">
          <TopNegativeTweetsFeed />
        </div>
        <NewsFeed news={news} />

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="font-inter text-xs text-muted-foreground">
            Trend Intelligence Hub • Real-time multi-platform analysis
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
