from flask import Blueprint, request, jsonify

from controllers.auth_controller import register_user, login_user
from utils.jwt_helper import verify_token
from db.connection import get_connection

auth_bp = Blueprint("auth", __name__)


# =========================
# GET USER FROM DB
# =========================
def get_user_by_id(user_id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT user_id, name, email, role, role_code
        FROM users
        WHERE user_id = %s
    """, (user_id,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        return None

    return {
        "user_id": row[0],
        "name": row[1],
        "email": row[2],
        "role": row[3],
        "role_code": row[4]
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
        return jsonify({"status": "error", "message": "Token missing"}), 401

    if not role_code:
        return jsonify({"status": "error", "message": "Role code missing"}), 400

    # decode token
    payload = verify_token(token)

    if not payload:
        return jsonify({"status": "error", "message": "Invalid token"}), 401


    user_id = payload.get("id")  

    if not user_id:
        return jsonify({"status": "error", "message": "User id missing in token"}), 401

    user = get_user_by_id(user_id)

    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    if role_code != user["role_code"]:
        return jsonify({
            "status": "error",
            "message": "Wrong role code"
        }), 403

    return jsonify({
        "status": "success",
        "message": "Role verified",
        "role": user["role"]
    }), 200