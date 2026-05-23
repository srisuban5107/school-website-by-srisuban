from db.connection import get_connection
from utils.password_hash import hash_password

conn = get_connection()
cursor = conn.cursor()

try:
    users = [
        ("Student One", "student1@gmail.com", hash_password("12345"), "student", "STU-2026"),
        ("Student Two", "student2@gmail.com", hash_password("12345"), "student", "STU-2026"),

        ("Teacher One", "teacher1@gmail.com", hash_password("12345"), "teacher", "TCH-2026"),
        ("Teacher Two", "teacher2@gmail.com", hash_password("12345"), "teacher", "TCH-2026"),

        ("Admin One", "admin1@gmail.com", hash_password("12345"), "admin", "ADM-2026"),

        ("Parent One", "parent1@gmail.com", hash_password("12345"), "parent", "PAR-2026"),
        ("Parent Two", "parent2@gmail.com", hash_password("12345"), "parent", "PAR-2026"),
    ]

    cursor.executemany("""
        INSERT INTO users
        (name, email, password, role, role_code)
        VALUES (%s, %s, %s, %s, %s)
    """, users)

    conn.commit()

    print("✅ Multiple users created successfully")

except Exception as e:
    print("❌ Error:", e)

finally:
    cursor.close()
    conn.close()