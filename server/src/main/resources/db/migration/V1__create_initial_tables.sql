CREATE SCHEMA car;

CREATE TABLE car.users
(
    id       SERIAL PRIMARY KEY,
    name     TEXT UNIQUE,
    password TEXT,
    role     TEXT
);

CREATE TABLE car.routes
(
    id          SERIAL PRIMARY KEY,
    description TEXT UNIQUE,
    index       SMALLINT
);

CREATE TABLE car.trips
(
    id               SERIAL PRIMARY KEY,
    date             TIMESTAMP NOT NULL,
    start_kilometers INTEGER   NOT NULL,
    end_kilometers   INTEGER   NOT NULL,
    route            TEXT REFERENCES car.routes (description),
    start_time       TIMESTAMP NOT NULL,
    end_time         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);