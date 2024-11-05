import random
from statsbombpy import sb # type: ignore

class StatsBombHelper:
    def __init__(self):
        print("StatsBombHelper initialized")
                        
    def parse_match_data(self, match):
        game_summary = {
            "home_team" : match['home_team'],
            "away_team" : match['away_team'],
            "competition" : match['competition'],
            "match_date" : match['match_date'],
            "match_venue" : match['stadium'],
            "home_team_starting_lineup" : {},
            "away_team_starting_lineup" : {},
            "home_team_final_score" : match['home_score'],
            "away_team_final_score" : match['away_score'],
            "home_team_xg" : 0,
            "away_team_xg" : 0,
            "home_team_stats" : {},
            "away_team_stats" : {},
            "home_team_goals" : [],
            "away_team_goals" : [],
        }

        # Get the starting lineup for the home team
        game_summary["home_team_starting_lineup"] = sb.lineups(match_id=match['match_id'])[match['home_team']]
           
        # Get the starting lineup for the away team
        game_summary["away_team_starting_lineup"] = sb.lineups(match_id=match['match_id'])[match['away_team']]  
 
        # Get the match event data from StatsBomb
        events = sb.events(match_id=match['match_id'])
    
        # todo: parse more detailed match event data
        
        # Convert to JSON format
        #events_json = events.to_json(orient="records")
        
        print(game_summary)    
        
        #return events_json


    def get_random_match(self):
        comps = sb.competitions() # Get all competitions
        
        first_row = comps.iloc[0] # Get the first row of the competitions data frame
        
        
        # Choose a random competition where all rows are available for the free data set
        
        compeition_ids = [43] # List of competition IDs from StatsBomb free data
        competition_id = random.choice(compeition_ids)  # Choose a competition ID from StatsBomb data
        matches = sb.matches(competition_id=competition_id, season_id=3)  # Example season
        
        # Choose a random match id
        match = random.choice(matches.to_dict(orient="records"))
        
        return match
	
    def get_random_match_events_json(self):
        
        match = self.get_random_match()
        
        home_team = match['home_team']
        away_team = match['away_team']
        competition = match['competition']
        match_date = match['match_date']
        match_venue = match['stadium']
        
        game_title_line_string = f"{home_team} vs {away_team} - {competition} - {match_date} - {match_venue}"
        
        self.parse_match_data(match)
        
        return {"random_game_previews": game_title_line_string}
        
        
        #return self.parse_match_data(match) # Fetch and return events for this match in JSON format

          
    def test(self):
        print("TEST TEST TEST")

