from fastapi import FastAPI, HTTPException
from uvicorn import run
from typing import Union
import uvicorn
from pydantic import BaseModel

app = FastAPI()

url = "https://en.wikipedia.org/wiki/Water_scarcity"

# def getArticle
def getArticle(url):
    try:
        page = requests.get(url)
        page.raise_for_status() # for HTTP errors
        soup = BeautifulSoup(page.content, "html.parser")
        title = soup.find('title').text.replace(" - Wikipedia", "")
        text = ""
        for paragraph in soup.find_all('p'):
            text += paragraph.text + " " # Adding a space to keep words separate
        return {"title": title, "text": text}
    except requests.exceptions.RequestException as e: # error handling
        print(f"Error getting article: {e}")
        return None

@app.get("/get_article/")
def get_article(url: str)
    article = getArticle(url)
    if article:
        return {"article": article}
    else: # error handling
        raise HTTPException(status_code=404, detail="Article not found")

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
