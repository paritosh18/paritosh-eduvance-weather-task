import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logWeatherData } from '../slices/weatherSlice';
import fetchWeatherData from '../utils/fetchWeatherData';

const LogWeatherButton = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.weather.loggedInUser);

  useEffect(() => {
    let interval;
    if (city && currentUser && currentUser.id) {
      interval = setInterval(async () => {
        const data = await fetchWeatherData(city);
        if (data) {
          setWeatherData({ ...data, userId: currentUser.id });
        }
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [city, currentUser]);

  const handleLogWeather = () => {
    if (weatherData) {
      dispatch(logWeatherData(weatherData));
      setWeatherData(null); // Clear weatherData state after logging
    }
  };

  if (!currentUser) {
    return <p>Please log in to log weather data.</p>;
  }

  return (
    <div className="container-log">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleLogWeather}>Log Weather Data</button>
      {weatherData && (
        <div>
          <p>City: {weatherData.city}</p>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Pressure: {weatherData.pressure} hPa</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>Wind Degree: {weatherData.windDegree}°</p>
        </div>
      )}
    </div>
  );
};

export default LogWeatherButton;
