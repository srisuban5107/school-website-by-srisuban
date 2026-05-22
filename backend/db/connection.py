import mysql.connector
from backend.config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

def get_connection():
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    return conn


# TEST CONNECTION (important)
if __name__ == "__main__":
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        print("✅ Connected to DB:", cursor.fetchone())
        conn.close()
    except Exception as e:
        print("❌ DB Error:", e)