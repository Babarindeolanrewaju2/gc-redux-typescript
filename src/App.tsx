import { useEffect } from "react";

import { useTypedDispatch, fetchCountries } from "./store/index";
import { Select } from "./components/Select";
import { Weather } from "./components/Weather";
import styled from "styled-components";

const MainApp = styled.div`
  padding-top: 200px;
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
        <Select />
        <Weather />
      </Column>
    </MainApp>
  );
};

export default App;
