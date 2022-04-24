import { AnyAction } from "redux";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import weatherReducer from "./weatherSlice";
import countriesReducer from "./countriesSlice";

const rootReducer = combineReducers({
  countries: countriesReducer,
  temperature: weatherReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

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
