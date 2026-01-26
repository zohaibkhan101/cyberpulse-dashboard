import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: number;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

const variantStyles = {
  default: 'border-border/50',
  primary: 'border-primary/30',
  secondary: 'border-secondary/30',
  success: 'border-success/30',
  warning: 'border-warning/30',
};

const iconVariants = {
  default: 'text-muted-foreground',
  primary: 'text-primary',
  secondary: 'text-secondary',
  success: 'text-success',
  warning: 'text-warning',
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default' 
}: StatCardProps) {
  return (
    <div className={cn(
      "glass glass-border rounded-xl p-5 cyber-glow-hover transition-all duration-300",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-rajdhani font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-orbitron text-3xl font-bold text-foreground animate-count">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {trend !== undefined && (
              <span className={cn(
                "font-fira text-sm font-medium",
                trend >= 0 ? "text-success" : "text-destructive"
              )}>
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground font-inter">
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg bg-muted/30",
          iconVariants[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
