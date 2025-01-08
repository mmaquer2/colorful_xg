


const SoccerShotChart = ({ xg_progression, home_team_name, away_team_name }) => {
  const { home_team_trend = [], away_team_trend = [] } = xg_progression || {};
  const home_team = home_team_name || "Home Team";
  const away_team = away_team_name || "Away Team";
  
  // Field dimensions
  const FIELD_WIDTH = 120;
  const FIELD_HEIGHT = 80;
  const MARGIN = 5;
  
  const getColor = (outcome, isHome) => {
    if (outcome === "Goal") return "#22c55e";
    if (isHome) return "#2563eb";
    return "#dc2626";
  };

  const getRadius = (outcome) => {
    if (outcome === "Goal") return 3;
    return 2;
  };

  const getSymbol = (outcome) => {
    switch (outcome) {
      case "Goal": return "⚽";
      case "Post": return "□";
      case "Saved": return "●";
      case "Blocked": return "×";
      case "Off T":
      case "Wayward":
        return "○";
      default: return "●";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Game Shot Locations </h2>
      <div className="w-full">
        <svg 
          viewBox={`0 0 ${FIELD_WIDTH + MARGIN * 2} ${FIELD_HEIGHT + MARGIN * 2}`}
          className="w-full h-auto"
        >
          {/* Field background */}
          <rect
            x={MARGIN}
            y={MARGIN}
            width={FIELD_WIDTH}
            height={FIELD_HEIGHT}
            fill="#538032"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Center circle */}
          <circle
            cx={MARGIN + FIELD_WIDTH / 2}
            cy={MARGIN + FIELD_HEIGHT / 2}
            r={9.15}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Center line */}
          <line
            x1={MARGIN + FIELD_WIDTH / 2}
            y1={MARGIN}
            x2={MARGIN + FIELD_WIDTH / 2}
            y2={MARGIN + FIELD_HEIGHT}
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Penalty areas */}
          {/* Left penalty area */}
          <rect
            x={MARGIN}
            y={MARGIN + FIELD_HEIGHT / 2 - 20.16}
            width={16.5}
            height={40.32}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          
          {/* Right penalty area */}
          <rect
            x={MARGIN + FIELD_WIDTH - 16.5}
            y={MARGIN + FIELD_HEIGHT / 2 - 20.16}
            width={16.5}
            height={40.32}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Goal areas */}
          {/* Left goal area */}
          <rect
            x={MARGIN}
            y={MARGIN + FIELD_HEIGHT / 2 - 9.16}
            width={5.5}
            height={18.32}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          
          {/* Right goal area */}
          <rect
            x={MARGIN + FIELD_WIDTH - 5.5}
            y={MARGIN + FIELD_HEIGHT / 2 - 9.16}
            width={5.5}
            height={18.32}
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Plot home team shots */}
          {home_team_trend.map((shot, i) => (
            <g key={`home-${i}`}>
              <text
                x={MARGIN + shot.shot_location[0]}
                y={MARGIN + shot.shot_location[1]}
                fontSize="4"
                fill={getColor(shot.shot_outcome, true)}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {getSymbol(shot.shot_outcome)}
              </text>
            </g>
          ))}

          {/* Plot away team shots */}
          {away_team_trend.map((shot, i) => (
            <g key={`away-${i}`}>
              <text
                x={MARGIN + shot.shot_location[0]}
                y={MARGIN + shot.shot_location[1]}
                fontSize="4"
                fill={getColor(shot.shot_outcome, false)}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {getSymbol(shot.shot_outcome)}
              </text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">●</span>
            <span>Home Team</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600">●</span>
            <span>Away Team</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">⚽</span>
            <span>Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <span>●</span>
            <span>Shot on Target</span>
          </div>
          <div className="flex items-center gap-2">
            <span>○</span>
            <span>Shot off Target</span>
          </div>
          <div className="flex items-center gap-2">
            <span>×</span>
            <span>Blocked Shot</span>
          </div>
          <div className="flex items-center gap-2">
            <span>□</span>
            <span>Hit Post</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoccerShotChart;