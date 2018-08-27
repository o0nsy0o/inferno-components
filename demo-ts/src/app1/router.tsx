
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IndexView from './view/index';


export default (
  <Router>
    <Route exact path='/' render={() => IndexView} />
  </Router>
);