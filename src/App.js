import "./App.css";
import "./style.scss";
import { Switch, Route } from "react-router";
import { useEffect, useState } from "react";
import Product from "./views/products/Product";
import Loader from "./components/Loader";

function App() {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <div className="App">
      {splash && (
        <div onClick={() => setSplash(false)}>
          <Loader />
        </div>
      )}
      <Switch>
        <Route path="/">
          <Product />
        </Route>
        {/* <Route path="/products/id"></Route> */}
      </Switch>
    </div>
  );
}

export default App;
