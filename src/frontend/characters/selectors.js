export const isCreateCharacterDialogOpen = (state) => (
  state.characters.createDialogOpen === true
)

export const getFilteredCharacters = (state) => (
  state.characters.list
    .map((id) => state.characters.entities[id])
    .filter((character) => character !== undefined)
)

export const isCharacterSelected = (state) => (
  state.characters.selected !== null
)

export const getSelectedCharacterId = (state) => (
  state.characters.selected
)

export const getSelectedCharacterName = (state) => {
  let result
  if (isCharacterSelected(state)) {
    const id = getSelectedCharacterId(state)
    result = state.characters.entities[id].name
  }
  return result
}

export const isCharacterEditModeEnabled = (state) => (
  state.characters.editMode === true
)

export const getProfile = (state) => (
  state.characters.profile
)

export const getProfileGroupIds = (state) => (
  getProfile(state).groupOrder
)

export const getProfileEntries = (state) => (
  getProfile(state).entries
)

export const isProfileEmpty = (state) => {
  const entries = getProfileEntries(state)
  let result = true
  if (entries.length === 0) return result
  Object.keys(entries).forEach(e => {
    if (result && !isProfileEntryEmpty(state, e)) {
      result = false
    }
  })
  return result
}

export const getProfileGroups = (state) => (
  getProfile(state).groups
)

export const getProfileGroup = (state, groupId) => (
  getProfileGroups(state)[groupId]
)

export const isProfileGroupEmpty = (state, groupId) => {
  let result = true
  getProfileGroup(state, groupId).entries.forEach(e => {
    if (result && !isProfileEntryEmpty(state, e)) {
      result = false
    }
  })
  return result
}

export const getProfileEntry = (state, entryId) => (
  getProfileEntries(state)[entryId] || {}
)

export const isProfileEntryEmpty = (state, entryId) => (
  getProfileEntry(state, entryId).value === ''
)
