from models.attendance_model import mark_attendance, get_attendance


def mark(student_id, status, date):
    mark_attendance(student_id, status, date)
    return {"message": "Attendance marked"}


def fetch(student_id):
    return get_attendance(student_id)