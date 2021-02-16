import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";

function App() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(true); 

  return (
    <div className="App">
      <Header location={location} loggedIn={loggedIn} />
    </div>
  );
}

export default App;
