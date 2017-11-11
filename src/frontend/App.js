import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import NavigationDrawer from './navigation/components/NavigationDrawer'
import AboutDialog from './about/components/AboutDialog'
import CharactersSection from './characters/components/CharactersSection'

const App = (props) => (
  <div className={props.classes.wrapper}>
    <NavigationDrawer />
    <AboutDialog />
    <CharactersSection />
  </div>
)

App.propTypes = {
  classes: PropTypes.object.isRequired
}

const styles = (theme) => ({
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default
  }
})

export default withStyles(styles)(App)
