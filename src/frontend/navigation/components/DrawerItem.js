import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import PropTypes from 'prop-types'
import React from 'react'
import { closeNavigationDrawer } from '../actions'
import { connect } from 'react-redux'

const DrawerItem = (props) => {
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

DrawerItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  closeNavigationDrawer: PropTypes.func
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  closeNavigationDrawer: () => dispatch(closeNavigationDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerItem)
