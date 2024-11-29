const selectRandomSport = async () => {
  // select a random sport from the list
  const sports = ["soccer"]
  const selected = sports[Math.floor(Math.random() * sports.length)];
  return selected;
}

const getRandomEvent = async (sport?: string) => {
 
  let selectedSport = sport?.toLowerCase() ?? "soccer";
  if (sport === "random") {
    selectedSport = await selectRandomSport();
  }
  
  let url = "";
  
  switch (selectedSport) {
    case "soccer":
      url = "http://localhost:8000/get_random_game";
      break;
    default:
      return null;
  }

  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    console.error("ERROR: Could not find game summary data");
    return null;
  }
}

export {getRandomEvent};