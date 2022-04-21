import React from "react";
import { useTypedSelector } from "../store/index";
import styled from "styled-components";

type temp = {
  main?: {
    temp_min?: number;
    temp_max?: number;
    humidity?: number;
    pressure?: number;
  };
  wind?: {
    speed?: number;
  };
};

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  & p {
    display: flex;
    flex: 1;
    border: black solid 0.5px;
    padding: 25px;
    background-color: lightgray;
    box-sizing: border-box;
    margin: 0;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
`;
export const Weather = () => {
  const weather: temp = useTypedSelector((state) => state?.temperature.weather);
  const loading = useTypedSelector((state) => state?.temperature.loading);
  if (Object.keys(weather).length === 0) {
    return <p>No country selected</p>;
  }

  if (loading === "pending") {
    return <p>loading...</p>;
  }
  return (
    <Tiles>
      <p>
        Temperature: min: {weather?.main?.temp_min} / max:{" "}
        {weather?.main?.temp_max}
      </p>
      <p>Wind: {weather.wind?.speed}</p>
      <p>Humidity: {weather.main?.humidity}</p>
      <p>Pressure: {weather.main?.pressure}</p>
    </Tiles>
  );
};
