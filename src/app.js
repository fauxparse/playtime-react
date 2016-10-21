import React, { Component } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';
import TabBar from './components/tab_bar';
import './scss/app.scss';

var previousTabIndex = -1;

class App extends Component {
  tabIndex(path) {
    var index = 0, node = document.querySelector(`.tabs [href="${path}"]`);

    if (!node) return -1;

    node = node.previousSibling;
    while (node) {
      if (node.nodeType !== 3) {
        index++;
      }
      node = node.previousSibling;
    }
    return index;
  }

  render() {
    var newTabIndex = this.tabIndex(location.pathname), animations;

    if (newTabIndex === previousTabIndex) {
      animations = {
        enter: {},
        leave: {}
      }
    } else {
      animations = {
        enter: {
          duration: 500,
          animation: {
            left: ['0%', 'spring']
          },
          style: {
            left: (previousTabIndex < newTabIndex ? '100%' : '-100%')
          }
        },

        leave: {
          duration: 500,
          animation: {
            left: [(previousTabIndex < newTabIndex ? '-100%' : '100%'), 'spring']
          },
          style: {
            left: '0%'
          }
        }
      }
    }
    previousTabIndex = newTabIndex;

    return (
      <main>
        <VelocityTransitionGroup enter={animations.enter} leave={animations.leave} runOnMount={true}>
          {React.cloneElement(this.props.children, { key: location.pathname })}
        </VelocityTransitionGroup>
        <TabBar />
      </main>
    );
  }
}

export default App;
