import { combineReducers } from 'redux'
import theme from './theme/reducer'
import navigation from './navigation/reducer'
import about from './about/reducer'
import characters from './characters/reducer'

export default combineReducers({
  theme,
  navigation,
  about,
  characters
})
