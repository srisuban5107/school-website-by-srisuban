from fastapi import APIRouter

router = APIRouter()

@router.post("/register")
def register():
    return {"message": "User Registered"}

@router.post("/login")
def login():
    return {"message": "User Logged In"}

@router.get("/me")
def get_user():
    return {"user": "current user data"}