import { useState } from "react";
import "../styles/App.css";
import TopBar from "./TopBar";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";
import { Redirect, Link } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );
  // we want to know the email of the user for other operations, so keep a userEmail constant here
  // and set the email in the login component;
  const [userEmail, setUserEmail] = useState("")
  const userEmailSet = (e) => {
    setUserEmail(e);
    console.log(userEmail);
  }

  const logout = () => {
    console.log("log out");
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };
  return (
    <div className="App">
      {/**edit by linghongfei */}
      <TopBar
        isLoggedIn={isLoggedIn}
        handleLogout={logout}
        handleLoggedIn={loggedIn}
      />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} handleUserEmail={userEmailSet}/>
      {/** */}
    </div>
  );
}

export default App;
