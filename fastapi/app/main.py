from fastapi import FastAPI
from uvicorn import run
from typing import Union
import uvicorn
from pydantic import BaseModel

from app.scripts import scrape

app = FastAPI()

class Url(BaseModel):
    address:str
@app.post("/api/v1/article/original/")
def get_orginal_article_by_url(url:Url):
    return scrape.getArticle(url.address)

@app.post("/api/v1/article/original/languages")
def get_list_of_target_languages_with_corresponding_link(url:Url):
    return scrape.languageGetter(url.address)

@app.post("/api/v1/article/original/targetLanguageArticle")
def get_target_language_article_of_the_orginial_article(url:Url):
    return scrape.getArticle(url.address);


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
