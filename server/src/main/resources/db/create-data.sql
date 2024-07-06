BEGIN;

-- Insert a new group and capture its generated ID
DO $$
    BEGIN
        -- Insert initial user records with the same group_id
        INSERT INTO car.users (id, name, password, role)
        VALUES
            (1, 'user', '$2a$10$aBNsZVVWtDI0ZxcYue/30ebE0qsL7qT49uhxEvU1xJ3lp9GHVgSD6', 'ADMIN');
    END $$;

COMMIT;
