import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const XGProgressionChart = ({ xg_progression }) => {
  const { home_team_trend, away_team_trend } = xg_progression || { home_team_trend: [], away_team_trend: [] };

  // Create all minutes array
  const allMinutes = [...new Set([
    0, // Add 0 minute
    ...home_team_trend.map(h => h.minute),
    ...away_team_trend.map(a => a.minute)
  ])].sort((a, b) => a - b);

  const data = allMinutes.map(minute => {
    // Find the exact home and away entries for this specific minute
    const homeData = home_team_trend.find(h => h.minute === minute) || 
      { current_xg_total: home_team_trend.filter(h => h.minute < minute).slice(-1)[0]?.current_xg_total || 0, shot_outcome: null };
    
    const awayData = away_team_trend.find(a => a.minute === minute) ||
      { current_xg_total: away_team_trend.filter(a => a.minute < minute).slice(-1)[0]?.current_xg_total || 0, shot_outcome: null };

    return {
      minute,
      home_xg: homeData.current_xg_total || 0,
      away_xg: awayData.current_xg_total || 0,
      home_outcome: homeData.shot_outcome,
      away_outcome: awayData.shot_outcome,
      // Store whether this minute had an actual shot
      isHomeShot: home_team_trend.some(h => h.minute === minute),
      isAwayShot: away_team_trend.some(a => a.minute === minute)
    };
  });

  const CustomDot = (props) => {
    if (!props || !props.payload) return null;

    const { cx, cy, payload, dataKey } = props;
    
    // Only show dots for actual shots in that minute
    const isActualShot = dataKey === 'home_xg' ? payload.isHomeShot : payload.isAwayShot;
    if (!isActualShot) return null;

    // Get the outcome for the current team
    const outcome = dataKey === 'home_xg' ? payload.home_outcome : payload.away_outcome;
    const isGoal = outcome === "Goal";
    
    if (isGoal) {
      return (
        <g transform={`translate(${cx - 12},${cy - 12})`}>
          <circle 
            cx="12" 
            cy="12" 
            r="10" 
            fill={dataKey === 'home_xg' ? "#22c55e" : "#dc2626"}
            stroke={dataKey === 'home_xg' ? "#16a34a" : "#b91c1c"}
            strokeWidth="2"
          />
          <text 
            x="12" 
            y="12" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill="white" 
            fontSize="14px"
            fontWeight="bold"
          >
            ⚽
          </text>
        </g>
      );
    }
    
    // Regular shot dot
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        stroke={dataKey === 'home_xg' ? "#2563eb" : "#dc2626"}
        strokeWidth={2} 
        fill="white" 
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Expected Goals (xG) Progression</h2>
      </div>
      <div className="h-96 w-full">
        <ResponsiveContainer width="99%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 25
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="minute"
              label={{ value: 'Match Minute', position: 'bottom', offset: 15 }}
            />
            <YAxis
              label={{ value: 'xG Total', angle: -90, position: 'left' }}
              domain={[0, 'auto']}
            />
            <Tooltip
              formatter={(value, name, props) => [
                value.toFixed(3),
                name === "home_xg" ? "Home xG" : "Away xG"
              ]}
              labelFormatter={(minute) => `Minute ${minute}`}
            />
            <Legend 
              verticalAlign="top"
              align="center"
            />
            <Line
              type="stepAfter"
              dataKey="home_xg"
              name="Home Team xG"
              stroke="#2563eb"
              strokeWidth={2}
              dot={<CustomDot />}
              isAnimationActive={false}
            />
            <Line
              type="stepAfter"
              dataKey="away_xg"
              name="Away Team xG"
              stroke="#dc2626"
              strokeWidth={2}
              dot={<CustomDot />}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default XGProgressionChart;