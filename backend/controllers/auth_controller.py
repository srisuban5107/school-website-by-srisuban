from backend.models.user_model import find_user
from backend.utils.password_hash import verify_password


def login_user(email, password):
    user = find_user(email)

    if not user:
        return {"error": "User not found"}

    if not verify_password(password, user["password"]):
        return {"error": "Wrong password"}

    return {
        "message": "Login success",
        "user": user
    }