import React from "react";
import SearchParams from "./components/SearchParams";
import { Router } from "@reach/router";
import Details from "./pages/Details";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="home-page">
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
