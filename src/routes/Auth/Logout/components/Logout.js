import { Component, PropTypes } from 'react';

export default class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.logout();
    console.log(this.props);
  }

  render () {
    return null;
  }
}
