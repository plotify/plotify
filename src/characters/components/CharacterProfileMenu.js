import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import Menu, { MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'
import CopyIcon from 'material-ui-icons/ContentCopy'
import DeleteIcon from 'material-ui-icons/Delete'
import MoreIcon from 'material-ui-icons/MoreVert'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import { isCharacterSelected } from '../selectors'

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
          color='contrast'
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}>
          <MoreIcon />
        </IconButton>
        <Menu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.handleRequestClose}>
          <MenuItem>
            <ListItemIcon>
              <CopyIcon />
            </ListItemIcon>
            <ListItemText primary='Duplizieren' />
          </MenuItem>
          <MenuItem>
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
