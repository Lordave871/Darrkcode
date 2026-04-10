import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DATABASE_NAME = os.getenv('DATABASE_NAME')
    DATABASE_HOST = os.getenv('DATABASE_HOST')
    DATABASE_USER = os.getenv('DATABASE_USER')
    DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')
    
    # Force the port to be an integer here
    # We use 13757 as the default based on your .env
    DATABASE_PORT = int(os.getenv('DATABASE_PORT', 13757)) 

    AT_API_KEY = os.getenv('AT_API_KEY')
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
