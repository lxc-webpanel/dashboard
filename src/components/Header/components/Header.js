import React from 'react';
import AppBar from 'material-ui/AppBar';
import Logo from './Logo';
import Menu from './Menu';
import './Header.scss';

const hello = () => {
  const hellos = ['Hello', 'Howdy', 'Salut', 'Bonjour', 'Holà'];
  const index = Math.floor(Math.random() * (hellos.length - 0)) + 0;
  return hellos[index];
};

const Header = (props) => {
  const { name } = props;

  const ElementRight = () => (
    <div style={{ height: '100%' }}>
      <span className='hello'>{hello()} { name }</span>
      <Menu />
    </div>
  );

  return (
    <AppBar
      title={null}
      iconElementLeft={<Logo />}
      iconElementRight={<ElementRight />}
      iconStyleLeft={{ margin: 0 }}
      iconStyleRight={{ fill: 'white' }}
      style={{ backgroundColor: '#004159' }} />
  );
};

Header.propTypes = {
  name: React.PropTypes.string
};

export default Header;
