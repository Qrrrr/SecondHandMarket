import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import UserProfile from "./UserProfile";

function Main(props) {
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

  const showProfile = () => {
    console.log(`Main showProfile ${isLoggedIn}`);
    return isLoggedIn ? <UserProfile /> : <Redirect to="/login" />;
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
        <Route path="/profile" render={showProfile} />
      </Switch>
    </div>
  );
}
export default Main;
