import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Switch from 'material-ui/Switch'
import LightbulbIcon from 'material-ui-icons/LightbulbOutline'
import { isDarkThemeEnabled } from '../selectors'
import { toggleDarkTheme } from '../actions'

const ToggleDarkThemeDrawerItem = (props) => (
  <ListItem>
    <ListItemIcon>
      <LightbulbIcon />
    </ListItemIcon>
    <ListItemText primary='Nachtmodus' />
    <ListItemSecondaryAction>
      <Switch
        onClick={props.toggleDarkTheme}
        checked={props.darkTheme}
        disableRipple />
    </ListItemSecondaryAction>
  </ListItem>
)

ToggleDarkThemeDrawerItem.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleDarkTheme: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  darkTheme: isDarkThemeEnabled(state)
})

const mapDispatchToProps = (dispatch) => ({
  toggleDarkTheme: () => dispatch(toggleDarkTheme())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleDarkThemeDrawerItem)
