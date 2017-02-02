export default ({ dispatch, getState }) => {
  return next => action => {
    const nextAction = next(action);

    if (action.effect) {
      if (typeof action.effect !== 'function') {
        throw new Error('Expected effect to be a function');
      }

      action.effect({
        dispatch : dispatch,
        state    : getState(),
        type     : action.type
      });

      delete action.effect;
    }

    return nextAction;
  };
};
