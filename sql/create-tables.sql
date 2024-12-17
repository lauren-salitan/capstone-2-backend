CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE WeatherData (
    id SERIAL PRIMARY KEY,
    temperature FLOAT,
    date_recorded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location_id INTEGER REFERENCES Locations(id) ON DELETE CASCADE
);
