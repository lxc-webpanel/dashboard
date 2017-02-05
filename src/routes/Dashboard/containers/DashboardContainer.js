import { connect } from 'react-redux';
import { loadHost } from '../../../store/host';
import { loadContainers } from '../../../store/containers';
import Dashboard from '../components/Dashboard';

const mapDispatchToProps = {
  loadHost,
  loadContainers
};

const mapStateToProps = (state) => ({
  host: state.host || {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
