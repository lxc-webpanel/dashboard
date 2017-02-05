import { connect } from 'react-redux';
import Host from '../components/Host';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  host: state.entities.host[state.host.id] || {}
});

export default connect(mapStateToProps, mapDispatchToProps)(Host);
