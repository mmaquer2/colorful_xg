from helpers.statsbomb_helper import StatsBombHelper
#from nhl_helper import NHLHelper
#from nfl_helper import NFLHelper
#from visualization_helper import VisualizationHelper

class DataManager:
    def __init__(self):
        self.data = None
        self.statsbomber_helper = StatsBombHelper()
        #self.nfl_helper = NFLHelper()
        #self.nhl_helper = NHLHelper()
        #self.visualization_helper = VisualizationHelper()
              
    def select_random_sport(self):
        # TODO: add more sports and make this truly random, for now just return soccer
        sports = ["golf", "soccer", "basketball", "football", "baseball", "hockey", "rugby"]

        return "soccer"
        
    def get_random_game_summary(self):
        
        selected_sport = self.select_random_sport()
        
        if selected_sport == "soccer":
            return self.statsbomber_helper.get_random_match_events_json()
        
        elif selected_sport == "hockey":
            pass
            #return self.nhl_helper.get_random_game_summary()

        elif selected_sport == "football":
            pass
            #return self.nfl_helper.get_random_game_summary()
            
        elif selected_sport == "basketball":
            pass
            #return self.nba_helper.get_random_game_summary()
            
        elif selected_sport == "baseball":
            pass
            #return self.mlb_helper.get_random_game_summary()
            
        elif selected_sport == "rugby":
            pass
            #return self.rugby_helper.get_random_game_summary()
            
        else:
            return {"error": "no sport selected"}
            
        