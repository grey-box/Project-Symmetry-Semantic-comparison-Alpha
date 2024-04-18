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
    data = {'url': 'https://en.wikipedia.org/wiki/Water_scarcity'}
    response = client.post('/test', json=data)
    assert response.status_code == 200
    assert response.is_json

def test_get_original_article(client):
    """
    Test case for getting the original article.

    Args:
        client: The test client for making requests.

    Returns:
        None
    """
    data = {'url': 'https://en.wikipedia.org/wiki/Water_scarcity'}
    response = client.post('/test/originalArticle', json=data)
    assert response.status_code == 200
    assert response.is_json

