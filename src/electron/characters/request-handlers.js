import { CREATE_CHARACTER, FIND_CHARACTERS, GET_PROFILE } from '../../shared/characters/requests'
import { createCharacter, findCharacters, getProfile } from '../../backend/characters'

import { getStoryByWindow } from '../story'
import { requestHandler } from '../shared/communication'

const handleCreateCharacter = (resolve, reject, senderWindow, name) => {
  const database = getStoryByWindow(senderWindow).database
  createCharacter(database, name)
    .then(characterId => resolve(characterId))
    .catch(error => reject(error.message))
}

const handleFindCharacters = (resolve, reject, senderWindow, { deleted, filter }) => {
  const database = getStoryByWindow(senderWindow).database
  findCharacters(database, deleted, filter)
    .then(characters => resolve(characters))
    .catch(error => reject(error.message))
}

const handleGetProfile = (resolve, reject, senderWindow, characterId) => {
  const database = getStoryByWindow(senderWindow).database
  getProfile(database, characterId)
    .then(profile => resolve(profile))
    .catch(error => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(CREATE_CHARACTER, handleCreateCharacter)
  requestHandler(FIND_CHARACTERS, handleFindCharacters)
  requestHandler(GET_PROFILE, handleGetProfile)
}

export default registerRequestHandlers
