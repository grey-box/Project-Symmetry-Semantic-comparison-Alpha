"""
Initializes and runs the Flask application from the `flaskr` package on localhost at port 5000. 
"""
from flaskr import create_app

if __name__ == '__main__':
    app=create_app()
    app.run(host='127.0.0.1', port=5000)