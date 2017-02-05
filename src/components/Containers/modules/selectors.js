import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const getSortBy = state => state.sortBy;
const getContainers = state => state.containers.ids.map(id => state.entities.containers[id]);

export const getSortedContainers = createSelector(
  [ getSortBy, getContainers ],
  (sortByValue, containers) => {
    switch (sortByValue) {
      case 'SORT_BY_ID':
        return sortBy(containers, 'id');
      case 'SORT_BY_STATE':
        return sortBy(containers, 'state');
      default:
      case 'SORT_BY_NAME':
        return sortBy(containers, 'name');
    }
  }
);
