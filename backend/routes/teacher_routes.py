from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
def teacher_dashboard():
    return {"message": "Teacher Dashboard"}

@router.post("/add-marks")
def add_marks():
    return {"message": "Marks Added"}

@router.post("/upload-notes")
def upload_notes():
    return {"message": "Notes Uploaded"}