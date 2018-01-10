import List from 'material-ui/List'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFileListItem from './RecentFileListItem'

const RecentFilesList = (props) => (
  <List>
    {props.files.map((file, index) => (
      <RecentFileListItem
        key={file.path}
        path={file.path}
        pinned={file.pinned}
        removing={file.removing} />
    ))}
  </List>
)

RecentFilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    pinned: PropTypes.bool.isRequired,
    removing: PropTypes.bool.isRequired
  })).isRequired
}

export default RecentFilesList
