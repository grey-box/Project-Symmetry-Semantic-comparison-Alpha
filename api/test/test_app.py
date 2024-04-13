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