from flask import make_response
from flaskr.scripts import scrape,translation,bleuScore,colors
import json

def get_article(url):

    
    
    # 3.translate the english article to french
    # 4.compare the differences between the original french article and english translated to french article
    
    # 1.get the french article
    try:
        article=scrape.getArticle(url)
    except Exception as e:
        return make_response({"Error getting original article":str(e)},404)
    # 2.get the english version of that article
    try:
        article['secondLanguage']=scrape.getArticle("https://en.wikipedia.org/wiki/Water_scarcity")

    except Exception as e: 
        return make_response({"Error getting 2nd language article":str(e)},404)

    try:
        translatedArticle=translation.translate("fr",article['secondLanguage']['text'],"Google translate","")
        article['translatedSecondLanguage']=translatedArticle
        colorsGenerated = colors.gen_colors()
        article['comparisonInfo']=bleuScore.compare(article['text'],article['translatedSecondLanguage'],colorsGenerated,0.1)
        return article
    except Exception as e:
        return make_response({"Error translating":str(e)},404)