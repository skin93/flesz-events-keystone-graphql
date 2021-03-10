import React from 'react'
import Head from 'next/head'
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
import Grid from '@material-ui/core/Grid'
import FeaturedPosts from '../components/layout/FeaturedPosts'
import Divider from '@material-ui/core/Divider'

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
    <React.Fragment>
      <Head>
        <title>Flesz.Events</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='icon' href='favicon.ico' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
          rel='stylesheet'
        />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TheHeader />
            <Container
              component={motion.div}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                when: 'afterChildren'
              }}
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              maxWidth='lg'
              style={{
                marginTop: '30px',
                minHeight: '100vh',
                overflow: 'hidden'
              }}
            >
              <Grid container justify='space-between'>
                <Grid item xs={12} lg={8}>
                  <Component {...pageProps} />
                </Grid>
                <Grid item>
                  <Divider orientation='vertical' lg={1} />
                </Grid>
                <Grid item xs={12} lg={3} container justify='center'>
                  <FeaturedPosts />
                </Grid>
              </Grid>
            </Container>
            <TheFooter />
          </ThemeProvider>
        </ApolloProvider>
      </AnimatePresence>
    </React.Fragment>
  )
}
