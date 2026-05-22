from flask import Blueprint, jsonify

parent_bp = Blueprint("parent", __name__)


@parent_bp.route("/dashboard", methods=["GET"])
def parent_dashboard():
    return jsonify({"message": "Parent Dashboard"})


@parent_bp.route("/child/<int:student_id>", methods=["GET"])
def child_info(student_id):
    return jsonify({
        "student_id": student_id,
        "attendance": "90%"
    })


@parent_bp.route("/child-marks/<int:student_id>", methods=["GET"])
def child_marks(student_id):
    return jsonify({
        "student_id": student_id,
        "marks": [75, 88, 92]
    })