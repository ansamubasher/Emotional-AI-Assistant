from flask import Flask
from flask_cors import CORS

# import routes
from flask_api.routes.empathy_routes import empathy_bp
from flask_api.routes.stress_routes import stress_bp
from flask_api.routes.recommendation_routes import recommendation_bp

import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def create_app():
    app = Flask(__name__)
    CORS(app)

    # register routes
    app.register_blueprint(empathy_bp, url_prefix="/api/empathy")
    app.register_blueprint(stress_bp, url_prefix="/api/stress")
    app.register_blueprint(recommendation_bp, url_prefix="/api/recommend")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)