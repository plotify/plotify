import { createSelector } from 'reselect'

export const getPinnedFiles = createSelector(
  (state) => state.welcome.recentlyOpenedFiles.files,
  (files) => files.filter(file => file.pinned)
)

export const getNotPinnedFiles = createSelector(
  (state) => state.welcome.recentlyOpenedFiles.files,
  (files) => files.filter(file => !file.pinned)
)

export const isShowFolderNotFoundDialog = (state) =>
  state.welcome.recentlyOpenedFiles.showFolderNotFoundDialog === true

export const isError = (state) =>
  typeof state.welcome.recentlyOpenedFiles.error === 'string' &&
  state.welcome.recentlyOpenedFiles.error.length > 0

export const getErrorMessage = (state) =>
  state.welcome.recentlyOpenedFiles.error
