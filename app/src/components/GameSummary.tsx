import XGProgressionChart from "./charts/XGProgressionChart";

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
  game_summary_props?: GameSummaryProps | null; 
};


function GameSummary({ game_summary_props }: GameSummaryComponentProps) {
  //const [joke,setJoke] = useState("");
  //const random_loading_jokes = ["Generating game summary...", "Crunching the numbers...", "Analyzing the data...", "Simulating the match...", "Calculating the xG...", "Predicting the outcome...", "Running the stats...", "Simulating the game...", "Analyzing the match...", "Generating the report..."];
  //const random_joke = random_loading_jokes[Math.floor(Math.random() * random_loading_jokes.length)];
  //setJoke(random_joke);

  if (!game_summary_props) {
    return <p>Loading game summary... </p>;
  }

  return (
    <div>
      <h2>Match Summary</h2>

      <p>{game_summary_props.competition} |  {game_summary_props.match_date}  | {game_summary_props.match_venue} </p>
      <p>Home Team: {game_summary_props.home_team} - {game_summary_props.home_team_final_score} , xG: {game_summary_props.home_team_xg} |  Away Team: {game_summary_props.away_team} - {game_summary_props.away_team_final_score} , xG: {game_summary_props.away_team_xg}</p>

      <XGProgressionChart xg_progression={game_summary_props.xg_trend} />

    </div>
  );
}

export default GameSummary;

