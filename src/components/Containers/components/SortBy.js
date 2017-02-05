import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import sortByReducer, { SORT_BY_ID, SORT_BY_NAME, SORT_BY_STATE } from '../modules/sortBy';
import { injectReducer } from '../../../store/reducers';

export default class SortBy extends Component {
  static propTypes = {
    setSortBy: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor (props, context) {
    super(props);

    injectReducer(context.store, { key: 'sortBy', 'reducer': sortByReducer });
  }

  state = {
    value: SORT_BY_STATE
  }

  onChange = (event, index, value) => {
    this.setState({ value });
    this.props.setSortBy(value);
  }

  render () {
    return (
      <SelectField
        floatingLabelText='Sort by'
        value={this.state.value}
        style={{ width: 90, marginLeft: 20 }}
        labelStyle={{ marginTop: 0, lineHeight: '46px' }}
        iconStyle={{ fill: 'black', top: 5 }}
        menuStyle={{ width: 100 }}
        onChange={this.onChange}
      >
        <MenuItem value={SORT_BY_STATE} primaryText='State' />
        <MenuItem value={SORT_BY_NAME} primaryText='Name' />
        <MenuItem value={SORT_BY_ID} primaryText='ID' />
      </SelectField>
    );
  }
}
