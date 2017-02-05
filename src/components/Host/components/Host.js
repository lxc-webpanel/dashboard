import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import DiskIcon from 'material-ui/svg-icons/device/storage';
import CPUIcon from 'material-ui/svg-icons/device/data-usage';
import UptimeIcon from 'material-ui/svg-icons/action/info-outline';
import HostToolbar from './HostToolbar';
import HostCard from './HostCard';
import { white } from 'material-ui/styles/colors';
import './Host.scss';

const iconStyles = {
  width: '130px',
  height: '130px'
};

const formatUptime = ({ days, hours, minutes }) => {
  const d = (days && days.toString().length > 1) ? `${days} days` : `${days} day`;
  const h = (hours && hours.toString().length < 2) ? `0${hours}` : hours;
  const m = (minutes && minutes.toString().length < 2) ? `0${minutes}` : minutes;

  return `${d} ${h}:${m}`;
};

const uptimeExtras = ({ dist, hostname, kernel }) => ([
  {
    label: 'Hostname',
    value: hostname
  },
  {
    label: 'Dist',
    value: dist
  },
  {
    label: 'Kernel',
    value: kernel
  }
]);

const cpuExtras = ({ cores, model }) => ([
  {
    label: (cores > 1) ? 'Cores' : 'Core',
    value: cores
  },
  {
    label: 'Model',
    value: model
  }
]);

const diskExtras = ({ disk, free, total, used }) => ([
  {
    label: 'Free',
    value: free,
    unit: 'MB'
  },
  {
    label: 'Used',
    value: used,
    unit: 'MB'
  },
  {
    label: 'Total',
    value: total,
    unit: 'MB'
  },
  {
    label: 'Disk',
    value: disk
  }
]);

const memoryExtras = ({ percent_cached, total, used }) => ([
  {
    label: 'Cached',
    value: percent_cached,
    unit: '%'
  },
  {
    label: 'Used',
    value: used,
    unit: 'MB'
  },
  {
    label: 'Total',
    value: total,
    unit: 'MB'
  }
]);

const memorySwapExtras = ({ swap_percent, swap_total, swap_used }) => ([
  {
    label: 'Swap',
    value: swap_percent,
    unit: '%'
  },
  {
    label: 'Used',
    value: swap_used,
    unit: 'MB'
  },
  {
    label: 'Total',
    value: swap_total,
    unit: 'MB'
  }
]);

class Host extends Component {
  static propTypes = {
    host: PropTypes.object.isRequired
  }

  render () {
    const {
      host,
      host : { cpu, memory, uptime, disk, hostname }
    } = this.props;

    return (
      <Paper zDepth={1}>
        <HostToolbar hostname={hostname} />
        <div className='host-cards row'>
          <div className='col s12 m6 l3'>
            <HostCard
              icon={<UptimeIcon style={iconStyles} color={white} />}
              value={uptime ? formatUptime(uptime) : 0}
              label='Uptime'
              extras={host ? [uptimeExtras(host)] : []}
              />
          </div>
          <div className='col s12 m6 l3'>
            <HostCard
              icon={<CPUIcon style={iconStyles} color={white} />}
              value={cpu ? cpu.usage : 0}
              label='CPU'
              unit='%'
              extras={cpu ? [cpuExtras(cpu)] : []}
              hasProgress
              hasStatusColor
              />
          </div>
          <div className='col s12 m6 l3'>
            <HostCard
              icon={<MemoryIcon style={iconStyles} color={white} />}
              value={memory ? memory.percent : 0}
              label='Memory'
              unit='%'
              extras={memory ? [memoryExtras(memory), memorySwapExtras(memory)] : []}
              hasProgress
              hasStatusColor
              />
          </div>
          <div className='col s12 m6 l3'>
            <HostCard
              icon={<DiskIcon style={iconStyles} color={white} />}
              value={disk ? disk.percent : 0}
              label='Disk'
              unit='%'
              extras={disk ? [diskExtras(disk)] : []}
              hasProgress
              hasStatusColor
              />
          </div>
        </div>
      </Paper>
    );
  }
}

export default Host;
