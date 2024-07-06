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
    description TEXT
);

CREATE TABLE car.events
(
    id         SERIAL PRIMARY KEY,
    kilometers INTEGER NOT NULL,
    area_id    INTEGER REFERENCES car.areas (id),
    start_ts   TIMESTAMP NOT NULL,
    end_ts     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW car.total_amount_view AS
SELECT SUM(kilometers) AS total_amount
FROM car.events
