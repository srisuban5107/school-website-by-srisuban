from fastapi import APIRouter

router = APIRouter()

@router.get("/profile/{student_id}")
def student_profile(student_id: int):
    return {"student_id": student_id, "name": "Student Name"}

@router.get("/marks/{student_id}")
def student_marks(student_id: int):
    return {"student_id": student_id, "marks": [80, 90, 85]}

@router.get("/dashboard")
def dashboard():
    return {"message": "Student Dashboard"}