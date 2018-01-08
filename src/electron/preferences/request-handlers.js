import { GET_RECENTLY_OPENED_FILES, REMOVE_RECENTLY_OPENED_FILE } from '../../shared/preferences/requests'
import { getRecentlyOpenedFiles, removeRecentlyOpenedFile } from './'

import { requestHandler } from '../shared/communication'

const handleGetRecentlyOpenedFiles = (resolve, reject) => {
  getRecentlyOpenedFiles()
    .then((files) => resolve(files))
    .catch((error) => reject(error))
}

const handleRemoveGetRecentlyOpenedFile = (resolve, reject, _, path) => {
  removeRecentlyOpenedFile(path)
    .then(() => resolve())
    .catch((error) => reject(error))
}

const registerRequestHandlers = () => {
  requestHandler(GET_RECENTLY_OPENED_FILES, handleGetRecentlyOpenedFiles)
  requestHandler(REMOVE_RECENTLY_OPENED_FILE, handleRemoveGetRecentlyOpenedFile)
}

export default registerRequestHandlers
