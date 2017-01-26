import React from 'react';
import { bindActionCreators } from 'redux';
import LoginForm from 'routes/Auth/Login/components/LoginForm';
import { shallow } from 'enzyme';

describe('(Component) LoginForm', () => {
  let _props, _spies, _wrapper;
  let submitting, touched, error, reset, handleSubmit;

  beforeEach(() => {
    submitting = false;
    touched = false;
    error = null;
    reset = sinon.spy();
    handleSubmit = fn => fn;

    _spies = {};
    _props = {
      ...bindActionCreators({
        logUserIn : (_spies.logUserIn = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };
  });

  const buildWrapper = () => {
    const props = {
      ..._props,
      submitting,
      fields: {
        username: {
          value: '',
          touched,
          error
        }
      },
      handleSubmit,
      reset
    };

    return shallow(<LoginForm {...props} />);
  };

  it('Should render as a <form>.', () => {
    _wrapper = buildWrapper();
    expect(_wrapper.is('form')).to.equal(true);
  });

  // describe('A Login button...', () => {
  //   let _button;

  //   beforeEach(() => {
  //     _wrapper = buildWrapper();
  //     _button = _wrapper.find('button[type="submit"');
  //   });

  //   it('Should dispatch a `doubleAsync` action when clicked', () => {
  //     _spies.dispatch.should.have.not.been.called;

  //     _button.simulate('click');

  //     _spies.dispatch.should.have.been.called;
  //     _spies.doubleAsync.should.have.been.called;
  //   });
  // });
});
