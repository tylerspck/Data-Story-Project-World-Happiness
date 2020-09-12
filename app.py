import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, inspect


from flask import Flask, jsonify
from datetime import datetime as dt, datetime
from datetime import timedelta


from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:postgres@localhost:5432/happinessDB')

Base = automap_base()
Base.prepare(engine, reflect=True)

Base.classes.keys()

happiness = Base.classes.happiness
countrycodes = Base.classes.countrycodes
wbcountries = Base.classes.wbcountries

session = Session(engine)
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
    results2015 = session.query(happiness).filter(happiness.year('2015')).all()

    #Return the JSON representation of your dictionary.
    return jasonify(results2105)


@app.route("/api/v1.0/2016")
def happiness2016():

    results2016 = session.query(happiness).filter(happiness.year('2016')).all()

    return jasonify(results2016)


@app.route("/api/v1.0/2017")
def happiness2017():

    results2017 = session.query(happiness).filter(happiness.year('2017')).all()

    return jasonify(results2017)


@app.route("/api/v1.0/2018")
def happiness2018():

    results2018 = session.query(happiness).filter(happiness.year('2018')).all()

    return jasonify(results2018)

@app.route("/api/v1.0/2019")
def happiness2019():

    results2019 = session.query(happiness).filter(happiness.year('2019')).all()

    return jasonify(results2019)


@app.route("/api/v1.0/2020")
def happiness2020():
    
    results2020 = session.query(happiness).filter(happiness.year('2020')).all()

    return jasonify(results2020)

@app.route("/api/v1.0/All")
def happinessAll():

     resultsall = session.query(happiness).all()
    
    return jasonify(resultsall)


if __name__ == '__main__':
    app.run(debug=True)
