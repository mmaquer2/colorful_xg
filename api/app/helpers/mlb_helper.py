import random
import pybaseball as mlb # type: ignore


class MlbHelper:
    def __init__(self):
        print("MLB Helper initialized")
        py_baseball = mlb() # declare mlb object
    
    
    def parse_random_game(self):
        return {"message": "random mlb gamedata "}
    
    def get_random_game(self):
        return {"message": "random mlb game"}
    
    def get_random_game_summary(self):
        
        
        return {"message": "random mlb game summary"}