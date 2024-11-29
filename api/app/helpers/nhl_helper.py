import random
import numpy as np

class NHLHelper:
    def __init__(self):
        print("NHLHelper initialized")
        
        
    def create_game_momentum_chart(self,events,home_team,away_team):
        home_team_events = []
        away_team_events = []
        
        home_team_momentum = []
        away_team_momentum = []
        
        weighted_events = {
            "shot": 0,
            "goal": 1,
            "penalty": -1,
            "faceoff": 0,
            "hit": 0,
            "block": 0,
            "miss": 0,
            "giveaway": -1,
            "takeaway": 1,
            "stoppage": 0   
        }
            
    def parse_game_data(self, game):
        pass    
        
        
    def get_random_game_events_json(self):
        pass