from flask import Flask
from flask_cors import CORS
from flaskr.controllers.articleController import article_route

def create_app():
    """
    Create and configure an instance of the Flask application.

    Enables CORS (Cross-Origin Resource Sharing) to allow requests from web applications
    hosted on different domains. Registers the `article_route` blueprint to manage article-related routes.

    Returns:
        Flask app: The configured Flask application instance.
    """
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(article_route)
    return app
