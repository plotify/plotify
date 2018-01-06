import { Stack, getStack } from '../shared/entity-changes/stack'

import { ENTRY_TYPE } from './types'
import createCharacter from './create'
import { createStory } from '../story'
import getProfile from './get-profile'
import { tmpNameSync } from 'tmp'
import updateEntry from './update-entry'

let story
let characterId
let profile
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  characterId = await createCharacter(story.database, 'Max Mustermann')
  profile = await getProfile(story.database, characterId)
})

describe('with changed value', () => {
  test('updates value', async () => {
    const entry = profile[0].entries[0]
    expect(entry.value).toBe('')
    entry.value = 'Hello world'
    await updateEntry(story.database, entry)

    profile = await getProfile(story.database, characterId)
    const updatedEntry = profile[0].entries[0]
    expect(updatedEntry).toEqual({ ...entry, id: expect.any(String) })
  })
})

describe('without changes', () => {
  test('does not change profile', async () => {
    const entry = { ...profile[0].entries[0] }
    await updateEntry(story.database, entry)
    const profileAfterUpdate = await getProfile(story.database, characterId)
    expect(JSON.stringify(profileAfterUpdate)).toEqual(JSON.stringify(profile))
  })

  test('does not change history', async () => {
    const pastBeforeUpdate = await getStack(Stack.PAST, story.database, ENTRY_TYPE, characterId)
    const futureBeforeUpdate = await getStack(Stack.FUTURE, story.database, ENTRY_TYPE, characterId)

    const entry = { ...profile[0].entries[0] }
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
      const entry = { ...profile[0].entries[0], id: undefined, value: 'Changed!' }
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
      const entry = { ...profile[0].entries[0], id: undefined, value: 'Changed!' }
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
