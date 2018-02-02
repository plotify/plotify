import store from '../store'

export const bind = (actionCreator) => function () {
  const action = actionCreator.apply(null, arguments)
  return store.dispatch(action)
}
