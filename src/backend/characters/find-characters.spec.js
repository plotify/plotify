import { createCharacter, findCharacters } from './'

import { createStory } from '../story'
import { tmpNameSync } from 'tmp'

let story
let character1
let character2
beforeAll(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  character1 = await createCharacter(story.database, 'Max Mustermann')
  character2 = await createCharacter(story.database, 'Erika Musterfrau')
})

afterAll(async () => {
  await story.close()
})

describe('with no filter', () => {
  describe('with not deleted', () => {
    test('returns all not deleted characters', async () => {
      const characters = await findCharacters(story.database, false)
      expect(characters.length).toBe(2)
      expect(characters).toContain(character1)
      expect(characters).toContain(character2)
    })
  })
})

describe('with filter', () => {
  describe('with not deleted', () => {
    describe('returns all characters with matching names', () => {
      test('single matching character', async () => {
        const characters = await findCharacters(story.database, false, 'Max')
        expect(characters.length).toBe(1)
        expect(characters).toContain(character1)
      })

      test('multiple matching characters', async () => {
        const characters = await findCharacters(story.database, false, 'Muster')
        expect(characters.length).toBe(2)
        expect(characters).toContain(character1)
        expect(characters).toContain(character2)
      })

      test('ignors upper and lower case', async () => {
        const characters = await findCharacters(story.database, false, 'mAx')
        expect(characters.length).toBe(1)
        expect(characters).toContain(character1)
      })
    })
  })
})
