import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { formatDate } from '../../utils/dateUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const calculateSafeMin = (arr) => {
  const nums = arr?.filter(t => typeof t === 'number' && !isNaN(t));
  return nums?.length ? Math.min(...nums).toFixed(1) : 'N/A';
};

const calculateSafeMax = (arr) => {
  const nums = arr?.filter(t => typeof t === 'number' && !isNaN(t));
  return nums?.length ? Math.max(...nums).toFixed(1) : 'N/A';
};

const calculateMean = (arr) => {
  const nums = arr?.filter(t => typeof t === 'number' && !isNaN(t));
  return nums?.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : 'N/A';
};

export const WeatherChart = ({ data }) => {
  const daily = data?.daily;
  const hasData = daily?.time && Array.isArray(daily.time);
  const colorClassMap = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-600',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-600',
    },
  };
  

  if (!hasData) {
    return (
      <div className="text-center py-6 text-gray-500">
        No data available to display
      </div>
    );
  }

  const formattedDates = daily.time.map(formatDate);

  const chartData = {
    labels: formattedDates,
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: daily.temperature_2m_max,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Min Temperature (°C)',
        data: daily.temperature_2m_min,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Mean Temperature (°C)',
        data: daily.temperature_2m_mean,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        title: { display: true, text: 'Temperature (°C)' },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const statCards = [
    {
      title: 'Maximum Temperature',
      color: 'red',
      value: calculateSafeMax(daily.temperature_2m_max),
      subtitle: 'Highest recorded in period',
    },
    {
      title: 'Minimum Temperature',
      color: 'blue',
      value: calculateSafeMin(daily.temperature_2m_min),
      subtitle: 'Lowest recorded in period',
    },
    {
      title: 'Average Temperature',
      color: 'green',
      value: calculateMean(daily.temperature_2m_mean),
      subtitle: 'Average over entire period',
    },
  ];

  return (
    <div className="w-full">
      <div className="h-[60vh]">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card, index) => {
          const classes = colorClassMap[card.color] || {};
          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${classes.bg} ${classes.border}`}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-2">{card.title}</h3>
              <p className={`text-3xl font-bold ${classes.text}`}>{card.value}°C</p>
              <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
