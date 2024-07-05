import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: JSON.parse(localStorage.getItem('weatherData')) || [],
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null
  },
  reducers: {
    logWeatherData: (state, action) => {
      const weatherEntry = { ...action.payload, userId: state.loggedInUser.id };
      state.data.push(weatherEntry);
      localStorage.setItem('weatherData', JSON.stringify(state.data));
    },
    deleteWeatherData: (state, action) => {
      state.data = state.data.filter((_, index) => index !== action.payload);
      localStorage.setItem('weatherData', JSON.stringify(state.data));
    },
    loginUser: (state, action) => {
      state.loggedInUser = action.payload;
      localStorage.setItem('loggedInUser', JSON.stringify(state.loggedInUser));
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('weatherData');
    },
    registerUser: (state, action) => {
      console.log('New user registered:', action.payload);
    },
    resetWeatherData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem('weatherData', JSON.stringify(state.data));
    },
  },
});

export const { logWeatherData, deleteWeatherData, loginUser, logoutUser, registerUser, resetWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
