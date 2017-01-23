import { connect } from 'react-redux';
import Notification from '../components/Notification';
import { hideNotif } from '../../../store/notification';

const mapDispatchToProps = {
  hideNotif
};

const mapStateToProps = (state) => ({
  message: state.notification.message,
  open: state.notification.open
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
