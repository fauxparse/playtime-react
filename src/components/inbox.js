import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';
import TabPage from './tab_page';
import InvitationCard from './invitation';

class Inbox extends TabPage {
  constructor() {
    super();
    this.state = {
      action: 'initialise',
      invitations: [
        {
          id: 1,
          name: 'PlayShop LIVE',
          startsAt: moment.tz('2016-10-21 21:00', 'Pacific/Auckland'),
          endsAt: moment.tz('2016-10-21 22:00', 'Pacific/Auckland'),
          location: {
            name: 'BATS Theatre',
            address: '1 Kent Tce, Wellington'
          }
        },
        {
          id: 2,
          name: 'PlayShop DEAD',
          startsAt: moment.tz('2016-10-28 21:00', 'Pacific/Auckland'),
          endsAt: moment.tz('2016-10-28 22:00', 'Pacific/Auckland'),
          location: {
            name: 'BATS Theatre',
            address: '1 Kent Tce, Wellington'
          }
        },
        {
          id: 3,
          name: 'Southern Cross Kids’ Show',
          startsAt: moment.tz('2016-10-29 11:00', 'Pacific/Auckland'),
          endsAt: moment.tz('2016-10-29 12:00', 'Pacific/Auckland'),
          location: {
            name: 'Southern Cross',
            address: 'Abel Smith St, Wellington'
          }
        }
      ]
    }
  }

  render() {
    const direction = this.state.action === 'decline' ? -1 : 1,
          animation = {
            enter: {
              duration: 0,
              animation: {
                translateY: [0, 'spring']
              },
              style: {
                translateX: 0,
                rotateZ: 0,
                translateY: '0vh'
              }
            },
            leave: {
              duration: 500,
              animation: {
                translateX: `${direction * 200}vw`,
                rotateZ: `${direction * 10}deg`
              }
            }
          }

    return (
      <section className="inbox tab-page">
        <VelocityTransitionGroup component="section" className="invitations" {...animation}>
          {this.nextCard()}
          {this.topCard()}
        </VelocityTransitionGroup>
      </section>
    );
  }

  topCard() {
    if (this.state.invitations.length) {
      var animation = {};

      if (this.state.action === 'drag') {
        animation = {
          duration: 1,
          animation: {
            translateX: `${this.state.position * 100}%`,
            rotateZ: `${this.state.position * 5}deg`
          }
        };
      } else if (this.state.action === 'revert') {
        animation = {
          duration: 500,
          animation: {
            translateX: [0, 'spring'],
            rotateZ: [0, 'spring']
          }
        };
      } else if (this.state.action === 'accept' || this.state.action === 'decline') {
        animation = {
          duration: 500,
          animation: {
            scaleX: [1, 'spring'],
            scaleY: [1, 'spring'],
            opacity: 1
          }
        };
      }

      return this.renderCard(this.state.invitations[0], animation);
    }
  }

  nextCard() {
    if (this.state.invitations.length > 1) {
      var animation = { properties: {} };

      if (this.state.action === 'revert') {
        animation = {
          duration: 500,
          animation: {
            scaleX: 0.75,
            scaleY: 0.75,
            opacity: 0
          }
        };
      } else if (this.state.action === 'drag') {
        const bounded = Math.min(1, Math.abs(this.state.position)),
          scale = bounded / 4 + 0.75;
        animation = {
          duration: 0,
          animation: {
            scaleX: scale,
            scaleY: scale,
            opacity: bounded
          }
        };
      } else {
        animation = {
          duration: 0,
          animation: {
            translateX: 0,
            rotateZ: 0,
            scaleX: 0.75,
            scaleY: 0.75,
            opacity: 0
          }
        };
      }

      return this.renderCard(this.state.invitations[1], animation);
    }
  }

  renderCard(invitation, animation) {
    return (
      <VelocityComponent key={invitation.id} {...animation}>
        <InvitationCard {...invitation} dragStart={(e, data) => this.dragStart(e, data, invitation)} dragMove={(e, data) => this.dragMove(e, data, invitation)} dragStop={(e, data) => this.dragStop(e, data, invitation)} accept={() => this.accept(invitation)} decline={() => this.decline(invitation)} />
      </VelocityComponent>
    )
  }

  dragStart(e, data, invitation) {
    if (invitation === this.state.invitations[0]) {
      this.setState({ action: 'drag', dragOrigin: data.lastX, position: 0 });
    } else {
      return false;
    }
  }

  dragMove(e, data) {
    const x = data.x - this.state.dragOrigin,
          position = x / data.node.clientWidth;
    this.setState({ position });
  }

  dragStop(e, data, invitation) {
    if (this.state.position > 0.5) {
      this.accept(invitation);
    } else if (this.state.position < -0.5) {
      this.decline(invitation);
    } else {
      this.setState({ action: 'revert' });
    }
  }

  accept(invitation) {
    const invitations = this.state.invitations.slice(1).concat([invitation]);
    this.setState({ invitations, action: 'accept' });
  }

  decline(invitation) {
    const invitations = this.state.invitations.slice(1).concat([invitation]);
    this.setState({ invitations, action: 'decline' });
  }
}

export default Inbox;
