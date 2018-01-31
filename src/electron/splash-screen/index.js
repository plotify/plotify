import * as actions from './actions'

import { bindActionCreators } from 'redux'
import store from '../store'

export default bindActionCreators(actions, store.dispatch)
