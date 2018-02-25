import { addRecentlyOpenedFile, closeFolderNotFoundDialog, getRecentlyOpenedFilesFailed, getRecentlyOpenedFilesRequest, getRecentlyOpenedFilesSuccessful, openFolderNotFoundDialog, pinRecentlyOpenedFileFailed, pinRecentlyOpenedFileRequest, pinRecentlyOpenedFileSuccessful, removeError, removeRecentlyOpenedFileFailed, removeRecentlyOpenedFileRequest, removeRecentlyOpenedFileSuccessful, unpinRecentlyOpenedFileFailed, unpinRecentlyOpenedFileRequest, unpinRecentlyOpenedFileSuccessful } from './actions'
import { getErrorMessage, getNotPinnedFiles, getPinnedFiles, isError, isShowFolderNotFoundDialog } from './selectors'

import { createStore } from '../../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  const state = store.getState()
  expect(getPinnedFiles(state).length).toBe(0)
  expect(getNotPinnedFiles(state).length).toBe(0)
  expect(isShowFolderNotFoundDialog(state)).toBe(false)
  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

test('getRecentlyOpenedFilesRequest', async () => {
  await store.dispatch(getRecentlyOpenedFilesFailed('Hello world'))
  expect(isError(store.getState())).toBe(true)
  await store.dispatch(getRecentlyOpenedFilesRequest())
  expect(isError(store.getState())).toBe(false)
})

