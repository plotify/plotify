import { isDarkThemeEnabled, setDarkThemeEnabled } from './dark-theme'

import { openOrCreate } from './'
import { tmpNameSync } from 'tmp'

let path
let database
beforeEach(async () => {
  path = tmpNameSync({ postfix: '.preferences.db' })
  database = await openOrCreate(path)
})

describe('#isDarkThemeEnabled', () => {
  test('returns false if dark theme is not enabled', async () => {
    expect(await isDarkThemeEnabled(database)).toBe(false)
  })
  test('returns true if dark theme is enabled', async () => {
    await setDarkThemeEnabled(database, true)
    expect(await isDarkThemeEnabled(database)).toBe(true)
  })
})

describe('#setDarkThemeEnabled', () => {
  test('enables dark theme if parameter is true', async () => {
    await setDarkThemeEnabled(database, true)
    expect(await isDarkThemeEnabled(database)).toBe(true)
  })

  test('disables dark theme if parameter is false', async () => {
    await setDarkThemeEnabled(database, true)
    await setDarkThemeEnabled(database, false)
    expect(await isDarkThemeEnabled(database)).toBe(false)
  })
})
