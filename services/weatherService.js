const axios = require('axios');

const fetchWeatherData = async (latitude, longitude) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast`;
    const params = {
      latitude: latitude,
      longitude: longitude,
      current_weather: true,
      temperature_unit: 'fahrenheit'
    };
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

module.exports = { fetchWeatherData };
