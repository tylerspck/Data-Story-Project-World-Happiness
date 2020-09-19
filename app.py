import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, inspect


from flask import Flask, jsonify
from datetime import datetime as dt, datetime
from datetime import timedelta
import psycopg2
import json
from flask_cors import CORS, cross_origin

engine = create_engine('postgresql://postgres:postgres@localhost:5432/happinessDB')
con = engine.connect()


# Flask Setup
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def homepage():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/All<br/>"
        f"/api/v1.0/2015<br/>"
        f"/api/v1.0/2016<br/>"
        f"/api/v1.0/2017<br/>"
        f"/api/v1.0/2018<br/>"
        f"/api/v1.0/2019<br/>"
        f"/api/v1.0/2020<br/>"
    )

@app.route("/api/v1.0/All")
def happinessAll():

    resultall = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel, alpha3 in resultall:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)
<<<<<<< HEAD

    return jsonify(results)

=======
        
    return jsonify(results)
>>>>>>> 39de0a0a7368a6e6056b8c7b9cf81f7978ee52bc

@app.route("/api/v1.0/2015")
def happiness2015():

    result2015 = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result where year=2015""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel, alpha3 in result2015:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)
        
    return jsonify(results)


    
@app.route("/api/v1.0/2016")
def happiness2016():

    result2016 = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result where year=2016""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel, alpha3 in result2016:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)

    return jsonify(results)


@app.route("/api/v1.0/2017")
def happiness2017():

    result2017 = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result where year=2017""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel, alpha3 in result2017:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)

    return jsonify(results)


@app.route("/api/v1.0/2018")
def happiness2018():

    result2018 = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result where year=2018""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel,alpha3 in result2018:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)

    return jsonify(results)

@app.route("/api/v1.0/2019")
def happiness2019():

    result2019 = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result where year=2019""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel, alpha3 in result2019:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)

    return jsonify(results)


@app.route("/api/v1.0/2020")
def happiness2020():
    
    result2020 = con.execute("""with result as (
        select h.country, wb.region, cc.countrycode, wb.capitalcity, wb.capitallat, wb.capitallong, h.happiness_rank, h.year, h.happiness_score, h.economy, h.family, h.health, h.freedom, h.trust, h.generosity, cc.population, cc.area, cc.gdp, wb.incomelevel, cc.alpha3 from countrycodes cc, happiness h, wbcountries wb where cc.country = h.country and cc.country= wb.country )
        select * from result where year=2020""")

    results = []

    for country, region, countrycode, capitalcity, capitallat, capitallong, happiness_rank, year, happiness_score, economy, family, health, freedom, trust, generosity, population, area, gdp, incomelevel, alpha3 in result2020:
                newjson = {}
                newjson["country"] = country
                newjson["region"] = region
                newjson["country code"] = countrycode
                newjson["capital city"] = capitalcity
                newjson["country"] = country
                newjson["latitude"] = capitallat
                newjson["longitude"] = capitallong
                newjson["happiness Rank"] = happiness_rank
                newjson["Year"] = year
                newjson["happiness_score"] = happiness_score
                newjson["economy"] = economy
                newjson["family"] = family
                newjson["health"] = health
                newjson["freedom"] = freedom
                newjson["trust"] = trust
                newjson["generosity"] = generosity
                newjson["population"] = population
                newjson["area"] = area
                newjson["gdp"] = gdp
                newjson["income level"] = incomelevel
                newjson["alpha3"] = alpha3
                results.append(newjson)

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
