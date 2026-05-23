from db.connection import get_connection

def find_user(email):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT user_id, name, email, password, role, role_code
        FROM users
        WHERE email = %s
    """, (email,))

    row = cursor.fetchone()

    cursor.close()
    conn.close()

    if not row:
        return None

    return {
        "user_id": row[0],
        "name": row[1],
        "email": row[2],
        "password": row[3],
        "role": row[4],
        "role_code": row[5]
    }