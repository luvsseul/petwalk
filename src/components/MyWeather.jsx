import axios from 'axios';
import React, { useState } from 'react'

export default function MyWeather() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`;

  async function searchWeather(e) {
    if(!location.trim()) {
      return;
    }
      try {
        const response = await axios.get(url);        
        setResult(response.data);
        console.log(response.data);
      } catch(error) {
        console.error(error);
      alert('Failed to fetch weather data. Please try again later.');
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') searchWeather();
    };
  
    const handleButtonClick = () => {
      if (!location.trim()) {
        alert('Please enter a location.');
        return;
      }
      searchWeather();
    };

  return (
  <>
    
      <div className="relative">
        <input
        type="text"
        className="w-64 p-4 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your location !"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        onKeyDown={handleKeyDown} />
        <button onClick={handleButtonClick} className="inset-y-0 right-0 p-4 ps-3">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </button>
        
      </div>


    {result && (
    <div className="block max-w-48 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{result.name}</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">{Math.round((result.main.temp -273.15) * 10) / 10}°C</p>
    <p className="font-normal text-gray-700 dark:text-gray-400">{result.weather[0].main}</p>
    </div>)}
  </>
  )
}
