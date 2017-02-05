import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import StartIcon from 'material-ui/svg-icons/av/play-arrow';
import FreezeIcon from 'material-ui/svg-icons/av/pause';
import StopIcon from 'material-ui/svg-icons/av/stop';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import CPUIcon from 'material-ui/svg-icons/device/data-usage';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import IPIcon from 'material-ui/svg-icons/action/settings-ethernet';

import { colors, getStateStatusColor } from '../../../utils/colors';
import { RUNNING, STOPPED, FROZEN } from '../../../utils/states';

const buttons = [
  {
    label: 'Start',
    icon: <StartIcon />,
    state: RUNNING
  },
  {
    label: 'Freeze',
    icon: <FreezeIcon />,
    state: FROZEN
  },
  {
    label: 'Stop',
    icon: <StopIcon />,
    state: STOPPED
  }
];

const ContainerCard = ({ container }) => {
  return (
    <Card style={{ backgroundColor: getStateStatusColor(container.state) }}>
      <CardHeader
        title={container.name}
        subtitle={container.id}
        actAsExpander
        showExpandableButton
        style={{ paddingBottom: 0 }}
      />
      <CardText expandable>
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          <ListItem primaryText='1' secondaryText='CPU' leftIcon={<CPUIcon />} />
          <ListItem primaryText='40 MB' secondaryText='Memory' leftIcon={<MemoryIcon />} />
          {
            (container.lxc.network[0] && container.lxc.network[0].ipv4._)
            ? <ListItem primaryText={container.lxc.network[0].ipv4._[0]} secondaryText='IP' leftIcon={<IPIcon />} />
            : null
          }
        </List>
      </CardText>
      <CardActions style={{ textAlign: 'center' }}>
        { buttons
            .filter(button => button.state !== container.state)
            .map((button, i) => <FlatButton key={i} label={button.label} icon={button.icon} />)
        }
      </CardActions>
    </Card>
  );
};

ContainerCard.propTypes = {
  container: PropTypes.object
};

export default ContainerCard;
