import { createCharacter, getProfile } from './'

import { createStory } from '../story'
import defaultProfile from './default-profile'
import { tmpNameSync } from 'tmp'

let story
let characterId
beforeAll(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  characterId = await createCharacter(story.database, 'Max Mustermann')
})

afterAll(async () => {
  await story.close()
})

test('returns not deleted groups and entries', async () => {
  const profile = await getProfile(story.database, characterId)
  expect(profile).toEqual(defaultProfile.map(toGroup))
})

const toGroup = (group) => {
  return {
    id: expect.any(String),
    title: group.title,
    entries: group.entries.map(toEntry)
  }
}

const toEntry = (entry) => {
  return {
    id: expect.any(String),
    title: entry,
    value: ''
  }
}
