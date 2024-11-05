from fastapi import FastAPI # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from statsbombpy import sb # type: ignore
import random
import json

app = FastAPI()



def parse_match_data(match):
    game_summary = {
		"home_team" : "",
		"away_team" : "",
		"competition" : "",
		"match_date" : "",
		"match_venue" : "",
		"home_team_starting_lineup" : {},
		"away_team_starting_lineup" : {},
		"home_team_final_score" : 0,
		"away_team_final_score" : 0,
		"home_team_xg" : 0,
		"away_team_xg" : 0,
		"home_team_stats" : {},
		"away_team_stats" : {},
		"home_team_goals" : [],
		"away_team_goals" : [],
	}
    
    game_summary["home_team"] = match['home_team']
    game_summary["away_team"] = match['away_team']
    game_summary["competition"] = match['competition']
 
	# Get the match event data from StatsBomb
    events = sb.events(match_id=match['match_id'])
    
    # todo: parse more detailed match event data
    
    # Convert to JSON format
    events_json = events.to_json(orient="records")
    
    return events_json


def get_random_match():
	compeition_ids = [43] # List of competition IDs from StatsBomb free data
	competition_id = random.choice(compeition_ids)  # Choose a competition ID from StatsBomb data
	matches = sb.matches(competition_id=competition_id, season_id=3)  # Example season
	
 	# Choose a random match id
	match = random.choice(matches.to_dict(orient="records"))
	return match
	
def get_random_match_events_json():
	
	match = get_random_match()
    
	home_team = match['home_team']
	away_team = match['away_team']
	competition = match['competition']
	match_date = match['match_date']
	match_venue = match['stadium']
    
	game_title_line_string = f"{home_team} vs {away_team} - {competition} - {match_date} - {match_venue}"
	return {"random_game_previews": game_title_line_string}
    
    #return parse_match_data(match) # Fetch and return events for this match in JSON format


@app.get("/")
async def root():
	return {"message": "hello world from the colorful-xg api!"}

@app.get("/sample")
async def sample_game():
	return get_random_match_events_json()

@app.get("/get_random_game")
async def sample_game():
	events_json = get_random_match_events_json()
	return JSONResponse(content=json.loads(events_json))

@app.get("/health")
async def heatlh_check():
	return {"message": "healthy"}


