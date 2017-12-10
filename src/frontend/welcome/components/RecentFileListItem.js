import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import React, { Component } from 'react'
import { basename, extname } from 'path'

import DeleteIcon from 'material-ui-icons/Delete'
import Divider from 'material-ui/Divider'
import FolderOpenIcon from 'material-ui-icons/FolderOpen'
import IconButton from 'material-ui/IconButton'
import MoreIcon from 'material-ui-icons/MoreVert'
import PinIcon from '../../icons/Pin'
import PinOffIcon from '../../icons/PinOff'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openStory } from '../../story/actions'

class RecentFileListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuAnchorElement: null,
      menuOpen: false
    }
    this.handleOpenMenu = this.handleOpenMenu.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleOpenMenu (event) {
    this.setState({ menuOpen: true, menuAnchorElement: event.currentTarget })
  }

  handleRequestClose () {
    this.setState({ menuOpen: false, menuAnchorElement: null })
  }

  render () {
    const { file, pinned, openStory } = this.props
    return (
      <ListItem button onClick={() => openStory(file)}>
        <ListItemText primary={format(file)} />
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
            onRequestClose={this.handleRequestClose}>
            <MenuItem onClick={this.handleRequestClose}>
              <ListItemIcon>
                { pinned ? <PinOffIcon /> : <PinIcon /> }
              </ListItemIcon>
              <ListItemText primary={pinned ? 'Ablösen' : 'Anheften'} />
            </MenuItem>
            <MenuItem onClick={this.handleRequestClose}>
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary='Verzeichnis öffnen' />
            </MenuItem>
            <Divider />
            <MenuItem onClick={this.handleRequestClose}>
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

const format = (file) => {
  const ext = extname(file)
  const name = basename(file)
  return name.substring(0, name.length - ext.length)
}

RecentFileListItem.propTypes = {
  file: PropTypes.string.isRequired,
  pinned: PropTypes.bool.isRequired,
  openStory: PropTypes.func.isRequired
}

RecentFileListItem.defaultProps = {
  pinned: false
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  openStory: (path) => dispatch(openStory(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecentFileListItem)
