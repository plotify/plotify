import { ListItemIcon, ListItemText } from 'material-ui/List'
import Menu, { MenuItem } from 'material-ui/Menu'
import React, { Component } from 'react'

import CopyIcon from '@material-ui/icons/ContentCopy'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from 'material-ui/IconButton'
import MoreIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isCharacterSelected } from '../selectors'
import { withStyles } from 'material-ui/styles'

class CharacterProfileMenu extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.state = {
      anchorEl: null,
      open: false
    }
  }

  handleClick (event) {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose () {
    this.setState({ open: false, anchorEl: null })
  }

  render () {
    const { classes, characterSelected } = this.props
    const className = !characterSelected ? classes.characterNotSelected : ''
    return (
      <div className={className}>
        <IconButton
          color='inherit'
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}>
          <MoreIcon />
        </IconButton>
        <Menu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleRequestClose}>
          <MenuItem onClick={this.handleRequestClose}>
            <ListItemIcon>
              <CopyIcon />
            </ListItemIcon>
            <ListItemText primary='Duplizieren' />
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary='Löschen' />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

CharacterProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  characterSelected: PropTypes.bool.isRequired
}

const styles = (theme) => ({
  characterNotSelected: {
    display: 'none'
  }
})

const StyledCharacterProfileMenu = withStyles(styles)(CharacterProfileMenu)

const mapStateToProps = (state) => ({
  characterSelected: isCharacterSelected(state)
})

export default connect(mapStateToProps)(StyledCharacterProfileMenu)
