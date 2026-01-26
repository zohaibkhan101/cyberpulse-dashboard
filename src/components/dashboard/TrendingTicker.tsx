import { TrendingUp, Flame, Zap } from 'lucide-react';
import type { TrendKeyword } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface TrendingTickerProps {
  trends: TrendKeyword[];
}

export function TrendingTicker({ trends }: TrendingTickerProps) {
  const topTrends = trends.slice(0, 10);
  const duplicatedTrends = [...topTrends, ...topTrends]; // Duplicate for seamless loop

  return (
    <div className="glass glass-border rounded-xl p-4 overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2 text-primary">
          <Flame className="h-5 w-5 animate-pulse" />
          <span className="font-rajdhani font-bold text-sm uppercase tracking-wider">
            Trending Now
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-10" />
        
        <div className="flex gap-6 animate-ticker">
          {duplicatedTrends.map((trend, index) => (
            <div
              key={`${trend.id}-${index}`}
              className="flex items-center gap-2 shrink-0 group cursor-pointer"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                {trend.growth > 100 ? (
                  <Flame className="h-3.5 w-3.5" />
                ) : (
                  <Zap className="h-3.5 w-3.5" />
                )}
              </span>
              <span className="font-rajdhani font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                {trend.keyword}
              </span>
              <span className={cn(
                "font-fira text-xs font-medium px-2 py-0.5 rounded-full",
                trend.growth >= 0 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              )}>
                {trend.growth >= 0 ? '+' : ''}{trend.growth}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
