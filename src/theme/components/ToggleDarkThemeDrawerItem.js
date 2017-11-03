import React from 'react'
import { connect } from 'react-redux'
import { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Switch from 'material-ui/Switch'
import LightbulbIcon from 'material-ui-icons/LightbulbOutline'
import { isDarkThemeEnabled } from '../selectors'
import { toggleDarkTheme } from '../actions'

function ToggleDarkThemeDrawerItem (props) {
  const { darkTheme, toggleDarkTheme } = props
  return (
    <ListItem>
      <ListItemIcon>
        <LightbulbIcon />
      </ListItemIcon>
      <ListItemText primary='Nachtmodus' />
      <ListItemSecondaryAction>
        <Switch
          onClick={toggleDarkTheme}
          checked={darkTheme} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function mapStateToProps (state) {
  return {
    darkTheme: isDarkThemeEnabled(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleDarkTheme: () => dispatch(toggleDarkTheme())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleDarkThemeDrawerItem)
