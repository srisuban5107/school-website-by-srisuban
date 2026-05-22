from flask import Blueprint, jsonify

student_bp = Blueprint("student", __name__)


@student_bp.route("/profile/<int:student_id>", methods=["GET"])
def student_profile(student_id):
    return jsonify({
        "student_id": student_id,
        "name": "Student Name"
    })


@student_bp.route("/marks/<int:student_id>", methods=["GET"])
def student_marks(student_id):
    return jsonify({
        "student_id": student_id,
        "marks": [80, 90, 85]
    })


@student_bp.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({"message": "Student Dashboard"})