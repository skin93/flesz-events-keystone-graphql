import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    accent: {
      main: '#32e0c4'
    },
    light: {
      main: '#eee'
    },
    black: {
      main: '#212121'
    },
    muted: {
      main: ' rgb(179, 179, 179)'
    },
    background: {
      main: 'rgb(36,36,36)'
    }
  }
})

export default theme
