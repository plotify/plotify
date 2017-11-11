import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import DrawerItem from './DrawerItem'
import List from 'material-ui/List'
import PersonIcon from 'material-ui-icons/Person'
import GroupIcon from 'material-ui-icons/Group'
import DeleteIcon from 'material-ui-icons/Delete'
import { connect } from 'react-redux'
import { isNavigationDrawerOpen } from '../selectors'
import { closeNavigationDrawer } from '../actions'

const NavigationDrawer = (props) => (
  <Drawer open={props.open} onRequestClose={props.onCloseDrawer}>
    <List>
      <DrawerItem text='Charaktere' icon={<PersonIcon />} />
      <DrawerItem text='Gruppen' icon={<GroupIcon />} />
      <DrawerItem text='Papierkorb' icon={<DeleteIcon />} />
    </List>
  </Drawer>
)

NavigationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isNavigationDrawerOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onCloseDrawer: () => dispatch(closeNavigationDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
