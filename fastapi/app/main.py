from fastapi import FastAPI
from uvicorn import run
from typing import Union
import uvicorn
from enum import Enum
from app.api.main import api_router

app = FastAPI()

app.include_router(api_router)

if __name__ == '__main__':
    uvicorn.run(app,host='127.0.0.1', port=8000)

