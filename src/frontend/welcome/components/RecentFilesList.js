import List from 'material-ui/List'
import PropTypes from 'prop-types'
import React from 'react'
import RecentFileListItem from './RecentFileListItem'
import { connect } from 'react-redux'

// TODO Lade zuletzt verwendete Geschichten.
const recentFiles = [
  '~/Dokumente/Eine Studie in Scharlachrot.story',
  '~/Dokumente/Im Zeichen der Vier.story',
  '~/Dokumente/Der Hund von Baskerville.story',
  '~/Dokumente/Das Tal der Angst.story'
]

const RecentFilesList = (props) => (
  <List>
    {props.files.map((file, index) => (
      <RecentFileListItem key={index} file={file} />
    ))}
  </List>
)

RecentFilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = (state) => ({
  files: recentFiles
})

export default connect(mapStateToProps)(RecentFilesList)
