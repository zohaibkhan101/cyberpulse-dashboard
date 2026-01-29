import { TrendingUp, TrendingDown, Hash, Twitter, MessageSquare, Youtube, Newspaper } from 'lucide-react';
import type { TrendKeyword, Platform } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KeywordsListProps {
  keywords: TrendKeyword[];
}

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const icons = {
    twitter: <Twitter className="h-3 w-3" />,
    reddit: <MessageSquare className="h-3 w-3" />,
    youtube: <Youtube className="h-3 w-3" />,
    news: <Newspaper className="h-3 w-3" />,
  };
  return icons[platform];
};

export function KeywordsList({ keywords }: KeywordsListProps) {
  return (
    <div className="glass glass-border rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-rajdhani font-bold text-lg text-foreground uppercase tracking-wider">
          Pakistan Trends
        </h3>
        <span className="font-fira text-xs text-muted-foreground">
          Regional Top 20
        </span>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {keywords.map((keyword, index) => (
            <div
              key={keyword.id}
              className={cn(
                "group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-pointer",
                "hover:bg-primary/5 hover:border-primary/30 border border-transparent"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Rank */}
              <div className={cn(
                "flex items-center justify-center w-7 h-7 rounded-lg font-orbitron text-sm font-bold",
                index < 3
                  ? "bg-primary/20 text-primary"
                  : "bg-muted/30 text-muted-foreground"
              )}>
                {index + 1}
              </div>

              {/* Keyword Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-rajdhani font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {keyword.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {keyword.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="text-muted-foreground/60"
                      title={platform}
                    >
                      <PlatformIcon platform={platform} />
                    </span>
                  ))}
                  <span className="font-fira text-xs text-muted-foreground ml-1">
                    {keyword.mentions.toLocaleString()} mentions
                  </span>
                </div>
              </div>

              {/* Score & Growth */}
              <div className="text-right shrink-0">
                <div className="font-orbitron text-sm font-bold text-foreground">
                  {keyword.score.toFixed(1)}
                </div>
                <div className={cn(
                  "flex items-center gap-1 font-fira text-xs font-medium",
                  keyword.growth >= 0 ? "text-success" : "text-destructive"
                )}>
                  {keyword.growth >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {keyword.growth >= 0 ? '+' : ''}{keyword.growth}%
                </div>
              </div>

              {/* Sentiment Indicator */}
              <div className={cn(
                "w-2 h-8 rounded-full",
                keyword.sentiment > 0.2 ? "bg-success/60" :
                  keyword.sentiment < -0.2 ? "bg-destructive/60" : "bg-muted-foreground/40"
              )} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