test('getRecentlyOpenedFilesSuccessful', async () => {
  await store.dispatch(getRecentlyOpenedFilesRequest())

  const pinnedFile = { path: '/hello/world.story', pinned: true }
  const notPinnedFile = { path: '/lorem/ipsum.story', pinned: false }
  await store.dispatch(getRecentlyOpenedFilesSuccessful([pinnedFile, notPinnedFile]))

  const state = store.getState()

  expect(getPinnedFiles(state).length).toBe(1)
  expect(getPinnedFiles(state)[0]).toEqual(pinnedFile)

  expect(getNotPinnedFiles(state).length).toBe(1)
  expect(getNotPinnedFiles(state)[0]).toEqual(notPinnedFile)

  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

test('getRecentlyOpenedFilesFailed', async () => {
  const message = 'Hello world'
  await store.dispatch(getRecentlyOpenedFilesFailed(message))

  const state = store.getState()
  expect(isError(state)).toBe(true)
  expect(getErrorMessage(state)).toBe(message)
})

test('pinRecentlyOpenedFileRequest', async () => {
  const path = '/hello/world.story'
  await store.dispatch(getRecentlyOpenedFilesRequest())
  await store.dispatch(getRecentlyOpenedFilesSuccessful([{ path, pinned: false }]))
  expect(getPinnedFiles(store.getState()).length).toBe(0)

  await store.dispatch(pinRecentlyOpenedFileRequest(path))

  const state = store.getState()
  expect(getPinnedFiles(state).length).toBe(1)
  expect(getPinnedFiles(state)[0]).toEqual({ path, pinned: true })
})

test('pinRecentlyOpenedFileSuccessful', async () => {
  const path = '/hello/world.story'
  await store.dispatch(pinRecentlyOpenedFileRequest(path))

  await store.dispatch(pinRecentlyOpenedFileSuccessful(path))

  const state = store.getState()
  expect(getPinnedFiles(state).length).toBe(1)
  expect(getPinnedFiles(state)[0]).toEqual({ path, pinned: true })
  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

test('pinRecentlyOpenedFileFailed', async () => {
  const path = '/hello/world.story'
  const otherPath = '/other.story'
  await store.dispatch(getRecentlyOpenedFilesRequest())
  await store.dispatch(getRecentlyOpenedFilesSuccessful([
    { path, pinned: false },
    { path: otherPath, pinned: false }
  ]))
  await store.dispatch(pinRecentlyOpenedFileRequest(path))
  expect(getPinnedFiles(store.getState()).length).toBe(1)

  const error = 'Hello world!'
  await store.dispatch(pinRecentlyOpenedFileFailed(path, error))

  const state = store.getState()
  expect(getPinnedFiles(state).length).toBe(0)
  expect(getNotPinnedFiles(state).length).toBe(2)
  expect(getNotPinnedFiles(state)[0]).toEqual({ path: otherPath, pinned: false })
  expect(getNotPinnedFiles(state)[1]).toEqual({ path, pinned: false })
  expect(isError(state)).toBe(true)
  expect(getErrorMessage(state)).toBe(error)
})

test('unpinRecentlyOpenedFileRequest', async () => {
  const path = '/lorem/ipsum.story'
  await store.dispatch(getRecentlyOpenedFilesRequest())
  await store.dispatch(getRecentlyOpenedFilesSuccessful([{ path, pinned: true }]))
  expect(getNotPinnedFiles(store.getState()).length).toBe(0)

  await store.dispatch(unpinRecentlyOpenedFileRequest(path))

  const state = store.getState()
  expect(getNotPinnedFiles(state).length).toBe(1)
  expect(getNotPinnedFiles(state)[0]).toEqual({ path, pinned: false })
})

test('unpinRecentlyOpenedFileSuccessful', async () => {
  const path = '/lorem/ipsum.story'
  await store.dispatch(unpinRecentlyOpenedFileRequest(path))

  await store.dispatch(unpinRecentlyOpenedFileSuccessful(path))

  const state = store.getState()
  expect(getNotPinnedFiles(state).length).toBe(1)
  expect(getNotPinnedFiles(state)[0]).toEqual({ path, pinned: false })
  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

test('unpinRecentlyOpenedFileFailed', async () => {
  const path = '/lorem/ipsum.story'
  const otherPath = '/other.story'
  await store.dispatch(getRecentlyOpenedFilesRequest())
  await store.dispatch(getRecentlyOpenedFilesSuccessful([
    { path, pinned: true },
    { path: otherPath, pinned: true }
  ]))
  await store.dispatch(unpinRecentlyOpenedFileRequest(path))
  expect(getNotPinnedFiles(store.getState()).length).toBe(1)

  const error = 'Lorem ipsum'
  await store.dispatch(unpinRecentlyOpenedFileFailed(path, error))

  const state = store.getState()
  expect(getNotPinnedFiles(state).length).toBe(0)
  expect(getPinnedFiles(state).length).toBe(2)
  expect(getPinnedFiles(state)[0]).toEqual({ path: otherPath, pinned: true })
  expect(getPinnedFiles(state)[1]).toEqual({ path, pinned: true })
  expect(isError(state)).toBe(true)
  expect(getErrorMessage(state)).toBe(error)
})

test('removeRecentlyOpenedFileRequest', async () => {
  const file = { path: '/hello/world.story', pinned: true }
  await store.dispatch(addRecentlyOpenedFile(file))
  expect(getPinnedFiles(store.getState()).length).toBe(1)

  await store.dispatch(removeRecentlyOpenedFileRequest(file.path))

  const state = store.getState()
  expect(getPinnedFiles(state).length).toBe(0)
  expect(getNotPinnedFiles(state).length).toBe(0)
  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

test('removeRecentlyOpenedFileSuccessful', async () => {
  const file = { path: '/hello/world.story', pinned: true }
  await store.dispatch(addRecentlyOpenedFile(file))
  expect(getPinnedFiles(store.getState()).length).toBe(1)

  await store.dispatch(removeRecentlyOpenedFileRequest(file.path))
  await store.dispatch(removeRecentlyOpenedFileSuccessful(file.path))

  const state = store.getState()
  expect(getPinnedFiles(state).length).toBe(0)
  expect(getNotPinnedFiles(state).length).toBe(0)
  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

test('removeRecentlyOpenedFileFailed', async () => {
  const file = { path: '/hello/world.story', pinned: true }
  const otherFile = { path: 'lorem/ipsum.story', pinned: true }
  await store.dispatch(addRecentlyOpenedFile(otherFile))
  await store.dispatch(addRecentlyOpenedFile(file))
  expect(getPinnedFiles(store.getState()).length).toBe(2)

  await store.dispatch(removeRecentlyOpenedFileRequest(file.path))
  expect(getPinnedFiles(store.getState()).length).toBe(1)

  const error = 'Hello world'
  await store.dispatch(removeRecentlyOpenedFileFailed(file.path, error))

  const state = store.getState()
  expect(getNotPinnedFiles(state).length).toBe(1)
  expect(getNotPinnedFiles(state)[0]).toEqual({ ...file, pinned: false })
  expect(getPinnedFiles(state).length).toBe(1)
  expect(getPinnedFiles(state)[0]).toEqual(otherFile)
  expect(isError(state)).toBe(true)
  expect(getErrorMessage(state)).toBe(error)
})

test('openFolderNotFoundDialog', async () => {
  await store.dispatch(openFolderNotFoundDialog())
  expect(isShowFolderNotFoundDialog(store.getState())).toBe(true)
})

test('closeFolderNotFoundDialog', async () => {
  await store.dispatch(openFolderNotFoundDialog())
  expect(isShowFolderNotFoundDialog(store.getState())).toBe(true)
  await store.dispatch(closeFolderNotFoundDialog())
  expect(isShowFolderNotFoundDialog(store.getState())).toBe(false)
})

test('removeError', async () => {
  await store.dispatch(unpinRecentlyOpenedFileFailed('/test.story', 'Error'))
  expect(isError(store.getState())).toBe(true)

  await store.dispatch(removeError())

  const state = store.getState()
  expect(isError(state)).toBe(false)
  expect(getErrorMessage(state)).toBe(null)
})

describe('addRecentlyOpenedFile', () => {
  const file1 = { path: '/lorem/ipsum.story', pinned: false }
  const file2 = { path: '/abc.story', pinned: true }
  const file3 = { path: '/Hello/world.story', pinned: false }
  const file4 = { path: '/def.story', pinned: true }

  test('Adds new files at the top', async () => {
    await store.dispatch(addRecentlyOpenedFile(file1))
    await store.dispatch(addRecentlyOpenedFile(file2))
    await store.dispatch(addRecentlyOpenedFile(file3))
    await store.dispatch(addRecentlyOpenedFile(file4))

    const state = store.getState()

    const pinnedFiles = getPinnedFiles(state)
    expect(pinnedFiles.length).toBe(2)
    expect(pinnedFiles[0]).toEqual(file4)
    expect(pinnedFiles[1]).toEqual(file2)

    const notPinnedFile = getNotPinnedFiles(state)
    expect(notPinnedFile.length).toBe(2)
    expect(notPinnedFile[0]).toEqual(file3)
    expect(notPinnedFile[1]).toEqual(file1)
  })

  test('Moves existing files to the top', async () => {
    await store.dispatch(addRecentlyOpenedFile(file1))
    await store.dispatch(addRecentlyOpenedFile(file2))
    await store.dispatch(addRecentlyOpenedFile(file3))
    await store.dispatch(addRecentlyOpenedFile(file4))

    await store.dispatch(addRecentlyOpenedFile(file1))
    await store.dispatch(addRecentlyOpenedFile(file2))

    const state = store.getState()

    const pinnedFiles = getPinnedFiles(state)
    expect(pinnedFiles.length).toBe(2)
    expect(pinnedFiles[0]).toEqual(file2)
    expect(pinnedFiles[1]).toEqual(file4)

    const notPinnedFile = getNotPinnedFiles(state)
    expect(notPinnedFile.length).toBe(2)
    expect(notPinnedFile[0]).toEqual(file1)
    expect(notPinnedFile[1]).toEqual(file3)
  })
})
