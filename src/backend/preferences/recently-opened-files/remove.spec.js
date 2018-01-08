import { addOrUpdateRecentlyOpenedFile, getRecentlyOpenedFiles, removeRecentlyOpenedFile } from './'

import { openOrCreate } from '../'
import { tmpNameSync } from 'tmp'

let database
let file
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.preferences.db' })
  database = await openOrCreate(path)
  file = { path: 'abc.story' }
  await addOrUpdateRecentlyOpenedFile(database, file)
  await addOrUpdateRecentlyOpenedFile(database, { path: 'def.story' })
})

afterEach(async () => {
  await database.close()
})

test('deletes file from recently opened files list', async () => {
  const before = await getRecentlyOpenedFiles(database)
  expect(before.length).toBe(2)
  await removeRecentlyOpenedFile(database, file.path)
  const after = await getRecentlyOpenedFiles(database)
  expect(after.length).toBe(1)
})
