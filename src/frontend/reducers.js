import { combineReducers } from 'redux'
import view from './view/reducer'
import navigation from './navigation/reducer'
import about from './about/reducer'
import characters from './characters/reducer'

export default combineReducers({
  view,
  navigation,
  about,
  characters
})
