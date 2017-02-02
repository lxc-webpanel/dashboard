import { connect } from 'react-redux';
import { loadHost } from '../../../store/host';
import Dashboard from '../components/Dashboard';

const mapDispatchToProps = {
  loadHost
};

const mapStateToProps = (state) => ({
  host: state.host || {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
