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
          background: `inherit`,
          color: `rgba(255, 255, 255, 0.9)`,
          padding: `20px 30px`,
          margin: `30px auto`,
          lineHeight: `3rem`,
          width: `80%`,
          borderLeft: `3px solid #32e0c4`,
          fontStyle: `italic`
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
          color: `#eee`
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
      main: ' rgb(179, 179, 179)'
    },
    background: {
      main: 'rgb(36,36,36)'
    }
  }
})

export default theme
