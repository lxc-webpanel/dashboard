import React from 'react';
import Header from 'components/Header/components/Header';
import AppBar from 'material-ui/AppBar';
import { shallow } from 'enzyme';

describe('(Component) Header', () => {
  let _props, _wrapper;

  beforeEach(() => {
    _props = {
      name: 'Antoine'
    };

    _wrapper = shallow(<Header {..._props} />);
  });

  it('Should render an <AppBar /> component', () => {
    expect(_wrapper.is(AppBar)).to.be.true;
  });
});
