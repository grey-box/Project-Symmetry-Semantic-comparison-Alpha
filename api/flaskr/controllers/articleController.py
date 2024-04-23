from flask import Blueprint, request
from flaskr.services import articleService
import json
from flaskr.models.articleModel import ArticleModel

article_route = Blueprint("product_route", __name__, url_prefix="/test")


@article_route.route("", methods=["POST"])
def get_article():
    data = request.get_json()
    url = data.get("url")
    return articleService.get_article(url)


@article_route.route("/originalArticle", methods=["POST"])
def get_original_article():
    """
    Retrieves the original article based on the provided URL.

    Returns:
        The original article.
    """
    article = ArticleModel(request.get_json().get("url"), None, None)
    return articleService.get_original_article(article)


@article_route.route("/targetArticle", methods=["POST"])
def get_target_article():
    article = ArticleModel(request.get_json().get("url"), None, None)
    return articleService.fetch_target_article(article, "en")
