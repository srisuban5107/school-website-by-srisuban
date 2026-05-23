from flask import Blueprint, request, jsonify

from controllers.auth_controller import (
    register_user,
    login_user
)

from utils.jwt_helper import verify_token


# =========================
# BLUEPRINT
# =========================
auth_bp = Blueprint("auth", __name__)


# =========================
# ROLE CODES
# =========================
ROLE_CODES = {
    "student": "STU-2026",
    "teacher": "TCH-2026",
    "admin": "ADM-2026",
    "parent": "PAR-2026"
}


# =========================
# REGISTER
# =========================
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    response, status = register_user(data)

    return jsonify(response), status


# =========================
# LOGIN
# =========================
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    response, status = login_user(data)

    return jsonify(response), status


# =========================
# VERIFY ROLE CODE
# =========================
@auth_bp.route("/verify-role", methods=["POST"])
def verify_role():

    data = request.get_json()

    token = data.get("token")

    role_code = data.get("roleCode")

    if not token:
        return jsonify({
            "status": "error",
            "message": "Token missing"
        }), 401

    payload = verify_token(token)

    if not payload:
        return jsonify({
            "status": "error",
            "message": "Invalid token"
        }), 401

    user_role = payload.get("role")

    expected_code = ROLE_CODES.get(user_role)

    if role_code != expected_code:
        return jsonify({
            "status": "error",
            "message": "Wrong role code"
        }), 403

    return jsonify({
        "status": "success",
        "message": "Role verified",
        "role": user_role
    }), 200