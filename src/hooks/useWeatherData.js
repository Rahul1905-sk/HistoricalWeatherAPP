import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../components/apis';

export const useWeatherData = (inputs) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const getWeatherData = async () => {
      if (!inputs) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const weatherData = await fetchWeatherData(
          inputs.latitude,
          inputs.longitude,
          inputs.startDate,
          inputs.endDate
        );
        
        if (isMounted) {
          setData(weatherData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch weather data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    if (inputs) {
      getWeatherData();
    }
    
    return () => {
      isMounted = false;
    };
  }, [inputs]);
  
  return { data, loading, error };
};