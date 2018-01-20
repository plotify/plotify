import { addOrUpdateRecentlyOpenedFile, getRecentlyOpenedFiles, pinRecentlyOpenedFile, unpinRecentlyOpenedFile } from './'

import { openOrCreate } from '../'
import { tmpNameSync } from 'tmp'

let database
let file1
let file2
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.preferences.db' })
  database = await openOrCreate(path)
  file1 = { path: 'abc.story', lastOpened: '2016-01-07T21:58:14.469Z', pinned: false }
  file2 = { path: 'def.story', lastOpened: '2018-01-07T21:58:14.469Z', pinned: true }
  await addOrUpdateRecentlyOpenedFile(database, file1)
  await addOrUpdateRecentlyOpenedFile(database, file2)
})

afterEach(async () => {
  await database.close()
})

describe('#pinRecentlyOpenedFile', () => {
  test('pins not pinned file', async () => {
    const before = await getFile(database, file1)
    expect(before.pinned).toBe(false)
    await pinRecentlyOpenedFile(database, file1.path)
    const after = await getFile(database, file1)
    expect(after.pinned).toBe(true)
  })
})

describe('#unpinRecentlyOpenedFile', () => {
  test('unpins pinned file', async () => {
    const before = await getFile(database, file2)
    expect(before.pinned).toBe(true)
    await unpinRecentlyOpenedFile(database, file2.path)
    const after = await getFile(database, file2)
    expect(after.pinned).toBe(false)
  })
})

const getFile = async (database, file) => {
  const files = await getRecentlyOpenedFiles(database)
  return files.filter((f) => f.path === file.path)[0]
}
