import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface countriesState {
  countries?: object[];
  error: any;
  loading: boolean;
}

const initialCountriesState: countriesState = {
  countries: [],
  error: "",
  loading: true,
};

export const fetchCountries = createAsyncThunk("countries/fetch", async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    return error;
  }
});

//reducer for the countries
export const countriesSlice = createSlice({
  name: "countriesReducer",
  initialState: initialCountriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<[]>) => {
        const countries = action.payload.map(
          (country: { name: { common: any }; latlng: any[] }) => {
            return {
              CountryName: country.name.common,
              lat: country.latlng[0],
              long: country?.latlng[1],
            };
          }
        );
        state.loading = false;
        state.countries = countries;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

const { reducer } = countriesSlice;
export default reducer;
