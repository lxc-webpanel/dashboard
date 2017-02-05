import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import ExpandIcon from 'material-ui/svg-icons/action/visibility';
import CollapseIcon from 'material-ui/svg-icons/action/visibility-off';
import {
  red400 as redReboot,
  green400 as greenCreate,
  blueGrey400 as greyClone,
  white
} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

import ContainerCard from './ContainerCard';
import chunk from 'lodash/chunk';

import SortBy from '../containers/SortByContainer';

const Containers = ({ containers }) => {
  const chunkedContainers = chunk(containers, 4);

  return (
    <Paper zDepth={1}>
      <Toolbar style={{ marginBottom: 20 }} >
        <ToolbarGroup firstChild>
          <span className='hostname'>Containers</span>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            backgroundColor={greyClone}
            labelColor={white}
            style={{ marginLeft: 0 }}
            label='Expand All'
            icon={<ExpandIcon />} />
          <RaisedButton
            backgroundColor={greyClone}
            labelColor={white}
            style={{ marginLeft: 0, marginRight: 0 }}
            label='Collapse All'
            icon={<CollapseIcon />} />
          <ToolbarSeparator />
          <SortBy />
        </ToolbarGroup>
      </Toolbar>
      <div className='containers' style={{ padding: '0 10px 20px' }}>
        {
          chunkedContainers.map((containers, i) => (
            <div className='row clearfix' key={i} >
              {
                containers.map((container, j) => (
                  <div className='col s12 m6 l3' key={j}><ContainerCard key={j} container={container} /></div>
                ))
              }
            </div>
          ))
        }
      </div>
    </Paper>
  );
};

Containers.propTypes = {
  containers: PropTypes.array
};

export default Containers;
