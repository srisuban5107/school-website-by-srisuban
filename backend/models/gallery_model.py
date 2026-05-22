from db.connection import get_connection


def save_image(filename, event_name):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO gallery (filename, event_name) VALUES (%s,%s)",
        (filename, event_name)
    )

    conn.commit()
    cursor.close()
    conn.close()


def get_images():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM gallery")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return data