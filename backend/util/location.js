const axios = require('axios');
const HttpError = require('./http-errors');
require('dotenv').config();

const API_KEY = process.env.OPENCAGE_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`);

  const data = response.data;

  if (!data || data.results.length === 0) {
    const error = new HttpError('Could not find location for the specified address.', 422);
    throw error;
  }

  const coordinates = data.results[0].geometry;

  return coordinates;
}

module.exports = getCoordsForAddress;
