import uuid

from flask_uploads import extension

from passlib.hash import pbkdf2_sha256
from itsdangerous import URLSafeTimedSerializer

from flask import current_app

from extensions import image_set


def hash_password(password):
    return pbkdf2_sha256.hash(password)


def check_password(password, hashed):
    return pbkdf2_sha256.verify(password, hashed)


def generate_token(email, salt=None):
    serializer = URLSafeTimedSerializer(current_app.config.get('SECRET_KEY'))
    return serializer.dumps(email, salt=salt)


def verify_token(token, max_age=(30 * 60), salt=None):
    serializer = URLSafeTimedSerializer(current_app.config.get('SECRET_KEY'))
    try:
        email = serializer.loads(token, max_age=max_age, salt=salt)
    except:
        return False

    return email


def save_image(image, folder):

    filename = '{}.{}'.format(uuid.uuid4(), extension(image.filename))
    image_set.save(image, folder=folder, name=filename)

    return filename
