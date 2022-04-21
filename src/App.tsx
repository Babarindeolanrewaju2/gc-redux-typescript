import { useEffect } from "react";

import { useTypedDispatch, fetchCountries } from "./store/index";
import { Select } from "./components/Select";

const App: React.FC = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <div className="App">
      <Select />
    </div>
  );
};

export default App;
