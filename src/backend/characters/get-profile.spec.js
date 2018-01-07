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
  expect(profile.characterId).toEqual(characterId)

  expect(profile.groupOrder.length).toBe(defaultProfile.length)
  for (let groupIndex = 0; groupIndex < profile.groupOrder.length; groupIndex++) {
    const groupId = profile.groupOrder[groupIndex]
    const group = profile.groups[groupId]
    expect(group.id.length).toBeGreaterThan(1)
    expect(group.title).toEqual(defaultProfile[groupIndex].title)
    expect(group.entries.length).toBe(defaultProfile[groupIndex].entries.length)

    for (let entryIndex = 0; entryIndex < group.entries.length; entryIndex++) {
      const entryId = group.entries[entryIndex]
      const entry = profile.entries[entryId]
      expect(entry.id.length).toBeGreaterThan(1)
      expect(entry.title).toEqual(defaultProfile[groupIndex].entries[entryIndex])
      expect(entry.value).toEqual('')
    }
  }
})
