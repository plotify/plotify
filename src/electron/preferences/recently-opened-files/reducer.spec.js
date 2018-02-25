import { createStore } from '../../store'
import { getRecentlyOpenedFiles } from './selectors'
import { setRecentlyOpenedFiles } from './actions'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  expect(getRecentlyOpenedFiles(store.getState())).toEqual([])
})

test('setRecentlyOpenedFiles', async () => {
  const files = [
    { path: '/hello.story', pinned: true, lastOpened: '2018-02-25T13:31:28.692Z' },
    { path: '/world.story', pinned: false, lastOpened: '2018-02-25T13:31:28.692Z' }
  ]
  await store.dispatch(setRecentlyOpenedFiles(files))
  expect(JSON.stringify(getRecentlyOpenedFiles(store.getState()))).toBe(JSON.stringify(files))
})
