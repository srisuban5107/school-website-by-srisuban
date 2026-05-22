from backend.db.connection import get_connection


def mark_attendance(student_id, status, date):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO attendance (student_id, status, date) VALUES (%s,%s,%s)",
        (student_id, status, date)
    )

    conn.commit()
    cursor.close()
    conn.close()


def get_attendance(student_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM attendance WHERE student_id=%s",
        (student_id,)
    )

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data