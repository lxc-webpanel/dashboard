import React from 'react';
import AppBar from 'material-ui/AppBar';
import Logo from './Logo';
import MainMenu from '../../MainMenu';
import './Header.scss';

const hello = () => {
  const hellos = ['Hello', 'Howdy', 'Salut', 'Bonjour', 'Holà'];
  const index = Math.floor(Math.random() * (hellos.length - 0)) + 0;
  return hellos[index];
};

const Header = ({ name, isFetching }) => {
  const ElementRight = () => {
    const helloContent = isFetching ? 'Loading...' : (hello() + ` ${name}`);

    return (
      <div style={{ height: '100%' }}>
        <span className='hello'>{ helloContent }</span>
        <MainMenu />
      </div>
    );
  };

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
  name: React.PropTypes.string,
  isFetching: React.PropTypes.bool
};

export default Header;
