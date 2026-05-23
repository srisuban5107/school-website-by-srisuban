from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


# HASH PASSWORD
def hash_password(password):

    return generate_password_hash(password)


# VERIFY PASSWORD
def verify_password(
    plain_password,
    hashed_password
):

    return check_password_hash(
        hashed_password,
        plain_password
    )