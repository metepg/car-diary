-- Add the deliveries column with a default value of 0
ALTER TABLE car.trips
    ADD COLUMN deliveries INTEGER DEFAULT 0;

-- Update existing rows to have the default value of 0 for deliveries
UPDATE car.trips
SET deliveries = 0
WHERE deliveries IS NULL;
