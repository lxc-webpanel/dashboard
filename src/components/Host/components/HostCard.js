import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import Progress from './Progress';
import { info, white, getStatusColor } from '../../../utils/colors';

const HostCard = ({
  extras,
  icon,
  hasProgress = false,
  hasStatusColor = false,
  label,
  style,
  unit,
  value
}) => {
  const extrasLength = extras.length;
  const ulClassName = (extrasLength === 2) ? 'valign host-card-extras-two-up' : 'valign';
  const progress = hasProgress ? <Progress value={value} /> : '';
  const backgroundColor = hasStatusColor ? getStatusColor(value, 'light') : info.light;

  return (
    <Paper zDepth={1}
      className='host-card valign-wrapper'
      style={{
        backgroundColor,
        color: white
      }}>
      <div className='valign'>
        <span className='host-card-value'>{ value }{ unit }</span>
        <span className='host-card-label'>{ label }</span>
      </div>
      <div className='host-card-extras valign-wrapper clearfix' style={{ backgroundColor }}>
        {
          extras.map((extra, i) => (
            <ul className={ulClassName} key={i}>
              { extra.map((e, j) => (<li key={j}><span>{e.label}:</span> { e.value }{ e.unit }</li>)) }
            </ul>
          ))
        }
      </div>
      { icon }
      { progress }
    </Paper>
  );
};

HostCard.propTypes = {
  icon: PropTypes.element.isRequired,
  extras: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        unit: PropTypes.string
      })
    )
  ).isRequired,
  hasStatusColor: PropTypes.bool,
  hasProgress: PropTypes.bool,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default HostCard;
