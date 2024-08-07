from fastapi import FastAPI
from uvicorn import run
from typing import Union
import uvicorn
from pydantic import BaseModel

from app.scripts import scrape
from app.allScripts import colors,bleuScore,bertScore

app = FastAPI()

class Url(BaseModel):
    address:str

class Comparator(BaseModel):
    source:str
    target:str
@app.post("/api/v1/article/original/")
def get_orginal_article_by_url(url:Url):
    return scrape.getArticle(url.address)

@app.post("/api/v1/article/original/languages")
def get_list_of_target_languages_with_corresponding_link(url:Url):
    return scrape.languageGetter(url.address)
@app.post("/api/v1/article/original/targetLanguageArticle")
def get_target_language_article_of_the_orginial_article(url:Url):
    return scrape.getArticle(url.address);
@app.post("/api/v1/article/comparator/blueScore")
def get_blue_score_comparison(comparator:Comparator):
    colorsGenerted = colors.gen_colors()
    test = bleuScore.compare_blueScore(comparator.source,comparator.target,colorsGenerted,0.1)
    return test


@app.post("/api/v1/article/comparator/bertScore")
def get_bert_score_comparison(comparator:Comparator):
    colorsGenerted = colors.gen_colors()
    test = bertScore.compare_bertScore(comparator.source,comparator.target,colorsGenerted,0.1)
    return test

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
