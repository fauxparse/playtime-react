import React, { Component } from 'react';
import { DraggableCore } from 'react-draggable';
import icons from '../resources/icons';

class Invitation extends Component {
  render() {
    return (
      <DraggableCore axis="x" onStart={this.props.dragStart} onDrag={this.props.dragMove} onStop={this.props.dragStop}>
        <article className="invitation">
          <header>
            <div className="date">{this.props.startsAt.format('dddd D MMMM')}</div>
            <h2>{this.props.name}</h2>
          </header>
          <section>
            <ul>
              {this.timeRange()}
              {this.location()}
            </ul>
          </section>
          <footer>
            <button rel="decline" onClick={this.props.decline}>{icons.buttons.decline}</button>
            <button rel="accept" onClick={this.props.accept}>{icons.buttons.accept}</button>
          </footer>
        </article>
      </DraggableCore>
    );
  }

  timeRange() {
    return (
      <li>
        {icons.bullets.time}
        <b>{this.props.startsAt.format('hh:mm A')}</b> – {this.props.endsAt.format('hh:mm A')}
      </li>
    )
  }

  location() {
    return (
      <li>
        {icons.bullets.location}
        <b>{this.props.location.name}</b>, {this.props.location.address}
      </li>
    )
  }
}

export default Invitation;
