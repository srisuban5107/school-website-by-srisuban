import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS   

# routes
from routes.admin_routes import admin_bp
from routes.attendance_routes import attendance_bp
from routes.auth_routes import auth_bp
from routes.gallery_routes import gallery_bp
from routes.parent_routes import parent_bp
from routes.student_routes import student_bp
from routes.teacher_routes import teacher_bp

# DB + models
from models.user_model import find_user

# JWT helper
from utils.jwt_helper import create_token, verify_token


# ---------------- APP INIT ----------------
app = Flask(__name__)
CORS(app)   
bcrypt = Bcrypt(app)

SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")


# ---------------- HOME ----------------
@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid request"}), 400

    email = data.get("email")
    password = data.get("password")

    user = find_user(email)

    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    # bcrypt password check
    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"status": "error", "message": "Wrong password"}), 401

    # JWT token creation
    token = create_token({
        "id": user["id"],
        "role": user["role"]
    })

    return jsonify({
        "status": "success",
        "message": "Login successful",
        "role": user["role"],
        "name": user["name"],
        "token": token
    })


# ---------------- PROTECTED ROUTE TEST ----------------
@app.route("/me", methods=["GET"])
def me():
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({"error": "Token missing"}), 401

    decoded = verify_token(token)

    if not decoded:
        return jsonify({"error": "Invalid token"}), 401

    return jsonify({
        "message": "Valid user",
        "user": decoded
    })


# ---------------- BLUEPRINTS ----------------
app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(gallery_bp, url_prefix="/gallery")
app.register_blueprint(attendance_bp, url_prefix="/attendance")
app.register_blueprint(parent_bp, url_prefix="/parent")
app.register_blueprint(student_bp, url_prefix="/student")
app.register_blueprint(teacher_bp, url_prefix="/teacher")


# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)