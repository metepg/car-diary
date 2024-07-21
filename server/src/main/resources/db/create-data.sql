-- Insert routes
INSERT INTO car.routes (description, index)
VALUES ('Helsinki-Vantaa', 1),
       ('Helsinki-Espoo', 2),
       ('Espoo-Vantaa', 3);

-- Insert initial user
INSERT INTO car.users (name, password, role)
VALUES ('user', '$2a$10$aBNsZVVWtDI0ZxcYue/30ebE0qsL7qT49uhxEvU1xJ3lp9GHVgSD6', 'ADMIN');

-- Generate trips from one year back to the current date
DO
$$
    DECLARE
        start_km    INT    := 100000;
        end_km      INT;
        trip_date   DATE   := CURRENT_DATE - INTERVAL '1 year';
        route_array TEXT[] := ARRAY ['Helsinki-Vantaa', 'Helsinki-Espoo', 'Espoo-Vantaa'];
        trip_count  INT    := 0;
        start_time  TIMESTAMP;
        end_time    TIMESTAMP;
    BEGIN
        WHILE trip_date <= CURRENT_DATE
            LOOP
                -- Simulate 20-22 trips per month
                IF trip_count >= 20 AND trip_count < 23 THEN
                    trip_count := 0;
                    trip_date := date_trunc('month', trip_date) + INTERVAL '1 month';
                    CONTINUE;
                END IF;

                -- Skip weekends randomly to simulate some work on weekends
                IF EXTRACT(DOW FROM trip_date) IN (0, 6) AND RANDOM() > 0.3 THEN
                    trip_date := trip_date + INTERVAL '1 day';
                    CONTINUE;
                END IF;

                end_km := start_km + (50 + (RANDOM() * 150))::INT;
                start_time := trip_date + TIME '08:00:00' + (RANDOM() * INTERVAL '2 hours');
                end_time := start_time + (6 + (RANDOM() * 2)) * INTERVAL '1 hour';

                INSERT INTO car.trips (start_kilometers, end_kilometers, date, start_time, end_time, route)
                VALUES (start_km, end_km, trip_date, start_time, end_time, route_array[ceil(random() * 3)::int]);

                start_km := end_km;
                trip_date := trip_date + INTERVAL '1 day';
                trip_count := trip_count + 1;
            END LOOP;
    END
$$;
