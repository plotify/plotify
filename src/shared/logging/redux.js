const separator = '---------------------------------------------------------------------'

export const loggingMiddleware = (useSeparator = false) => (store) => (next) => (action) => {
  if (useSeparator) console.log(separator + '\n')
  const result = next(action)
  console.log('Action:', action, '\n', 'Next state:', store.getState())
  if (useSeparator) console.log('\n' + separator)
  return result
}

export const logInitialState = (store, useSeparator = false) => {
  if (useSeparator) console.log(separator + '\n')
  console.log('Initial state:', store.getState())
  if (useSeparator) console.log('\n' + separator)
}
