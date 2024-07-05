import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWeatherData } from '../slices/weatherSlice';

const WeatherList = () => {
  const weatherData = useSelector(state => state.weather.data);
  const currentUser = useSelector(state => state.weather.loggedInUser);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteWeatherData(id));
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
            {userWeatherData.map((data) => (
              <li key={data.id}>
                {data.city} - {data.temperature}°C, {data.pressure} hPa, {data.humidity}%, {data.windSpeed} m/s, {data.windDegree}°, Logged at: {new Date(data.timestamp).toLocaleString()}
                <button onClick={() => handleDelete(data.id)}>Delete</button>
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
