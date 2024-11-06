import './index.css';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [gameSummary, setGameSummary] = useState("No game summary yet");
  const [isLoading, setIsLoading] = useState(false);

  async function generateGame() {
    try {
      setIsLoading(true);
      const url = "http://localhost:8000/sample";
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.game_summary.summary_string);
        setGameSummary(data.game_summary.summary_string);
      }
      if (response.status === 404) {
        console.error("ERROR: Could not find game summary data");
      }
    } catch (error) {
      console.error("We encountered a problem... pleae try again later");
    }

  }

  return (
    <>
      <Header />
      <div id="main-container">
        <p>welcome to colorful xG</p>
        <p>Making neat illustrations of historical matches of the beautiful game</p>
        <p>{gameSummary}</p>

        <button onClick={generateGame}>generate game recap</button>
      
      </div>
      <Footer />
    </>
  );
}

export default App;