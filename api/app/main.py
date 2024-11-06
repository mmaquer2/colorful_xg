from fastapi import FastAPI # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from helpers.statsbomb_helper import StatsBombHelper
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # allow localhost for testing
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

statsbomber_helper = StatsBombHelper()

@app.get("/")
async def root():
	return {"message": "hello world from the colorful-xg api!"}

@app.get("/sample")
async def sample_game():
    data = statsbomber_helper.get_random_match_events_json()
    return data

@app.get("/get_random_game")
async def sample_game():
	events_json = statsbomber_helper.get_random_match_events_json()
	return JSONResponse(content=json.loads(events_json))



