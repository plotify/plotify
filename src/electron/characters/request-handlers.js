import { CREATE_CHARACTER, FIND_CHARACTERS, GET_CHARACTERS, GET_PROFILE, UPDATE_CHARACTER, UPDATE_ENTRY } from '../../shared/characters/requests'
import { createCharacter, findCharacters, getCharacters, getProfile, updateCharacter, updateEntry } from '../../backend/characters'

import { getStoryByWindow } from '../story'
import { requestHandler } from '../shared/communication'

const handleGetCharacters = (resolve, reject, senderWindow) => {
  const database = getStoryByWindow(senderWindow).database
  getCharacters(database)
    .then((characters) => resolve(characters))
    .catch((error) => reject(error.message))
}

const handleCreateCharacter = (resolve, reject, senderWindow, name) => {
  const database = getStoryByWindow(senderWindow).database
  createCharacter(database, name)
    .then((characterId) => resolve(characterId))
    .catch((error) => reject(error.message))
}

const handleFindCharacters = (resolve, reject, senderWindow, { deleted, filter }) => {
  const database = getStoryByWindow(senderWindow).database
  // TODO Temporary workaround:
  Promise.all([
    findCharacters(database, deleted, filter),
    getCharacters(database)
  ]).then((result) => {
    const allCharacters = result[1]
    const foundCharacters = result[0]
    const transformed = foundCharacters.map((id) => allCharacters[id])
    resolve(transformed)
  }).catch((error) => reject(error.message))
  /*
  findCharacters(database, deleted, filter)
    .then((characters) => resolve(characters))
    .catch((error) => reject(error.message))
  */
}

const handleGetProfile = (resolve, reject, senderWindow, characterId) => {
  const database = getStoryByWindow(senderWindow).database
  // TODO Temporary workaround: toLegacyStructure(profile)
  getProfile(database, characterId)
    .then((profile) => resolve(toLegacyStructure(profile)))
    .catch((error) => reject(error.message))
}

// TODO Temporary workaround:
const toLegacyStructure = (profile) => {
  return profile.groupOrder.map((groupId) => ({
    id: groupId,
    title: profile.groups[groupId].title,
    entries: profile.groups[groupId].entries.map((entryId) => ({
      id: entryId,
      title: profile.entries[entryId].title,
      value: profile.entries[entryId].value
    }))
  }))
}

const handleUpdateCharacter = (resolve, reject, senderWindow, character) => {
  const database = getStoryByWindow(senderWindow).database
  updateCharacter(database, character)
    .then(() => resolve())
    .catch((error) => reject(error.message))
}

const handleUpdateEntry = (resolve, reject, senderWindow, entry) => {
  const database = getStoryByWindow(senderWindow).database
  updateEntry(database, entry)
    .then(() => resolve())
    .catch((error) => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(GET_CHARACTERS, handleGetCharacters)
  requestHandler(CREATE_CHARACTER, handleCreateCharacter)
  requestHandler(FIND_CHARACTERS, handleFindCharacters)
  requestHandler(GET_PROFILE, handleGetProfile)
  requestHandler(UPDATE_CHARACTER, handleUpdateCharacter)
  requestHandler(UPDATE_ENTRY, handleUpdateEntry)
}

export default registerRequestHandlers
