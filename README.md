# Weather Dashboard

A responsive and interactive dashboard built with React that displays historical weather data using the Open-Meteo API.

## Features

* 📊 Interactive weather data visualization with Chart.js
* 📱 Fully responsive design for all devices
* 📑 Paginated data table view
* 🔄 Automatic data caching to minimize API calls
* ⚡ Real-time input validation
* 🎨 Modern UI with Tailwind CSS

## Demo

[Live Demo](https://weather-dashboard-demo.netlify.app)

## Prerequisites

* Node.js (v18 or higher)
* npm (v9 or higher)

## Installation

1. Clone the repository:

``` bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:

``` bash
npm install
```

3. Start the development server:

``` bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Enter the latitude and longitude for your desired location
2. Select a start date and end date (maximum 100 days range)
3. Click "Get Weather Data" to fetch and display the weather information
4. Toggle between chart and table views to explore the data

## API Reference

This project uses the [Open-Meteo Historical Weather API](https://open-meteo.com/en/docs/historical-weather-api) to fetch weather data. The free API includes:

* Maximum Temperature (2m)
* Minimum Temperature (2m)
* Mean Temperature (2m)
* Maximum Apparent Temperature
* Minimum Apparent Temperature
* Mean Apparent Temperature

## Tech Stack

* React
* Tailwind CSS
* Chart.js
* Axios
* Lucide React (icons)

## Project Structure

```
Historical-Weather-App/
- public
  - vite.svg
- src
  - App.jsx
  - components
    - Dashboard.jsx
    - Header.jsx
    - WeatherForm.jsx
    - apis.js
    - charts
      - WeatherChart.jsx
      - WeatherTable.jsx
  - hooks
    - useWeatherData.js
  - index.css
  - main.jsx
  - utils
    - dateUtils.js
- .gitignore
- README.md
- eslint.config.js
- index.html
- package-lock.json
- package.json
- vite.config.js

```

## Error Handling

The application includes comprehensive error handling for:

* Invalid coordinates
* Invalid date ranges
* Network errors
* API response validation
* Missing or incomplete data

## Performance Optimizations

* API response caching (15-minute TTL)
* Debounced form submissions
* Optimized re-renders
* Lazy-loaded components

<br>
<br>
