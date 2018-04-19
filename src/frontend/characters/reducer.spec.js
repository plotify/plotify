import { closeCreateCharacterDialog, createCharacterSuccessful, deselectCharacter, disableCharacterEditMode, enableCharacterEditMode, findCharactersSuccessful, getCharactersSuccessful, loadProfileRequest, loadProfileSuccessful, openCreateCharacterDialog, _selectCharacter as selectCharacter, updateCharacterNameRequest, updateCharacterNameSuccessful, updateEntryRequest, updateEntrySuccessful } from './actions'
import { closeStoryPreparationStarted, _storyClosed as storyClosed } from '../story/actions'
import { getFilteredCharacters, getProfile, getProfileEntries, getProfileGroup, getProfileGroupIds, getProfileGroups, getSelectedCharacterId, getSelectedCharacterName, isCharacterEditModeEnabled, isCharacterSelected, isCreateCharacterDialogOpen, isProfileEmpty, isProfileFetching, isProfileGroupEmpty } from './selectors'

import { createStore } from '../store'

let store
beforeEach(() => {
  store = createStore()
})

test('initial state', () => {
  validateInitialState()
})

test('storyClosed', async () => {
  await store.dispatch(openCreateCharacterDialog())
  await store.dispatch(storyClosed())
  validateInitialState()
})

const validateInitialState = () => {
  const state = store.getState()
  expect(isCreateCharacterDialogOpen(state)).toBe(false)
  expect(getFilteredCharacters(state).length).toBe(0)
  expect(isCharacterSelected(state)).toBe(false)
  expect(getSelectedCharacterId(state)).toBe(null)
  expect(getSelectedCharacterName(state)).toBe(undefined)
  expect(isCharacterEditModeEnabled(state)).toBe(false)
  expect(getProfile(state)).toEqual({
    id: undefined,
    groupOrder: [],
    groups: {},
    entries: {}
  })
  expect(getProfileGroupIds(state).length).toBe(0)
  expect(getProfileGroups(state)).toEqual({})
  expect(getProfileEntries(state)).toEqual({})
  expect(isProfileEmpty(state)).toBe(true)
  expect(isProfileFetching(state)).toBe(false)
}

test('openCreateCharacterDialog', async () => {
  await store.dispatch(openCreateCharacterDialog())
  expect(isCreateCharacterDialogOpen(store.getState())).toBe(true)
})

test('closeCreateCharacterDialog', async () => {
  await store.dispatch(openCreateCharacterDialog())
  expect(isCreateCharacterDialogOpen(store.getState())).toBe(true)
  await store.dispatch(closeCreateCharacterDialog())
  expect(isCreateCharacterDialogOpen(store.getState())).toBe(false)
})

test('closeStoryPreparationStarted', async () => {
  await store.dispatch(openCreateCharacterDialog())
  expect(isCreateCharacterDialogOpen(store.getState())).toBe(true)
  await store.dispatch(closeStoryPreparationStarted())
  expect(isCreateCharacterDialogOpen(store.getState())).toBe(false)
})

test('getCharactersSuccessful', async () => {
  const id = '123-abc-456-def'
  const name = 'Max Mustermann'
  await store.dispatch(getCharactersSuccessful({ [id]: { id, name, deleted: false } }))
  await store.dispatch(findCharactersSuccessful([id]))

  const state = store.getState()
  expect(getFilteredCharacters(state).length).toBe(1)
  expect(getFilteredCharacters(state)[0]).toEqual({ id, name, deleted: false })
})

test('createCharacterSuccessful', async () => {
  const id = '123-abc-456-def'
  const name = 'Max Mustermann'
  await store.dispatch(createCharacterSuccessful(id, name))
  await store.dispatch(findCharactersSuccessful([id]))

  const state = store.getState()
  expect(getFilteredCharacters(state).length).toBe(1)
  expect(getFilteredCharacters(state)[0]).toEqual({ id, name, deleted: false })
})

test('findCharactersSuccessful', async () => {
  const c1 = { id: '123', name: 'Max Mustermann', deleted: false }
  const c2 = { id: '456', name: 'Erika Musterfrau', deleted: false }
  const c3 = { id: '789', name: 'Testperson', deleted: false }
  await store.dispatch(createCharacterSuccessful(c1.id, c1.name))
  await store.dispatch(createCharacterSuccessful(c2.id, c2.name))
  await store.dispatch(createCharacterSuccessful(c3.id, c3.name))

  await store.dispatch(findCharactersSuccessful([c3.id, c1.id]))

  const state = store.getState()
  expect(getFilteredCharacters(state).length).toBe(2)
  expect(getFilteredCharacters(state)[0]).toEqual(c3)
  expect(getFilteredCharacters(state)[1]).toEqual(c1)
})

test('selectCharacter', async () => {
  const id = '789'
  const name = 'Erika Musterfrau'
  await store.dispatch(createCharacterSuccessful(id, name))
  expect(isCharacterSelected(store.getState())).toBe(false)

  await store.dispatch(selectCharacter(id))

  const state = store.getState()
  expect(isCharacterSelected(state)).toBe(true)
  expect(getSelectedCharacterId(state)).toBe(id)
  expect(getSelectedCharacterName(state)).toBe(name)
  expect(isCharacterEditModeEnabled(state)).toBe(false)
})

