from flask import Blueprint, request
from flaskr.services import articleService
import json

article_route = Blueprint('product_route', __name__,url_prefix="/test")

@article_route.route("",methods=['POST'])
def get_article():
    data=request.get_json()
    url=data.get('url')
    return {"message":"post request test"}
    








     