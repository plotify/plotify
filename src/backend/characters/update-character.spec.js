import { Stack, getStack } from '../shared/entity-changes/stack'
import { createCharacter, getCharacters } from './'

import { CHARACTER_TYPE } from './types'
import { createStory } from '../story'
import { tmpNameSync } from 'tmp'
import updateCharacter from './update-character'

let story
let characterId
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  characterId = await createCharacter(story.database, 'Max Mustermann')
})

describe('with changed name', () => {
  test('updates name', async () => {
    const beforeUpdate = await getCharacter()
    expect(beforeUpdate.id).toEqual(characterId)
    expect(beforeUpdate.name).toEqual('Max Mustermann')
    expect(beforeUpdate.deleted).toBe(false)
    await updateCharacter(story.database, { id: characterId, name: 'Erika Musterfrau' })
    const afterUpdate = await getCharacter()
    expect(afterUpdate.id).toEqual(characterId)
    expect(afterUpdate.name).toEqual('Erika Musterfrau')
    expect(afterUpdate.deleted).toBe(false)
  })
})

describe('without changes', () => {
  test('does not change character', async () => {
    const beforeUpdate = await getCharacter()
    await updateCharacter(story.database, beforeUpdate)
    const afterUpdate = await getCharacter()
    expect(JSON.stringify(afterUpdate)).toEqual(JSON.stringify(beforeUpdate))
  })

  test('does not change history', async () => {
    const pastBeforeUpdate = await getStack(Stack.PAST, story.database, CHARACTER_TYPE, characterId)
    const futureBeforeUpdate = await getStack(Stack.FUTURE, story.database, CHARACTER_TYPE, characterId)

    const character = await getCharacter()
    await updateCharacter(story.database, character)

    const pastAfterUpdate = await getStack(Stack.PAST, story.database, CHARACTER_TYPE, characterId)
    const futureAfterUpdate = await getStack(Stack.FUTURE, story.database, CHARACTER_TYPE, characterId)
    expect(JSON.stringify(pastBeforeUpdate)).toEqual(JSON.stringify(pastAfterUpdate))
    expect(JSON.stringify(futureBeforeUpdate)).toEqual(JSON.stringify(futureAfterUpdate))
  })
})

describe('without id', () => {
  test('throws TypeError', () => {
    return expect(updateCharacter(story.database, {})).rejects.toBeInstanceOf(TypeError)
  })

  test('does not change character', async (done) => {
    const beforeUpdate = await getCharacter()

    try {
      await updateCharacter(story.database, { ...beforeUpdate, id: undefined, name: 'Changed!' })
      done.fail()
    } catch (error) {
      // Expected error.
    }

    const afterUpdate = await getCharacter()
    expect(JSON.stringify(afterUpdate)).toEqual(JSON.stringify(beforeUpdate))
    done()
  })

  test('does not change history', async (done) => {
    const pastBeforeUpdate = await getStack(Stack.PAST, story.database, CHARACTER_TYPE, characterId)
    const futureBeforeUpdate = await getStack(Stack.FUTURE, story.database, CHARACTER_TYPE, characterId)

    try {
      const character = await getCharacter()
      character.id = undefined
      character.name = 'Changed!'
      await updateCharacter(story.database, character)
      done.fail()
    } catch (error) {
      // Expected error.
    }

    const pastAfterUpdate = await getStack(Stack.PAST, story.database, CHARACTER_TYPE, characterId)
    const futureAfterUpdate = await getStack(Stack.FUTURE, story.database, CHARACTER_TYPE, characterId)
    expect(JSON.stringify(pastBeforeUpdate)).toEqual(JSON.stringify(pastAfterUpdate))
    expect(JSON.stringify(futureBeforeUpdate)).toEqual(JSON.stringify(futureAfterUpdate))
    done()
  })
})

const getCharacter = async () => {
  const characters = await getCharacters(story.database)
  return characters[characterId]
}
