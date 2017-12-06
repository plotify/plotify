import { FIND_CHARACTERS } from '../../shared/characters/requests'
import { findCharacters } from '../../backend/characters'
import { getCurrentStory } from '../story'
import { requestHandler } from '../shared/communication'

const handleFindCharacters = (resolve, reject, payload) => {
  const { deleted, filter } = payload
  const database = getCurrentStory().database
  findCharacters(database, deleted, filter)
    .then(characters => resolve(characters))
    .catch(error => reject(error.message))
}

const registerRequestHandlers = () => {
  requestHandler(FIND_CHARACTERS, handleFindCharacters)
}

export default registerRequestHandlers
