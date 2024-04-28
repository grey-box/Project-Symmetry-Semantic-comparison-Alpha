import pytest
from flaskr import create_app


@pytest.fixture
def app():
    app = create_app()
    yield app


@pytest.fixture
def client(app):
    return app.test_client()


def test_get_article(client):
    data = {"sourceArticleUrl": "https://en.wikipedia.org/wiki/Water_scarcity"}
    response = client.post("/test", json=data)
    assert response.status_code == 200
    assert response.is_json


def test_translate_controller_source_article(client):
    data = {
        "sourceArticleUrl": "https://en.wikipedia.org/wiki/Water_scarcity",
        "targetLanguage": "https://fr.wikipedia.org/wiki/Stress_hydrique_(%C3%A9cologie)",
        "translationTool": "google",
        "deepLApiKey": "apiKey",
    }
    response = client.post("/translate/sourceArticle", json=data)
    assert response.status_code == 200
    assert response.is_json


def test_translate_controller_settings_check(client):
    data = {
        "sourceArticleUrl": "https://en.wikipedia.org/wiki/Water_scarcity",
        "targetLanguage": "https://fr.wikipedia.org/wiki/Stress_hydrique_(%C3%A9cologie)",
        "translationTool": "google",
        "deepLApiKey": "apiKey",
    }
    response = client.post("/translate/settingsCheck", json=data)
    assert response.status_code == 200
    assert response.is_json
