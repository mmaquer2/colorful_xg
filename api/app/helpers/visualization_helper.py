import json
import random

"""
This helper class will be responsible for creating visualizations of match data. 
The visualizations will be created using the matplotlib library.
"""

class VisualizationHelper:
    def __init__(self):
        print("VisualizationHelper initialized")
        
        
    def select_random_visualization_input(self):
        visualization = random.choice(["xg", "passmap", "heatmap", "pitchcontrol"])
        art_style = random.choice(["speckled_dots", "neon", "watercolor", "oil_painting"])
        return visualization, art_style
    
    def create_visualization(self, match_data):
        
        viz_type , art_style = self.select_random_visualization_input()
        
        pass
    
    def create_passmap(self, match_data):
        pass
    
    def create_heatmap(self, match_data):
        pass
    
    def create_pitchcontrol(self, match_data):
        pass