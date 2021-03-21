import React from 'react'
import Router, { useRouter } from 'next/router'

import theme from '../theme'

import TheHeader from '../components/layout/TheHeader'
import TheFooter from '../components/layout/TheFooter'

import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Container from '@material-ui/core/Container'

import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url))

export default function App({ Component, pageProps }) {
  const router = useRouter()

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TheHeader />
        <Container
          maxWidth='lg'
          component='main'
          key={router.asPath}
          style={{
            margin: '30px auto',
            minHeight: '100vh',
            overflow: 'hidden'
          }}
        >
          <Component {...pageProps} />
        </Container>
        <TheFooter />
      </ThemeProvider>
    </>
  )
}
