import random
import numpy as np
from statsbombpy import sb # type: ignore

class StatsBombHelper:
    def __init__(self):
        print("StatsBombHelper initialized")
                        
    def parse_match_data(self, match):
        game_summary = {
            "summary_string": "",
            "home_team" : str(match['home_team']),
            "away_team" : str(match['away_team']),
            "competition" : str(match['competition']),
            "match_date" : str(match['match_date']),
            "match_venue" : str(match['stadium']),
            "home_team_starting_lineup" : {},
            "away_team_starting_lineup" : {},
            "home_team_final_score" : int(match['home_score']),
            "away_team_final_score" : int(match['away_score']),
            "home_manager" : str(match['home_managers']),
            "away_manager" : str(match['away_managers']),
            "home_team_xg" : 0,
            "away_team_xg" : 0,
            "home_team_stats" : {},
            "away_team_stats" : {},
            "home_team_goals" : [],
            "away_team_goals" : [],
            "key_event_timeline" : []
        }
        
        home_team = match['home_team']
        away_team = match['away_team']
        competition = match['competition']
        match_date = match['match_date']
        match_venue = match['stadium']
        
        game_summary["summary_string"] = f"{home_team} vs {away_team} - {competition} - {match_date} - {match_venue}"

        # Get the starting lineup for the home team
        home_starting_lineup = sb.lineups(match_id=match['match_id'])[match['home_team']]
        
        # convert to list of dictionaries
        game_summary["home_team_starting_lineup"]  = home_starting_lineup.to_dict(orient="records")
        
    
        # Get the starting lineup for the away team
        away_team_starting_lineup = sb.lineups(match_id=match['match_id'])[match['away_team']]
        game_summary["away_team_starting_lineup"] = away_team_starting_lineup.to_dict(orient="records")
        
        # TODO: this data is not available in the free data set
        #player_match_stats = sb.player_match_stats(match['match_id'])
        #team_match_stats = sb.team_match_stats(match['match_id'])
        
        # Get the match event data from StatsBomb
        events = sb.events(match_id=match['match_id'])
        
       
        
        # create the key event timeline... 
        
        
        
        
        # convert pandas data frame to dictionary for JSON serialization
        game_summary_json = self.convert_numpy(game_summary)
    
        return game_summary_json

    # get all key stats for the game recap
    def parse_match_stats_data(events):
        
        corners = events[events['type_name'] == 'Corner']
        fouls = events[events['type_name'] == 'Foul Committed']
        offsides = events[events['type_name'] == 'Offside']
        
        pass
        
    
    
    # function to create the key event timeline for the game recap
    def parse_timeline_data(events):
        ## yellow cards, red cards, goals, substitutions, penalties, etc.
        pass
    

    def parse_shot_map_data(events):
        #shots = events[events['type_name'] == 'Shot']
        #goals = events[events['type_name'] == 'Goal']
        
        pass
  
    # function to create the pass network map for the game recap
    def create_pass_network_map(events):
        pass

    # Helper function to convert numpy types to native Python types
    def convert_numpy(self,obj):
        if isinstance(obj, (np.integer, np.int64)): 
            return int(obj)
        elif isinstance(obj, (np.floating, np.float64)):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, dict):
            return {k: self.convert_numpy(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [self.convert_numpy(i) for i in obj]
        else:
            return obj


    def get_random_match(self):
        comps = sb.competitions() # Get all competitions from StatsBomb
        
        # TODO: Choose a random competition where all rows are available for the free data set
        
        compeition_ids = [43] # List of competition IDs from StatsBomb free data
        competition_id = random.choice(compeition_ids)  # Choose a competition ID from StatsBomb data
        matches = sb.matches(competition_id=competition_id, season_id=3)  # Example season
        
        # Choose a random match id
        match = random.choice(matches.to_dict(orient="records"))

        return match
	
    def get_random_match_events_json(self):
        match = self.get_random_match()
        game_summary = self.parse_match_data(match)
        return {"game_summary": game_summary}
        

