import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { SentimentOverview } from '@/types/dashboard';

interface TweetsSentimentGaugeProps {
  sentiment: SentimentOverview;
}

const COLORS = {
  positive: 'hsl(155, 100%, 50%)',
  neutral: 'hsl(225, 15%, 55%)',
  negative: 'hsl(345, 100%, 50%)',
};

export function TweetsSentimentGauge({ sentiment }: TweetsSentimentGaugeProps) {
  const data = [
    { name: 'Positive', value: sentiment.positive, color: COLORS.positive },
    { name: 'Neutral', value: sentiment.neutral, color: COLORS.neutral },
    { name: 'Negative', value: sentiment.negative, color: COLORS.negative },
  ];

  const overallSentiment = (sentiment.positive - sentiment.negative) / 100;
  const sentimentLabel = overallSentiment > 0.1 ? 'Positive' : overallSentiment < -0.1 ? 'Negative' : 'Neutral';
  const sentimentColor = overallSentiment > 0.1 ? 'text-success' : overallSentiment < -0.1 ? 'text-destructive' : 'text-muted-foreground';

  return (
    <div className="glass glass-border rounded-xl p-5 h-full">
      <h3 className="font-rajdhani font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
        Tweets Sentiments Overview
      </h3>

      <div className="relative h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <filter id="glow-tweets">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              filter="url(#glow-tweets)"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(230, 50%, 14%)',
                border: '1px solid hsl(185, 100%, 50%, 0.3)',
                borderRadius: '8px',
                fontFamily: 'Rajdhani',
              }}
              itemStyle={{ color: 'hsl(230, 40%, 94%)' }}
              formatter={(value: number) => [`${value}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className={`font-orbitron text-xl font-bold ${sentimentColor}`}>
              {Math.abs(Math.round(overallSentiment * 100))}%
            </span>
            <p className="font-rajdhani text-xs text-muted-foreground uppercase">
              {sentimentLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-inter text-xs text-muted-foreground">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
