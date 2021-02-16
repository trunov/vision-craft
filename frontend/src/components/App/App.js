import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false); 

  function handleRegister() {

  }

  function handleLogin() {
    
  }

  return (
    <div className="App">
      <Header />
      <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
          />
          <Route path="/register">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
    </div>
  );
}

export default App;
