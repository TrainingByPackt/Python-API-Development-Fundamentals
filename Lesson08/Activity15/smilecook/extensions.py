from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_uploads import UploadSet, IMAGES

db = SQLAlchemy()
jwt = JWTManager()
image_set = UploadSet('images', IMAGES)
