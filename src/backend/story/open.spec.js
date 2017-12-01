import Story from './story'
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

test('rejects when called with invalid path', () => {
  return expect(openStory(123)).rejects.toBeInstanceOf(TypeError)
})
