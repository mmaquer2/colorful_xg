from fastapi import FastAPI # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from helpers.statsbomb_helper import StatsBombHelper
import json

app = FastAPI()
statsbomber_helper = StatsBombHelper()

@app.get("/")
async def root():
	return {"message": "hello world from the colorful-xg api!"}

@app.get("/sample")
async def sample_game():
	return statsbomber_helper.get_random_match_events_json()

@app.get("/get_random_game")
async def sample_game():
	events_json = statsbomber_helper.get_random_match_events_json()
	return JSONResponse(content=json.loads(events_json))

@app.get("/health")
async def heatlh_check():
	statsbomber_helper.test()
	return {"message": "healthy"}


