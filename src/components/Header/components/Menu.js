import React from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SignOutIcon from 'material-ui/svg-icons/action/exit-to-app';
import Divider from 'material-ui/Divider';

const Menu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon color='white' /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText='Containers' disabled />
    <MenuItem primaryText='Users' disabled />
    <MenuItem primaryText='Settings' disabled />
    <Divider />
    <MenuItem primaryText='Sign out' leftIcon={<SignOutIcon />} containerElement={<Link to='/auth/logout' />} />
  </IconMenu>
);

Menu.muiName = 'Menu';

export default Menu;
