import React, { Component, PropTypes } from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

// ========================================================
// Material UI
// ========================================================
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../theme/material-ui';

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.array.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { routes, store } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <MuiThemeProvider muiTheme={theme}>
            <Router history={browserHistory} children={routes} />
          </MuiThemeProvider>
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
