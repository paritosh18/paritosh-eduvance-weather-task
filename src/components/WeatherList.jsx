import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWeatherData } from '../slices/weatherSlice';

const WeatherList = () => {
  const weatherData = useSelector(state => state.weather.data);
  const currentUser = useSelector(state => state.weather.loggedInUser);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(deleteWeatherData(index));
  };

  if (!currentUser) {
    return <p>Please log in to view your weather data.</p>;
  }

 
  const userWeatherData = weatherData.filter(data => data.userId === currentUser.id);

  return (
    <div className="container weather-container">
      {userWeatherData.length > 0 ? (
        <div>
          <h2>Weather Data List</h2>
          <ul>
            {userWeatherData.map((data, index) => (
              <li key={index}>
                {data.city} - {data.temperature}°C, {data.pressure} hPa, {data.humidity}%, {data.windSpeed} m/s, {data.windDegree}°
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherList;
