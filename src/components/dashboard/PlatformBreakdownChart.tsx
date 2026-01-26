import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import type { PlatformBreakdown } from '@/types/dashboard';

interface PlatformBreakdownChartProps {
  data: PlatformBreakdown[];
}

const PLATFORM_COLORS = {
  twitter: 'hsl(185, 100%, 50%)',
  reddit: 'hsl(20, 100%, 55%)',
  youtube: 'hsl(0, 100%, 50%)',
  news: 'hsl(265, 95%, 58%)',
};

export function PlatformBreakdownChart({ data }: PlatformBreakdownChartProps) {
  return (
    <div className="glass glass-border rounded-xl p-5 h-full">
      <h3 className="font-rajdhani font-bold text-lg text-foreground uppercase tracking-wider mb-6">
        Platform Breakdown
      </h3>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(230, 40%, 25%)" 
              horizontal={false}
            />
            <XAxis 
              type="number"
              stroke="hsl(225, 15%, 55%)"
              tick={{ fill: 'hsl(225, 15%, 55%)', fontSize: 11, fontFamily: 'Fira Code' }}
              axisLine={{ stroke: 'hsl(230, 40%, 25%)' }}
            />
            <YAxis 
              type="category"
              dataKey="keyword"
              stroke="hsl(225, 15%, 55%)"
              tick={{ fill: 'hsl(225, 15%, 55%)', fontSize: 11, fontFamily: 'Rajdhani' }}
              axisLine={{ stroke: 'hsl(230, 40%, 25%)' }}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(230, 50%, 12%)', 
                border: '1px solid hsl(185, 100%, 50%, 0.3)',
                borderRadius: '8px',
                fontFamily: 'Rajdhani',
                boxShadow: '0 0 20px hsl(185, 100%, 50%, 0.2)'
              }}
              labelStyle={{ color: 'hsl(185, 100%, 50%)', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(230, 40%, 94%)' }}
              cursor={{ fill: 'hsl(185, 100%, 50%, 0.05)' }}
            />
            <Legend 
              wrapperStyle={{ fontFamily: 'Rajdhani', fontSize: 12 }}
              iconType="circle"
            />
            <Bar dataKey="twitter" name="Twitter" fill={PLATFORM_COLORS.twitter} radius={[0, 4, 4, 0]} />
            <Bar dataKey="reddit" name="Reddit" fill={PLATFORM_COLORS.reddit} radius={[0, 4, 4, 0]} />
            <Bar dataKey="youtube" name="YouTube" fill={PLATFORM_COLORS.youtube} radius={[0, 4, 4, 0]} />
            <Bar dataKey="news" name="News" fill={PLATFORM_COLORS.news} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
