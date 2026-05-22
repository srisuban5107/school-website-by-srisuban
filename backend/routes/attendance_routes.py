from fastapi import APIRouter

router = APIRouter()

@router.post("/mark")
def mark_attendance():
    return {"message": "Attendance Marked"}

@router.get("/student/{student_id}")
def get_attendance(student_id: int):
    return {"student_id": student_id, "attendance": "92%"}

@router.get("/percentage/{student_id}")
def attendance_percentage(student_id: int):
    return {"student_id": student_id, "percentage": "90%"}