import React from 'react';
import InfoIcon from 'material-ui-icons/Info';
import DrawerItem from '../navigation/DrawerItem';
import { connect } from 'react-redux';
import { openAboutDialog } from './actions';

function AboutDrawerItem(props) {
  const { onOpenAboutDialog } = props;
  return (
    <DrawerItem
      text='Über Plotify'
      icon={<InfoIcon />}
      onClick={onOpenAboutDialog} />
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onOpenAboutDialog: () => dispatch(openAboutDialog())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutDrawerItem);
