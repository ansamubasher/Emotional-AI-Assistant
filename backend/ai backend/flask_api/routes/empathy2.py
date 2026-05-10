from flask import Blueprint, request, jsonify
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from inference.companion_interfernce import generate_response   

empathy_bp = Blueprint("empathy", __name__)

@empathy_bp.route("/", methods=["POST"])
def empathy():
    data = request.get_json()
    user_input = data.get("text")

    response = generate_response(user_input)
 
    return jsonify({
        "response": response
    })