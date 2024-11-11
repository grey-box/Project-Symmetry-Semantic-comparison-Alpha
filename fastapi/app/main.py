from fastapi import FastAPI
from uvicorn import run
from typing import Union
import uvicorn
from pydantic import BaseModel


app = FastAPI()

# def getArticle

class Url(BaseModel):
    address:str

class Comparator(BaseModel):
    source:str
    target:str
@app.post("/api/v1/article/original/")
def get_orginal_article_by_url(url:Url):
    return 'hello'


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
