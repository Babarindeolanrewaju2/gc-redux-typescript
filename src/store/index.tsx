import { AnyAction } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import axios from "axios";

import {
  configureStore,
  createSlice,
  createAsyncThunk,
  combineReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

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

// export async function getData() {
//   const url = "https://restcountries.com/v3.1/all";
//   try {
//     const response = await axios.get<[]>(url);
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// }

export const fetchWeatherByCountry = createAsyncThunk(
  "weather/fetch",
  async (latlng: latlng, thunkApi) => {
    const apikey = "8e589602d0897f471b7541ddb5210b5c";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng?.lat}&lon=${latlng?.long}&appid=${apikey}`
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "countries/fetch",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

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

const rootReducer = combineReducers({
  countries: countriesSlice.reducer,
  temperature: weathersSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;

/* Types */
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
