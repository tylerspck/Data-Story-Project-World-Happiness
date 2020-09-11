import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, inspect
from models import db

from flask import Flask, jsonify
from datetime import datetime as dt, datetime
from datetime import timedelta


DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(
    user=postgres, pw=postgres, url=POSTGRES_URL, db=happinessDB)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
# silence the deprecation warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

db.init_app(app)
app = Flask(_name_)
