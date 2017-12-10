import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFileListItem from './RecentFileListItem'
import { connect } from 'react-redux'

// TODO Lade zuletzt verwendete Geschichten.
const recentFiles = [
  { path: '~/Dokumente/Eine Studie in Scharlachrot.story', pinned: true },
  { path: '~/Dokumente/Im Zeichen der Vier.story', pinned: true },
  { path: '~/Dokumente/Der Hund von Baskerville.story', pinned: false },
  { path: '~/Dokumente/Das Tal der Angst.story', pinned: false },
  { path: '~/Dokumente/Ein Skandal in Böhmen.story', pinned: false },
  { path: '~/Dokumente/Die fünf Orangenkerne.story', pinned: false }
]

const RecentFilesList = (props) => {
  const { files, listClassName } = props
  const pinnedFiles = files.filter(file => file.pinned)
  const notPinnedFiles = files.filter(file => !file.pinned)
  return [
    (pinnedFiles.length > 0 ? list(0, pinnedFiles, listClassName) : null),
    (notPinnedFiles.length > 0 ? list(1, notPinnedFiles, listClassName) : null)
  ]
}

const list = (key, files, className) => (
  <Paper key={key} className={className}>
    {files.map((file, index) => (
      <RecentFileListItem key={index} path={file.path} pinned={file.pinned} />
    ))}
  </Paper>
)

RecentFilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  listClassName: PropTypes.string
}

const mapStateToProps = (state) => ({
  files: recentFiles
})

export default connect(mapStateToProps)(RecentFilesList)
