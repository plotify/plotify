import React from 'react';
import Drawer from 'material-ui/Drawer';
import DrawerItem from './DrawerItem';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CreateNewFolderIcon from 'material-ui-icons/CreateNewFolder';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
import PersonIcon from 'material-ui-icons/Person';
import GroupIcon from 'material-ui-icons/Group';
import DeleteIcon from 'material-ui-icons/Delete';
import HelpIcon from 'material-ui-icons/Help';
import FeedbackIcon from 'material-ui-icons/Feedback';
import ToggleDarkThemeDrawerItem from '../theme/ToggleDarkThemeDrawerItem';
import AboutDrawerItem from '../about/AboutDrawerItem';
import { connect } from 'react-redux';
import * as s from './selectors';
import * as a from './actions';

function NavigationDrawer(props) {
  const { open, onCloseDrawer } = props;
  return (
    <Drawer open={open} onRequestClose={onCloseDrawer}>
      <List>
        <DrawerItem text='Neue Geschichte' icon={<CreateNewFolderIcon />} />
        <DrawerItem text='Geschichte öffnen' icon={<FolderOpenIcon />} />
        <Divider />
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
  );
}

function mapStateToProps(state) {
  return {
    open: s.isNavigationDrawerOpen(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseDrawer: () => dispatch(a.closeNavigationDrawer())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);
