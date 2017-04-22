const chains = {};

export default store => next => action => {

  const result = next(action);

  if (chains.hasOwnProperty(action.type)) {
    chains[action.type].forEach(chainedActionCreator => {
      store.dispatch(chainedActionCreator());
    });
  }

  return result;

};

export function registerChain(triggeringActionType, chainedActionCreator) {

  if (typeof triggeringActionType !== "string") {
    throw new TypeError("No triggering action type was passed as a string: " +
      triggeringActionType);
  }

  if (typeof chainedActionCreator !== "function") {
    throw new TypeError("No chained action creator was passed as a function: " +
      chainedActionCreator);
  }

  if (!chains.hasOwnProperty(triggeringActionType)) {
    chains[triggeringActionType] = [chainedActionCreator];
  } else {
    chains[triggeringActionType].push(chainedActionCreator);
  }

}
