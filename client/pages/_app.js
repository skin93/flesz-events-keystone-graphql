import React from 'react'
import Router, { useRouter } from 'next/router'

import { motion, AnimatePresence } from 'framer-motion'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

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
  const apolloClient = useApollo(pageProps.initialApolloState)

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TheHeader />
            <Container
              maxWidth='lg'
              component={motion.main}
              transition={{ ease: 'linear', when: 'afterChildren' }}
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
        </ApolloProvider>
      </AnimatePresence>
    </>
  )
}
