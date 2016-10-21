import React, { Component } from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import App from './app';
import Inbox from './components/inbox';
import Events from './components/events';
import People from './components/people';
import Stats from './components/stats';

class Routes extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route component={App}>
          <Redirect from="/" to="/inbox" />
          <Route path="/inbox" component={Inbox} />
          <Route path="/events" component={Events} />
          <Route path="/people" component={People} />
          <Route path="/stats" component={Stats} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
