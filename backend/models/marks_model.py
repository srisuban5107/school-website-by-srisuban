from db.connection import get_connection


def add_marks(student_id, subject, marks):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO marks (student_id, subject, marks) VALUES (%s,%s,%s)",
        (student_id, subject, marks)
    )

    conn.commit()
    cursor.close()
    conn.close()


def get_marks(student_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM marks WHERE student_id=%s",
        (student_id,)
    )

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data