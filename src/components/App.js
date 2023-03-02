import { useState } from "react";
import "../styles/App.css";
import TopBar from "./TopBar";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";
import { Redirect, Link } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const logout = () => {
    console.log("log out");
    setIsLoggedIn(false);
  };

  const loginOnSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleUserEmail = (data) => {
    setUserEmail(data);
  }

  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loginOnSuccess} userEmail={userEmail} handleUserEmail={handleUserEmail}/>
    </div>
  );
}

export default App;
