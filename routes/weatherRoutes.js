const express = require("express");
const router = express.Router();
const { WeatherData, Location, User } = require('../models');
const axios = require('axios');
const authenticate = require('../middlewares/authenticate');

// Fetch weather data from Open-Meteo API
router.get('/weather', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates provided' });
  }

    // Call Open-Meteo API to get current weather
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        temperature_unit: 'fahrenheit',
      },
    });

    const temperature = response.data.current_weather.temperature;
    res.json({ temperature });
  } catch (err) {
    console.error('Weather API Error:', err);
    res.status(500).json({ error: 'Failed to fetch weather data', details: err.message });
  }
});

// Save a location with weather data (only for logged-in users)
router.post('/saved-locations', authenticate, async (req, res) => {
  try {
    const { name, latitude, longitude, temperature } = req.body;
    const userId = req.user.id;

    // Create or find the location
    let location = await Location.findOne({ where: { latitude, longitude, user_id: userId } });
    if (!location) {
      location = await Location.create({ name, latitude, longitude, user_id: userId });
    }

    // Save weather data for the location
    const weatherData = await WeatherData.create({
      temperature,
      date_recorded: new Date(),
      location_id: location.location_id,
    });

    res.status(201).json({ message: 'Location saved successfully', weatherData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

// Get saved locations for the logged-in user
router.get('/saved-locations', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const locations = await Location.findAll({
      where: { user_id: userId },
      include: [WeatherData],
    });

    res.json({ locations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve saved locations' });
  }
});

module.exports = router;