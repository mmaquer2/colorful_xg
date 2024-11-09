import './index.css';
import { useState } from 'react';
import { Typography, Button, Box, Divider} from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import GameSummary from './components/GameSummary';

function App() {
  const [gameSummaryData, setGameSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("There was a problem loading the game summary data...please try again");

  async function generateGame() {
    try {
      setIsLoading(true);
      const url = "http://localhost:8000/get_random_game";
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        setGameSummaryData(data.game_summary);
        console.log(data.game_summary);
      } else if (response.status === 404) {
        console.error("ERROR: Could not find game summary data");
      }
    } catch (error) {
      console.error("We encountered a problem... please try again later");
      console.log(error);
      setError("There was a problem loading the game summary data...please try again");
    } finally {
      setIsLoading(false); 
    }
  }

  return (
    <>
      <Header />
          <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      
        <Typography variant="h6" gutterBottom>
          What is Expected Goals (xG)?
        </Typography>

        <Typography variant="body1" gutterBottom>
          Expected goals (xG) is a statistical metric that quantifies the likelihood of a shot resulting in a goal. xG is calculated based on a number of factors, including the distance from goal, angle of the shot, and type of play leading up to the shot. It provides a more accurate representation of a team's performance than simply looking at the number of goals scored, as it takes into account the quality of chances created. This method is applied in a variety of sports to evaluate player and team performance.
        </Typography>

        <Typography variant="h6" gutterBottom>
          What is colorful xG?
        </Typography>

        <Typography variant="body1" gutterBottom>
          Colorful xG is a tool that generates visual summaries of historical soccer matches based on open source data provided by hudl statsbomb. The tool provides a detailed breakdown of key events, player performances, and match statistics in a visually engaging format. Colorful xG aims to make complex soccer analytics more accessible and fun for fans of the beautiful game.
        </Typography>

        <Typography variant="caption" color="textSecondary">
          Last Update: Nov. 6th, 2024
        </Typography>
        <Divider sx={{ my: 3 }} />
      
        <Button variant="outlined" sx={{ my: 2 }} onClick={generateGame}>
          Generate Game Recap 
        </Button>

        {isLoading && <p>Loading game summary...</p>}
        {!isLoading && gameSummaryData ? (
          <GameSummary game_summary_props={gameSummaryData} />
        ) : !isLoading && !gameSummaryData ? (
          <p>No game summary generated yet. Click the button to generate one!</p>
        ) : null}
        
      </Box>
      <Footer />
    </>
  );
}

export default App;
