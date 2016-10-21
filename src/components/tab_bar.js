import React, { Component } from 'react';
import { Link } from 'react-router';
import { buttons, tabs } from '../resources/icons';

class TabBar extends Component {
  render() {
    return (
      <footer className="tabs">
        <Link to="/inbox" activeClassName="active">
          {tabs.inbox}
          <span>Inbox</span>
        </Link>
        <Link to="/events" activeClassName="active">
          {tabs.events}
          <span>Events</span>
        </Link>
        <Link to="/people" activeClassName="active">
          {tabs.people}
          <span>People</span>
        </Link>
        <Link to="/stats" activeClassName="active">
          {tabs.stats}
          <span>Stats</span>
        </Link>

        <button>
          {buttons.plus}
        </button>
      </footer>
    )
  }
}

export default TabBar;
