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
