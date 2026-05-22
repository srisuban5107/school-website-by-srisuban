from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    return jsonify({
        "message": "User Registered",
        "data": data
    })


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    return jsonify({
        "message": "User Logged In",
        "data": data
    })


@auth_bp.route("/me", methods=["GET"])
def get_user():
    return jsonify({
        "user": "current user data"
    })