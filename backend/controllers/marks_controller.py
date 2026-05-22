from models.marks_model import add_marks, get_marks


def add(student_id, subject, marks):
    add_marks(student_id, subject, marks)
    return {"message": "Marks added"}


def fetch(student_id):
    return get_marks(student_id)