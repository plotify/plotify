import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import DrawerItem from './DrawerItem'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import PersonIcon from 'material-ui-icons/Person'
import GroupIcon from 'material-ui-icons/Group'
import DeleteIcon from 'material-ui-icons/Delete'
import HelpIcon from 'material-ui-icons/Help'
import FeedbackIcon from 'material-ui-icons/Feedback'
import ToggleDarkThemeDrawerItem from '../../view/components/ToggleDarkThemeDrawerItem'
import AboutDrawerItem from '../../about/components/AboutDrawerItem'
import { connect } from 'react-redux'
import { isNavigationDrawerOpen } from '../selectors'
import { closeNavigationDrawer } from '../actions'

// TODO Nachtmodus aus Drawer entfernen, sobald der Nachtmodus über das Menü aktiviert/deaktiviert werden kann
// TODO "Über Plotify" & CO. aus Drawer entfernen, sobald der Dialog über das Menü geöffnet werden kann
const NavigationDrawer = (props) => (
  <Drawer open={props.open} onRequestClose={props.onCloseDrawer}>
    <List>
      <DrawerItem text='Charaktere' icon={<PersonIcon />} />
      <DrawerItem text='Gruppen' icon={<GroupIcon />} />
      <DrawerItem text='Papierkorb' icon={<DeleteIcon />} />
      <Divider />
      <ToggleDarkThemeDrawerItem />
      <Divider />
      <DrawerItem text='Hilfe & Anleitungen' icon={<HelpIcon />} />
      <DrawerItem text='Feedback geben' icon={<FeedbackIcon />} />
      <AboutDrawerItem />
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
