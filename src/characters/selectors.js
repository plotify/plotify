export function getCharacters (state) {
  return state.characters.entities
}

export function isCharacterSelected (state) {
  return state.characters.selected !== null
}

export function getSelectedCharacterId (state) {
  return state.characters.selected
}
