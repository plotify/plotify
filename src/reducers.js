import { combineReducers } from 'redux';
import navigation from './navigation/reducer';
import about from './about/reducer';

export default combineReducers({
  navigation,
  about
});
