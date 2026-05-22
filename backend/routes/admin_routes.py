from flask import Blueprint, jsonify, request

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/dashboard", methods=["GET"])
def admin_dashboard():
    return jsonify({"message": "Admin Dashboard"})


@admin_bp.route("/add-user", methods=["POST"])
def add_user():
    data = request.get_json()

    return jsonify({
        "message": "User Added",
        "data": data
    })


@admin_bp.route("/delete-user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    return jsonify({
        "message": f"User {user_id} deleted"
    })