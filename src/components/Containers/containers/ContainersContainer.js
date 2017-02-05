import { connect } from 'react-redux';
import Containers from '../components/Containers';
import { getSortedContainers } from '../modules/selectors';

const mapDispatchToProps = {

};

const mapStateToProps = (state) => ({
  containers: getSortedContainers(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Containers);
