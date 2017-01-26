import React from 'react';
import { bindActionCreators } from 'redux';
import Login from 'routes/Auth/Login/components/Login';
import Paper from 'material-ui/Paper';
import { shallow } from 'enzyme';

describe('(Component) Login', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      ...bindActionCreators({
        login : (_spies.loginUser = sinon.spy()),
        handleSubmit : fn => fn
      }, _spies.dispatch = sinon.spy())
    };

    _wrapper = shallow(<Login {..._props} />);
  });

  it('Should render a <Paper /> component', () => {
    expect(_wrapper.is(Paper)).to.equal(true);
  });
});
