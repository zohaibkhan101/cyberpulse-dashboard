import { Newspaper } from 'lucide-react';
import type { NewsItem } from '@/types/dashboard';
import { NewsCard } from './NewsCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NewsFeedProps {
  news: NewsItem[];
}

export function NewsFeed({ news }: NewsFeedProps) {
  return (
    <div className="glass glass-border rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <Newspaper className="h-5 w-5 text-primary" />
        <h3 className="font-rajdhani font-bold text-lg text-foreground uppercase tracking-wider">
          Top News Headlines
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
      </div>
      
      <ScrollArea className="h-[320px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pr-4">
          {news.map((item, index) => (
            <NewsCard key={item.id} news={item} index={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
