import green from 'material-ui/colors/green'

const theme = {
  palette: {
    primary: {
      50: '#e9e3f1',
      100: '#c9b9dd',
      200: '#a58ac6',

      // Diese Farbe wird für die Beschriftung eines fokussierten Textfeldes verwendet,
      // wenn der Nachtmodus aktiviert ist. Die ursprüngliche Farbe (#805baf) war zu dunkel.
      // Siehe: https://github.com/plotify/plotify/issues/146
      300: '#e1bee7',

      400: '#65379d',
      500: '#4a148c',
      600: '#431284',
      700: '#3a0e79',
      800: '#320b6f',
      900: '#22065c',
      A100: '#ac8eff',
      A200: '#875bff',
      A400: '#6128ff',
      A700: '#4e0fff',
      contrastDefaultColor: 'light'
    },
    secondary: green
  }
}

export default theme
