from db.connection import get_connection
from models.user_model import find_user
from utils.password_hash import hash_password, verify_password
from utils.jwt_helper import create_token


# =========================
# REGISTER LOGIC
# =========================
def register_user(data):

    try:
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role")

        if not all([name, email, password, role]):
            return {"message": "Missing fields"}, 400

        hashed_pw = hash_password(password)

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            "INSERT INTO users (name,email,password,role) VALUES (%s,%s,%s,%s)",
            (name, email, hashed_pw, role)
        )

        conn.commit()
        cursor.close()
        conn.close()

        return {"message": "User registered successfully"}, 201

    except Exception as e:
        return {"message": str(e)}, 500


# =========================
# LOGIN LOGIC
# =========================
def login_user(data):

    email = data.get("email")
    password = data.get("password")

    user = find_user(email)

    if not user:
        return {"message": "User not found"}, 404

    if not verify_password(password, user["password"]):
        return {"message": "Wrong password"}, 401

    token = create_token({
        "id": user["id"],
        "role": user["role"]
    })

    return {
        "message": "Login success",
        "token": token,
        "role": user["role"],
        "name": user["name"]
    }, 200