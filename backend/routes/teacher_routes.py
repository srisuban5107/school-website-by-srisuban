from flask import Blueprint, request, jsonify

teacher_bp = Blueprint("teacher", __name__)


# Teacher dashboard
@teacher_bp.route("/dashboard", methods=["GET"])
def teacher_dashboard():
    return jsonify({"message": "Teacher Dashboard"})


# Add marks
@teacher_bp.route("/add-marks", methods=["POST"])
def add_marks():
    data = request.get_json()

    return jsonify({
        "message": "Marks Added",
        "data": data
    })


# Upload notes
@teacher_bp.route("/upload-notes", methods=["POST"])
def upload_notes():
    data = request.get_json()

    return jsonify({
        "message": "Notes Uploaded",
        "data": data
    })