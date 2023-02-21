import { useState } from "react";
import "../styles/App.css";
import TopBar from "./TopBar";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );

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
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
      {/** */}
    </div>
  );
}

export default App;
