from functools import wraps
from flask import request, jsonify
from backend.utils.jwt_helper import verify_token


# =========================
# TOKEN MIDDLEWARE
# =========================
def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"message": "Token missing"}), 401

        # Safe token extraction
        parts = auth_header.split(" ")

        if len(parts) != 2 or parts[0] != "Bearer":
            return jsonify({"message": "Invalid token format"}), 401

        token = parts[1]

        payload = verify_token(token)

        if not payload:
            return jsonify({"message": "Invalid or expired token"}), 401

        request.user = payload  # attach user data

        return f(*args, **kwargs)

    return wrapper


# =========================
# ROLE MIDDLEWARE
# =========================
def role_required(role):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):

            user = getattr(request, "user", None)

            if not user:
                return jsonify({"message": "Unauthorized"}), 401

            if user.get("role") != role:
                return jsonify({"message": "Access denied"}), 403

            return f(*args, **kwargs)

        return wrapper
    return decorator