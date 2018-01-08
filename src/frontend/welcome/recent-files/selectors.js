export const getRecentlyOpenedFiles = (state) => (
  state.welcome.recentFiles.files
)

export const isShowFolderNotFoundDialog = (state) => (
  state.welcome.recentFiles.showFolderNotFoundDialog === true
)
