import './index.css';
import { useState } from 'react';
import { Typography, Button, Box, Divider, FormControl, FormLabel, Select, MenuItem} from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import GameSummary from './components/GameSummary';
import {getRandomEvent} from './api/games.api';



function App() {
  const [gameSummaryData, setGameSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("There was a problem loading the game summary data...please try again");
  const [sport, setSport] = useState("soccer");


  async function generateGame() {
    try {
      setIsLoading(true);
      const data = await getRandomEvent(sport);
      setGameSummaryData(data.game_summary);
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
          What is colorful xG?
        </Typography>

        <Typography variant="body1" gutterBottom>
          Colorful xG is a tool that generates visual summaries of historical sporting events from open source data. The tool provides a detailed breakdown of key events, player performances, and match statistics in a visually engaging format. Colorful xG aims to make sports analytics more accessible, interesting, and fun for all sports fans.
        </Typography>
       
        <Typography variant="h6" gutterBottom>
          What is Expected Goals (xG)?
        </Typography>

        <Typography variant="body1" gutterBottom>
          Expected goals (xG) is a statistical metric that quantifies the likelihood of a shot resulting in a goal. xG is calculated based on a number of factors, including the distance from goal, angle of the shot, and type of play leading up to the shot. It provides a more accurate representation of a team's performance than simply looking at the number of goals scored, as it takes into account the quality of chances created. This method is applied in a variety of sports to evaluate player and team performance.
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Select a sport</FormLabel>
            <Select value={sport} onChange={(e) => setSport(e.target.value)}>
              <MenuItem value="soccer">soccer</MenuItem>
              <MenuItem value="random">random</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" sx={{ my: 2 }} onClick={generateGame}>
            Generate Game Recap 
          </Button>
        </Box>

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
