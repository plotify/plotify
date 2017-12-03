import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { createStory, openStory } from '../../story/actions'

import CreateNewFolderIcon from 'material-ui-icons/CreateNewFolder'
import FolderOpenIcon from 'material-ui-icons/FolderOpen'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

const StarterList = (props) => (
  <List>
    <ListItem button onClick={props.createStory}>
      <ListItemIcon>
        <CreateNewFolderIcon />
      </ListItemIcon>
      <ListItemText primary='Neue Geschichte' />
    </ListItem>
    <ListItem button onClick={props.openStory}>
      <ListItemIcon>
        <FolderOpenIcon />
      </ListItemIcon>
      <ListItemText primary='Geschichte öffnen' />
    </ListItem>
  </List>
)

StarterList.propTypes = {
  createStory: PropTypes.func.isRequired,
  openStory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  createStory: () => dispatch(createStory()),
  openStory: () => dispatch(openStory())
})

export default connect(mapStateToProps, mapDispatchToProps)(StarterList)
