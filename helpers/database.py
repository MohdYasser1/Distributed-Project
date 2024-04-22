# modules
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
# constants
SQLALCHEMY_DATABASE_URL = "sqlite:///./shop.db"

# setup database
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class DatabaseHandler:
    @staticmethod
    def getBase():
        return Base
    
    @staticmethod
    def getEngine():
        return engine
    
    @staticmethod
    def getSession():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()