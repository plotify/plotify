import FolderNotFoundDialog from './FolderNotFoundDialog'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFileListItem from './RecentFileListItem'
import { connect } from 'react-redux'
import { getRecentlyOpenedFiles } from '../selectors'

const RecentFilesList = (props) => {
  const { files, listClassName } = props
  const pinnedFiles = files.filter(file => file.pinned)
  const notPinnedFiles = files.filter(file => !file.pinned)
  return [
    (pinnedFiles.length > 0 ? list(0, pinnedFiles, listClassName) : null),
    (notPinnedFiles.length > 0 ? list(1, notPinnedFiles, listClassName) : null)
  ]
}

const list = (key, files, className) => [
  <Paper key={key} className={className}>
    {files.map((file, index) => (
      <RecentFileListItem key={index} path={file.path} pinned={file.pinned} removing={file.removing} />
    ))}
    <FolderNotFoundDialog />
  </Paper>
]

RecentFilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  listClassName: PropTypes.string
}

const mapStateToProps = (state) => ({
  files: getRecentlyOpenedFiles(state)
})

export default connect(mapStateToProps)(RecentFilesList)
