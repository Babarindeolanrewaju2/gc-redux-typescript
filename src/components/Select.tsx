import { Key, useEffect, useState } from "react";
import styled from "styled-components";

import { useTypedDispatch, useTypedSelector } from "../store/index";

import { fetchWeatherByCountry } from "../store/weatherSlice";

interface countryObject {
  CountryName?: string;
  lat?: number;
  lng?: number;
}

const SelectCountry = styled.select`
  height: 35px;
  background: white;
  padding-left: 5px;
  font-size: 14px;
  font-family: "CircularStdBook";
  width: 100%;
  margin-bottom: 10px;

  option {
    font-family: "CircularStdBook";
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const Select: React.FC = () => {
  const [selected, setSelected] = useState<any>("");
  const dispatch = useTypedDispatch();
  const response = useTypedSelector((state) => state?.countries);
  const { countries, loading } = response;
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const latlng = JSON.parse(event.target.value);
    setSelected(event.target.value);
    dispatch(fetchWeatherByCountry(latlng));
  };

  return (
    <div>
      {loading ? (
        <p>loading... </p>
      ) : (
        <SelectCountry onChange={handleChange} value={selected}>
          <option value="" disabled>
            Select a country
          </option>
          {countries?.map(
            (country: countryObject, index: Key | null | undefined) => (
              <option key={index} value={JSON.stringify(country)}>
                {country?.CountryName}
              </option>
            )
          )}
        </SelectCountry>
      )}
    </div>
  );
};
