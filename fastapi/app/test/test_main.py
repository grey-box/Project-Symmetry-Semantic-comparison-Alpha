from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_fetch_target_article_water_scarcity_is_200():
    response = client.post("/api/v1/article/original/",json ={ "address":"https://en.wikipedia.org/wiki/water_scarcity"})
    assert response.status_code == 200

def test_get_list_of_target_languages_for_water_scarcity_page():
    response = client.post("/api/v1/article/original/languages",json ={ "address":"https://en.wikipedia.org/wiki/water_scarcity"})
    assert response.status_code == 200

def test_get_target_language_article_of_the_orginial_article():
    response = client.post("/api/v1/article/original/targetLanguageArticle",json ={ "address":"https://en.wikipedia.org/wiki/water_scarcity"})
    assert response.status_code == 200