import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    accent: {
      default: '#32e0c4'
    },
    light: {
      default: '#eee'
    },
    black: {
      default: '#212121'
    },
    muted: {
      default: ' rgb(179, 179, 179)'
    },
    background: {
      main: 'rgb(36,36,36)'
    }
  }
})

export default theme
