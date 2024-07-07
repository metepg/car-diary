CREATE SCHEMA car;

CREATE TABLE car.users
(
    id       SERIAL PRIMARY KEY,
    name     TEXT UNIQUE,
    password TEXT,
    role     TEXT
);

CREATE TABLE car.areas
(
    id          SERIAL PRIMARY KEY,
    description TEXT,
    index       SMALLINT
);

CREATE TABLE car.trips
(
    id               SERIAL PRIMARY KEY,
    date             TIMESTAMP NOT NULL,
    start_kilometers INTEGER   NOT NULL,
    end_kilometers   INTEGER   NOT NULL,
    area_id          INTEGER REFERENCES car.areas (id),
    start_time       TIMESTAMP NOT NULL,
    end_time         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW car.total_amount_view AS
SELECT SUM(start_kilometers - trips.end_kilometers) AS total_amount
FROM car.trips
