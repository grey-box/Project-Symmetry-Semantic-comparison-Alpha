from flask import Blueprint, make_response, request
from flaskr.services import articleService
import json
from flaskr.models.articleModel import ArticleModel
from flaskr.models.requestModel import RequestModel
from flaskr.services import translateService

translate_route = Blueprint("translate_route", __name__, url_prefix="/translate")


# TODO:make a method to put the initialize request object
@translate_route.route("/sourceArticle", methods=["POST"])
def get_list_of_target_article_languages():
    translateArticleRequestObject = initialize_request_object(request)
    if translateArticleRequestObject.get_targetArticleLanguage() == "":
        return make_response(
            translateService.fetch_source_article_languages(
                translateArticleRequestObject
            ).toJson(),
            200,
        )
    return make_response(
        translateService.get_translated_article(translateArticleRequestObject), 200
    )


@translate_route.route("/settingsCheck", methods=["POST"])
def get_source_article():
    initialized_request_object = initialize_request_object(request)
    return make_response({"message": "Settings are valid"}, 200)


def initialize_request_object(requestObj) -> RequestModel:
    initialized_request_object = RequestModel(
        requestObj.get_json().get("sourceArticleUrl"),
        requestObj.get_json().get("targetLanguage"),
        requestObj.get_json().get("translationTool"),
        requestObj.get_json().get("deepLApiKey"),
    )
    return initialized_request_object


# TODO: see what flask has as a middleware built in
