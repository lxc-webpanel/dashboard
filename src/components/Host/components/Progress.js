import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { white, getResourcesStatusColor } from '../../../utils/colors';

const Progress = ({ value }) => (
  <LinearProgress
    className='host-card-progress'
    mode='determinate'
    value={value}
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 5,
      width: '100%',
      backgroundColor: getResourcesStatusColor(value, 'light')
    }}
    color={white} />
);

Progress.propTypes = {
  value: PropTypes.number
};

export default Progress;
