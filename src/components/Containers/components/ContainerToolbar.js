import React, { PropTypes } from 'react';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import CloneIcon from 'material-ui/svg-icons/content/content-copy';
import RebootIcon from 'material-ui/svg-icons/action/autorenew';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {
  red400 as redReboot,
  green400 as greenCreate,
  blueGrey400 as greyClone,
  white
} from 'material-ui/styles/colors';

const HostToolbar = ({ name }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <span className='hostname'>{ name }</span>
    </ToolbarGroup>
    <ToolbarGroup>
      <RaisedButton
        backgroundColor={greenCreate}
        labelColor={white}
        style={{ marginLeft: 0 }}
        label='Create CT'
        icon={<AddIcon />} />
      <RaisedButton
        backgroundColor={greyClone}
        labelColor={white}
        style={{ marginLeft: 0, marginRight: 0 }}
        label='Clone CT'
        icon={<CloneIcon />} />
      <ToolbarSeparator />
      <RaisedButton
        backgroundColor={redReboot}
        labelColor={white}
        style={{ marginRight: 0 }}
        label='Reboot'
        icon={<RebootIcon />} />
    </ToolbarGroup>
  </Toolbar>
);

HostToolbar.propTypes = {
  name: PropTypes.string
};

export default HostToolbar;
