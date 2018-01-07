import { Stack, getStack } from '../shared/entity-changes/stack'
import { createCharacter, getProfile, updateEntry } from './'

import { ENTRY_TYPE } from './types'
import { createStory } from '../story'
import { tmpNameSync } from 'tmp'

let story
let characterId
let profile
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  characterId = await createCharacter(story.database, 'Max Mustermann')
  profile = await getProfile(story.database, characterId)
})

const getFirstEntry = () => {
  const firstGroupId = profile.groupOrder[0]
  const firstGroup = profile.groups[firstGroupId]
  const firstEntryId = firstGroup.entries[0]
  return profile.entries[firstEntryId]
}

describe('with changed value', () => {
  test('updates value', async () => {
    const entry = getFirstEntry()
    expect(entry.value).toBe('')
    entry.value = 'Hello world'
    await updateEntry(story.database, entry)

    profile = await getProfile(story.database, characterId)
    const updatedEntry = getFirstEntry()
    expect(updatedEntry).toEqual({ ...entry, id: expect.any(String) })
  })
})

describe('without changes', () => {
  test('does not change profile', async () => {
    const entry = getFirstEntry()
    await updateEntry(story.database, entry)
    const profileAfterUpdate = await getProfile(story.database, characterId)
    expect(JSON.stringify(profileAfterUpdate)).toEqual(JSON.stringify(profile))
  })

  test('does not change history', async () => {
    const pastBeforeUpdate = await getStack(Stack.PAST, story.database, ENTRY_TYPE, characterId)
    const futureBeforeUpdate = await getStack(Stack.FUTURE, story.database, ENTRY_TYPE, characterId)

    const entry = getFirstEntry()
    await updateEntry(story.database, entry)

    const pastAfterUpdate = await getStack(Stack.PAST, story.database, ENTRY_TYPE, characterId)
    const futureAfterUpdate = await getStack(Stack.FUTURE, story.database, ENTRY_TYPE, characterId)
    expect(JSON.stringify(pastBeforeUpdate)).toEqual(JSON.stringify(pastAfterUpdate))
    expect(JSON.stringify(futureBeforeUpdate)).toEqual(JSON.stringify(futureAfterUpdate))
  })
})

describe('without id', () => {
  test('throws TypeError', () => {
    return expect(updateEntry(story.database, {})).rejects.toBeInstanceOf(TypeError)
  })

  test('does not change profile', async (done) => {
    try {
      const entry = { ...getFirstEntry(), id: undefined, value: 'Changed!' }
      await updateEntry(story.database, entry)
      done.fail()
    } catch (error) {
      // Expected error.
    }

    const profileAfterError = await getProfile(story.database, characterId)
    expect(JSON.stringify(profileAfterError)).toEqual(JSON.stringify(profile))
    done()
  })

  test('does not change history', async (done) => {
    const pastBeforeUpdate = await getStack(Stack.PAST, story.database, ENTRY_TYPE, characterId)
    const futureBeforeUpdate = await getStack(Stack.FUTURE, story.database, ENTRY_TYPE, characterId)

    try {
      const entry = { ...getFirstEntry(), id: undefined, value: 'Changed!' }
      await updateEntry(story.database, entry)
      done.fail()
    } catch (error) {
      // Expected error.
    }

    const pastAfterUpdate = await getStack(Stack.PAST, story.database, ENTRY_TYPE, characterId)
    const futureAfterUpdate = await getStack(Stack.FUTURE, story.database, ENTRY_TYPE, characterId)
    expect(JSON.stringify(pastBeforeUpdate)).toEqual(JSON.stringify(pastAfterUpdate))
    expect(JSON.stringify(futureBeforeUpdate)).toEqual(JSON.stringify(futureAfterUpdate))
    done()
  })
})
