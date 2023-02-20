import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
function Main(props) {
  /* edit by linghongfei*/
  const { isLoggedIn, handleLoggedIn } = props;
  const showLogin = () => {
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleLoggedIn={handleLoggedIn} />
    );
  };
  const showHome = () => {
    return isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };

  return (
    <div className="main">
        <Switch>
            <Route path="/" exact render={showLogin}/>
            <Route path="/login" render={showLogin}/>
            <Route path="/register" component={Register} />
            <Route path="/home" render={showHome} />
        </Switch>
    </div>
  );
}
export default Main;
