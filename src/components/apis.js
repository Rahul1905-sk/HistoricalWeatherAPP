import axios from 'axios';

const API_BASE_URL = 'https://archive-api.open-meteo.com/v1/archive';

const apiCache = new Map();
const CACHE_TTL = 15 * 60 * 1000; 

const validateCoordinates = (latitude, longitude) => {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('Invalid latitude. Must be between -90 and 90.');
  }

  if (isNaN(lon) || lon < -180 || lon > 180) {
    throw new Error('Invalid longitude. Must be between -180 and 180.');
  }
};

const validateDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format.');
  }

  if (start > end) {
    throw new Error('Start date must be before end date.');
  }

  if (end > now) {
    throw new Error('End date cannot be in the future.');
  }

  const daysDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  if (daysDiff > 100) {
    throw new Error('Date range cannot exceed 100 days.');
  }
};

export const fetchWeatherData = async (
  latitude,
  longitude,
  startDate,
  endDate
) => {
  try {
    validateCoordinates(latitude, longitude);
    validateDates(startDate, endDate);

    const cacheKey = `${latitude}-${longitude}-${startDate}-${endDate}`;
    
    const cachedData = apiCache.get(cacheKey);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
      return cachedData.data;
    }
    
    const params = {
      latitude,
      longitude,
      start_date: startDate,
      end_date: endDate,
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'temperature_2m_mean',
        'apparent_temperature_max',
        'apparent_temperature_min',
        'apparent_temperature_mean'
      ],
      timezone: 'auto'
    };
    
    const response = await axios.get(API_BASE_URL, { params });
    
    if (!response.data || !response.data.daily) {
      throw new Error('Invalid response from weather service');
    }

    const requiredArrays = [
      'time',
      'temperature_2m_max',
      'temperature_2m_min',
      'temperature_2m_mean',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'apparent_temperature_mean'
    ];

    const arrayLength = response.data.daily.time.length;
    const hasValidArrays = requiredArrays.every(key => 
      Array.isArray(response.data.daily[key]) && 
      response.data.daily[key].length === arrayLength
    );

    if (!hasValidArrays) {
      throw new Error('Incomplete weather data received');
    }

    apiCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.reason || error.response.statusText;
      throw new Error(`API Error: ${errorMessage}`);
    } else if (error.request) {
      throw new Error('No response from the weather service. Please check your internet connection.');
    } else {
      throw error;
    }
  }
};