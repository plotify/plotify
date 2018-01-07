import { validateDatabase } from '../shared/validation'

let cache = new Map()

const getSql = `
  SELECT dark_theme AS darkTheme
  FROM appearance
  WHERE id = 1
`

const setSql = `
  UPDATE appearance
  SET dark_theme = ?
  WHERE id = 1
`

export const isDarkThemeEnabled = async (database) => {
  validateDatabase(database)
  if (!cache.has(database)) {
    const result = await database.get(getSql)
    const enabled = result.darkTheme === 1
    cache.set(database, enabled)
  }
  return cache.get(database)
}

export const setDarkThemeEnabled = async (database, enabled) => {
  validateDatabase(database)
  const params = [enabled ? 1 : 0]
  await database.run(setSql, params)
  cache.set(database, enabled)
}
