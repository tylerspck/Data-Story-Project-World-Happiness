CREATE TABLE HAPPINESS (
    INDEX int NOT NULL,
    COUNTRY varchar(50) NOT NULL,
    HAPPINESS_RANK int NOT NULL,
    YEAR int NOT NULL,
    HAPPINESS_SCORE float NOT NULL,
    ECONOMY float,
    FAMILY float,
    HEALTH float,
    FREEDOM float,
    TRUST float,
    GENEROSITY float,
    PRIMARY KEY (INDEX)
    );

CREATE TABLE COUNTRYCODES (
    INDEX int NOT NULL,
    COUNTRY varchar(50) NOT NULL,
    COUNTRYCODE varchar(20) NOT NULL,
    POPULATION bigint NOT NULL,
    AREA bigint NOT NULL,
    GDP varchar(50),
    ALPHA2 varchar(2),
    ALPHA3 varchar(3),
    PRIMARY KEY (INDEX)
);