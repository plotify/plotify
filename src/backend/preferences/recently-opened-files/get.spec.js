import { addOrUpdateRecentlyOpenedFile, getRecentlyOpenedFiles } from './'

import { openOrCreate } from '../'
import { tmpNameSync } from 'tmp'

let database
let file1
let file2
let file3
let file4
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.preferences.db' })
  database = await openOrCreate(path)
  file1 = { path: 'abc.story', lastOpened: '2016-01-07T21:58:14.469Z', pinned: true }
  file2 = { path: 'def.story', lastOpened: '2018-01-07T21:58:14.469Z', pinned: false }
  file3 = { path: 'ghi.story', lastOpened: '2017-01-07T21:58:14.469Z', pinned: false }
  file4 = { path: 'jkl.story', lastOpened: '2018-01-07T21:58:14.469Z', pinned: true }
  await addOrUpdateRecentlyOpenedFile(database, file1)
  await addOrUpdateRecentlyOpenedFile(database, file2)
  await addOrUpdateRecentlyOpenedFile(database, file3)
  await addOrUpdateRecentlyOpenedFile(database, file4)
})

afterEach(async () => {
  await database.close()
})

test('returns all recently opened files', async () => {
  const files = await getRecentlyOpenedFiles(database)
  expect(files.length).toBe(4)
  expect(files).toContainEqual(file1)
  expect(files).toContainEqual(file2)
  expect(files).toContainEqual(file3)
  expect(files).toContainEqual(file4)
})

test('returns all recently opened files in sorted order', async () => {
  const files = await getRecentlyOpenedFiles(database)
  expect(files.length).toBe(4)
  expect(files[0]).toEqual(file4)
  expect(files[1]).toEqual(file1)
  expect(files[2]).toEqual(file2)
  expect(files[3]).toEqual(file3)
})
