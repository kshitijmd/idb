from .models import db


def init_db():
    db.create_all()


def reset_db():
    db.drop_all()
    init_db()
