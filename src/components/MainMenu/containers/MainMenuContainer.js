import { connect } from 'react-redux';
import MainMenu from '../components/MainMenu';
import { logUserOut } from '../../../store/auth';

const mapDispatchToProps = {
  logUserOut
};

export default connect(null, mapDispatchToProps)(MainMenu);
