import React from 'react'

import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

import SiteDrawer from '../SiteDrawer'
import Box from '@material-ui/core/Box'

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

const navLinks = [
  { title: `newsy`, path: `/categories/newsy` },
  { title: `festiwale`, path: `/categories/festiwale` },
  { title: `koncerty`, path: `/categories/koncerty` }
]

const TheHeader = (props) => {
  const classes = useStyles()

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar variant='dense' id='back-to-top-anchor'>
            <Container maxWidth='lg' className={classes.navbarDisplayFlex}>
              <Box
                className={classes.navbarBrand}
                color='inherit'
                aria-label='home'
              >
                <Link href='/'>
                  <a>
                    <Box
                      component='img'
                      src='/biale-logo-pelny-napis-akcent.png'
                      className={classes.logo}
                      alt='logo'
                    />
                  </a>
                </Link>
              </Box>
              <Hidden smDown>
                <List
                  component='nav'
                  aria-label='main-navigation'
                  className={classes.navDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <Link href={path} key={title} passHref>
                      <a className={classes.linkText}>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </a>
                    </Link>
                  ))}
                </List>
              </Hidden>
              <Hidden mdUp>
                <SiteDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className={classes.offset} />
    </>
  )
}

export default TheHeader

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.black.main
  },
  offset: theme.mixins.toolbar,
  home: {
    color: theme.palette.light.main
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  navbarBrand: {
    padding: `8px 16px`,
    display: `flex`,
    justifyContent: `flex-start`,
    alignItems: `center`
  },
  logo: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    width: `150px`
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: theme.palette.light.main
  }
}))
