export { default as reducer } from './reducer'
export { getRecentlyOpenedFiles } from './selectors'
export {
  loadRecentlyOpenedFiles,
  addOrUpdateRecentlyOpenedFile,
  pinRecentlyOpenedFile,
  unpinRecentlyOpenedFile,
  removeRecentlyOpenedFile
} from './actions'
