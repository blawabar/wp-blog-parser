import React from "react";
import "./App.scss";

import { BrowserRouter as Router } from "react-router-dom";

import { Background, Header, Footer, PageContainer } from "layouts";

function App() {
  return (
    <div className="app">
      <Background />
      <Router basename={process.env.PUBLIC_URL}>
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
