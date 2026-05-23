import mysql.connector
from config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME


def get_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )


# TEST CONNECTION
if __name__ == "__main__":
    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT DATABASE();")
        db = cursor.fetchone()

        print("✅ Connected to DB:", db)

        cursor.close()
        conn.close()

    except Exception as e:
        print("❌ DB Error:", e)