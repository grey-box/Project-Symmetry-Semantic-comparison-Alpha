from fastapi import FastAPI
from uvicorn import run
from typing import Union
import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/comparisonTool/blueScore/")
def blue_score():
    return {"title":"Water Scarcity"}



if __name__ == '__main__':
    uvicorn.run(app,host='127.0.0.1', port=8000)

