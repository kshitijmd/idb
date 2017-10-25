from .models import db


def reset_db():
    db.drop_all()
    db.create_all()
