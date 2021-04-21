import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Insertion from "./pages/Insertion";

const App = () => {
  return (
      <Router>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/insertion' component={ Insertion }/>
      </Router>
  );
};

export default App;
