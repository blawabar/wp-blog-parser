import React from "react";
import "./App.scss";

import { BrowserRouter as Router } from "react-router-dom";

import Background from "../Background/Background";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PageContainer from "../PageContainer/PageContainer";

function App() {
  return (
    <div className="app">
      <Background />
      <Router>
        <div className="app__wrapper">
          <Header />
          <PageContainer />
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
