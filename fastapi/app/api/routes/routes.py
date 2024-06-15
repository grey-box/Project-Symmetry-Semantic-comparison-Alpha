from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


@router.post("/compare/")
def fetch_original_article(originalArticle:str, targetArticleTranslatedToOriginalArticleLanguage:str):
    return {"original article" : targetArticleTranslatedToOriginalArticleLanguage}
