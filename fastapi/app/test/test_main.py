from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_fetch_target_article():
    response = client.post("/api/v1/article/original")
    assert response.status_code == 200

def test_get_list_of_target_languages_for_water_scarcity_page():
    response = client.post("/api/v1/article/languages")
    assert response.status_code == 200

