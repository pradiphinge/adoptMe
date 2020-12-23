import { useState, lazy, Suspense } from "react";
import SearchParams from "./components/SearchParams";
import { Router } from "@reach/router";
//import Details from "./pages/Details";
//import Header from "./components/Header";
import ThemeContext from "./ThemeContext";
import NavBar from "./components/NavBar";
const Details = lazy(() => import("./pages/Details"));
function App() {
  const themeHook = useState("darkblue");
  return (
    <ThemeContext.Provider value={themeHook}>
      <NavBar />
      <div className="home-page">
        <Suspense fallback={<h1>Loading route...</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
