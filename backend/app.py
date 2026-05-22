from flask import Flask, jsonify, request
from backend.models.user_model import find_user

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = find_user(email)

    if not user:
        return jsonify({"status": "error", "message": "User not found"})

    if user["password"] != password:
        return jsonify({"status": "error", "message": "Wrong password"})

    return jsonify({
        "status": "success",
        "role": user["role"],
        "message": "Login successful"
    })

if __name__ == "__main__":
    app.run(debug=True)