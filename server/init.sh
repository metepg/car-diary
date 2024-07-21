#!/bin/bash

# Variables
DB_NAME="car"
DB_USER="postgres"
DB_PASS="postgres"
DB_HOST="localhost"
DB_PORT="5432"
export PGPASSWORD=$DB_PASS

# Drop database if exists
echo "Dropping database '$DB_NAME' if it exists..."
psql -U $DB_USER -h $DB_HOST -d postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"
psql -U $DB_USER -h $DB_HOST -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"

# Create database
echo "Creating database '$DB_NAME'..."
psql -U $DB_USER -h $DB_HOST -d postgres -c "CREATE DATABASE $DB_NAME;"

# Run Flyway migrations
echo "Running Flyway migrations..."
mvn flyway:migrate -Dflyway.url=jdbc:postgresql://$DB_HOST:$DB_PORT/$DB_NAME -Dflyway.user=$DB_USER -Dflyway.password=$DB_PASS

echo "Running create-data.sql script..."
psql -U $DB_USER -h $DB_HOST -d $DB_NAME -f src/main/resources/db/create-data.sql
unset PGPASSWORD

echo "Initialization complete."
