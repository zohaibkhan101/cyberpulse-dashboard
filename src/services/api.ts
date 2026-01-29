
import {
    TrendKeyword,
    TimelineData,
    NewsItem,
    SentimentOverview,
    PlatformBreakdown,
    DashboardStats,
    Entity
} from '@/types/dashboard';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
    },

    getTrends: async (): Promise<TrendKeyword[]> => {
        const response = await fetch(`${API_BASE_URL}/trends/keywords`);
        if (!response.ok) throw new Error('Failed to fetch trends');
        return response.json();
    },

    getTimeline: async (): Promise<TimelineData[]> => {
        const response = await fetch(`${API_BASE_URL}/trends/timeline`);
        if (!response.ok) throw new Error('Failed to fetch timeline');
        return response.json();
    },

    getTopNews: async (): Promise<NewsItem[]> => {
        const response = await fetch(`${API_BASE_URL}/news/top`);
        if (!response.ok) throw new Error('Failed to fetch news');
        return response.json();
    },

    getSentiment: async (): Promise<SentimentOverview> => {
        const response = await fetch(`${API_BASE_URL}/dashboard/sentiment`);
        if (!response.ok) throw new Error('Failed to fetch sentiment');
        return response.json();
    },

    getPlatformBreakdown: async (): Promise<PlatformBreakdown[]> => {
        const response = await fetch(`${API_BASE_URL}/dashboard/platforms`);
        if (!response.ok) throw new Error('Failed to fetch platform breakdown');
        return response.json();
    },

    getEntities: async (): Promise<Entity[]> => {
        const response = await fetch(`${API_BASE_URL}/entities/top`);
        if (!response.ok) throw new Error('Failed to fetch entities');
        return response.json();
    }
};
