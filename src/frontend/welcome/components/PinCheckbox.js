import Checkbox from 'material-ui/Checkbox'
import PinIcon from '../../icons/Pin'
import PinOffIcon from '../../icons/PinOff'
import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'

const PinCheckbox = (props) => (
  <Checkbox
    icon={<PinIcon />}
    checkedIcon={<PinOffIcon />}
    checked={props.checked}
    onChange={props.onChange}
    classes={props.classes}
  />
)

PinCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func
}

const styles = (theme) => ({
  checked: {
    color: theme.palette.text.secondary
  }
})

export default withStyles(styles)(PinCheckbox)
