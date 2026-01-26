import { useState, useEffect, useCallback } from 'react';
import { Database, TrendingUp, Heart, Layers } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { TrendingTicker } from '@/components/dashboard/TrendingTicker';
import { SentimentGauge } from '@/components/dashboard/SentimentGauge';
import { TrendVelocityChart } from '@/components/dashboard/TrendVelocityChart';
import { KeywordsList } from '@/components/dashboard/KeywordsList';
import { PlatformBreakdownChart } from '@/components/dashboard/PlatformBreakdownChart';
import { NewsFeed } from '@/components/dashboard/NewsFeed';
import { FilterBar } from '@/components/dashboard/FilterBar';
import { 
  mockKeywords, 
  mockTimeline, 
  mockNews, 
  mockSentiment, 
  mockPlatformBreakdown, 
  mockStats 
} from '@/data/mockData';

const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

const Index = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');
  const [platforms, setPlatforms] = useState(['twitter', 'reddit', 'youtube', 'news']);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [handleRefresh]);

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
          onRefresh={handleRefresh} 
          isRefreshing={isRefreshing} 
        />

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Items Analyzed"
            value={mockStats.totalItems}
            subtitle="across all platforms"
            icon={Database}
            trend={12}
            variant="primary"
          />
          <StatCard
            title="Active Trends"
            value={mockStats.activeTrends}
            subtitle="in the last 24h"
            icon={TrendingUp}
            trend={8}
            variant="secondary"
          />
          <StatCard
            title="Avg Sentiment"
            value={`${(mockStats.avgSentiment * 100).toFixed(0)}%`}
            subtitle="positive overall"
            icon={Heart}
            variant="success"
          />
          <StatCard
            title="Platforms Active"
            value={mockStats.platformsActive}
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
          <div className="lg:col-span-2">
            <TrendingTicker trends={mockKeywords} />
          </div>
          <div>
            <SentimentGauge sentiment={mockSentiment} />
          </div>
        </div>

        {/* Trend Velocity Chart */}
        <div className="mb-6">
          <TrendVelocityChart data={mockTimeline} />
        </div>

        {/* Keywords + Platform Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <KeywordsList keywords={mockKeywords} />
          <PlatformBreakdownChart data={mockPlatformBreakdown} />
        </div>

        {/* News Feed */}
        <NewsFeed news={mockNews} />

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
