-- Rename the existing 'date' column to 'date_temp' to preserve data
ALTER TABLE car.trips RENAME COLUMN date TO date_temp;

-- Add a new nullable 'date' column
ALTER TABLE car.trips ADD date DATE;

-- Update the new 'date' column with the date part of the old 'date_temp' column
UPDATE car.trips SET date = CAST(date_temp AS DATE);

-- Make the 'date' column non-nullable
ALTER TABLE car.trips ALTER COLUMN date SET NOT NULL;

-- Drop the temporary 'date_temp' column
ALTER TABLE car.trips DROP COLUMN date_temp;
