import { SET_STATE } from './action-types'
import about from './about/reducer'
import characters from './characters/reducer'
import { combineReducers } from 'redux'
import navigation from './navigation/reducer'
import story from './story/reducer'
import view from './view/reducer'
import welcome from './welcome/reducer'

const appReducer = combineReducers({
  view,
  navigation,
  welcome,
  about,
  story,
  characters
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case SET_STATE:
      return action.payload.state
    default:
      return appReducer(state, action)
  }
}

export default rootReducer
