import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import React, { Component } from 'react'
import { basename, dirname, extname } from 'path'
import { openFileInFolder, removeRecentlyOpenedFile } from '../actions'

import DeleteIcon from 'material-ui-icons/Delete'
import FolderOpenIcon from 'material-ui-icons/FolderOpen'
import IconButton from 'material-ui/IconButton'
import MoreIcon from 'material-ui-icons/MoreVert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openStory } from '../../../story/actions'

class RecentFileListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuAnchorElement: null,
      menuOpen: false
    }
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpenStoryInFolder = this.handleOpenStoryInFolder.bind(this)
    this.handleRemoveStory = this.handleRemoveStory.bind(this)
  }

  handleOpenMenu (event) {
    this.setState({ menuOpen: true, menuAnchorElement: event.currentTarget })
  }

  handleClose () {
    this.setState({ menuOpen: false, menuAnchorElement: null })
  }

  handleOpenStoryInFolder () {
    this.handleClose()
    this.props.openStoryInFolder(this.props.path)
  }

  handleRemoveStory () {
    this.handleClose()
    this.props.removeStory(this.props.path)
  }

  render () {
    const { path, openStory } = this.props
    return (
      <ListItem button onClick={() => openStory(path)}>
        <ListItemText
          primary={formatName(path)}
          secondary={formatDirectory(path)} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={this.handleOpenMenu}
            aria-owns={this.state.menuOpen ? 'simple-menu' : null}
            aria-haspopup='true'>
            <MoreIcon />
          </IconButton>
          <Menu
            open={this.state.menuOpen}
            anchorEl={this.state.menuAnchorElement}
            onClose={this.handleClose}>
            <MenuItem onClick={this.handleOpenStoryInFolder}>
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary='Verzeichnis öffnen' />
            </MenuItem>
            <MenuItem onClick={this.handleRemoveStory}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary='Aus Liste entfernen' />
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

/*
import PinIcon from '../../../icons/Pin'
import PinOffIcon from '../../../icons/PinOff'
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                { pinned ? <PinOffIcon /> : <PinIcon /> }
              </ListItemIcon>
              <ListItemText primary={pinned ? 'Ablösen' : 'Anheften'} />
            </MenuItem>
*/

const formatName = (path) => {
  const ext = extname(path)
  const name = basename(path)
  return name.substring(0, name.length - ext.length)
}

const formatDirectory = (path) => {
  return dirname(path)
}

RecentFileListItem.propTypes = {
  path: PropTypes.string.isRequired,
  pinned: PropTypes.bool.isRequired,
  openStory: PropTypes.func.isRequired,
  openStoryInFolder: PropTypes.func.isRequired,
  removeStory: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  openStory: (path) => dispatch(openStory(path)),
  openStoryInFolder: (path) => dispatch(openFileInFolder(path)),
  removeStory: (path) => dispatch(removeRecentlyOpenedFile(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentFileListItem)
