import { useEffect } from "react";
import { useTypedDispatch } from "./store/index";
import { fetchCountries } from "./store/countriesSlice";
import { Select } from "./components/Select";
import { Weather } from "./components/Weather";
import styled from "styled-components";

console.log(fetchCountries);

const MainApp = styled.div`
  padding-top: 100px;
  width: 350px;
  margin: 0 auto;
`;

const Column = styled.div`
  text-align: center;
`;

const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <MainApp>
      <Column>
        <h3>check the weather information for a specific country</h3>
        <Select />
        <Weather />
      </Column>
    </MainApp>
  );
};

export default App;
