import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'

const CharacterProfileGroup = (props) => {
  const { className, title, children, classes, paperClass } = props
  return (
    <div className={classNames(className, classes.wrapper)}>
      <Typography
        type='title'
        className={classes.title}
        gutterBottom>
        {title}
      </Typography>
      <Paper className={paperClass}>
        {children}
      </Paper>
    </div>
  )
}

CharacterProfileGroup.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  paperClass: PropTypes.string
}

const styles = (theme) => ({
  wrapper: {
    // display: 'inline'
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit / 2
  }
})

export default withStyles(styles)(CharacterProfileGroup)
