from flask import Blueprint, make_response, request
from flaskr.services import articleService
import json
from flaskr.models.articleModel import ArticleModel
from flaskr.models.requestModel import RequestModel
from flaskr.services import translateService

translate_route = Blueprint("translate_route", __name__, url_prefix="/translate")


@translate_route.route("/sourceAndTarget", methods=["POST"])
def get_target_article():
    translateArticleRequestObject = RequestModel(
        request.get_json().get("sourceArticleUrl"),
        request.get_json().get("targetLanguage"),
        request.get_json().get("translationTool"),
        request.get_json().get("deepLApiKey"),
    )
    if translateArticleRequestObject.get_targetArticleLanguage() == "":
        return make_response(
            {"sourceArticle": "this is the article", "translationTool": ["en", "fr"]},
            200,
        )
    return make_response(
        translateService.get_translated_article(translateArticleRequestObject), 200
    )


@translate_route.route("/settingsCheck", methods=["POST"])
def get_source_article():
    translateArticleRequestObject = RequestModel(
        request.get_json().get("sourceArticleUrl"),
        request.get_json().get("targetLanguage"),
        request.get_json().get("translationTool"),
        request.get_json().get("deepLApiKey"),
    )
    return make_response({"message": "Settings are valid"}, 200)


# TODO: see what flask has as a middleware built in
def middlewareValidateSourceUrl(request: RequestModel) -> None:
    if not request:
        raise ValueError("Invalid request")
    # regex that its
