import { Key, useEffect } from "react";
import styled from "styled-components";

import {
  fetchCountries,
  useTypedDispatch,
  fetchWeatherByCountry,
  useTypedSelector,
} from "../store/index";

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
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const Select = () => {
  const dispatch = useTypedDispatch();
  const response = useTypedSelector((state) => state?.countries);
  const { countries, loading } = response;
  const handleChange = async (event: any) => {
    const latlng = JSON.parse(event.target.value);
    dispatch(fetchWeatherByCountry(latlng));
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>loading... </p>
      ) : (
        <SelectCountry onChange={(e) => handleChange(e)}>
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
