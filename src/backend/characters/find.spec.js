import createCharacter from './create'
import { createStory } from '../story'
import find from './find'
import { tmpNameSync } from 'tmp'

let story
beforeAll(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  await createCharacter(story.database, 'Max Mustermann')
  await createCharacter(story.database, 'Erika Musterfrau')
})

afterAll(async () => {
  await story.close()
})

describe('with no filter', () => {
  describe('with not deleted', () => {
    test('returns all not deleted characters', async () => {
      const characters = await find(story.database, false)
      expect(characters.length).toBe(2)
      expect(characters).toContainEqual(characterMatcher('Max Mustermann', false))
      expect(characters).toContainEqual(characterMatcher('Erika Musterfrau', false))
    })
  })
})

const characterMatcher = (name, deleted) => {
  return { name, deleted, id: expect.any(String) }
}
