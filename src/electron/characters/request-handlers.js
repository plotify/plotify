import { FIND_CHARACTERS } from '../../shared/characters/requests'
import { findCharacters } from '../../backend/characters'
import { getStoryByWindow } from '../story'
import { requestHandler } from '../shared/communication'

const handleFindCharacters = (resolve, reject, senderWindow, { deleted, filter }) => {
  const database = getStoryByWindow(senderWindow).database
  findCharacters(database, deleted, filter)
    .then(characters => resolve(characters))
    .catch(error => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(FIND_CHARACTERS, handleFindCharacters)
}

export default registerRequestHandlers
