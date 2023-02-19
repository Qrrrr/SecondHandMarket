import '../styles/App.css';
import TopBar from "./TopBar";
import Profile from "./Profile";
import SearchBar from "./SearchBar";
function App() {
  return (
    <div className="App">
     <TopBar/>
     <SearchBar/>
     <Profile/>
    </div>
  );
}

export default App;
