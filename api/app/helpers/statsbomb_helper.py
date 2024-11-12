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
            "home_team_starting_roster" : {},
            "away_team_starting_roster" : {},
            "home_team_formation" : "",
            "away_team_formation" : "",
            "home_start_xi" : [],
            "away_start_xi" : [],
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
            "key_event_timeline" : [],
            "xg_trend" : {"home_team_trend": {}, "away_team_trend": {}},
            "away_team_shot_total" : 0,
            "home_team_shot_total" : 0,
        }
        
        home_team = match['home_team']
        away_team = match['away_team']
        competition = match['competition']
        match_date = match['match_date']
        match_venue = match['stadium']
        
        game_summary["summary_string"] = f"{home_team} vs {away_team} - {competition} - {match_date} - {match_venue}"

        # Get the starting lineup for the home team
        home_starting_roster = sb.lineups(match_id=match['match_id'])[match['home_team']]
        
        # convert to list of dictionaries
        game_summary["home_team_starting_roster"]  = home_starting_roster.to_dict(orient="records")
        
        # Get the starting lineup for the away team
        away_team_starting_roster = sb.lineups(match_id=match['match_id'])[match['away_team']]
        game_summary["away_team_starting_roster"] = away_team_starting_roster.to_dict(orient="records")
        
        # TODO: this data is not available in the free data set
        #player_match_stats = sb.player_match_stats(match['match_id'])
        #team_match_stats = sb.team_match_stats(match['match_id'])
        
        # Get the match event data from StatsBomb
        events = sb.events(match_id=match['match_id'])
           
        # create shot xg trend chart
        shots = events[events['type'] == 'Shot']
        
        shot_xg_trend_chart_data = self.shot_xg_trend_chart(shots, home_team, away_team)
        game_summary["home_team_xg"] = shot_xg_trend_chart_data["home_team_total_xg"]
        game_summary["away_team_xg"] = shot_xg_trend_chart_data["away_team_total_xg"]
        game_summary["xg_trend"]["home_team_trend"] = shot_xg_trend_chart_data["home_team_shots"]
        game_summary["xg_trend"]["away_team_trend"] = shot_xg_trend_chart_data["away_team_shots"]
        game_summary["home_team_shot_total"] = len(shot_xg_trend_chart_data["home_team_shots"])
        game_summary["away_team_shot_total"] = len(shot_xg_trend_chart_data["away_team_shots"])
        
        all_goals = self.get_all_goals(shots)
        game_summary["home_team_goals"] = all_goals[0]
        game_summary["away_team_goals"] = all_goals[1]
        
        ##TODO: add the key stats for the game
        # create the shot map data
        #home_team_shot_map_data = self.parse_shot_map_data(shots, home_team)
        #away_team_shot_map_data = self.parse_shot_map_data(shots, away_team)
        
        ## TODO: add the key stats for the game
        # create the key event timeline
        #key_event_timeline = self.get_timeline_data(events)
        
        ## TODO: add the key stats for the game
        ## create pass network map for each team
        #pass_network_map = self.create_pass_network_map(events)
        
        
        
        # convert pandas data frame to dictionary for JSON serialization
        game_summary_json = self.convert_numpy(game_summary)
    
        return game_summary_json

    # get all key stats for the game recap
    def parse_match_stats_data(events):
        
        # stats to get:  
        # shots
        # possession
        # passes
        # corners
        # yellow cards
        # red cards
        # offsides
        # penalties
        # fouls
        # interceptions
        
        pass
        
    
    
    # function to create the key event timeline for the game recap
    def get_timeline_data(self,events):
        timeline = []
        ## yellow cards, red cards, goals, substitutions, penalties, etc.
        
        return timeline
        
    
    def shot_xg_trend_chart(self, shots, home_team, away_team):
        # get the xG for each shot
        home_team_shots = []
        away_team_shots = []
        home_team_total_xg = 0
        away_team_total_xg = 0

        ## TODO: add who scored the goal, who assisted, and the shot type
        
        
        # loop through each shot, and denote its outcome, xG, and minute on the xG trend chart
        for index, shot in shots.iterrows():
            if shot['team'] == home_team:
                home_team_total_xg += shot['shot_statsbomb_xg']
                home_team_shots.append({"minute": shot["minute"], "current_xg_total" : home_team_total_xg, "shot_outcome": shot['shot_outcome'], "shot_location": shot['location']})          
            else:
                away_team_total_xg += shot['shot_statsbomb_xg']
                away_team_shots.append({"minute": shot["minute"], "current_xg_total" : away_team_total_xg, "shot_outcome": shot['shot_outcome'], "shot_location": shot['location']})
        
        # round the xG to 2 decimal places
        home_team_total_xg = round(home_team_total_xg, 2)
        away_team_total_xg = round(away_team_total_xg, 2)
           
        return {"home_team_shots": home_team_shots, "away_team_shots": away_team_shots, "home_team_total_xg": home_team_total_xg, "away_team_total_xg": away_team_total_xg}
    
    def parse_shot_map_data(self, shots, team_name):
 
        pass
    
    def get_all_goals(self, shots):
        home_team_goals = []
        away_team_goals = []
        
        
        return home_team_goals, away_team_goals
  
    # function to create the pass network map for the game recap
    def create_pass_network_map(self,events):
        
        # note all passing events are event id 30
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

    # Helper function to get a random match from the StatsBomb free data set
    def get_random_match(self):
        
        # TODO: Choose a random competition where all rows are available for the free data set
        #comps = sb.competitions() # Get all competitions from StatsBomb
        
        compeition_ids = [43] # List of competition IDs from StatsBomb free data
        competition_id = random.choice(compeition_ids)  # Choose a competition ID from StatsBomb data
        matches = sb.matches(competition_id=competition_id, season_id=3)  # Example season
        
        # Choose a random match id
        match = random.choice(matches.to_dict(orient="records"))

        return match
	

    # this is the main function that returns the game data, to be used by the API
    def get_random_match_events_json(self):
        match = self.get_random_match()
        game_summary = self.parse_match_data(match)
        return {"game_summary": game_summary}
        

