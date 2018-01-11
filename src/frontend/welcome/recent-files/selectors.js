import { createSelector } from 'reselect'

export const getPinnedFiles = createSelector(
  (state) => state.welcome.recentFiles.files,
  (files) => files.filter(file => file.pinned)
)

export const getNotPinnedFiles = createSelector(
  (state) => state.welcome.recentFiles.files,
  (files) => files.filter(file => !file.pinned)
)

export const isShowFolderNotFoundDialog = (state) => (
  state.welcome.recentFiles.showFolderNotFoundDialog === true
)

export const isError = (state) => (
  typeof state.welcome.recentFiles.error === 'string' &&
  state.welcome.recentFiles.error.length > 0
)

export const getErrorMessage = (state) => (
  state.welcome.recentFiles.error
)
