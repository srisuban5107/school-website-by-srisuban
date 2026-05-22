from backend.models.teacher_model import get_teacher


def fetch_teacher(teacher_id):
    return get_teacher(teacher_id)