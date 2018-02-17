import { createStore } from './store'
import { setState } from './actions'

test('setState', async () => {
  const store = createStore()
  const state = { hello: 'world' }
  await store.dispatch(setState(state))
  expect(store.getState()).toBe(state)
})
