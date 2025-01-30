#!/bin/bash
from fastapi import FastAPI, HTTPException, Query, Request
import uvicorn
from uvicorn import run
from typing import Union, List
import requests
from pydantic import BaseModel
from bs4 import BeautifulSoup
import logging
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import urlparse, parse_qs

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)


app = FastAPI()

# Allow all origins (be cautious with this in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify the allowed origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ArticleResponse(BaseModel):
    sourceArticle: str
    articleLanguages: List[str]


def get_wikipedia_url(title: str) -> str:
    """Get the Wikipedia article URL for a given title using the Wikipedia API."""
    api_url = 'https://en.wikipedia.org/w/api.php'
    params = {
        'action': 'query',
        'format': 'json',
        'titles': title,
        'prop': 'info',
        'inprop': 'url',
    }
    response = requests.get(api_url, params=params)
    data = response.json()
    pages = data.get('query', {}).get('pages', {})
    page = next(iter(pages.values()), None)

    if not page or 'missing' in page:
        logging.error('Wikipedia article not found.')
        raise HTTPException(status_code=404, detail="Wikipedia article not found.")

    fullurl = page.get('fullurl')
    if not fullurl:
        logging.error('Wikipedia article URL not found.')
        raise HTTPException(status_code=404, detail="Wikipedia article URL not found.")

    return fullurl

'''
def get_wikipedia_url(title: str) -> str:
    """Get the Wikipedia article URL for a given title using the Wikipedia API."""
    api_url = 'https://en.wikipedia.org/w/api.php'
    params = {
        'action': 'query',
        'format': 'json',
        'titles': title,
        'prop': 'info',
        'inprop': 'url',
    }
    response = requests.get(api_url, params=params)
    data = response.json()
    pages = data.get('query', {}).get('pages', {})
    page = next(iter(pages.values()), None)

    if not page or 'missing' in page:
        logging.error('Wikipedia article not found.')
        raise HTTPException(status_code=404, detail="Wikipedia article not found.")

    fullurl = page.get('fullurl')
    if not fullurl:
        raise HTTPException(status_code=404, detail="Wikipedia article URL not found.")

    return fullurl
'''

@app.get("/get_article", response_model=ArticleResponse)
def get_article(url: str = Query(None), title: str = Query(None)):
    print(f'[INFO] Calling get article endpoint')
    if not url and not title:
        logging.info("Either 'url' or 'title' must be provided.")
        raise HTTPException(status_code=400, detail="Either 'url' or 'title' must be provided.")

    if title:
        # Use the Wikipedia API to get the URL from the title
        url = get_wikipedia_url(title)

    try:
        page = requests.get(url)
        page.raise_for_status()  # Check if the request was successful
    except requests.exceptions.RequestException as e:
        logging.error(f'Request error: {e}')
        raise HTTPException(status_code=400, detail=f"Request error: {e}")

    soup = BeautifulSoup(page.content, "html.parser")
    paragraphs = soup.find_all('p')  # Extract the article content

    if not paragraphs:
        logging.info("Article content not found.")
        raise HTTPException(status_code=404, detail="Article content not found.")

    article_content = " ".join([para.get_text(strip=True) for para in paragraphs])

    languages = []
    language_list = soup.find_all('li', class_='interlanguage-link')
    for lang_item in language_list:
        lang = lang_item.find('a', title=True)
        if lang:
            languages.append(lang['title'])

    return {"sourceArticle": article_content, "articleLanguages": languages}


'''
@app.get("/get_languages")
def get_languages(url: str):
    # Extract the page title from the URL
    parsed_url = urlparse(url)
    if parsed_url.hostname != "en.wikipedia.org":
        raise HTTPException(status_code=400, detail="Invalid Wikipedia URL")

    # Handle different URL formats (direct page, with 'title=' parameter)
    page_title = None
    if parsed_url.path.startswith("/wiki/"):
        page_title = parsed_url.path[6:]  # Remove "/wiki/" from the path
    elif 'title' in parse_qs(parsed_url.query):
        page_title = parse_qs(parsed_url.query)['title'][0]

    if not page_title:
        raise HTTPException(status_code=400, detail="Page title could not be extracted from URL")

    # Wikipedia API endpoint
    api_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={page_title}&prop=langlinks&format=json"
    
    response = requests.get(api_url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching data from Wikipedia")
    
    data = response.json()
    
    # Extract language links from the response
    pages = data.get("query", {}).get("pages", {})
    if not pages:
        raise HTTPException(status_code=404, detail="Page not found on Wikipedia")
    
    page_id = next(iter(pages))
    langlinks = pages[page_id].get("langlinks", [])
    
    # Extract the language names and codes
    languages = [{"lang": link["lang"], "title": link["title"]} for link in langlinks]
    
    return {"languages": languages}
'''
'''
class ArticleRequest(BaseModel):
    url: str = None
    title: str = None

class ArticleResponse(BaseModel):
    article: str
    languages: list

def extract_article_content(url: str):
    try:
        page = requests.get(url)
        page.raise_for_status()  # Check if the request was successful
    except requests.exceptions.RequestException as e:
        logging.error(f'Request error: {e}')
        raise HTTPException(status_code=400, detail=f"Request error: {e}")

    soup = BeautifulSoup(page.content, "html.parser")
    paragraphs = soup.find_all('p')  # Extract the article content

    if not paragraphs:
        logging.info("Article content not found.")
        raise HTTPException(status_code=404, detail="Article content not found.")

    article_content = " ".join([para.get_text(strip=True) for para in paragraphs])

    languages = []
    language_list = soup.find_all('li', class_='interlanguage-link')
    for lang_item in language_list:
        lang = lang_item.find('a', title=True)
        if lang:
            languages.append(lang['title'])

    return {"article": article_content, "languages": languages}

@app.post("/get_article", response_model=ArticleResponse)
async def get_article(request: Request):
    data = await request.json()
    url = data.get("url")
    title = data.get("title")

    print(f'[INFO] Calling get article endpoint (POST)')
    if not url and not title:
        logging.info("Either 'url' or 'title' must be provided.")
        raise HTTPException(status_code=400, detail="Either 'url' or 'title' must be provided.")

    if title:
        # Use the Wikipedia API to get the URL from the title
        url = get_wikipedia_url(title)

    return extract_article_content(url)
'''


@app.get("/translate/sourceArticle", response_model=ArticleResponse)
def translate_article(url: str = Query(None), title: str = Query(None)):
    pass

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