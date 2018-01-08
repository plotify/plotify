import { GET_RECENTLY_OPENED_FILES } from '../../shared/preferences/requests'
import { getRecentlyOpenedFiles } from './'
import { requestHandler } from '../shared/communication'

const handleGetRecentlyOpenedFiles = (resolve, reject) => {
  getRecentlyOpenedFiles()
    .then((files) => resolve(files))
    .catch((error) => reject(error))
}

const registerRequestHandlers = () => {
  requestHandler(GET_RECENTLY_OPENED_FILES, handleGetRecentlyOpenedFiles)
}

export default registerRequestHandlers
