from flask import Blueprint, request, jsonify, send_from_directory
import os
import uuid

gallery_bp = Blueprint("gallery", __name__)

UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# UPLOAD IMAGE
@gallery_bp.route("/upload", methods=["POST"])
def upload_image():
    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    file_ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    filename = f"{uuid.uuid4()}.{file_ext}"

    file_path = os.path.join(UPLOAD_DIR, filename)
    file.save(file_path)

    return jsonify({
        "message": "Image uploaded successfully",
        "filename": filename
    })


# GET ALL IMAGES
@gallery_bp.route("/", methods=["GET"])
def get_images():
    files = os.listdir(UPLOAD_DIR)

    images = []
    for f in files:
        images.append({
            "filename": f,
            "url": f"/gallery/files/{f}"
        })

    return jsonify({"images": images})


# SERVE IMAGE FILE
@gallery_bp.route("/files/<filename>", methods=["GET"])
def get_file(filename):
    return send_from_directory(UPLOAD_DIR, filename)


# DELETE IMAGE
@gallery_bp.route("/delete/<filename>", methods=["DELETE"])
def delete_image(filename):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404

    os.remove(file_path)

    return jsonify({"message": "Image deleted successfully"})