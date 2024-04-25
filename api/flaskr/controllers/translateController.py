from flask import Blueprint, make_response, request
from flaskr.services import articleService
import json
from flaskr.models.articleModel import ArticleModel
from flaskr.models.requestModel import RequestModel
from flaskr.services import translateService

translate_route = Blueprint("translate_route", __name__, url_prefix="/translateArticle")


@translate_route.route("", methods=["POST"])
def get_target_article():
    translateArticleRequestObject = RequestModel(
        request.get_json().get("sourceArticleUrl"),
        request.get_json().get("targetLanguage"),
        request.get_json().get("translationTool"),
        request.get_json().get("deepLApiKey"),
    )
    try:
        validateRequest(translateArticleRequestObject)
        return translateService.get_translated_article(translateArticleRequestObject)
    except Exception as e:
        return make_response({"Error validating Request": str(e)}, 400)


def validateRequest(request: RequestModel) -> None:
    if not request:
        raise ValueError("Invalid request")
