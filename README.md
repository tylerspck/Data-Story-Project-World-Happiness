# The Story of World Happiness
September 7 2020

## Group Members
Dhara Bhansali, Sarah Grant, Tyler Speck, Matt Debnar

## Topic
The story of world happiness for the past 6 years.

## Data Sets
World Happiness Report: https://www.kaggle.com/mathurinache/world-happiness-report

ETL steps
1. download CSVs
2. Standardize columns
3. Write Postgres schema.sql
4. Import

World ISO Codes for scraping! https://countrycode.org/ 

Scrape table, store country name & ISOs

World Bank API: https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries

Write script to lookup data based on ISO code and store in DB
Investigate more World Bank datasets

## Inspiration
The current state of the world.

## Visuals
Global Chloropleth Map with Yearly Transitions & Capital Markers

Happiness Trends grouping data by country with sparklines

Comparison: Graph Countries by Year by factors

Comparison: Happiness over years overall trend

## Database ERD
![test/HAPPINESSDB_ERD.png](test/HAPPINESSDB_ERD.png)

## Available APIs from localhost:5000 Flash app.py
Available Routes:
- /api/v1.0/All 
- /api/v1.0/2015 
- /api/v1.0/2016 
- /api/v1.0/2017 
- /api/v1.0/2018 
- /api/v1.0/2019 
- /api/v1.0/2020 

