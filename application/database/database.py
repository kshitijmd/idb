from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
engine = create_engine(
    'postgresql://localhost:5432/playlistr', convert_unicode=True)
db_session = scoped_session(sessionmaker(
    autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    import database.models
    Base.metadata.create_all(bind=engine)


"""
    WARNING!!!! Calling this resets the entire public schema.
    All data and tables not described in init_db will be destroyed.
"""


def reset_db():
    engine.execute("drop schema public cascade;")
    engine.execute("create schema public;")
    init_db()
