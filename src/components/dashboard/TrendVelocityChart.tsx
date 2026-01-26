import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart
} from 'recharts';
import type { TimelineData } from '@/types/dashboard';

interface TrendVelocityChartProps {
  data: TimelineData[];
}

const TREND_COLORS = [
  { stroke: 'hsl(185, 100%, 50%)', fill: 'hsl(185, 100%, 50%)' },
  { stroke: 'hsl(265, 95%, 58%)', fill: 'hsl(265, 95%, 58%)' },
  { stroke: 'hsl(155, 100%, 50%)', fill: 'hsl(155, 100%, 50%)' },
  { stroke: 'hsl(345, 100%, 50%)', fill: 'hsl(345, 100%, 50%)' },
  { stroke: 'hsl(45, 100%, 50%)', fill: 'hsl(45, 100%, 50%)' },
];

const TREND_KEYS = ['AI Regulation', 'Climate Summit', 'Quantum Computing', 'Cybersecurity', 'Space Exploration'];

export function TrendVelocityChart({ data }: TrendVelocityChartProps) {
  return (
    <div className="glass glass-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-rajdhani font-bold text-lg text-foreground uppercase tracking-wider">
          Trend Velocity Timeline
        </h3>
        <span className="font-fira text-xs text-muted-foreground">
          Last 24 Hours
        </span>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {TREND_COLORS.map((color, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color.fill} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color.fill} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(230, 40%, 25%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="hour" 
              stroke="hsl(225, 15%, 55%)"
              tick={{ fill: 'hsl(225, 15%, 55%)', fontSize: 11, fontFamily: 'Fira Code' }}
              axisLine={{ stroke: 'hsl(230, 40%, 25%)' }}
            />
            <YAxis 
              stroke="hsl(225, 15%, 55%)"
              tick={{ fill: 'hsl(225, 15%, 55%)', fontSize: 11, fontFamily: 'Fira Code' }}
              axisLine={{ stroke: 'hsl(230, 40%, 25%)' }}
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
            />
            <Legend 
              wrapperStyle={{ fontFamily: 'Rajdhani', fontSize: 12 }}
              iconType="circle"
            />
            {TREND_KEYS.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={TREND_COLORS[index].stroke}
                fill={`url(#gradient-${index})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ 
                  r: 4, 
                  fill: TREND_COLORS[index].fill,
                  stroke: 'hsl(230, 50%, 14%)',
                  strokeWidth: 2
                }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
