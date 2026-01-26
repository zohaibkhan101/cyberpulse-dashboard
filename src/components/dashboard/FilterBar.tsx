import { Calendar, Twitter, MessageSquare, Youtube, Newspaper, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  platforms: string[];
  onPlatformsChange: (platforms: string[]) => void;
}

export function FilterBar({ 
  timeRange, 
  onTimeRangeChange, 
  platforms, 
  onPlatformsChange 
}: FilterBarProps) {
  const timeRanges = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
  ];

  const platformOptions = [
    { value: 'twitter', icon: Twitter, label: 'Twitter' },
    { value: 'reddit', icon: MessageSquare, label: 'Reddit' },
    { value: 'youtube', icon: Youtube, label: 'YouTube' },
    { value: 'news', icon: Newspaper, label: 'News' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 glass glass-border rounded-xl p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="font-rajdhani font-semibold text-sm uppercase tracking-wider">
          Filters
        </span>
      </div>
      
      <div className="h-6 w-px bg-border" />
      
      {/* Time Range */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <div className="flex gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant="ghost"
              size="sm"
              onClick={() => onTimeRangeChange(range.value)}
              className={cn(
                "font-rajdhani font-semibold h-7 px-3",
                timeRange === range.value 
                  ? "bg-primary/20 text-primary hover:bg-primary/30" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-6 w-px bg-border" />
      
      {/* Platform Toggles */}
      <ToggleGroup 
        type="multiple" 
        value={platforms}
        onValueChange={onPlatformsChange}
        className="gap-1"
      >
        {platformOptions.map((platform) => (
          <ToggleGroupItem
            key={platform.value}
            value={platform.value}
            aria-label={`Toggle ${platform.label}`}
            className={cn(
              "h-8 px-3 data-[state=on]:bg-primary/20 data-[state=on]:text-primary",
              "hover:bg-muted/50 transition-all duration-200"
            )}
          >
            <platform.icon className="h-4 w-4" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
