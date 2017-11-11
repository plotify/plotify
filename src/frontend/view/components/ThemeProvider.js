import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { isDarkThemeEnabled } from '../selectors'
import theme from '../theme'

const ThemeProvider = (props) => {
  const { children, darkTheme } = props

  if (darkTheme) {
    theme.palette.type = 'dark'
  } else {
    theme.palette.type = 'light'
  }

  const muiTheme = createMuiTheme(theme)
  console.log(muiTheme)

  return (
    <MuiThemeProvider theme={muiTheme}>
      {children}
    </MuiThemeProvider>
  )
}

ThemeProvider.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

const mapStateToProps = (state) => ({
  darkTheme: isDarkThemeEnabled(state)
})

export default connect(mapStateToProps)(ThemeProvider)
