import React, { useState } from 'react';
import { Calendar, MapPin, Thermometer } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const WeatherForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    latitude: '47.3769',
    longitude: '8.5417',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCoordinates = () => {
    const lat = parseFloat(formData.latitude);
    const lon = parseFloat(formData.longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      toast.error('Latitude must be between -90 and 90');
      return false;
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
      toast.error('Longitude must be between -180 and 180');
      return false;
    }

    return true;
  };

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const now = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast.error('Please enter valid dates');
      return false;
    }

    if (start > end) {
      toast.error('Start date must be before end date');
      return false;
    }

    if (end > now) {
      toast.error('End date cannot be in the future');
      return false;
    }

    const daysDiff = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    if (daysDiff > 100) {
      toast.error('Date range cannot exceed 100 days');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateCoordinates() && validateDates()) {
      onSubmit(formData);
      toast.success('Fetching weather data...');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
          Latitude
        </label>
        <input
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter latitude (e.g., 47.3769)"
          required
          pattern="-?[0-9]*\.?[0-9]+"
          title="Please enter a valid latitude number"
        />
      </div>
      
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
          Longitude
        </label>
        <input
          type="text"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter longitude (e.g., 8.5417)"
          required
          pattern="-?[0-9]*\.?[0-9]+"
          title="Please enter a valid longitude number"
        />
      </div>
      
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
          Start Date
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          max={formData.endDate}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
          End Date
        </label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]}
          min={formData.startDate}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          required
        />
      </div>
      
      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          <Thermometer className="h-5 w-5 mr-2" />
          Get Weather Data
        </button>
      </div>
    </form>
  );
};