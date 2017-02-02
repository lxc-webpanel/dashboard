import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import HostIcon from 'material-ui/svg-icons/hardware/developer-board';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import DiskIcon from 'material-ui/svg-icons/device/storage';
import CPUIcon from 'material-ui/svg-icons/device/data-usage';
import UptimeIcon from 'material-ui/svg-icons/action/info-outline';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import CloneIcon from 'material-ui/svg-icons/content/content-copy';
import RebootIcon from 'material-ui/svg-icons/action/autorenew';
import Divider from 'material-ui/Divider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {
  grey100,
  lightGreen300 as green,
  orange300 as orange,
  blue100,
  blue300,
  grey800,
  indigo700,
  blue700
} from 'material-ui/styles/colors';
import {
  red400 as redReboot,
  green400 as greenCreate,
  blueGrey400 as greyClone
} from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

import './Host.scss';
import LinearProgress from 'material-ui/LinearProgress';
import DropDownMenu from 'material-ui/DropDownMenu';

import Avatar from 'material-ui/Avatar';

const HostMenu = (props) => (
  <IconMenu
    style={{ color: grey800 }}
    {...props}
    iconButtonElement={
      <IconButton iconStyle={{ fill: grey800 }}><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Create CT" leftIcon={<AddIcon />} />
    <MenuItem primaryText="Clone CT" leftIcon={<CloneIcon />} />
    <Divider />
    <MenuItem primaryText="Reboot" leftIcon={<RebootIcon />} />
  </IconMenu>
);

HostMenu.muiName = 'IconMenu';

class Host extends Component {
  static propTypes = {
    host: PropTypes.object.isRequired
  }

  render () {
    const {
      cpu,
      memory,
      uptime,
      disk_usage,
      hostname,
      dist,
      kernel
    } = this.props.host;

    const style = {
      width: '100%',
      display: 'block'
    };

    const hostIconStyles = {
      padding: 12,
      width: 48,
      height: 48,
      fill: grey800
    };

    const hostDetailsItemStyle = {
      backgroundColor: green,
      color: grey100
    };

    const hostDetailsItemStyleUptime = {
      backgroundColor: blue300,
      color: blue100
    };

    const hostDetailsItemStyleWarning = {
      backgroundColor: orange,
      color: grey100
    };

    const containersStyle = {
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft: 20
    };

    /*<AppBar
          title={hostname}
          iconElementLeft={<HostIcon style={hostIconStyles} />}
          iconElementRight={<HostMenu />}
          style={{ backgroundColor: grey100 }}
          titleStyle={{ color: grey800 }}
          zDepth={0}
        />*/

    return (
      <Paper style={style} zDepth={1}>
        <Toolbar>
          <ToolbarGroup firstChild={true} >
            <span style={{ marginLeft: 20, fontSize: 20 }}>{hostname}</span>
          </ToolbarGroup>
          <ToolbarGroup>
          <RaisedButton backgroundColor={greenCreate} labelColor={white} style={{ marginLeft: 0 }} label="Create CT" icon={<AddIcon />} />
          <RaisedButton backgroundColor={greyClone} labelColor={white} style={{ marginLeft: 0, marginRight: 0 }} label="Clone CT" icon={<CloneIcon />}/>
          <ToolbarSeparator />
          <RaisedButton backgroundColor={redReboot} labelColor={white} style={{ marginRight: 0 }} label="Reboot" icon={<RebootIcon />} />
        </ToolbarGroup>
      </Toolbar>
        <div className='host-details row'>
          <div className='col s3'>
            <Paper zDepth={1} className='host-details-item valign-wrapper' style={hostDetailsItemStyleUptime}>
              <div className='valign'>
                <span className='host-details-item-value'>{ uptime.day } day(s) { uptime.time }</span>
                <span className='host-details-item-label'>Uptime</span>
              </div>
              <div className='host-details-item-extras valign-wrapper info'>
                <ul className='valign'>
                  <li>Dist: { dist }</li>
                  <li>Kernel: { kernel }</li>
                </ul>
              </div>
              <UptimeIcon />
            </Paper>
          </div>
          <div className='col s3'>
            <Paper zDepth={1} className='host-details-item valign-wrapper' style={hostDetailsItemStyle}>
              <div className='valign'>
                <span className='host-details-item-value'>35%</span>
                <span className='host-details-item-label'>CPU</span>
              </div>
              <div className='host-details-item-extras valign-wrapper'>
                <ul className='valign'>
                  <li>Core(s): { cpu.cores }</li>
                  <li>Model: { cpu.model }</li>
                </ul>
              </div>
              <CPUIcon />
              <LinearProgress className='host-details-item-progress' mode='determinate' value={35} />
            </Paper>
          </div>
          <div className='col s3'>
            <Paper zDepth={1} className='host-details-item valign-wrapper' style={hostDetailsItemStyleWarning}>
              <div className='valign'>
                <span className='host-details-item-value'>85%</span>
                <span className='host-details-item-label'>Memory</span>
              </div>
              <div className='host-details-item-extras valign-wrapper warning'>
                <div className='valign clearfix double-wrapper'>
                  <ul className='double'>
                    <li>Used: { memory.used } MB</li>
                    <li>Total: { memory.total } MB</li>
                  </ul>
                  <ul className='double'>
                    <li>Swap: { memory.swap_percent }%</li>
                    <li>Used: { memory.swap_used } MB</li>
                    <li>Total: { memory.swap_total } MB</li>
                  </ul>
                </div>
              </div>
              <MemoryIcon />
              <LinearProgress className='host-details-item-progress host-details-item-progress-warning' mode='determinate' value={85} />
            </Paper>
          </div>
          <div className='col s3'>
            <Paper zDepth={1} className='host-details-item valign-wrapper' style={hostDetailsItemStyle}>
              <div className='valign'>
                <span className='host-details-item-value'>{ disk_usage.percent }%</span>
                <span className='host-details-item-label'>Disk</span>
              </div>
              <div className='host-details-item-extras valign-wrapper'>
                <ul className='valign'>
                  <li>Free: { disk_usage.free } MB</li>
                  <li>Used: { disk_usage.used } MB</li>
                  <li>Total: { disk_usage.total } MB</li>
                  <li>Disk: { disk_usage.disk }</li>
                </ul>
              </div>
              <DiskIcon />
              <LinearProgress className='host-details-item-progress' mode='determinate' value={disk_usage.percent} />
            </Paper>
          </div>
        </div>
      </Paper>
    );
  }
}

export default Host;
