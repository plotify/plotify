import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import { isDarkThemeEnabled } from './selectors';
import theme from './theme';

function ThemeProvider(props) {
  
  const { children, darkTheme } = props;

  if (darkTheme) {
    theme.palette.type = 'dark';
  } else {
    theme.palette.type = 'light';
  }

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      {children}
    </MuiThemeProvider>
  );

}

function mapStateToProps(state) {
  return {
    darkTheme: isDarkThemeEnabled(state)
  };
}

export default connect(mapStateToProps)(ThemeProvider);
