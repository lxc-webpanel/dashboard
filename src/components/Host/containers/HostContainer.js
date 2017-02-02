import { connect } from 'react-redux';
import Host from '../components/Host';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  host: state.host
});

export default connect(mapStateToProps, mapDispatchToProps)(Host);
