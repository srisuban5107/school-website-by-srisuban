from db.connection import get_connection
from utils.password_hash import hash_password

conn = get_connection()
cursor = conn.cursor()

# DELETE OLD USERS
cursor.execute("DELETE FROM users")

hashed_pw = hash_password("12345")

cursor.execute("""
INSERT INTO users
(name, email, password, role)
VALUES (%s, %s, %s, %s)
""", (
    "Student One",
    "student1@gmail.com",
    hashed_pw,
    "student"
))

conn.commit()

cursor.close()
conn.close()

print("User created successfully")