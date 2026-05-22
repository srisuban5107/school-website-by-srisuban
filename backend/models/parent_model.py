from backend.db.connection import get_connection


def get_parent(parent_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM parents WHERE id=%s",
        (parent_id,)
    )

    parent = cursor.fetchone()

    cursor.close()
    conn.close()

    return parent


def get_children(parent_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM students WHERE parent_id=%s",
        (parent_id,)
    )

    children = cursor.fetchall()

    cursor.close()
    conn.close()

    return children