import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Insertion from "./pages/Insertion";
import List from "./pages/List";

import './pages/styles/App.css';
import './pages/styles/Home.css';
import './pages/styles/List.css';
import './pages/styles/Animation.css';
import './pages/styles/Insertion.css';

const App = () => {
  return (
      <Router>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/insertion' component={ Insertion }/>
          <Route path='/List/:lId' children={ <List/> }/>
      </Router>
  );
};

export default App;
