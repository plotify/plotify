import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { connect } from 'react-redux'
import * as a from './actions';

function Button(props) {
  const { onOpenDrawer, className, color } = props;
  return (
    <IconButton
      onClick={onOpenDrawer} 
      className={className}
      color={color}
      aria-label='Menu'>
      <MenuIcon />
    </IconButton>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onOpenDrawer: () => dispatch(a.openNavigationDrawer())
  };
}

const NavigationDrawerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

NavigationDrawerButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default NavigationDrawerButton;
