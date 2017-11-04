import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import NavigationDrawerButton from './NavigationDrawerButton'

// TODO Bekannter Fehler: Bei schmalen Fenstern schrumpft die AppBar in der Höhe.
//      Dadurch passen die festen Abstände von 64px nicht mehr und es entstehen Lücken.
const Section = (props) => (
  <div className={props.classes.wrapper}>
    <AppBar>
      <Toolbar>
        <NavigationDrawerButton className={props.classes.menuButton} color='contrast' />
        <Typography type='title' color='inherit' className={props.classes.title}>
          {props.title}
        </Typography>
        {props.actions}
      </Toolbar>
    </AppBar>
    <div className={props.classes.content}>
      {props.children}
    </div>
  </div>
)

Section.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  actions: PropTypes.element
}

const styles = (theme) => ({
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
    overflowY: 'auto',
    paddingTop: '64px',
    height: 'calc(100% - 64px)'
  }
})

export default withStyles(styles)(Section)
