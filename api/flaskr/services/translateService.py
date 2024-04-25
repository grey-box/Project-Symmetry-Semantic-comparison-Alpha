from flask import make_response
from flaskr.scripts import scrape, translation, bleuScore, colors
from flaskr.models.articleModel import ArticleModel
import json
from flaskr.models.requestModel import RequestModel


def get_translated_article(translateArticleRequestObject: RequestModel) -> dict:
    articleReturned = ArticleModel(
        fetch_source_article(translateArticleRequestObject),
        fetch_target_article(translateArticleRequestObject),
    )
    return articleReturned.toJson()


def fetch_source_article(requestModel: RequestModel):
    try:
        sourceArticle = scrape.getArticle(requestModel.get_sourceArticleUrl())
    except Exception as e:
        return make_response({"Error getting sourceArticle": str(e)}, 404)
    return sourceArticle


def fetch_target_article(requestModel: RequestModel):
    return "targetArticle"
