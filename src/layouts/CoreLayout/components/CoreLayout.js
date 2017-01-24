import React, { Component } from 'react';
import './CoreLayout.scss';
import '../../../styles/core.scss';

import Header from '../../../components/Header';
import Notification from '../../../components/Notification';

export default class CoreLayout extends Component {
  static propTypes = {
    children : React.PropTypes.element.isRequired,
    me: React.PropTypes.object.isRequired,
    loadMe: React.PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadMe();
  }

  render () {
    return (
      <div className='core-layout'>
        <Header name={this.props.me.name} />
        <div>
          {this.props.children}
        </div>
        <Notification />
      </div>
    );
  }
}
