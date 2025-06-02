import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useWeatherData } from '../hooks/useWeatherData';
import { WeatherForm } from './WeatherForm';
import { WeatherChart } from './charts/WeatherChart';
import { WeatherTable } from './charts/WeatherTable';

export const Dashboard = () => {
  const [inputs, setInputs] = useState(null);
  const { data, loading, error } = useWeatherData(inputs);
  const [activeTab, setActiveTab] = useState('chart');

  return (
    <div className="space-y-8 animate-fadeIn">
      <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weather Parameters</h2>
        <WeatherForm onSubmit={setInputs} />
      </section>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {data && !error && (
        <>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center border-b border-gray-200 mb-6">
              <button
                className={`py-3 px-4 font-medium transition-colors duration-200 ${
                  activeTab === 'chart'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('chart')}
              >
                Chart View
              </button>
              <button
                className={`py-3 px-4 font-medium transition-colors duration-200 ${
                  activeTab === 'table'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('table')}
              >
                Table View
              </button>
            </div>

            {activeTab === 'chart' ? (
              <WeatherChart data={data} />
            ) : (
              <WeatherTable data={data} />
            )}
          </div>
        </>
      )}

      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-lg text-gray-700">Loading weather data...</span>
        </div>
      )}
    </div>
  );
};