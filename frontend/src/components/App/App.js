import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import "./App.css";

import successLogo from "../../images/success.svg";
import failLogo from "../../images/failure.svg";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

import * as auth from "../../utils/auth";

function App() {
  const history = useHistory();

  const [userEmail, setUserEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [dataInfoTool, setDataInfoTool] = React.useState({
    title: "Что-то пошло не так! Попробуйте ещё раз.",
    icon: failLogo,
  });

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(!infoTooltipOpen);
  }

  function closeAllPopups() {
    setInfoTooltipOpen(false);
  }

  function signOut() {
    setLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("token");
  }

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        history.push("/login");
        setDataInfoTool({
          title: data.message,
          icon: successLogo,
        });
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        setDataInfoTool({
          title: err.includes("409")
            ? "Email already registered"
            : "Something went wrong",
          icon: failLogo,
        });
        handleInfoTooltipOpen();
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setDataInfoTool({
          title: err.message,
          icon: failLogo,
        });
        handleInfoTooltipOpen();
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            console.log(res);
            setUserEmail(res[0].email);
            history.push("/");
          } else {
            setDataInfoTool({
              title: "Что-то пошло не так! Попробуйте ещё раз.",
              icon: failLogo,
            });
            handleInfoTooltipOpen();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setUserEmail(res[0].email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className="App">
      <Header signOut={signOut} userEmail={userEmail} />
      <Switch>
        <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn} />
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

      <InfoToolTip
        isOpen={infoTooltipOpen}
        onClose={closeAllPopups}
        title={dataInfoTool.title}
        icon={dataInfoTool.icon}
      />
    </div>
  );
}

export default App;