test('deselectCharacter', async () => {
  const id = '789'
  const name = 'Erika Musterfrau'
  await store.dispatch(createCharacterSuccessful(id, name))
  await store.dispatch(selectCharacter(id))
  expect(isCharacterSelected(store.getState())).toBe(true)

  await store.dispatch(deselectCharacter())

  const state = store.getState()
  expect(isCharacterSelected(state)).toBe(false)
  expect(getSelectedCharacterId(state)).toBe(null)
  expect(getSelectedCharacterName(state)).toBe(undefined)
  expect(isCharacterEditModeEnabled(state)).toBe(false)
})

describe('enableCharacterEditMode', () => {
  test('enables the edit mode if a character is selected', async () => {
    const character = { id: '123', name: 'Max Mustermann', deleted: false }
    await store.dispatch(createCharacterSuccessful(character.id, character.name))
    await store.dispatch(selectCharacter(character.id))

    await store.dispatch(enableCharacterEditMode())

    expect(isCharacterEditModeEnabled(store.getState())).toBe(true)
  })

  test('does not enable the edit mode if no character is selected', async () => {
    await store.dispatch(enableCharacterEditMode())
    expect(isCharacterEditModeEnabled(store.getState())).toBe(false)
  })
})

test('disableCharacterEditMode', async () => {
  const character = { id: '123', name: 'Max Mustermann', deleted: false }
  await store.dispatch(createCharacterSuccessful(character.id, character.name))
  await store.dispatch(selectCharacter(character.id))
  await store.dispatch(enableCharacterEditMode())
  expect(isCharacterEditModeEnabled(store.getState())).toBe(true)

  await store.dispatch(disableCharacterEditMode())

  expect(isCharacterEditModeEnabled(store.getState())).toBe(false)
})

test('loadProfileRequest', async () => {
  const character = { id: '123', name: 'Max Mustermann', deleted: false }
  await store.dispatch(createCharacterSuccessful(character.id, character.name))

  await store.dispatch(loadProfileRequest(character.id))

  expect(isProfileFetching(store.getState())).toBe(true)
})

test('loadProfileSuccessful', async () => {
  const character = { id: '123', name: 'Max Mustermann', deleted: false }
  await store.dispatch(createCharacterSuccessful(character.id, character.name))
  await store.dispatch(loadProfileRequest(character.id))

  const profile = {
    id: character.id,
    groupOrder: ['abc', 'def'],
    groups: {
      'abc': {
        id: 'abc',
        title: 'Hello world',
        entries: ['def']
      },
      'def': {
        id: 'def',
        title: 'Empty group',
        entries: ['jkl']
      }
    },
    entries: {
      'ghi': {
        id: 'ghi',
        title: 'Lorem ipsum',
        value: 'Example'
      },
      'jkl': {
        id: 'jkl',
        title: 'Example',
        value: ''
      }
    }
  }
  await store.dispatch(loadProfileSuccessful(character.id, profile))

  const state = store.getState()
  expect(JSON.stringify(getProfile(state))).toEqual(JSON.stringify(profile))
  expect(getProfileGroupIds(state).length).toBe(2)
  expect(getProfileGroupIds(state)[0]).toBe('abc')
  expect(getProfileGroupIds(state)[1]).toBe('def')
  expect(getProfileGroups(state)).toEqual(profile.groups)
  expect(getProfileEntries(state)).toEqual(profile.entries)
  expect(getProfileGroup(state, 'abc')).toEqual(profile.groups['abc'])
  expect(isProfileGroupEmpty(state, 'abc')).toBe(false)
  expect(isProfileGroupEmpty(state, 'def')).toBe(true)
  expect(isProfileEmpty(state)).toBe(false)
  expect(isProfileFetching(state)).toBe(false)
})

test('updateCharacterNameSuccessful', async () => {
  const character = { id: '123', name: 'Max Mustermann', deleted: false }
  await store.dispatch(createCharacterSuccessful(character.id, character.name))
  await store.dispatch(selectCharacter(character.id))
  await store.dispatch(enableCharacterEditMode())
  await store.dispatch(updateCharacterNameRequest(character.id))
  expect(getSelectedCharacterName(store.getState())).toBe(character.name)

  const newName = 'Erika Musterfrau'
  await store.dispatch(updateCharacterNameSuccessful(character.id, newName))

  expect(getSelectedCharacterName(store.getState())).toBe(newName)
})

test('updateEntrySuccessful', async () => {
  const character = { id: '123', name: 'Max Mustermann', deleted: false }
  await store.dispatch(createCharacterSuccessful(character.id, character.name))
  await store.dispatch(selectCharacter(character.id))
  await store.dispatch(enableCharacterEditMode())
  await store.dispatch(loadProfileRequest(character.id))
  const profile = {
    id: character.id,
    groupOrder: ['abc'],
    groups: {
      'abc': {
        id: 'abc',
        title: 'Hello world',
        entries: ['def']
      }
    },
    entries: {
      'def': {
        id: 'def',
        title: 'Lorem ipsum',
        value: ''
      }
    }
  }
  await store.dispatch(loadProfileSuccessful(character.id, profile))

  await store.dispatch(updateEntryRequest('def', 'Example'))
  await store.dispatch(updateEntrySuccessful('def', 'Example'))

  const profileAfterUpdate = {
    id: character.id,
    groupOrder: ['abc'],
    groups: {
      'abc': {
        id: 'abc',
        title: 'Hello world',
        entries: ['def']
      }
    },
    entries: {
      'def': {
        id: 'def',
        title: 'Lorem ipsum',
        value: 'Example'
      }
    }
  }
  expect(JSON.stringify(getProfile(store.getState()))).toEqual(JSON.stringify(profileAfterUpdate))
})
