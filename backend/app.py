import sys
import os

# =========================
# PATH FIx
# =========================
sys.path.append(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

# =========================
# ENV LOAD
# =========================
from dotenv import load_dotenv
load_dotenv()

# =========================
# FLASK IMPORTS
# =========================
from flask import Flask, jsonify, request
from flask_cors import CORS

# =========================
# ROUTES
# =========================
from routes.admin_routes import admin_bp
from routes.attendance_routes import attendance_bp
from routes.auth_routes import auth_bp
from routes.gallery_routes import gallery_bp
from routes.parent_routes import parent_bp
from routes.student_routes import student_bp
from routes.teacher_routes import teacher_bp

# =========================
# JWT HELPER
# =========================
from utils.jwt_helper import verify_token

# =========================
# APP INIT
# =========================
app = Flask(__name__)

CORS(app)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key")


# =========================
# HOME ROUTE
# =========================
@app.route("/")
def home():
    return jsonify({
        "message": "Backend is running!"
    })


# =========================
# PROTECTED ROUTE (/me)
# =========================
@app.route("/me", methods=["GET"])
def me():

    token = request.headers.get("Authorization")

    if not token:
        return jsonify({
            "error": "Token missing"
        }), 401

    # REMOVE "Bearer " PREFIX
    if token.startswith("Bearer "):
        token = token.split(" ")[1]

    decoded = verify_token(token)

    if not decoded:
        return jsonify({
            "error": "Invalid token"
        }), 401

    return jsonify({
        "message": "Valid user",
        "user": decoded
    })


# =========================
# BLUEPRINT REGISTRATION
# =========================
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(attendance_bp, url_prefix="/attendance")
app.register_blueprint(gallery_bp, url_prefix="/gallery")
app.register_blueprint(parent_bp, url_prefix="/parent")
app.register_blueprint(student_bp, url_prefix="/student")
app.register_blueprint(teacher_bp, url_prefix="/teacher")


# =========================
# RUN SERVER  python backend/app.py
# =========================
if __name__ == "__main__":
    app.run(debug=True)