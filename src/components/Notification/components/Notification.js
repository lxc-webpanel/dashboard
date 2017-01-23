import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Notification extends Component {
  static propTypes = {
    message: PropTypes.string,
    open: PropTypes.bool.isRequired,
    hideNotif: PropTypes.func.isRequired
  }

  handleRequestClose = () => {
    this.props.hideNotif();
  }

  render () {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        onRequestClose={this.handleRequestClose}
        autoHideDuration={3000}
      />
    );
  }
}

export default Notification;
