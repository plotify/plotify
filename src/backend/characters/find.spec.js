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

describe('with filter', () => {
  describe('with not deleted', () => {
    describe('returns all characters with matching names', () => {
      test('single matching character', async () => {
        const characters = await find(story.database, false, 'Max')
        expect(characters.length).toBe(1)
        expect(characters).toContainEqual(characterMatcher('Max Mustermann', false))
      })

      test('multiple matching characters', async () => {
        const characters = await find(story.database, false, 'Muster')
        expect(characters.length).toBe(2)
        expect(characters).toContainEqual(characterMatcher('Max Mustermann', false))
        expect(characters).toContainEqual(characterMatcher('Erika Musterfrau', false))
      })

      test('ignors upper and lower case', async () => {
        const characters = await find(story.database, false, 'mAx')
        expect(characters.length).toBe(1)
        expect(characters).toContainEqual(characterMatcher('Max Mustermann', false))
      })
    })
  })
})

const characterMatcher = (name, deleted) => {
  return { name, deleted, id: expect.any(String) }
}
