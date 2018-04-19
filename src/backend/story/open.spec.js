import { mode, open } from '../shared/sqlite'

import InvalidStoryFileError from './invalid-story-file-error'
import Story from './story'
import UnsupportedStoryFileVersionError from './unsupported-story-file-version-error'
import { appendFile } from 'fs-extra'
import createStory from './create'
import openStory from './open'
import { tmpNameSync } from 'tmp'

let path
beforeAll(async () => {
  path = tmpNameSync({ postfix: '.story' })
  const story = await createStory(path)
  await story.database.close()
})

test('returns instance of Story when called with valid path', async () => {
  const story = await openStory(path)
  await story.database.close()
  expect(story).toBeInstanceOf(Story)
})

test('returns instance of Story with passed path when called with valid path', async () => {
  const story = await openStory(path)
  await story.database.close()
  expect(story.path).toEqual(path)
})

test('rejects to TypeError when called with invalid path', () => {
  return expect(openStory(123)).rejects.toBeInstanceOf(TypeError)
})

test('rejects to InvalidStoryFileError when called with invalid SQLite database', async () => {
  const path = tmpNameSync({ postfix: '.story' })
  await appendFile(path, 'Hello world')
  return expect(openStory(path)).rejects.toHaveProperty('name', InvalidStoryFileError.name)
})

test('rejects to InvalidStoryFileError when called with SQLite database with invalid application id', async () => {
  const path = tmpNameSync({ postfix: '.story' })
  const database = await open(path, mode.OPEN_CREATE | mode.OPEN_READWRITE)
  await database.close()
  return expect(openStory(path)).rejects.toHaveProperty('name', InvalidStoryFileError.name)
})

test('rejects to UnsupportedStoryFileVersionError when called with unsupported file version', async () => {
  const database = await open(path, mode.OPEN_READWRITE)
  await database.run('PRAGMA user_version = 9999;')
  await database.close()
  return expect(openStory(path)).rejects.toHaveProperty('name', UnsupportedStoryFileVersionError.name)
})
