from flask import Blueprint, request
from flaskr.services import articleService

article_route = Blueprint("product_route", __name__, url_prefix="/test")


@article_route.route("", methods=["POST"])
def get_article():
    data = request.get_json()
    url = data.get("sourceArticleUrl")
    return articleService.get_article(url)
