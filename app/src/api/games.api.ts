export const getGameSummary= async () => {
    try {
      const url = import.meta.env.COLORFUL_XG_API_URL;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
      if (response.status === 404) {
        console.error("ERROR: Could not find game summary data");
      }
    } catch (error) {
      console.error("ERROR: Could not fetch game summary data", error);
    }
  };