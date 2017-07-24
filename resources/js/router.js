import React from "react";
import {
    BrowserRouter as Router,
    Route,
    HashRouter
} from 'react-router-dom';
import App from './components/App';

// build the router
export const router = (
      <HashRouter basename="/">
        <div>
          <Route exact path="/" component={App} />
        </div>
      </HashRouter>
);
