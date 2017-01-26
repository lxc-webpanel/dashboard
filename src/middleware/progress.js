export default ({ dispatch, getState }) => next => action => {
  const requestType = action.type.slice(action.type.lastIndexOf('_') + 1);
  const isProgressBarShown = getState().progress;

  if (requestType === 'REQUEST' && !isProgressBarShown) {
    // dispatch(showProgressBar()); // Sets state.progress to true
  } else if (requestType === 'SUCCESS' || requestType === 'FAILURE' && isProgressBarShown) {
    // dispatch(hideProgressBar()); // Sets state.progress to false
  }

  return next(action);
};
