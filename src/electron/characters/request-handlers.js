import { CREATE_CHARACTER, FIND_CHARACTERS, GET_CHARACTERS, GET_PROFILE, UPDATE_CHARACTER, UPDATE_ENTRY } from '../../shared/characters/requests'
import { createCharacter, findCharacters, getCharacters, getProfile, updateCharacter, updateEntry } from '../../backend/characters'

import { bind as _ } from '../shared/redux'
import { getStoryByWindowId } from '../story'
import { requestHandler } from '../shared/communication'

const handleGetCharacters = (resolve, reject, senderWindow) => (_, getState) => {
  const database = getStoryByWindowId(getState(), senderWindow.id).database
  getCharacters(database)
    .then((characters) => resolve(characters))
    .catch((error) => reject(error.message))
}

const handleCreateCharacter = (resolve, reject, senderWindow, name) => (_, getState) => {
  const database = getStoryByWindowId(getState(), senderWindow.id).database
  createCharacter(database, name)
    .then((characterId) => resolve(characterId))
    .catch((error) => reject(error.message))
}

const handleFindCharacters = (resolve, reject, senderWindow, { deleted, filter }) => (_, getState) => {
  const database = getStoryByWindowId(getState(), senderWindow.id).database
  findCharacters(database, deleted, filter)
    .then((characters) => resolve(characters))
    .catch((error) => reject(error.message))
}

const handleGetProfile = (resolve, reject, senderWindow, characterId) => (_, getState) => {
  const database = getStoryByWindowId(getState(), senderWindow.id).database
  getProfile(database, characterId)
    .then((profile) => resolve(profile))
    .catch((error) => reject(error.message))
}

const handleUpdateCharacter = (resolve, reject, senderWindow, character) => (_, getState) => {
  const database = getStoryByWindowId(getState(), senderWindow.id).database
  updateCharacter(database, character)
    .then(() => resolve())
    .catch((error) => reject(error.message))
}

const handleUpdateEntry = (resolve, reject, senderWindow, entry) => (_, getState) => {
  const database = getStoryByWindowId(getState(), senderWindow.id).database
  updateEntry(database, entry)
    .then(() => resolve())
    .catch((error) => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(GET_CHARACTERS, _(handleGetCharacters))
  requestHandler(CREATE_CHARACTER, _(handleCreateCharacter))
  requestHandler(FIND_CHARACTERS, _(handleFindCharacters))
  requestHandler(GET_PROFILE, _(handleGetProfile))
  requestHandler(UPDATE_CHARACTER, _(handleUpdateCharacter))
  requestHandler(UPDATE_ENTRY, _(handleUpdateEntry))
}

export default registerRequestHandlers
