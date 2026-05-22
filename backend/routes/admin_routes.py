from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
def admin_dashboard():
    return {"message": "Admin Dashboard"}

@router.post("/add-user")
def add_user():
    return {"message": "User Added"}

@router.delete("/delete-user/{user_id}")
def delete_user(user_id: int):
    return {"message": f"User {user_id} deleted"}