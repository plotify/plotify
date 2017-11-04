import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { connect } from 'react-redux'
import { openNavigationDrawer } from '../actions'

const Button = (props) => (
  <IconButton
    onClick={props.onOpenDrawer}
    className={props.className}
    color={props.color}
    aria-label='Menu'>
    <MenuIcon />
  </IconButton>
)

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  onOpenDrawer: () => dispatch(openNavigationDrawer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
