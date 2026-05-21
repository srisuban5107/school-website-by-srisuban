from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    return jsonify({
        "status": "success",
        "user": data
    })

if __name__ == "__main__":
    app.run(debug=True)