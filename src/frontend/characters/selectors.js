export const isCreateCharacterDialogOpen = (state) => (
  state.characters.createDialogOpen === true
)

export const getCharacters = (state) => (
  state.characters.entities
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
    result = state.characters.entities.find(character => character.id === id).name
  }
  return result
}

export const isCharacterEditModeEnabled = (state) => (
  state.characters.editMode === true
)

export const getProfile = (state) => (
  state.characters.profile
)

export const getProfileGroupById = (state, id) => (
  getProfile(state).find(group => group.id === id)
)
