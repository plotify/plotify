import { getErrorMessage, isError } from '../selectors'

import CloseIcon from 'material-ui-icons/Close'
import IconButton from 'material-ui/IconButton'
import PropTypes from 'prop-types'
import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { connect } from 'react-redux'
import { removeError } from '../actions'

const vertical = 'bottom'
const horizontal = 'center'

const ErrorSnackbar = (props) => (
  <Snackbar
    open={props.open}
    onClose={props.onClose}
    autoHideDuration={5000}
    message={props.message}
    anchorOrigin={{ vertical, horizontal }}
    action={[
      <IconButton
        key='close'
        aria-label='Schließen'
        color='inherit'
        onClick={props.onClose}>
        <CloseIcon />
      </IconButton>
    ]} />
)

ErrorSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string
}

const mapStateToProps = (state) => ({
  open: isError(state),
  message: getErrorMessage(state)
})

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(removeError())
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbar)
