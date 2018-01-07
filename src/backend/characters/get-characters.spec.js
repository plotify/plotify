import { createCharacter, getCharacters } from './'

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

test('returns all characters', async () => {
  const characters = await getCharacters(story.database)
  expect(characters[character1]).toEqual({
    id: character1,
    name: 'Max Mustermann',
    deleted: false
  })
  expect(characters[character2]).toEqual({
    id: character2,
    name: 'Erika Musterfrau',
    deleted: false
  })
  expect(Object.keys(characters).length).toBe(2)
})
