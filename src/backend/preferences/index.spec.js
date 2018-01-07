import { isDarkThemeEnabled, openOrCreate, setDarkThemeEnabled } from './'

test('exports openOrCreate function', () => {
  expect(openOrCreate).toBeInstanceOf(Function)
})

test('exports isDarkThemeEnabled function', () => {
  expect(isDarkThemeEnabled).toBeInstanceOf(Function)
})

test('exports setDarkThemeEnabled function', () => {
  expect(setDarkThemeEnabled).toBeInstanceOf(Function)
})
