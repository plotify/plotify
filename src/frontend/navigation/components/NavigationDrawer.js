import DeleteIcon from 'material-ui-icons/Delete'
import Drawer from 'material-ui/Drawer'
import DrawerItem from './DrawerItem'
import GroupIcon from 'material-ui-icons/Group'
import List from 'material-ui/List'
import PersonIcon from 'material-ui-icons/Person'
import PropTypes from 'prop-types'
import React from 'react'
import { closeNavigationDrawer } from '../actions'
import { connect } from 'react-redux'
import { isNavigationDrawerOpen } from '../selectors'
import { openCharactersSection } from '../../characters/actions'

const NavigationDrawer = (props) => (
  <Drawer open={props.open} onRequestClose={props.onCloseDrawer}>
    <List>
      <DrawerItem text='Charaktere' icon={<PersonIcon />} onClick={props.onOpenCharactersSection} />
      <DrawerItem text='Gruppen' icon={<GroupIcon />} />
      <DrawerItem text='Papierkorb' icon={<DeleteIcon />} />
    </List>
  </Drawer>
)

NavigationDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseDrawer: PropTypes.func.isRequired,
  onOpenCharactersSection: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: isNavigationDrawerOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  onCloseDrawer: () => dispatch(closeNavigationDrawer()),
  onOpenCharactersSection: () => dispatch(openCharactersSection())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer)
