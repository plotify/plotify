export function isCreating(state) {
  return state.characters.creating === true;
}

export function isCreatingFailed(state) {
  return state.characters.error !== null;
}

export function getCreatingError(state) {
  return state.characters.error;
}
