import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ProductDetail from "./ProductDetail";

function Main(props) {
  /* edit by linghongfei*/
  const { isLoggedIn, handleLoggedIn } = props;
  const showLogin = () => {
    console.log(`Main showLoging ${isLoggedIn}`);
    return isLoggedIn ? (
      <Redirect to="/home" />
    ) : (
      <Login handleLoggedIn={handleLoggedIn} />
    );
  };
  const showHome = () => {
    console.log(`Main showHome ${isLoggedIn}`);
    return isLoggedIn ? <Home /> : <Redirect to="/login" />;
  };

  const showProductDetail = () => {
    console.log(`Main showProductDetail ${isLoggedIn}`);
    return isLoggedIn ? <ProductDetail /> : <Redirect to="/login" />;
  };

  return (
    <div className="main">
      <Switch>
        <Route path="/" exact render={showLogin} />
        <Route path="/login" render={showLogin} />
        <Route path="/register" component={Register} />
        <Route path="/home" render={showHome} />
        <Route path="/products/:productId" render={showProductDetail} />
      </Switch>
    </div>
  );
}
export default Main;
