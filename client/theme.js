import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          padding: 0,
          margin: 0,
          backgroundColor: 'rgb(36,36,36)'
        },
        blockquote: {
          background: `rgba(179, 179, 179, 0.1)`,
          color: `rgba(255, 255, 255, 0.9)`,
          padding: `30px`,
          lineHeight: `2em`,
          margin: `30px auto`,
          width: `80%`,
          borderLeft: `5px solid #32e0c4`,
          fontSize: `1.2rem`
        },
        iframe: {
          position: `relative`,
          left: `50%`,
          transform: `translateX(-50%)`,
          width: `100%`,
          maxHeight: `100%`,
          margin: `30px 0`
        },
        h2: {
          color: `#eee`,
          fontSize: `2rem`
        },
        p: {
          fontSize: `1.2rem`
        },
        a: {
          color: '#32e0c4',
          textDecoration: `none`
        },
        strong: {
          color: `#eee`
        },
        ul: {
          margin: `30px`
        },
        ol: {
          margin: `30px`
        },
        li: {
          margin: `10px 0`,
          fontSize: `1.2rem`,
          '&::marker': {
            color: '#32e0c4'
          }
        },
        ul: {
          li: {
            listStyle: `square`
          }
        }
      }
    }
  },
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
      main: 'rgb(179, 179, 179)',
      darker: 'rgba(179, 179, 179, 0.1)'
    },
    background: {
      main: 'rgb(36,36,36)'
    }
  },
  typography: {
    h1: {
      fontSize: `3rem`
    },
    subtitle1: {
      fontSize: `1.2rem`,
      fontWeight: `bold`
    }
  }
})

export default theme
