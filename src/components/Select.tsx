import { Key, useEffect, useState } from "react";
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
  const handleChange = async (event: any) => {
    const latlng = JSON.parse(event.target.value);
    setSelected(event.target.value);
    dispatch(fetchWeatherByCountry(latlng));
  };

  //fetch the country data on mount
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>loading... </p>
      ) : (
        <SelectCountry onChange={(e) => handleChange(e)} value={selected}>
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
