from flask import Blueprint, request, jsonify
from models.companion_int import generate_response   # 👈 YOUR MODEL

empathy_bp = Blueprint("empathy", __name__)

@empathy_bp.route("/", methods=["POST"])
def empathy():
    data = request.get_json()
    user_input = data.get("text")

    response = generate_response(user_input)

    return jsonify({
        "response": response
    })