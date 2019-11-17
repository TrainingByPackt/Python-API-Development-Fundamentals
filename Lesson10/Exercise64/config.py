import os


class Config:
    DEBUG = False

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ERROR_MESSAGE_KEY = 'message'

    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    UPLOADED_IMAGES_DEST = 'static/images'

    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 10 * 60

    RATELIMIT_HEADERS_ENABLED = True


class DevelopmentConfig(Config):
    DEBUG = True

    SECRET_KEY = 'super-secret-key'

    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://your_name:your_password@localhost:5432/smilecook'


class StagingConfig(Config):
    SECRET_KEY = os.environ.get('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


class ProductionConfig(Config):

    SECRET_KEY = os.environ.get('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
