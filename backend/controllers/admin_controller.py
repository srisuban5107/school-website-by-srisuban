from backend.models.user_model import find_user
from backend.models.student_model import get_all_students
from backend.models.teacher_model import get_teacher
from backend.models.attendance_model import get_attendance


# 📊 Admin dashboard data
def get_dashboard_data():
    return {
        "message": "Admin Dashboard",
        "total_students": len(get_all_students())
    }


# 👤 Add user (logic only, DB handled in model later)
def add_user_logic(user_data):
    return {
        "message": "User added successfully",
        "user": user_data
    }


# ❌ Delete user logic (placeholder for DB delete)
def delete_user_logic(user_id):
    return {
        "message": f"User {user_id} deleted successfully"
    }


# 📚 Get all students (admin view)
def fetch_all_students():
    return get_all_students()


# 👨‍🏫 Get teacher info
def fetch_teacher(teacher_id):
    return get_teacher(teacher_id)


# 📊 Get student attendance (admin view)
def fetch_attendance(student_id):
    return get_attendance(student_id)