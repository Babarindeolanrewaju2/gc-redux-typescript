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
    deg?: number;
  };
};

const Tiles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  & div {
    display: flex;
    flex-basis: 100%;
    flex: 0 1 auto;
    flex-basis: auto;
    border: black solid 0.5px;
    padding: 25px;
    background-color: lightgray;
    box-sizing: border-box;
    margin: 0;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 50%;

    &:hover {
      background-color: green;
      color: white;
    }

    & strong {
      display: block;
    }
  }
`;
export const Weather: React.FC = () => {
  const weather: temp = useTypedSelector((state) => state?.temperature.weather);
  const loading = useTypedSelector((state) => state?.temperature.loading);
  if (Object.keys(weather).length === 0) {
    return <p>No country selected</p>;
  }

  // if the data is fetched and status is loading then return a message ";loading"
  if (loading === "pending") {
    return <p>loading...</p>;
  }

  // weather details for a country
  return (
    <Tiles>
      <div>
        Temperature: <br /> min: {weather?.main?.temp_min} / max:
        {weather?.main?.temp_max}
      </div>
      <div>
        Wind: <br />
        speed:
        {weather.wind?.speed} direction: {weather.wind?.deg}
      </div>
      <div>Humidity: {weather.main?.humidity}</div>
      <div>Pressure: {weather.main?.pressure}</div>
    </Tiles>
  );
};
