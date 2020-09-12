import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, inspect


from flask import Flask, jsonify
from datetime import datetime as dt, datetime
from datetime import timedelta


# DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(
#     user=postgres, pw=postgres, url=POSTGRES_URL, db=happinessDB)

# app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
# # silence the deprecation warning
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# db.init_app(app)
# app = Flask(_name_)

# Flask Setup
app = Flask(__name__)

@app.route("/")
def homepage():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/2015<br/>"
        f"/api/v1.0/2016<br/>"
        f"/api/v1.0/2017<br/>"
        f"/api/v1.0/2018<br/>"
        f"/api/v1.0/2019<br/>"
        f"/api/v1.0/2020<br/>"
        f"/api/v1.0/All<br/>"
    )


@app.route("/api/v1.0/2015")
def happiness2015():
    # Create our session (link) from Python to the DB
    """Convert the query results to a dictionary using date as the key and prcp as the value."""
    # Query all passengers
    # results = session.query(measurement.date, measurement.prcp).\
    #     order_by(measurement.date).all()

    # session.close()

    # datalist = []

    # for date, prcp in results:
    #     newlist = {}
    #     newlist[date] = prcp
    #     datalist.append(newlist)

    #Return the JSON representation of your dictionary.
    return ()


@app.route("/api/v1.0/2016")
def happiness2016():

    return("hello")


@app.route("/api/v1.0/2017")
def happiness2017():

    return()


@app.route("/api/v1.0/2018")
def happiness2018():

    return()

@app.route("/api/v1.0/2019")
def happiness2019():

    return()


@app.route("/api/v1.0/2020")
def happiness2020():

    return()

@app.route("/api/v1.0/All")
def happinessAll():
    
    return()


if __name__ == '__main__':
    app.run(debug=True)
