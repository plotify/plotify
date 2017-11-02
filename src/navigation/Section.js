import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import NavigationDrawerButton from './NavigationDrawerButton'

function Section (props) {
  const { classes, title, actions, children } = props
  return (
    <div className={classes.wrapper}>
      <AppBar position='static'>
        <Toolbar>
          <NavigationDrawerButton className={classes.menuButton} color='contrast' />
          <Typography type='title' color='inherit' className={classes.title}>
            {title}
          </Typography>
          {actions}
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  actions: PropTypes.element
}

const styles = theme => ({
  wrapper: {
    height: '100%',
    width: '100%'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 12
  },
  title: {
    flex: 1
  },
  content: {
    overflow: 'scroll',
    height: 'calc(100% - 64px)'
  }
})

export default withStyles(styles)(Section)
