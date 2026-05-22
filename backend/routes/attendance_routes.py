from flask import Blueprint, jsonify, request

attendance_bp = Blueprint("attendance", __name__)


@attendance_bp.route("/mark", methods=["POST"])
def mark_attendance():
    data = request.get_json()

    return jsonify({
        "message": "Attendance Marked",
        "data": data
    })


@attendance_bp.route("/student/<int:student_id>", methods=["GET"])
def get_attendance(student_id):
    return jsonify({
        "student_id": student_id,
        "attendance": "92%"
    })


@attendance_bp.route("/percentage/<int:student_id>", methods=["GET"])
def attendance_percentage(student_id):
    return jsonify({
        "student_id": student_id,
        "percentage": "90%"
    })