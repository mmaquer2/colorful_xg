from fastapi import FastAPI # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from helpers.data_manager import DataManager

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite's default dev server
        "http://127.0.0.1:5173",  # Alternative localhost
        "http://localhost:4173",  # Vite preview
    ],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

datamanager = DataManager()

@app.get("/")
async def root():
	return {"message": "hello world from the colorful-xg api"}

@app.get("/get_random_game")
async def sample_game():
    return datamanager.get_random_game_summary()
    




