import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { connect } from 'react-redux'
import { closeNavigationDrawer } from './actions'

function DrawerItem (props) {
  const { text, icon, onClick, closeNavigationDrawer } = props

  const combinedOnClick = () => {
    if (closeNavigationDrawer) closeNavigationDrawer()
    if (onClick) onClick()
  }

  return (
    <ListItem button onClick={combinedOnClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    closeNavigationDrawer: () => dispatch(closeNavigationDrawer())
  }
}

const ConnectedDrawerItem = connect(mapStateToProps, mapDispatchToProps)(DrawerItem)

ConnectedDrawerItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func
}

export default ConnectedDrawerItem
