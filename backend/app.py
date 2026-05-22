from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
import jwt
import datetime
import os
from routes.admin_routes import admin_bp
from routes.attendance_routes import attendance_bp
from flask_mysqldb import MySQL
from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
from backend.models.user_model import find_user
from routes.auth_routes import auth_bp
from routes.gallery_routes import gallery_bp
from routes.parent_routes import parent_bp
from routes.student_routes import student_bp
from routes.teacher_routes import teacher_bp

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Register blueprints
app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(gallery_bp, url_prefix="/gallery")
app.register_blueprint(attendance_bp, url_prefix="/attendance")
app.register_blueprint(parent_bp, url_prefix="/parent")
app.register_blueprint(student_bp, url_prefix="/student")
app.register_blueprint(teacher_bp, url_prefix="/teacher")
# SECRET KEY from env
SECRET_KEY = os.getenv("SECRET_KEY", "school_secret_key")

# MySQL config
app.config['MYSQL_HOST'] = DB_HOST
app.config['MYSQL_USER'] = DB_USER
app.config['MYSQL_PASSWORD'] = DB_PASSWORD
app.config['MYSQL_DB'] = DB_NAME

mysql = MySQL(app)


@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})


# JWT token
def create_token(user):
    payload = {
        "id": user["id"],
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return token


# LOGIN
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

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"status": "error", "message": "Wrong password"}), 401

    token = create_token(user)

    return jsonify({
        "status": "success",
        "role": user["role"],
        "token": token,
        "message": "Login successful"
    })


if __name__ == "__main__":
    app.run(debug=True)