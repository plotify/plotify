import {
  addOrUpdateRecentlyOpenedFile,
  getRecentlyOpenedFiles,
  pinRecentlyOpenedFile,
  removeRecentlyOpenedFile,
  unpinRecentlyOpenedFile
} from './'

test('exports getRecentlyOpenedFiles function', () => {
  expect(getRecentlyOpenedFiles).toBeInstanceOf(Function)
})

test('exports addOrUpdateRecentlyOpenedFile function', () => {
  expect(addOrUpdateRecentlyOpenedFile).toBeInstanceOf(Function)
})

test('exports removeRecentlyOpenedFile function', () => {
  expect(removeRecentlyOpenedFile).toBeInstanceOf(Function)
})

test('exports pinRecentlyOpenedFile function', () => {
  expect(pinRecentlyOpenedFile).toBeInstanceOf(Function)
})

test('exports unpinRecentlyOpenedFile function', () => {
  expect(unpinRecentlyOpenedFile).toBeInstanceOf(Function)
})
