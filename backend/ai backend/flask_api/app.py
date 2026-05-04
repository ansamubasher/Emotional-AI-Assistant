from flask import Flask
from flask_cors import CORS

# import routes
#from routes.empathy_routes import empathy_bp
#from routes.stress_routes import stress_bp
from routes.recommenderRoutes import recommendation_bp

import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def create_app():
    app = Flask(__name__)
    CORS(app)

    # register routes
    #app.register_blueprint(empathy_bp, url_prefix="/api/empathy")
    #app.register_blueprint(stress_bp, url_prefix="/api/stress")
    app.register_blueprint(recommendation_bp, url_prefix="/api/recommend")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5001)