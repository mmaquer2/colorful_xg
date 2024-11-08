interface GameSummaryProps {
  summary_string: string;
  home_team: string;
  away_team: string;
  competition: string;
  match_date: string;
  match_venue: string;
  home_team_starting_lineup: Record<string, any>;
  away_team_starting_lineup: Record<string, any>;
  home_team_final_score: number;
  away_team_final_score: number;
  home_manager: string;
  away_manager: string;
  home_team_xg: number;
  away_team_xg: number;
  home_team_stats: Record<string, any>;
  away_team_stats: Record<string, any>;
  home_team_goals: any[];
  away_team_goals: any[];
  key_event_timeline: any[];
}

type GameSummaryComponentProps = {
  game_summary_props?: GameSummaryProps | null; // Allow undefined or null for conditional rendering
};

function GameSummary({ game_summary_props }: GameSummaryComponentProps) {
  // Check if data is not yet available and show a loading message
  if (!game_summary_props) {
    return <p>Loading game summary...</p>;
  }

  return (
    <div>
      <h2>Match Summary</h2>

      <p>{game_summary_props.competition} |  {game_summary_props.match_date}  | {game_summary_props.match_venue} </p>
      <p>{game_summary_props.home_team} - {game_summary_props.home_team_final_score} |  {game_summary_props.away_team} - {game_summary_props.away_team_final_score}</p>

      
      <h3>Match Stats</h3>
      <p>shots</p>
      <p>possession</p>
      <p>passes</p>
      <p>corners</p>
      <p>yellow cards</p>
      <p>red cards</p>
      <p>offsides</p>
      <p>penalties</p>
      <p>fouls</p>
      <p>interceptions</p>

      
      <p>Home Team Expected Goals (xG): {game_summary_props.home_team_xg}</p>
      <p>Away Team Expected Goals (xG): {game_summary_props.away_team_xg}</p>

     <h3>Key Events Timeline</h3>

      <h3>Starting Lineups</h3>

      <p>Home Team Starting Lineup:</p>

      <p>Away Team Starting Lineup:</p>

    </div>
  );
}

export default GameSummary;

