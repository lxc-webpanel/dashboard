import { connect } from 'react-redux';
import SortBy from '../components/SortBy';
import { setSortBy } from '../modules/sortBy';

const mapDispatchToProps = {
  setSortBy
};

export default connect(null, mapDispatchToProps)(SortBy);
