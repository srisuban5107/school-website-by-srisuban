from db.connection import get_connection


def get_teacher(teacher_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM teachers WHERE id=%s",
        (teacher_id,)
    )

    teacher = cursor.fetchone()

    cursor.close()
    conn.close()

    return teacher