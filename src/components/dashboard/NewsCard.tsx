import { ExternalLink, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { NewsItem } from '@/types/dashboard';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

export function NewsCard({ news, index }: NewsCardProps) {
  const getSentimentIcon = () => {
    if (news.sentiment > 0.2) return <TrendingUp className="h-3.5 w-3.5 text-success" />;
    if (news.sentiment < -0.2) return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
    return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block glass glass-border rounded-xl p-4 transition-all duration-300",
        "hover:border-primary/40 hover:shadow-[0_0_20px_hsl(185,100%,50%,0.15)] cursor-pointer",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        {/* Relevance Score */}
        <div className={cn(
          "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-orbitron text-sm font-bold",
          news.relevanceScore >= 90 ? "bg-primary/20 text-primary" :
          news.relevanceScore >= 80 ? "bg-secondary/20 text-secondary" :
          "bg-muted/30 text-muted-foreground"
        )}>
          {news.relevanceScore}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-rajdhani font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {news.title}
          </h4>
          
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="font-inter font-medium text-primary/80">
              {news.source}
            </span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="font-fira">{news.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              {getSentimentIcon()}
            </div>
          </div>
        </div>
        
        {/* External Link */}
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
      </div>
    </a>
  );
}
