from fastapi import FastAPI, HTTPException
from uvicorn import run
from typing import Union, List
import uvicorn
import requests
from pydantic import BaseModel
from bs4 import BeautifulSoup

app = FastAPI()

class ArticleResponse(BaseModel):
    article: str
    languages: List[str]

@app.get("/get_article", response_model=ArticleResponse)
def get_article(url: str):
    try:
        page = requests.get(url)
        page.raise_for_status()  # Check if the request was successful
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Request error: {e}")

    soup = BeautifulSoup(page.content, "html.parser")
    paragraphs = soup.find_all('p')  # Extract the article content

    if not paragraphs:
        raise HTTPException(status_code=404, detail="Article content not found.")

    article_content = " ".join([para.get_text(strip=True) for para in paragraphs])

    languages = []
    language_list = soup.find_all('li', class_='interlanguage-link')
    for lang_item in language_list:
        lang = lang_item.find('a', title=True)
        if lang:
            languages.append(lang['title'])

    return {"article": article_content, "languages": languages}

class Url(BaseModel):
    address: str

class Comparator(BaseModel):
    source: str
    target: str

@app.post("/api/v1/article/original/")
def get_orginal_article_by_url(url: Url):
    return 'hello'

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)