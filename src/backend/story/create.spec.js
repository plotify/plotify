import Story from './story'
import create from './create'
import { tmpNameSync } from 'tmp'

let path
beforeEach(() => {
  path = tmpNameSync({ postfix: '.story' })
})

test('returns instance of Story when called with valid path', async () => {
  const story = await create(path)
  await story.database.close()
  expect(story).toBeInstanceOf(Story)
})

test('returns instance of Story with passed path when called with valid path', async () => {
  const story = await create(path)
  await story.database.close()
  expect(story.path).toEqual(path)
})

test('creates new SQLite database with initial tables when called with valid path', async () => {
  const story = await create(path)
  const tables = await story.database.all('SELECT name FROM sqlite_master WHERE type=?;', ['table'])
  await story.database.close()
  expect(tables).toContainEqual({ name: 'character' })
  expect(tables).toContainEqual({ name: 'character_history' })
  expect(tables).toContainEqual({ name: 'entry' })
  expect(tables).toContainEqual({ name: 'entry_history' })
  expect(tables).toContainEqual({ name: 'entry_group' })
  expect(tables).toContainEqual({ name: 'entry_group_history' })
  expect(tables).toContainEqual({ name: 'character_changes_sequence' })
})

test('rejects when called with invalid path', () => {
  return expect(create(123)).rejects.toBeInstanceOf(TypeError)
})
