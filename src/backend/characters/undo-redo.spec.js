import { canRedo, canUndo, createCharacter, getCharacters, redo, undo, updateCharacter } from './'

import { CHARACTER_NAME_CHANGED } from '../../shared/characters/changes'
import { createStory } from '../story'
import { tmpNameSync } from 'tmp'

let story
let database
let characterId
beforeEach(async () => {
  const path = tmpNameSync({ postfix: '.story' })
  story = await createStory(path)
  database = story.database
  characterId = await createCharacter(database, 'Max Mustermann')
})

afterEach(async () => {
  await story.close()
})

describe('#canUndo', () => {
  test('Returns false if there are no changes that can be undone', async () => {
    expect(await canUndo(database, characterId)).toBe(false)
  })

  test('Returns true if there are changes that can be undone', async () => {
    await updateCharacter(database, {
      id: characterId,
      name: 'Other name',
      deleted: false
    })
    expect(await canUndo(database, characterId)).toBe(true)
  })

  test('Returns false if all changes have been undone', async () => {
    await updateCharacter(database, {
      id: characterId,
      name: 'Other name',
      deleted: false
    })
    expect(await canUndo(database, characterId)).toBe(true)

    await updateCharacter(database, {
      id: characterId,
      name: 'Erika Musterfrau',
      deleted: false
    })
    expect(await canUndo(database, characterId)).toBe(true)

    await undo(database, characterId)
    expect(await canUndo(database, characterId)).toBe(true)

    await undo(database, characterId)
    expect(await canUndo(database, characterId)).toBe(false)
  })
})

describe('#undo', () => {
  test('Undoes last change', async () => {
    const prevName = await getCharacterName(characterId)
    const newName = 'Erika Musterfrau'
    expect(prevName).not.toEqual(newName)

    await updateCharacter(database, {
      id: characterId,
      name: newName,
      deleted: false
    })
    expect(await getCharacterName(characterId)).toEqual(newName)

    await undo(database, characterId)
    expect(await getCharacterName(characterId)).toEqual(prevName)
  })

  test('Returns information about the restored change', async () => {
    await updateCharacter(database, {
      id: characterId,
      name: 'Erika Musterfrau',
      deleted: false
    })
    expect(await getCharacterName(characterId)).toEqual('Erika Musterfrau')

    const result = await undo(database, characterId)
    expect(result.characterId).toEqual(characterId)
    expect(result.type).toEqual(CHARACTER_NAME_CHANGED)
    expect(typeof result.entity.id).toEqual('string')
    expect(result.entity.name).toEqual('Max Mustermann')
    expect(result.entity.deleted).toBe(false)
  })

  test('Throws Error if there are no changes that can be undone', () => {
    return expect(undo(database, characterId)).rejects.toThrow(
      'There are no changes that can be undone. Entity ID: ' + characterId)
  })
})

describe('#canRedo', () => {
  test('Returns false if there are no changes that can be redone', async () => {
    expect(await canRedo(database, characterId)).toBe(false)
  })

  test('Returns true if there are changes that can be redone', async () => {
    await updateCharacter(database, {
      id: characterId,
      name: 'Other name',
      deleted: false
    })
    await undo(database, characterId)
    expect(await canRedo(database, characterId)).toBe(true)
  })

  test('Returns false if all changes have been redone', async () => {
    await updateCharacter(database, {
      id: characterId,
      name: 'Other name',
      deleted: false
    })
    await updateCharacter(database, {
      id: characterId,
      name: 'Erika Musterfrau',
      deleted: false
    })

    await undo(database, characterId)
    expect(await canRedo(database, characterId)).toBe(true)

    await undo(database, characterId)
    expect(await canRedo(database, characterId)).toBe(true)

    await redo(database, characterId)
    expect(await canRedo(database, characterId)).toBe(true)

    await redo(database, characterId)
    expect(await canRedo(database, characterId)).toBe(false)
  })
})

describe('#redo', () => {
  test('Redoes last change', async () => {
    const prevName = await getCharacterName(characterId)
    const newName = 'Erika Musterfrau'
    expect(prevName).not.toEqual(newName)

    await updateCharacter(database, {
      id: characterId,
      name: newName,
      deleted: false
    })
    expect(await getCharacterName(characterId)).toEqual(newName)

    await undo(database, characterId)
    expect(await getCharacterName(characterId)).toEqual(prevName)

    await redo(database, characterId)
    expect(await getCharacterName(characterId)).toEqual(newName)
  })

  test('Returns information about the restored change', async () => {
    await updateCharacter(database, {
      id: characterId,
      name: 'Erika Musterfrau',
      deleted: false
    })
    expect(await getCharacterName(characterId)).toEqual('Erika Musterfrau')

    await undo(database, characterId)
    expect(await getCharacterName(characterId)).toEqual('Max Mustermann')

    const result = await redo(database, characterId)
    expect(result.characterId).toEqual(characterId)
    expect(result.type).toEqual(CHARACTER_NAME_CHANGED)
    expect(typeof result.entity.id).toEqual('string')
    expect(result.entity.name).toEqual('Erika Musterfrau')
    expect(result.entity.deleted).toBe(false)
  })

  test('Throws Error if there are no changes that can be redone', () => {
    return expect(redo(database, characterId)).rejects.toThrow(
      'There are no changes that can be redone. Entity ID: ' + characterId)
  })
})

const getCharacterName = async (characterId) => {
  const characters = await getCharacters(database)
  return characters[characterId].name
}
