import random
from pybaseball import pitching_stats # type: ignore

class MlbHelper:
    def __init__(self):
        print("MLB Helper initialized")
     
    def parse_random_game(self,game):
        return {"message": "random mlb gamedata "}
    
    def get_random_game(self):
        #get a random mlb game
        #py_baseball.get_schedule()
        
        return {"message": "random mlb game"}
    
    
    def get_random_player_pitching_stats(self):
        # select a random year from 2010 to 2020
        season_year = random.randint(2010,2020)
        data = pitching_stats(season_year, qual=50)
        
        # select a random pitcher from the among the top 50 pitchers in the season
        
    
        player_season_summary = {
            "player_name" : "",
            "team" : "",
            "era" : "",
            "wins" : "",
            "losses" : "",
            "games" : "",
            "games_started" : "",
            "complete_games" : "",
            
        }
        
        
        
        pass
    
    # function to get random player at bat season stats
    # to display, balls hit, strike outs, home runs, etc
    def get_random_player_at_bat_season_stats(self):
        pass
    
    def get_random_game_summary(self):
        random_game = self.get_random_game()
        return self.parse_random_game(random_game)
        