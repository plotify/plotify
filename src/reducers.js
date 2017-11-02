import { combineReducers } from 'redux'
import theme from './theme/reducer'
import navigation from './navigation/reducer'
import about from './about/reducer'

export default combineReducers({
  theme,
  navigation,
  about
})
