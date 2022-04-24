import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface weatherState {
  weather: object;
  error: any;
  loading: string;
}

const initialWeatherState: weatherState = {
  weather: {},
  error: "",
  loading: "",
};

interface latlng {
  lat: number;
  long: number;
}

export const fetchWeatherByCountry = createAsyncThunk(
  "weather/fetch",
  async (latlng: latlng) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng?.lat}&lon=${latlng?.long}&appid=${process.env.REACT_APP_API_KEY}`
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

//reducer for the weather
export const weathersSlice = createSlice({
  name: "temperatureReducer",
  initialState: initialWeatherState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCountry.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchWeatherByCountry.fulfilled, (state, action) => {
        state.loading = "success";
        state.weather = action.payload;
      })
      .addCase(fetchWeatherByCountry.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || null;
      });
  },
});

const { reducer } = weathersSlice;
export default reducer;
