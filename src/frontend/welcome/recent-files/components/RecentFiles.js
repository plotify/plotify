import ErrorSnackbar from './ErrorSnackbar'
import FolderNotFoundDialog from './FolderNotFoundDialog'
import NoRecentFiles from './NoRecentFiles'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFilesList from './RecentFilesList'
import { connect } from 'react-redux'
import { getRecentlyOpenedFiles } from '../selectors'

const RecentFiles = (props) => {
  const { files, listClassName } = props
  const pinnedFiles = files.filter(file => file.pinned)
  const notPinnedFiles = files.filter(file => !file.pinned)
  if (pinnedFiles.length + notPinnedFiles.length > 0) {
    return [
      (pinnedFiles.length > 0 ? list(0, pinnedFiles, listClassName) : null),
      (notPinnedFiles.length > 0 ? list(1, notPinnedFiles, listClassName) : null),
      <FolderNotFoundDialog key={2} />,
      <ErrorSnackbar key={3} />
    ]
  } else {
    return (
      <Paper className={listClassName}>
        <NoRecentFiles />
      </Paper>
    )
  }
}

const list = (key, files, className) => [
  <Paper key={key} className={className}>
    <RecentFilesList files={files} />
  </Paper>
]

RecentFiles.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  listClassName: PropTypes.string
}

const mapStateToProps = (state) => ({
  files: getRecentlyOpenedFiles(state)
})

export default connect(mapStateToProps)(RecentFiles)
