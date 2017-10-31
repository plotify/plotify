import React from 'react';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CreateNewFolderIcon from 'material-ui-icons/CreateNewFolder';
import FolderOpenIcon from 'material-ui-icons/FolderOpen';
import PersonIcon from 'material-ui-icons/Person';
import GroupIcon from 'material-ui-icons/Group';
import DeleteIcon from 'material-ui-icons/Delete';
import SettingsIcon from 'material-ui-icons/Settings';
import InfoIcon from 'material-ui-icons/Info';
import { connect } from 'react-redux'
import * as s from './selectors';
import * as a from './actions';

function DrawerItem(props) {
  const { text , icon} = props;
  return (
    <ListItem button>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

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
        <DrawerItem text='Einstellungen' icon={<SettingsIcon />} />
        <DrawerItem text='Über Plotify' icon={<InfoIcon />} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationDrawer)
