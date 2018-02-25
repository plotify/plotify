import { SET_DARK_THEME_ENABLED, addOrUpdateRecentlyOpenedFile, closePreferences, disableDarkTheme, enableDarkTheme, getRecentlyOpenedFiles, isDarkThemeEnabled, openPreferences, pinRecentlyOpenedFile, reducer, registerRequestHandlers, removeRecentlyOpenedFile, unpinRecentlyOpenedFile } from './'

test('exports reducer function', () => {
  expect(reducer).toBeInstanceOf(Function)
})

test('exports openPreferences function', () => {
  expect(openPreferences).toBeInstanceOf(Function)
})

test('exports closePreferences function', () => {
  expect(closePreferences).toBeInstanceOf(Function)
})

test('exports isDarkThemeEnabled function', () => {
  expect(isDarkThemeEnabled).toBeInstanceOf(Function)
})

test('exports enableDarkTheme function', () => {
  expect(enableDarkTheme).toBeInstanceOf(Function)
})

test('exports disableDarkTheme function', () => {
  expect(disableDarkTheme).toBeInstanceOf(Function)
})

test('exports SET_DARK_THEME_ENABLED constant', () => {
  expect(typeof SET_DARK_THEME_ENABLED).toEqual('string')
})

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

test('exports registerRequestHandlers function', () => {
  expect(registerRequestHandlers).toBeInstanceOf(Function)
})
