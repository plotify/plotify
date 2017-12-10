import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import { basename, extname } from 'path'

import PinCheckbox from './PinCheckbox'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { openStory } from '../../story/actions'

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
      <ListItem button key={index} onClick={() => props.openStory(file)}>
        <ListItemText primary={format(file)} />
        <ListItemSecondaryAction>
          <PinCheckbox />
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
)

const format = (file) => {
  const ext = extname(file)
  const name = basename(file)
  return name.substring(0, name.length - ext.length)
}

RecentFilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = (state) => ({
  files: recentFiles
})

const mapDispatchToProps = (dispatch) => ({
  openStory: (path) => dispatch(openStory(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentFilesList)
