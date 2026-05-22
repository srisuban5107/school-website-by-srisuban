from flask_bcrypt import Bcrypt
from db.connection import get_connection

bcrypt = Bcrypt()

conn = get_connection()
cursor = conn.cursor()

hashed_pw = bcrypt.generate_password_hash("12345").decode("utf-8")

cursor.execute("""
INSERT INTO users (name, email, password, role)
VALUES (%s, %s, %s, %s)
""", ("Student One", "student1@gmail.com", hashed_pw, "student"))

conn.commit()
conn.close()

print("User created")