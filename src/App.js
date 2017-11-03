import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import NavigationDrawer from './navigation/NavigationDrawer'
import AboutDialog from './about/AboutDialog'
import CharactersSection from './characters/components/CharactersSection'

function App (props) {
  const { classes } = props
  return (
    <div className={classes.wrapper}>
      <NavigationDrawer />
      <AboutDialog />
      <CharactersSection />
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = theme => ({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default
  }
})

export default withStyles(styles)(App)
