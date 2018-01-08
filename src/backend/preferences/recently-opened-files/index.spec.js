import { addOrUpdateRecentlyOpenedFile, getRecentlyOpenedFiles, removeRecentlyOpenedFile } from './'

test('exports getRecentlyOpenedFiles function', () => {
  expect(getRecentlyOpenedFiles).toBeInstanceOf(Function)
})

test('exports addOrUpdateRecentlyOpenedFile function', () => {
  expect(addOrUpdateRecentlyOpenedFile).toBeInstanceOf(Function)
})

test('exports removeRecentlyOpenedFile function', () => {
  expect(removeRecentlyOpenedFile).toBeInstanceOf(Function)
})
