from models.student_model import get_student, get_all_students


def fetch_student(student_id):
    return get_student(student_id)


def fetch_all_students():
    return get_all_students()