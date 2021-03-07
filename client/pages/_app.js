import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import TheHeader from '../components/layout/TheHeader'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FeaturedPosts from '../components/layout/FeaturedPosts'
import Divider from '@material-ui/core/Divider'

export default function App({ Component, pageProps }) {
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
        <link
          href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TheHeader />
          <Container maxWidth='lg' style={{ marginTop: '30px' }}>
            <Grid container justify='space-around'>
              <Grid item xs={12} lg={9}>
                <Component {...pageProps} />
              </Grid>
              <Grid item>
                <Divider orientation='vertical' lg={1} />
              </Grid>
              <Grid item xs={12} lg={2} container justify='center'>
                <FeaturedPosts />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  )
}
