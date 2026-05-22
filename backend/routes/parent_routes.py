from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
def parent_dashboard():
    return {"message": "Parent Dashboard"}

@router.get("/child/{student_id}")
def child_info(student_id: int):
    return {"student_id": student_id, "attendance": "90%"}

@router.get("/child-marks/{student_id}")
def child_marks(student_id: int):
    return {"marks": [75, 88, 92]}