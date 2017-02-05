import React, { Component, PropTypes } from 'react';
import Host from '../../../components/Host';
import Containers from '../../../components/Containers';

const refreshTime = 30;

export default class Dashboard extends Component {
  static propTypes = {
    loadHost: PropTypes.func.isRequired,
    loadContainers: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      timer: refreshTime
    };
  }

  componentDidMount () {
    this.props.loadHost();
    this.props.loadContainers();

    this.timer = setTimeout(() => {
      this.refresh();
    }, 1000);
  }

  componentWillUnmount () {
    clearTimeout(this.timer);
  }

  refresh () {
    if (this.state.timer === 0) {
      this.props.loadHost();
      this.props.loadContainers();
      this.setState({ timer: refreshTime });
    } else {
      this.setState({ timer: this.state.timer - 1 });
    }

    this.timer = setTimeout(() => this.refresh(), 1000);
  }

  render () {
    return (
      <div>
        <Host />
        <Containers />
      </div>
    );
  }
}
