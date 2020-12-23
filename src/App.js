import { useState } from "react";
import SearchParams from "./components/SearchParams";
import { Router } from "@reach/router";
import Details from "./pages/Details";
//import Header from "./components/Header";
import ThemeContext from "./ThemeContext";
import NavBar from "./components/NavBar";

function App() {
  const themeHook = useState("darkblue");
  return (
    <ThemeContext.Provider value={themeHook}>
      <NavBar />
      <div className="home-page">
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
