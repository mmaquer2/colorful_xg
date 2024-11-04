from fastapi import FastAPI # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from statsbombpy import sb # type: ignore
import random
import json

app = FastAPI()


def get_random_match_events_json():
    competition_id = 43  # Choose a competition ID from StatsBomb data
    matches = sb.matches(competition_id=competition_id, season_id=3)  # Example season

    # Choose a random match
    match = random.choice(matches.to_dict(orient="records"))
    match_id = match['match_id']

    # Fetch and return events for this match in JSON format
    return get_match_events_json(competition_id, match_id)

# Fetch events for a specific match (using competition and match IDs)
def get_match_events_json(competition_id, match_id):
    # Get the event data from StatsBomb
    events = sb.events(match_id=match_id)

    # Convert to JSON format
    events_json = events.to_json(orient="records")
    return events_json


@app.get("/")
async def root():
	return {"message": "hello world from the colorful-xg api!"}

@app.get("/sample")
async def sample_game():
	events_json = get_random_match_events_json()
	return JSONResponse(content=json.loads(events_json))


@app.get("/test")
async def test():
	return {"message": "this is a test endpoint"}

@app.get("/health")
async def heatlh_check():
	return {"message": "the colorful-xg api is healthy!"}


