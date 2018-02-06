import AboutDialog from './about/components/AboutDialog'
import CharactersSection from './characters/components/CharactersSection'
import ClosingStoryDialog from './story/components/ClosingStoryDialog'
import CreatingStoryDialog from './story/components/CreatingStoryDialog'
import FullScreenHint from './view/components/FullScreenHint'
import NavigationDrawer from './navigation/components/NavigationDrawer'
import OpeningStoryDialog from './story/components/OpeningStoryDialog'
import PropTypes from 'prop-types'
import React from 'react'
import UpdateNotificationSnackbar from './updates/components/UpdateNotificationSnackbar'
import WelcomeSection from './welcome/components/WelcomeSection'
import { basename } from 'path'
import { connect } from 'react-redux'
import { getStoryPath } from './story/selectors'
import { withStyles } from 'material-ui/styles'

const productName = require('../package.json').productName

class App extends React.Component {
  componentDidMount () {
    document.title = productName
  }

  componentWillUpdate (nextProps) {
    if (nextProps.path) {
      document.title = basename(nextProps.path, '.story') + ' - ' + productName
    } else {
      document.title = productName
    }
  }

  render () {
    return (
      <div className={this.props.classes.wrapper}>
        <NavigationDrawer />
        <UpdateNotificationSnackbar />
        <AboutDialog />
        <FullScreenHint />
        <OpeningStoryDialog />
        <CreatingStoryDialog />
        <ClosingStoryDialog />
        <WelcomeSection />
        <CharactersSection />
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string
}

const styles = (theme) => {
  const scrollbarBaseColor = reverseRgb(hexToRgb(theme.palette.background.default))
  return {
    '@global': {
      '::-webkit-scrollbar': {
        width: theme.spacing.unit,
        height: theme.spacing.unit,
        background: 'transparent',
        '&:hover': {
          background: toRgba(scrollbarBaseColor, 0.09)
        }
      },
      '::-webkit-scrollbar-thumb': {
        background: toRgba(scrollbarBaseColor, 0.5),
        '&:active': {
          background: toRgba(scrollbarBaseColor, 0.61)
        }
      }
    },
    wrapper: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.background.default
    }
  }
}

const hexToRgb = (hex) => {
  const red = parseInt(hex.substring(1, 3), 16)
  const green = parseInt(hex.substring(3, 5), 16)
  const blue = parseInt(hex.substring(5, 7), 16)
  return [red, green, blue]
}

const reverseRgb = (rgb) => {
  return rgb.map((color) => 255 - color)
}

const toRgba = (rgb, opacity) => {
  const red = rgb[0]
  const green = rgb[1]
  const blue = rgb[2]
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

const StyledApp = withStyles(styles)(App)

const mapStateToProps = (state) => ({
  path: getStoryPath(state)
})

export default connect(mapStateToProps)(StyledApp)
