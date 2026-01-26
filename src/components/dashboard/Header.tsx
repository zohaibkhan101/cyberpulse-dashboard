import { Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  lastUpdate: Date;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function Header({ lastUpdate, onRefresh, isRefreshing }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 animate-pulse" />
          <div className="relative flex items-center gap-3 glass glass-border rounded-lg px-4 py-2">
            <Activity className="h-6 w-6 text-primary animate-pulse" />
            <h1 className="font-orbitron text-2xl font-bold gradient-text">
              TREND INTELLIGENCE HUB
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2 glass glass-border rounded-full px-3 py-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span className="font-rajdhani text-sm font-semibold text-success uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground font-inter">Last Update</p>
          <p className="font-fira text-sm text-foreground">
            {lastUpdate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit',
              hour12: false 
            })}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="glass glass-border border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="font-rajdhani font-semibold">Refresh</span>
        </Button>
      </div>
    </header>
  );
}
