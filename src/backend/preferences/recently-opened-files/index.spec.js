import { addOrUpdateRecentlyOpenedFile, getRecentlyOpenedFiles } from './'

test('exports getRecentlyOpenedFiles function', () => {
  expect(getRecentlyOpenedFiles).toBeInstanceOf(Function)
})

test('exports addOrUpdateRecentlyOpenedFile function', () => {
  expect(addOrUpdateRecentlyOpenedFile).toBeInstanceOf(Function)
})
