import { ADD_RECENTLY_OPENED_FILE } from '../../../shared/preferences/requests'
import { addRecentlyOpenedFile } from './actions'
import { requestHandler } from '../../shared/communication'

const handleAddRecentlyOpenedFile = (resolve, _, file, dispatch) => {
  dispatch(addRecentlyOpenedFile(file))
  resolve()
}

const registerRequestHandlers = () => {
  requestHandler(ADD_RECENTLY_OPENED_FILE, handleAddRecentlyOpenedFile)
}

export default registerRequestHandlers
